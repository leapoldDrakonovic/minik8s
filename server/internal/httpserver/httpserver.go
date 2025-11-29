package httpserver

import (
	"encoding/json"
	pb "minik8s/internal/pb/proto"
	"net/http"

	"google.golang.org/grpc"
)

type HttpServer struct {
	Mux  http.ServeMux
	Port string
}

func NewHttpServer(port string) *HttpServer {

	h := &HttpServer{}

	mux := http.ServeMux{}
	mux.HandleFunc("/pods/create", h.CreatePod)
	mux.HandleFunc("/pods/list", h.ListPods)

	h.Mux = mux
	h.Port = port

	return h
}

type CreatePodPayload struct {
	Name string   `json:"name"`
	Cmd  []string `json:"cmd"`
}

func (h *HttpServer) Start() error {
	if err := http.ListenAndServe(h.Port, &h.Mux); err != nil {
		return err
	}

	return nil
}

func Shutdown() error {
	return nil
}

func (h *HttpServer) CreatePod(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "invalid method", http.StatusMethodNotAllowed)
		return
	}

	var payload CreatePodPayload
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	conn, err := grpc.NewClient("", grpc.WithInsecure())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer conn.Close()

	client := pb.NewApiServerClient(conn)

	resp, err := client.CreatePod(r.Context(), &pb.CreatePodRequest{
		Spec: &pb.PodSpec{
			Name: payload.Name,
			Cmd:  payload.Cmd,
		},
	})
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp.Pod)

}

func (h *HttpServer) ListPods(w http.ResponseWriter, r *http.Request) {

	list := map[string]any{
		"pod1": "Running",
		"pod2": "Running",
		"pod3": "Running",
		"pod4": "Running",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(list)
}
