import { Navigate } from "react-router"
import { useAuth } from "../context"

interface IAuthGuard {
    children?: React.ReactNode
}

type TAuthGuardCompoennt = React.FC<IAuthGuard>

/**
 * Higher-Order Component (HOC) for protecting routes that require authentication.
 *
 * The `AuthGuard` component wraps its children and checks if the user is authenticated
 * via the `useAuth` context. If the user is not authenticated, it redirects to the
 * authentication page (`/auth`). If the user is authenticated, it renders its children.
 * 
 * @component
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to render if authenticated.
 * @returns {React.ReactNode} The rendered children if authenticated, otherwise a redirect.
 */

export const AuthGuard: TAuthGuardCompoennt = ({children}) => {
    const {isAuth} = useAuth()
    if (!isAuth) return <Navigate to={"/auth"}/>
    return children
}