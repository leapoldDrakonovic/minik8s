#pragma once
#include "pod.h"
#include <unordered_map>
#include <optional>
#include <mutex>
#include <filesystem>



namespace Agent::pod {


class PodManager {
    public:
        PodManager(const std::string& baseDir = "./pods");
        // Create pod entry, returns id
        std::string create_pod(const std::string& name, const std::vector<std::string>& cmd);
        // Start pod (fork+exec). Returns true if started.
        bool start_pod(const std::string& id);
        // Kill pod
        bool kill_pod(const std::string& id);
        // Get pod snapshot
        Pod get_pod(const std::string& id);
        // List all pods
        std::vector<Pod> list_pods();
        // Periodic tick: update statuses for running pods (check if finished)
        void tick();
    
    private:
        std::unordered_map<std::string, Pod> pods_;
        std::string baseDir_;
        std::mutex mtx_;
    
        std::string gen_id();
        std::string pod_dir(const std::string& id);
    };
    

}
