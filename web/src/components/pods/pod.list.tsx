import type { IPodData } from "@/entities/dashboard/type"
import { PodElement } from "./pod.element"

interface IPodListProps {
    data: IPodData[]
}

type TPodListComponent = React.FC<IPodListProps>

export const PodList: TPodListComponent = ({data}) => {

    return (
        <ul>
            {data.map(el => (
                <PodElement data={el}/>
            ))}
        </ul>
    )
}