import type { IPodData } from "@/entities/dashboard/type"

interface IPodElementProps {
    data: IPodData
}

type TPodElementComponent = React.FC<IPodElementProps>

export const PodElement: TPodElementComponent = ({data}) => {

    return (
        <div>
            Pod
        </div>
    )
}