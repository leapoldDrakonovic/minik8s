cmake_minimum_required(VERSION 3.16)
project(nodeagent CXX)

set(CMAKE_CXX_STANDARD 20)

add_executable(nodeagent
    main.cpp
    ${PROTO_SRCS}
    ${PROTO_HDRS}
    ${GRPC_SRCS}
    ${GRPC_HDRS}
)

target_link_libraries(nodeagent
    PRIVATE
        gRPC::grpc++
        protobuf::libprotobuf
)
