import {  type INodeData } from "@/entities/dashboard/type"
import { NodeElement } from "./node.element"


interface INodeListProps {
    data: INodeData[]
}

type TNodeListComponent = React.FC<INodeListProps>

export const NodeList: TNodeListComponent = ({data}) => {
    return (
        <ul className="flex flex-col gap-1">
            {data.map(el => <NodeElement data={el} key={el.title}/>)}
        </ul>
    )
}