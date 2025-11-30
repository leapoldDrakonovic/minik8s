

#include "node_info.h"
#include <sys/types.h>
#include <unistd.h>
#include <ctime>
#ifdef __APPLE__
#include <sys/sysctl.h>
#endif




namespace Agent::node {



    NodeMetrics NodeInfo::collect() {
        NodeMetrics m;
        double loads[3] = {0,0,0};
        if (getloadavg(loads, 3) != -1) {
            m.load1 = loads[0];
            m.load5 = loads[1];
            m.load15 = loads[2];
        }
        m.timestamp = std::time(nullptr);

        // uptime: try /proc/uptime on linux, on mac use sysctl kern.boottime
    #ifdef __linux__
        FILE* f = fopen("/proc/uptime", "r");
        if (f) {
            double up;
            if (fscanf(f, "%lf", &up) == 1) {
                m.uptime = static_cast<long>(up);
            }
            fclose(f);
        }
    #elif __APPLE__
        struct timeval boottime;
        size_t len = sizeof(boottime);
        int mib[2] = {CTL_KERN, KERN_BOOTTIME};
        if (sysctl(mib, 2, &boottime, &len, NULL, 0) != -1) {
            time_t bsec = boottime.tv_sec;
            m.uptime = static_cast<long>(time(nullptr) - bsec);
        }
    #endif

        return m;
    }

    std::string NodeInfo::hostname() {
        char buf[256];
        if (gethostname(buf, sizeof(buf)) == 0) return std::string(buf);
        return std::string("unknown");
    }

}
