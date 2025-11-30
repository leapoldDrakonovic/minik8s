import { RouterProvider } from "react-router"
import { router } from "./router/router"
import { AuthProvider } from "./provider/auth.provider"


export const App: React.FC = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>    
        </AuthProvider>
    )
}