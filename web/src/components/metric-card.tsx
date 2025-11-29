import { ServerCrash } from "lucide-react";
import { type IProgress, Progress } from "./progress";

export const mockMetricCardProps: IMetricCardProps = {
    data: {
        icon: <ServerCrash size={20} />,
        title: "CPU",
        progress: {
            h: 100,
            l: 0,
            cur: 65,
            title: "cores"
        }
    }
    }






export interface IMetricData {
    // Icon via lucide react
    icon?: React.ReactNode;
    // Title of card (CPU, Memory etc.)
    title: string;
    // Progress bar data
    progress: IProgress
}

interface IMetricCardProps {
    data: IMetricData
}

type TMetricCardComponent = React.FC<IMetricCardProps>

/**
 * MetricCard component displays a card view for a single metric (e.g., CPU, Memory).
 * 
 * @component
 * @param {IMetricCardProps} props - The data for the metric card.
 * @param {React.ReactNode} props.data.icon - Icon to represent the metric (optional).
 * @param {string} props.data.title - The title of the metric (e.g., "CPU").
 * @param {IProgress} props.data.progress - Progress data for the metric.
 * 
 * @example
 * <MetricCard data={{
 *   icon: <ServerCrash size={20} />,
 *   title: "CPU",
 *   progress: {
 *     h: 100,
 *     l: 0,
 *     cur: 65,
 *     title: "cores"
 *   }
 * }} />
 */
//

export const MetricCard: TMetricCardComponent = ({data}) => {
const {icon, title, progress} = data


return (
    <div className="border  border-zinc-500 rounded-2xl w-[300px] p-4 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
            {icon}
            <span>{title}</span>
        </div>
        <Progress data={progress}/>

    </div>
)

}