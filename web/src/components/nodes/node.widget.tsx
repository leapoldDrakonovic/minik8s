import { mockNodes } from "@/entities/dashboard/type"
import { NodeList } from "./node.list"


export const NodeWidgetSkeleton = () => {}

export const NodeWidget: React.FC = () => {

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold">Nodes</h1>

            <NodeList data={mockNodes}/>
        </div>
    )
}