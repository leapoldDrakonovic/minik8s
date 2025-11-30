import { ServerIcon } from "lucide-react"


/**
 * Logo component renders the application's logo with an icon and title.
 *
 * @component
 * @example
 * return (
 *   <Logo />
 * )
 */
export const Logo: React.FC = () => {

    return (
        <div className="flex justify-center items-center gap-6">
            <div className="bg-blue-400 rounded-lg w-10 h-10 flex justify-center items-center">
                <ServerIcon color="white"/>
            </div>
            <span className="font-bold text-xl">mini K8S</span>
        </div>
    )
}
