package main

import (
	"flag"
	"log"
	"net"
	"os"
	"os/signal"
	"syscall"

	"minik8s/internal/grpcserver"
	pb "minik8s/internal/pb/proto"
	"minik8s/internal/store"

	"google.golang.org/grpc"
)

func main() {

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)

	dataDir := flag.String("data-dir", "./data", "Path to BadgerDB directory")
	flag.Parse()

	if err := os.MkdirAll(*dataDir, 0755); err != nil {
		log.Fatalf("failed to create data directory: %v", err)
	}

	badge, err := store.New(*dataDir)
	if err != nil {
		log.Fatalf("failed to init Badger store: %v", err)
	}

	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterApiServerServer(s, grpcserver.NewApiServer())

	go func() {

		log.Println("API Server listening on :50051")
		if err := s.Serve(lis); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}

	}()

	<-stop
	log.Println("Shutting down API Server...")

	// stop gRPC server
	s.GracefulStop()

	// close Badger
	if closer, ok := badge.(*store.BadgerStore); ok {
		if err := closer.Close(); err != nil {
			log.Printf("error closing Badger store: %v", err)
		}
	}

	log.Println("Shutdown complete")
	log.Println("Server stopped gracefully")

}
