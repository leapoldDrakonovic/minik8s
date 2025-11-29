import { Outlet } from "react-router"
import { Sidebar } from "../components/sidebar"


/**
 * Layout component sets up the main structure of the application with a header,
 * content area (rendered by react-router's Outlet), and a sidebar on the right.
 */
export const Layout: React.FC = () => {
    return (
        <main>
            {/* Main content and sidebar are arranged horizontally */}
            <div className="flex flex-row">
                {/* Content area, takes up 80% width and has a border */}
                <div className="w-full overflow-y-scroll">
                    <Outlet/>
                </div>
                {/* Sidebar on the right */}
                <Sidebar/>
            </div>
        </main>
    )
}
