#include "process_runner.h"
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <signal.h>
#include <fcntl.h>
#include <errno.h>
#include <vector>
#include <string.h>
#include <sys/stat.h>



namespace Agent::runner {


// helper: create directory recursively (simple)
static bool ensure_dir(const std::string &path) {
    // try mkdir -p: create each segment
    size_t i = 0;
    while (i < path.size()) {
        size_t j = path.find('/', i);
        if (j == std::string::npos) j = path.size();
        std::string sub = path.substr(0, j);
        if (!sub.empty()) {
            mkdir(sub.c_str(), 0755); // ignore errors
        }
        i = j + 1;
    }
    return true;
}

Agent::runner::OptionalProcessResult ProcessRunner::run_process(const std::string& podDir, const std::vector<std::string>& cmd) {
    if (cmd.empty()) return std::nullopt;

    ensure_dir(podDir);

    std::string stdout_file = podDir + "/stdout.log";
    std::string stderr_file = podDir + "/stderr.log";

    int outfd = open(stdout_file.c_str(), O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (outfd < 0) {
        perror("open stdout");
        return std::nullopt;
    }
    int errfd = open(stderr_file.c_str(), O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (errfd < 0) {
        perror("open stderr");
        close(outfd);
        return std::nullopt;
    }

    pid_t pid = fork();
    if (pid < 0) {
        perror("fork");
        close(outfd);
        close(errfd);
        return std::nullopt;
    }

    if (pid == 0) {
        // Child process
        // redirect stdout/stderr
        if (dup2(outfd, STDOUT_FILENO) == -1) {
            perror("dup2 stdout");
            _exit(127);
        }
        if (dup2(errfd, STDERR_FILENO) == -1) {
            perror("dup2 stderr");
            _exit(127);
        }

        // close fds we don't need
        close(outfd);
        close(errfd);

        // build argv
        std::vector<char*> argv;
        argv.reserve(cmd.size() + 1);
        for (const auto &s : cmd) argv.push_back(const_cast<char*>(s.c_str()));
        argv.push_back(nullptr);

        // execvp
        execvp(argv[0], argv.data());
        // if execvp returns, it's error
        perror("execvp");
        _exit(127);
    }

    // Parent
    close(outfd);
    close(errfd);

    return Agent::runner::OptionalProcessResult{true,  static_cast<int>(pid), stdout_file, stderr_file };
}

bool ProcessRunner::is_running(int pid) {
    if (pid <= 0) return false;
    // kill 0 checks for existence/permission
    int err = kill(pid, 0);
    if (err == 0) return true;
    if (errno == EPERM) return true; // exists but no permission
    return false;
}

bool ProcessRunner::kill_pod(int pid) {
    if (pid <= 0) return false;
    if (kill(pid, SIGTERM) == 0) return true;
    return false;
}


} // namespace Agent::runner
