package main

import (
	"log"
	"minik8s/internal/config"
	"minik8s/internal/httpserver"
	"os"
	"os/signal"
	"syscall"
)

func main() {

	cfg := config.LoadConfig()
	h := httpserver.NewHttpServer(cfg.HTTPAddress)

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		log.Printf("Http server started")
		if err := h.Start(); err != nil {
			log.Printf("Failed to start http server: %w", err)
		}
	}()

	<-stop
	log.Printf("Http server stoped")

}
