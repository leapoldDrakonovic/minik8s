import { Logo } from "@/components/logo"
import { Link } from "react-router"

export const AuthPage: React.FC = () => {

    return (
        <div className="bg-white rounded-xl p-4 flex flex-col gap-4">
          <Logo/>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold mb-2 text-center">Welcome to mini K8S!</h1>
            <p className="text-gray-600 max-w-md text-[12px]">
              Mini K8S is a lightweight platform to help you manage your containers, pods, and services with ease. Use this project to visualize and control your resources in a simplified Kubernetes-like environment.
            </p>
          </div>
          <div className="w-full flex gap-2">
            <Link className="bg-blue-400 text-center text-blue-800 p-2 rounded uppercase font-semibold w-full" to={"/auth/login"}>Login</Link>
            <Link className="bg-blue-200 text-center text-blue-800 p-2 rounded uppercase font-semibold w-full" to={"/auth/registration"}>Registration</Link>
          </div>
        </div>
    )
}

