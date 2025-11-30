import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import {  useNavigate } from "react-router"
import { Switcher } from "@/components/ui/switcher"
import { useState } from "react"
import { useAuth } from "@/shared/context"
import  { registrationSchema } from "@/lib/zod/registration.schema"
import { useForm } from "react-hook-form"


type RegistrationSchema = z.infer<typeof registrationSchema>




/**
 * RegistrationForm React Functional Component.
 *
 * A registration form for new users.
 * Features form validation using React Hook Form and Zod schema.
 * Includes nickname, password, confirm password fields, and a switcher for user consent.
 *
 * @component
 * @returns {JSX.Element} The rendered registration form.
 */
export const RegistrationForm: React.FC = () => {

    const [isSwitcherActive, setIsSwitcherActive] = useState<boolean>(false)
    const navigation = useNavigate()
    const {setIsAuth} = useAuth()

    const form = useForm<RegistrationSchema>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            nickname: "",
            password: "",
            confirm: ""
        }
    })

    const onSubmit = (data: RegistrationSchema) => {

        if (!isSwitcherActive) return
        if (data.confirm !== data.password) return

        console.log(data)
        alert("Success!")
        setIsAuth(true)
        navigation("/")
    }


    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-2xl p-4 flex flex-col gap-7">
            <div className="flex flex-col gap-3">
                <Logo/>
                <h1 className="text-2xl font-bold mb-2 text-center">
                🚀 Step Into Your Mini K8S Adventure!
                </h1>
            </div>


            <div className="flex flex-col gap-2">
                <Input {...form.register("nickname")} name="nickname" placeholder="Enter Nickname"/>
                <Input {...form.register("password")} name="password" placeholder="Enter password"/>
                <Input {...form.register("confirm")} name="confirm" placeholder="Confirm password"/>
                <div className="flex gap-2 items-center">
                    <Switcher isActive={isSwitcherActive} setIsActive={setIsSwitcherActive}/>
                    <p className="text-[10px] text-zinc-400">I undestand that it is not a production/enterprise app</p>
                </div>
            </div>

            <div className="flex justify-end  gap-2">
                <Button onClick={() => navigation("/auth/login")} className="">Login</Button>
                <Button type="submit" className="">Submit</Button>
            </div>

        </form>
    )
}