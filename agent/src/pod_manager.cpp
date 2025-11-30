#include "pod_manager.h"
#include "process_runner.h"
#include <chrono>
#include <sstream>
#include <ctime>
#include <sys/wait.h>
#include <iostream>
#include <iomanip>

namespace Agent::pod {


    PodManager::PodManager(const std::string& baseDir): baseDir_(baseDir) {
        std::filesystem::create_directories(baseDir_);
    }

    static long now_ts() {
        return std::chrono::duration_cast<std::chrono::seconds>(
            std::chrono::system_clock::now().time_since_epoch()
        ).count();
    }

    std::string PodManager::gen_id() {
        auto t = now_ts();
        static int counter = 0;
        std::ostringstream ss;
        ss << "pod-" << t << "-" << (counter++);
        return ss.str();
    }

    std::string PodManager::pod_dir(const std::string& id) {
        return baseDir_ + "/" + id;
    }

    std::string PodManager::create_pod(const std::string& name, const std::vector<std::string>& cmd) {
        std::lock_guard<std::mutex> lk(mtx_);
        Pod p;
        p.id = gen_id();
        p.name = name;
        p.cmd = cmd;
        p.status = PodStatus::Pending;
        p.created_ts = now_ts();
        pods_.emplace(p.id, p);
        // ensure dir
        std::filesystem::create_directories(pod_dir(p.id));
        return p.id;
    }

    bool PodManager::start_pod(const std::string& id) {
        std::lock_guard<std::mutex> lk(mtx_);
        auto it = pods_.find(id);
        if (it == pods_.end()) return false;
        Pod &p = it->second;
        if (p.status == PodStatus::Running) return false;

        auto res = Agent::runner::ProcessRunner::run_process(pod_dir(p.id), p.cmd);
        if (!res.has_value()) {
            p.status = PodStatus::Failed;
            return false;
        }
        p.pid = res->pid;
        p.stdout_path = res->stdout_path;
        p.stderr_path = res->stderr_path;
        p.status = PodStatus::Running;
        p.started_ts = now_ts();
        return true;
    }

    bool PodManager::kill_pod(const std::string& id) {
        std::lock_guard<std::mutex> lk(mtx_);
        auto it = pods_.find(id);
        if (it == pods_.end()) return false;
        Pod &p = it->second;
        if (p.pid <= 0) return false;
        bool ok = ProcessRunner::Kill(p.pid);
        if (ok) p.status = PodStatus::Failed;
        return ok;
    }

    std::optional<Pod> PodManager::get_pod(const std::string& id) {
        std::lock_guard<std::mutex> lk(mtx_);
        if (!pods_.count(id)) return std::nullopt;
        return pods_.at(id);
    }

    std::vector<Pod> PodManager::list_pods() {
        std::lock_guard<std::mutex> lk(mtx_);
        std::vector<Pod> out;
        out.reserve(pods_.size());
        for (auto &pr : pods_) out.push_back(pr.second);
        return out;
    }

    void PodManager::tick() {
        std::lock_guard<std::mutex> lk(mtx_);
        for (auto &pr : pods_) {
            Pod &p = pr.second;
            if (p.status == PodStatus::Running) {
                // check if pid finished
                int status = 0;
                pid_t ret = waitpid(p.pid, &status, WNOHANG);
                if (ret == 0) {
                    // still running
                    continue;
                } else if (ret == p.pid) {
                    // finished
                    if (WIFEXITED(status)) {
                        int code = WEXITSTATUS(status);
                        p.finished_ts = now_ts();
                        p.status = (code == 0) ? PodStatus::Completed : PodStatus::Failed;
                    } else if (WIFSIGNALED(status)) {
                        p.finished_ts = now_ts();
                        p.status = PodStatus::Failed;
                    } else {
                        p.finished_ts = now_ts();
                        p.status = PodStatus::Unknown;
                    }
                } else {
                    // waitpid error or no child
                    // treat as completed
                    p.finished_ts = now_ts();
                    p.status = PodStatus::Unknown;
                }
            }
        }
    }

}


