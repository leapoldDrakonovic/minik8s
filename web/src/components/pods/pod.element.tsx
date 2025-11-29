import type { IPodData } from "@/entities/dashboard/type"

interface IPodElementProps {
    data: IPodData
}

type TPodElementComponent = React.FC<IPodElementProps>

export const PodElement: TPodElementComponent = ({data}) => {

    return (
        <div className="w-full grid grid-cols-7 py-2">
            {Object.entries(data).map(([key, value]) => <span className={'col-span-1'} key={key}>{value}</span>)}
        </div>
    )
}