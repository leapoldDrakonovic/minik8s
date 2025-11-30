#pragma once
#include <string>
#include <vector>
#include <filesystem>



namespace Agent::pod {

    enum PodStatus { Pending, Running, Completed, Failed };

    struct Pod {

        //Pod unique id
        std::string id;
        //Pod name
        std::string name;
        // Cmd comand run
        std::vector<std::string> cmd;
        
        // Process ID
        int pid;
        PodStatus status;
    
        std::string stdout_path;
        std::string stderr_path;
    
        // Timestamps
        long created_ts;
        long started_ts;
        long finished_ts;
    };
    
} // namespace Agent::pod