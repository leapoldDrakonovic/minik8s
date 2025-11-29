import { Container } from "@/components/container"
import { cn } from "@/lib/utils";

/**
 * MainPage component serves as the main landing page of the application.
 * It wraps its content within a Container component to set the layout structure.
 *
 * @returns {JSX.Element} The rendered main page view.
 */
export const MainPage: React.FC = () => {
    return (
        <div>
            <Container>
                <PodsWidget/>
            </Container>
        </div>
    );
}


/**
/**
 * Dashboard component displays an overview of the cluster,
 * including resource utilization and pod status summary.
 *
 * @returns {JSX.Element} The dashboard view.
 */
const Dashboard = () => {

    return (
        <div>

        </div>
    )
}

/**
 * PodsWidgetSkeleton is a placeholder skeleton shown while pods data is loading.
 *
 * @returns {JSX.Element} Skeleton placeholder for pods widget.
 */
const PodsWidgetSkeleton = () => {}


const PODS_TABLE_HEADER = ["Name", "Node", "Status", "Restarts", "Age", "CPU", "Memory"]


/**
 * PodsWidget displays an overview table or list of the pods and their status within the cluster.
 *
 * @returns {JSX.Element} Widget with pods information.
 */
const PodsWidget = () => {


    const el_width = 100 / PODS_TABLE_HEADER.length

    return (
        <div>
            <h1>Pods</h1>
            <div className={cn("w-full border", `grid grid-cols-7`)}>
                {PODS_TABLE_HEADER.map(el => <span className={cn(`w-[${el_width}] col-span-1 border`)} key={el}>{el}</span>)}
            </div>
            <div>
                
            </div>
        </div>
    )

}
