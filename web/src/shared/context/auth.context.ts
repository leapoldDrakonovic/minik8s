import { createContext, useContext, type Dispatch, type SetStateAction } from "react";



/**
 * Interface representing the shape of the authentication context.
 * 
 * @property {boolean} isAuth - Indicates if the user is authenticated.
 * @property {Dispatch<SetStateAction<boolean>>} setIsAuth - Setter function to update authentication status.
 * @property {any} user - The current authenticated user's data.
 */
interface IAuthContext {
    isAuth: boolean;
    setIsAuth: Dispatch<SetStateAction<boolean>>;
    user: any
    setUser: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const useAuth = (): IAuthContext => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("[CONTEXT ERROR] Auth context doesnt exist")
    }
    return context
}