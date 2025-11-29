# MiniK8s

MiniK8s is a lightweight, educational Kubernetes-like system designed for exploring modern cluster orchestration architectures. It provides a simplified version of Kubernetes concepts to help understand the basics of cluster management and distributed computing.

## Project Overview

MiniK8s consists of the following key components:

- **API Server (Go):** Handles requests to create, manage, and inspect pods and nodes. Provides gRPC endpoints for communication with agents and other services.
- **Scheduler (Go):** Responsible for scheduling pods onto available nodes using simple strategies like least-loaded and round-robin.
- **State Store:** Distributed key-value storage for cluster state and pod information, based on BadgerDB or a custom lightweight implementation.
- **Node Agent (C++):** Runs on each node, supervises pod processes, collects resource usage metrics, handles log streaming, and reports status back to the control plane via gRPC.
- **Web Dashboard (React):** A modern frontend to visualize node and pod statuses, metrics, logs, and cluster health in real time.

## Features

- Pod lifecycle management across nodes
- Resource monitoring (CPU/RAM)
- Centralized log streaming
- Automatic restarts and failure recovery
- Modular design for easy experimentation with schedulers and stores
- Simple web dashboard UI for monitoring and control

This project is suitable as a playground for developers and architects wishing to experiment with control plane, agent, and dashboard patterns in distributed systems.
