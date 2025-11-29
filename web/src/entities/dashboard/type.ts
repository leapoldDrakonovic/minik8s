import type { IMetricData } from "@/components/metric-card";


export interface IDashboardData {}

export interface IPodData {
    name: string;
    node: string;
    status: "Pending" | "Running";
    restarts: number;
    age: string;
    cpu: any;
    memory: any;
}



export interface INodeData {
  title: string;
  namespace?: string;
  version?: string;
  age: number;
  os?: string
  metric: IMetricData
}

export const mockNodes: INodeData[] = [
  {
    title: "NODE-1",
    namespace: "default",
    version: "v1.27.3",
    age: 15,
    os: "linux",
    metric: {
      icon: undefined,
      title: "CPU",
      progress: {
        h: 100,
        l: 0,
        cur: 13,
        title: "cores"
      }
    }
  },
  {
    title: "NODE-2",
    namespace: "kube-system",
    version: "v1.27.3",
    age: 32,
    os: "linux",
    metric: {
      icon: undefined,
      title: "CPU",
      progress: {
        h: 100,
        l: 0,
        cur: 27,
        title: "Gi"
      }
    }
  },
  {
    title: "NODE-3",
    namespace: "production",
    version: "v1.28.1",
    age: 27,
    os: "linux",
    metric: {
      icon: undefined,
      title: "Pods",
      progress: {
        h: 100,
        l: 0,
        cur: 48,
        title: ""
      }
    }
  }
];




// Delete mock data
export const mockPods: IPodData[] = [
  {
    name: "nginx-123",
    node: "node-1",
    status: "Running",
    restarts: 0,
    age: "5m",
    cpu: 0.12,
    memory: 24
  },
  {
    name: "redis-456",
    node: "node-2",
    status: "Pending",
    restarts: 1,
    age: "2m",
    cpu: 0.09,
    memory: 12
  },
  {
    name: "app-789",
    node: "node-3",
    status: "Running",
    restarts: 2,
    age: "15m",
    cpu: 0.2,
    memory: 40
  },
  {
    name: "app-789",
    node: "node-3",
    status: "Running",
    restarts: 2,
    age: "15m",
    cpu: 0.2,
    memory: 40
  },
  {
    name: "app-789",
    node: "node-3",
    status: "Running",
    restarts: 2,
    age: "15m",
    cpu: 0.2,
    memory: 40
  },
  {
    name: "app-789",
    node: "node-3",
    status: "Running",
    restarts: 2,
    age: "15m",
    cpu: 0.2,
    memory: 40
  }
]