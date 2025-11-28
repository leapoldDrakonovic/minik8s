#include <grpcpp/grpcpp.h>
#include "node_agent.h"

int main() {
    std::string server_address("0.0.0.0:50052");
    NodeAgentServiceImpl service;

    grpc::ServerBuilder builder;
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    builder.RegisterService(&service);

    std::unique_ptr<grpc::Server> server(builder.BuildAndStart());
    std::cout << "NodeAgent listening on " << server_address << std::endl;

    server->Wait();
    return 0;
}
