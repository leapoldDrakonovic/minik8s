import { cn } from "@/lib/utils";

interface IContainerProps {
    className?: string;
    children: React.ReactNode
}

type TContainerComponent = React.FC<IContainerProps>

const CONTAINER_STYLE = "px-2"

export const Container: TContainerComponent = ({className, children}) => {

    return (
        <div className={cn(CONTAINER_STYLE, className)}>
            {children}
        </div>
    )
}