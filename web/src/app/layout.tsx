import { Outlet } from "react-router"
import { Sidebar } from "../components/sidebar"
import { Header } from "../components/header"


export const Layout: React.FC = () => {


    return (
        <main>

            <Header/>
            <div className="flex flex-row gap-4">
                <div className="w-[80%] border-2 ">
                    <Outlet/>
                </div>
                <Sidebar/>
            </div>

        </main>
    )
}