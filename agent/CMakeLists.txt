cmake_minimum_required(VERSION 3.16)
project(nodeagent CXX)

set(CMAKE_CXX_STANDARD 17)

include(FetchContent)

# === gRPC + Protobuf ===
FetchContent_Declare(
    grpc
    GIT_REPOSITORY https://github.com/grpc/grpc.git
    GIT_TAG        v1.65.0
)
set(FETCHCONTENT_QUIET OFF)

# Здесь говорим CMake собирать gRPC и установить его в CMAKE_BINARY_DIR/_deps
set(gRPC_FETCHCONTENT_CMAKE_ARGS
    -DgRPC_INSTALL=ON
    -DgRPC_BUILD_TESTS=OFF
    -DgRPC_BUILD_CPP_EXT=ON
)
FetchContent_MakeAvailable(grpc)

# === Прото файлы ===
set(PROTO_FILES ${CMAKE_SOURCE_DIR}/../api/nodeagent.proto)

find_package(Protobuf REQUIRED)
find_package(gRPC CONFIG REQUIRED)

protobuf_generate_cpp(PROTO_SRCS PROTO_HDRS ${PROTO_FILES})
grpc_generate_cpp(GRPC_SRCS GRPC_HDRS ${PROTO_FILES})

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
