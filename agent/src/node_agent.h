#pragma once
#include <string>
#include <grpcpp/grpcpp.h>
#include "nodeagent.grpc.pb.h"

class NodeAgentServiceImpl final : public nodeagent::NodeAgent::Service {
public:
    grpc::Status RunPod(grpc::ServerContext* context, const nodeagent::PodRequest* request,
                        nodeagent::PodResponse* response) override;
};
