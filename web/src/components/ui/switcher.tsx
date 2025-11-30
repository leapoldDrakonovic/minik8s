import { cn } from "@/lib/utils";

interface ISwitcherProps {
    isActive: boolean;
    setIsActive: (active: boolean) => void
}

type TSwitherComponent = React.FC<ISwitcherProps>

/**
 * Switcher component props.
 * @typedef {Object} ISwitcherProps
 * @property {boolean} isActive - Whether the switcher is currently active (on/off state).
 * @property {(active: boolean) => void} setIsActive - Function to update the active state.
 */

/**
 * React functional component type for Switcher.
 * @typedef {React.FC<ISwitcherProps>} TSwitherComponent
 */
export const Switcher: TSwitherComponent = (props) => {
    const {isActive, setIsActive} = props;

    const onHandleClick = () => setIsActive(!isActive)

    return (
        <div
            onClick={onHandleClick}
            className={cn(
                "border cursor-pointer h-4 rounded-full w-8 relative  transition-colors duration-200",
                isActive ? "bg-blue-300" : "bg-gray-200"
            )}
        >
            <div
                className={
                    cn(
                        "bg-blue-400 border-blue-700 rounded-full absolute top-1/2 -translate-y-1/2 h-4 w-4 transition-all duration-200",
                        isActive ? "left-4" : "left-0"
                    )
                }
            />
        </div>
    )
}