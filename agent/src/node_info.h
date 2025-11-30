#pragma once
#include <string>



namespace Agent::node {

    struct NodeMetrics {
        double load1 = 0.0;
        double load5 = 0.0;
        double load15 = 0.0;
        long uptime = 0;
        long timestamp = 0;
    };
    
    class NodeInfo {
    public:
        // collect metrics (platform dependent)
        static NodeMetrics collect();
        static std::string hostname();
    };
    

}