package grpcserver

import (
	"context"
	pb "minik8s/internal/pb/proto"
	"minik8s/internal/store"

	"github.com/google/uuid"
)

type ApiServer struct {
	pb.UnimplementedApiServerServer
	store store.Store
}

func NewApiServer(s store.Store) *ApiServer {
	return &ApiServer{store: s}
}

func (s *ApiServer) CreatePod(ctx context.Context, req *pb.CreatePodRequest) (*pb.CreatePodResponse, error) {
	id := uuid.NewString()
	pod := &pb.Pod{
		Id:     id,
		Spec:   req.Spec,
		Status: "Pending",
	}

	if err := s.store.SavePod(pod); err != nil {
		return nil, err
	}
	return &pb.CreatePodResponse{Pod: pod}, nil
}

func (s *ApiServer) ListPods(ctx context.Context, req *pb.ListPodsRequest) (*pb.ListPodsResponse, error) {
	list, err := s.store.ListPods()
	if err != nil {
		return nil, err
	}

	return &pb.ListPodsResponse{Pods: list}, nil
}

func (s *ApiServer) RegisterNode(ctx context.Context, req *pb.RegisterNodeRequest) (*pb.RegisterNodeResponse, error) {
	node := &pb.Node{
		Name:   req.Name,
		Status: "Ready",
	}

	if err := s.store.SaveNode(node); err != nil {
		return nil, err
	}

	return &pb.RegisterNodeResponse{Node: node}, nil
}

func (s *ApiServer) Heartbeat(ctx context.Context, req *pb.HeartbeatRequest) (*pb.HeartbeatResponse, error) {
	nodes, err := s.store.ListNodes()
	if err != nil {
		return nil, err
	}

	var target *pb.Node
	for _, n := range nodes {
		if n.Name == req.Name {
			target = n
			break
		}
	}

	if target != nil {
		target.CpuLoad = req.Cpu
		target.MemLoad = req.Memory
		s.store.SaveNode(target)
	}

	return &pb.HeartbeatResponse{}, nil
}
