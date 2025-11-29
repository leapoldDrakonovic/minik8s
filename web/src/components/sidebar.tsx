import { Box, LayoutDashboard, PackageOpen, ServerIcon, Settings, User } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

interface INavigationLink {
    path: string;
    icon?: React.ReactNode;
    title: string;
}

const NAVIGATION_LINKS: INavigationLink[] = [
    {
        path: "/",
        title: "Overview",
        icon: <LayoutDashboard/>
    },
    {
        path: "/services",
        title: "Services",
        icon: <ServerIcon/>
    },
    {
        path: "/nodes",
        title: "Nodes",
        icon: <PackageOpen />
    },
    {
        path: "/pods",
        title: "Pods",
        icon: <Box/>
    }
]

interface INavigationLinkProps {
    data: INavigationLink
}

type TNavigationLinkComponent = React.FC<INavigationLinkProps>

const NavigationLink: TNavigationLinkComponent = ({data}) => {
    return (
        <li className="hover:bg-blue-400 duration-100 transition-all hover:text-white rounded-2xl">
            <Link to={data.path} className="">
                <div className="flex gap-2 py-5 ml-14">
                    {data.icon}
                    <span>{data.title}</span>
                </div>
            </Link>
        </li>
    )
}


const Logo: React.FC = () => {

    return (
        <div className="flex justify-center items-center gap-6">
            <div className="bg-blue-400 rounded-lg w-10 h-10 flex justify-center items-center">
                <ServerIcon color="white"/>
            </div>
            <span className="font-bold text-xl">mini K8S</span>
        </div>
    )
}


export const Sidebar: React.FC = () => {


    return (
        <aside className="w-1/4 text-white bg-slate-900 h-svh py-4 flex flex-col">
            <Logo/>
            <ul className="w-3/4 m-auto flex flex-col gap-0.5 mt-10">
            {NAVIGATION_LINKS.map(el => (
                <NavigationLink data={el} key={el.title}/>
            ))}
            </ul>
            <div className="mt-auto flex w-full items-end">
                <UserSettings/>
            </div>
        </aside>
    )

}

const UserSettings: React.FC = () => {

    return (
        <div className="w-full flex gap-2 justify-end px-2">
            <Button>
                <User/>
            </Button>
            <Button>
                <Settings/>
            </Button>
        </div>
    )

}