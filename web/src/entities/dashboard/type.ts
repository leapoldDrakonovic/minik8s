

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
  }
]