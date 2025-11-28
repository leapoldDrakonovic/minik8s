package store

import (
	"encoding/json"
	"minik8s/internal/pb/proto"

	"github.com/dgraph-io/badger/v4"
)

type BadgerStore struct {
	db *badger.DB
}

func New(path string) (Store, error) {
	db, err := badger.Open(badger.DefaultOptions(path))
	if err != nil {
		return nil, err
	}
	return &BadgerStore{db: db}, nil
}

func (s *BadgerStore) SavePod(pod *proto.Pod) error {
	data, err := json.Marshal(pod)
	if err != nil {
		return err
	}

	return s.db.Update(func(txn *badger.Txn) error {
		return txn.Set([]byte("pod:"+pod.Id), data)
	})
}

func (s *BadgerStore) ListPods() ([]*proto.Pod, error) {
	pods := []*proto.Pod{}

	err := s.db.View(func(txn *badger.Txn) error {
		it := txn.NewIterator(badger.DefaultIteratorOptions)
		defer it.Close()

		prefix := []byte("pod:")
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			item := it.Item()
			var pod proto.Pod
			err := item.Value(func(v []byte) error {
				return json.Unmarshal(v, &pod)
			})
			if err != nil {
				return err
			}
			pods = append(pods, &pod)
		}
		return nil
	})

	return pods, err
}

func (s *BadgerStore) SaveNode(node *proto.Node) error {
	data, err := json.Marshal(node)
	if err != nil {
		return err
	}

	return s.db.Update(func(txn *badger.Txn) error {
		return txn.Set([]byte("node:"+node.Name), data)
	})
}

func (s *BadgerStore) ListNodes() ([]*proto.Node, error) {
	nodes := []*proto.Node{}

	err := s.db.View(func(txn *badger.Txn) error {
		it := txn.NewIterator(badger.DefaultIteratorOptions)
		defer it.Close()

		prefix := []byte("node:")
		for it.Seek(prefix); it.ValidForPrefix(prefix); it.Next() {
			item := it.Item()
			var node proto.Node
			err := item.Value(func(v []byte) error {
				return json.Unmarshal(v, &node)
			})
			if err != nil {
				return err
			}
			nodes = append(nodes, &node)
		}
		return nil
	})

	return nodes, err
}
