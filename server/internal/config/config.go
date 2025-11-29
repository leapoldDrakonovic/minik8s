package config

import (
	"encoding/json"
	"flag"
	"log"
	"os"
)

type Config struct {
	GRPCAddress string `json:"grpc_address"`
	HTTPAddress string `json:"http_address"`
	DataDir     string `json:"data_dir"`
}

func LoadConfig() *Config {
	cfg := &Config{}

	cfg.GRPCAddress = ":50051"
	cfg.HTTPAddress = ":8080"
	cfg.DataDir = "./data"

	if v := os.Getenv("MINIK8S_GRPC_ADDR"); v != "" {
		cfg.GRPCAddress = v
	}
	if v := os.Getenv("MINIK8S_HTTP_ADDR"); v != "" {
		cfg.HTTPAddress = v
	}
	if v := os.Getenv("MINIK8S_DATA_DIR"); v != "" {
		cfg.DataDir = v
	}

	grpcAddr := flag.String("grpc", cfg.GRPCAddress, "gRPC server address")
	httpAddr := flag.String("http", cfg.HTTPAddress, "HTTP server address")
	dataDir := flag.String("data-dir", cfg.DataDir, "Path to data directory")
	configFile := flag.String("config", "", "Path to JSON config file")
	flag.Parse()

	cfg.GRPCAddress = *grpcAddr
	cfg.HTTPAddress = *httpAddr
	cfg.DataDir = *dataDir

	if *configFile != "" {
		fileData, err := os.ReadFile(*configFile)
		if err != nil {
			log.Fatalf("failed to read config file: %v", err)
		}
		if err := json.Unmarshal(fileData, cfg); err != nil {
			log.Fatalf("failed to parse config file: %v", err)
		}
	}

	return cfg
}
