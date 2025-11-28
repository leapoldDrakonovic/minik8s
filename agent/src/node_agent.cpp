#include "node_agent.h"
#include <iostream>

grpc::Status NodeAgentServiceImpl::RunPod(grpc::ServerContext* context,
                                          const nodeagent::PodRequest* request,
                                          nodeagent::PodResponse* response) {
    std::cout << "Running pod: " << request->name() << std::endl;
    for (const auto& cmd : request->cmd()) {
        std::cout << "Command: " << cmd << std::endl;
    }

    response->set_pod_id(request->pod_id());
    response->set_status("Started");

    return grpc::Status::OK;
}
