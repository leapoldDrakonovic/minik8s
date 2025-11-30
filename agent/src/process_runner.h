#pragma once
#include <string>
#include <vector>

namespace Agent::runner {

    struct ProcessResult {
        int pid;
        std::string stdout_path;
        std::string stderr_path;
    };


    // Manual Optional replacement:
    // DELETE FOR FEATURE
    struct OptionalProcessResult {
        bool has_value;
        ProcessResult value;
    };


    class ProcessRunner {
        public:
            // запускает процесс, возвращает pid и пути к логам
            static OptionalProcessResult run_process(const std::string& podDir, const std::vector<std::string>& cmd);
            // проверяет, жив ли процесс
            static bool is_running(int pid);
            // посылает SIGTERM, возвращает true если успешно
            static bool kill_pod(int pid);
        };

} // namespace Agent::runner