import { Container } from "@/components/container"
import { NodeElement } from "@/components/nodes/node.element";
import { NodeWidget } from "@/components/nodes/node.widget";

import { PodsWidget } from "@/components/pods/pod.widget";

/**
 * MainPage component serves as the main landing page of the application.
 * It wraps its content within a Container component to set the layout structure.
 *
 * @returns {JSX.Element} The rendered main page view.
 */
export const MainPage: React.FC = () => {
    return (
        <Container>
            <Dashboard/>
        </Container>
    );
}

/**
 * Dashboard component displays an overview of the cluster,
 * including resource utilization and pod status summary.
 *
 * @returns {JSX.Element} The dashboard view.
 */
const Dashboard = () => {
    return (
        <div className="overflow-y-scroll max-h-svh flex flex-col gap-4">
            <PodsWidget/>
            <NodeWidget/>
        </div>
    )
}





