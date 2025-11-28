cmake_minimum_required(VERSION 3.16)
project(NodeAgent)

set(CMAKE_CXX_STANDARD 17)

find_package(Protobuf REQUIRED)
find_package(gRPC REQUIRED)

include_directories(${Protobuf_INCLUDE_DIRS})
include_directories(${gRPC_INCLUDE_DIRS})

set(PROTO_SRC proto/nodeagent.pb.cc proto/nodeagent.grpc.pb.cc)

add_executable(node_agent
    src/main.cpp
    src/node_agent.cpp
    ${PROTO_SRC}
)

target_link_libraries(node_agent
    ${Protobuf_LIBRARIES}
    gRPC::grpc++
)
