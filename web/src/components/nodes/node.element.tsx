// Remove from here (only example)

import { ServerCrash, ServerIcon } from "lucide-react";
import { Progress, type IProgress } from "../progress";
import { mockMetricCardProps, MetricCard, type IMetricData } from "../metric-card";
import type { INodeData } from "@/entities/dashboard/type";



interface INodeElementProps {
    data: INodeData
}

type TNodeElementComponent = React.FC<INodeElementProps>

export const NodeElement: TNodeElementComponent = ({data}) => {

    return (
        <div className="bg-white rounded-2xl flex flex-col gap-4 p-4">

            <div className="flex justify-between">

            {/* Upper title */}
            <div className="flex  gap-6">
                <div className="bg-blue-300 text-blue-700 rounded-lg w-10 h-10 flex justify-center items-center">
                    <ServerIcon/>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="">{data.title}</span>
                    <div className="flex gap-4">
                        <div className="flex gap-1 justify-center items-center">
                            <div className="bg-green-300 rounded-full w-2 h-2"/>
                            <span className="">Ready</span>
                        </div>
                        <div className="px-2 flex justify-center items-center bg-pink-300 rounded-sm text-pink-900">
                            <span>{data.namespace}</span>
                        </div>
                        <div className="p-1  rounded-lg text-zinc-900">
                            <span>{data.version}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right title */}
            <div>
                <span>Age: {data.age}</span>
            </div>

            </div>




            <NodeElementMetricsWidget data={[data.metric]}/>
        </div>
    )
}


interface INodeElementMetricsWidgetProps {
    data: IMetricData[]
}

type NodeElementMetricsWidgetComponent = React.FC<INodeElementMetricsWidgetProps>

const NodeElementMetricsWidget: NodeElementMetricsWidgetComponent  = ({data}) => {
   
    return (
        <div className="w-full flex gap-0.5  justify-between flex-wrap">
            {data.map(el => <MetricCard data={el}/>)}
        </div>
    )
}


