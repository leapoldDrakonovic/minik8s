package store

import "minik8s/internal/pb/proto"

type Store interface {
	SavePod(pod *proto.Pod) error
	ListPods() ([]*proto.Pod, error)
	SaveNode(node *proto.Node) error
	ListNodes() ([]*proto.Node, error)
}
