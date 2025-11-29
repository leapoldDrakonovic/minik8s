import { mockPods } from "@/entities/dashboard/type"
import { cn } from "@/lib/utils"
import { PodList } from "./pod.list"

/**
 * PodsWidgetSkeleton is a placeholder skeleton shown while pods data is loading.
 *
 * @returns {JSX.Element} Skeleton placeholder for pods widget.
 */
export const PodsWidgetSkeleton = () => {}


const PODS_TABLE_HEADER = ["Name", "Node", "Status", "Restarts", "Age", "CPU", "Memory"]


/**
 * PodsWidget displays an overview table or list of the pods and their status within the cluster.
 *
 * @returns {JSX.Element} Widget with pods information.
 */
export const PodsWidget: React.FC = () => {


    const el_width = 100 / PODS_TABLE_HEADER.length

    return (
        <div className="flex flex-col gap-4 bg-white px-4 pt-2 pb-6 rounded-xl">
            <h1 className="text-2xl font-bold">Pods</h1>
            <div className={cn("w-full border-b-2 border-t-2 py-2 font-semibold text-zinc-800 ", `grid grid-cols-7`)}>
                {PODS_TABLE_HEADER.map(el => <span className={cn(`w-[${el_width}] col-span-1`)} key={el}>{el}</span>)}
            </div>
            <div>
                <PodList data={mockPods}/>
            </div>
        </div>
    )

}
