package scheduler

import (
	"log"
	"minik8s/internal/pb/proto"
	"minik8s/internal/store"
	"sync"
)

type Scheduler struct {
	store store.Store
	mutex sync.Mutex
}

func NewScheduler(s store.Store) *Scheduler {
	return &Scheduler{store: s}
}

func (sch *Scheduler) SchedulePendingPods() {
	sch.mutex.Lock()
	defer sch.mutex.Unlock()

	pods, err := sch.store.ListPods()
	if err != nil {
		log.Printf("error listing pods: %v", err)
		return
	}

	nodes, err := sch.store.ListNodes()
	if err != nil {
		log.Printf("error listing nodes: %v", err)
		return
	}

	if len(nodes) == 0 {
		log.Println("no nodes available")
		return
	}

	for _, pod := range pods {
		if pod.Status != "Pending" {
			continue
		}

		// Выбирает ноду с наименьшей загрузкой CPU
		var target *proto.Node
		for _, n := range nodes {
			if target == nil || n.CpuLoad < target.CpuLoad {
				target = n
			}
		}

		if target == nil {
			log.Println("no suitable node found")
			continue
		}

		pod.NodeName = target.Name
		pod.Status = "Running"

		if err := sch.store.SavePod(pod); err != nil {
			log.Printf("error updating pod: %v", err)
			continue
		}

		// Здесь вызов NodeAgent gRPC можно добавить
		log.Printf("Pod %s scheduled on Node %s", pod.Spec.Name, target.Name)
	}
}
