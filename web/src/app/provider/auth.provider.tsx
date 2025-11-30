import { AuthContext } from "@/shared/context"
import { useState } from "react"


interface IAuthProviderProps {
    children: React.ReactNode
}


/**
 * AuthProvider is a React Context provider component that supplies authentication state
 * and user information to its child components. It uses the AuthContext to make the following available:
 * 
 * - `isAuth`: Boolean indicating if a user is authenticated.
 * - `setIsAuth`: Setter function to update the authentication state.
 * - `user`: The current user's data.
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - The child components that will have access to the AuthContext.
 * @returns {JSX.Element} The provider wrapping its children with authentication context.
 */

export const AuthProvider: React.FC<IAuthProviderProps> = ({children}) => {

    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [user, setUser] = useState<any>({name: "Egor"})
    
    const value = {
        isAuth,
        setIsAuth,
        user,
        setUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}