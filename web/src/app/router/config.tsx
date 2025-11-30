import type { RouteObject } from "react-router";
import { AuthLayout, Layout } from "../layout";
import { AuthPage, LoginPage, MainPage, RegistrationPage } from "@/page";
import { APP_ROUTES } from "@/shared/config";


export const ROUTES: RouteObject[] = [
    {
        path: "*",
        element: <Layout/>,
        children: [
            {
                path: "*",
                element: <MainPage/>
            }
        ]
    },
    {
        path: APP_ROUTES.AUTH.ROOT,
        element: <AuthLayout/>,
        children: [
            {
                path: "",
                element: <AuthPage/>
            },
            {
                path: APP_ROUTES.AUTH.LOGIN,
                element: <LoginPage/>
            },
            {
                path: APP_ROUTES.AUTH.REGISTRATION,
                element: <RegistrationPage/>
            }
        ]
    }
]