# Agent (nodeagent)

A node agent for managing pods (processes) in a mini-Kubernetes environment.

## Features

- Create, start, and kill pods (processes)
- Get node metrics
- Restart or terminate processes
- Interactive CLI and programmatic interface

## Main Components

- `main.cpp` — entry point, agent startup
- `src/node_agent.h/.cpp` — `NodeAgent` class: manages pods via PodManager, interacts via CLI or programmatically
- `src/pod_manager.h/.cpp` — `PodManager`: stores/creates/starts/kills pods, updates statuses
- `src/pod.h` — Pod struct and statuses
- `src/process_runner.h/.cpp` — low-level process launching (fork/exec/kill)
- `src/node_info.h/.cpp` — node resources and metrics (CPU, memory, etc.)
- `src/utils.h` — utility functions

## Build Instructions

```bash
cd agent
mkdir -p build && cd build
cmake ..
make
```

## Usage

```bash
./nodeagent
```

Interactively manage pods and see their status through the CLI menu.

## Requirements

- C++ compiler
- cmake >= 3.16
- g++/clang++ (by default C++20 enabled—but compatible with pre-C++17 if modern extensions are avoided)
- gRPC/protobuf (only if building with distributed features)

## TODO & Roadmap

- See `todo.md`
