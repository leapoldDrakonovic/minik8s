import { Outlet } from "react-router"
import { Sidebar } from "../components/sidebar"
import { AuthGuard } from "@/shared/hoc/auth.guard"


/**
 * Layout component sets up the main structure of the application with a header,
 * content area (rendered by react-router's Outlet), and a sidebar on the right.
 */
export const Layout: React.FC = () => {
    return (
        <main>
            <AuthGuard>
            {/* Main content and sidebar are arranged horizontally */}
            <div className="flex flex-row">
                {/* Content area, takes up 80% width and has a border */}
                <div className="w-full overflow-y-scroll">
                    <Outlet/>
                </div>
                {/* Sidebar on the right */}
                <Sidebar/>
            </div>
            </AuthGuard>
        </main>
    )
}


/**
 * AuthLayout is a wrapper component tailored for authentication-related pages.
 * It centers its children both vertically and horizontally within the viewport,
 * and renders the content via react-router's Outlet.
 *
 * This layout is best suited for login, registration, and other auth flows that need to be
 * presented distinctly from the main application layout.
 *
 * @component
 */
export const AuthLayout: React.FC = () => {
    return (
        <main>
            <div className="min-h-svh w-full flex justify-center items-center ">
                <Outlet/>
            </div>
        </main>
    )
}