import type { RouteObject } from "react-router";
import { MainPage } from "../../page/main";
import { Layout } from "../layout";


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
    }
]