import { Search } from "lucide-react"
import { Input } from "./ui/input"


export const Header: React.FC = () => {


    return (
        <header className="w-full border-2 flex justify-between items-center px-2">
            <HeaderSearchInput/>
            <h2 className="font-bold text-xl">
                MINIK8S
            </h2>
        </header>
    )
}

const HeaderSearchInput: React.FC = () => {


    return (
        <div className="relative">
            <Search className="absolute  left-1 top-1/2 -translate-y-1/2 "/>
            <Input className="pl-10 w-52"/>
        </div>
    )
}