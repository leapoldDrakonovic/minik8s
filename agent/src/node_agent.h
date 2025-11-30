
#pragma once
#include "pod_manager.h"
#include "node_info.h"
#include <thread>
#include <atomic>



namespace Agent::node {


class NodeAgent {
    public:
        NodeAgent();
        ~NodeAgent();
    
        void run_interactive(); // starts CLI loop and background tickers
    
        // programmatic control
        std::string create_pod(const std::string& name, const std::vector<std::string>& cmd);
        bool start_pod(const std::string& id);
        bool kill_pod(const std::string& id);
        std::vector<Agent::pod::Pod> list_pods();
        NodeMetrics get_node_metrics();
    
    private:
        Agent::pod::PodManager pm_;
        std::atomic<bool> stopFlag_;
        std::thread tickerThread_;
    
        void ticker_loop();
    };

}

