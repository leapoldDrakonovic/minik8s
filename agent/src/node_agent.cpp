#include "node_agent.h"
#include <iostream>
#include <sstream>
#include <chrono>
#include <thread>


namespace Agent::node {


    NodeAgent::NodeAgent(): pm_("./pods"), stopFlag_(false) {}

    NodeAgent::~NodeAgent() {
        stopFlag_ = true;
        if (tickerThread_.joinable()) tickerThread_.join();
    }

    void NodeAgent::ticker_loop() {
        while (!stopFlag_) {
            pm_.tick();
            std::this_thread::sleep_for(std::chrono::seconds(1));
        }
    }

    void NodeAgent::run_interactive() {
        // start ticker
        tickerThread_ = std::thread(&NodeAgent::ticker_loop, this);

        std::cout << "NodeAgent interactive console. Type 'help' for commands.\n";
        std::string line;
        while (true) {
            std::cout << "> ";
            if (!std::getline(std::cin, line)) break;
            if (line.empty()) continue;

            std::istringstream ss(line);
            std::string cmd;
            ss >> cmd;
            if (cmd == "help") {
                std::cout << "Commands:\n";
                std::cout << "  create <name> <cmd...>     - create pod\n";
                std::cout << "  start <pod-id>             - start pod\n";
                std::cout << "  kill <pod-id>              - kill pod\n";
                std::cout << "  list                       - list pods\n";
                std::cout << "  status <pod-id>            - pod details\n";
                std::cout << "  nodes                      - show node metrics\n";
                std::cout << "  exit                       - quit\n";
            } else if (cmd == "create") {
                std::string name;
                ss >> name;
                std::vector<std::string> parts;
                std::string token;
                while (ss >> token) parts.push_back(token);
                if (name.empty() || parts.empty()) {
                    std::cout << "Usage: create <name> <cmd...>\n";
                    continue;
                }
                auto id = create_pod(name, parts);
                std::cout << "Created pod: " << id << "\n";
            } else if (cmd == "start") {
                std::string id; ss >> id;
                if (start_pod(id)) std::cout << "Started " << id << "\n";
                else std::cout << "Failed to start " << id << "\n";
            } else if (cmd == "kill") {
                std::string id; ss >> id;
                if (kill_pod(id)) std::cout << "Killed " << id << "\n";
                else std::cout << "Failed to kill " << id << "\n";
            } else if (cmd == "list") {
                auto pods = list_pods();
                for (auto &p : pods) {
                    std::cout << p.id << " | " << p.name << " | pid=" << p.pid << " | status=" << (int)p.status << "\n";
                }
            } else if (cmd == "status") {
                std::string id; ss >> id;
                auto pod = pm_.get_pod(id);
                if (!pod) { std::cout << "No such pod\n"; continue; }
                auto p = pod.value();
                std::cout << "id: " << p.id << "\n";
                std::cout << "name: " << p.name << "\n";
                std::cout << "pid: " << p.pid << "\n";
                std::cout << "status: " << (int)p.status << "\n";
                std::cout << "stdout: " << p.stdout_path << "\n";
                std::cout << "stderr: " << p.stderr_path << "\n";
            } else if (cmd == "nodes") {
                auto m = get_node_metrics();
                std::cout << "host: " << NodeInfo::hostname() << "\n";
                std::cout << "load1: " << m.load1 << " load5: " << m.load5 << " load15: " << m.load15 << "\n";
                std::cout << "uptime: " << m.uptime << "s\n";
            } else if (cmd == "exit") {
                break;
            } else {
                std::cout << "unknown command: " << cmd << "\n";
            }
        }

        stopFlag_ = true;
        if (tickerThread_.joinable()) tickerThread_.join();
    }

    std::string NodeAgent::create_pod(const std::string& name, const std::vector<std::string>& cmd) {
        return pm_.create_pod(name, cmd);
    }

    bool NodeAgent::start_pod(const std::string& id) {
        return pm_.start_pod(id);
    }

    bool NodeAgent::kill_pod(const std::string& id) {
        return pm_.kill_pod(id);
    }

    std::vector<Agent::pod::Pod> NodeAgent::list_pods() {
        return pm_.list_pods();
    }

    NodeMetrics NodeAgent::get_node_metrics() {
        return NodeInfo::collect();
    }

}

