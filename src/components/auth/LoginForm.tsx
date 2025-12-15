import { Flex } from "antd";
import { useForm } from "react-hook-form";
import { EmailInput, PasswordInput } from "../form/input";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import authSvc from "../../services/auth.service";
import { useNavigate } from "react-router";
import { useAuth, type UserProfile } from "../../context/AuthContext";

export interface ICredentials {
    email: string;
    password: string;
}
const LoginDTO = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
})

const LoginForm = () => {
    const {setLoggedInUser} = useAuth()
    const navigate = useNavigate()
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ICredentials>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(LoginDTO)
    })
    const SubmitForm = async (credentials: ICredentials) => {
        try {
            const response = await authSvc.loginUser(credentials)
            localStorage.setItem("token_43", response.data.accessToken)
            localStorage.setItem("refresh_43", response.data.refreshToken)

            const LoggedInUser = await authSvc.getLoggedInUser()
            setLoggedInUser(LoggedInUser.data as UserProfile) 
            
            toast.success("Welcome to" +LoggedInUser.data.role+ "Panel....", {
                description: "You are now accessing "+ LoggedInUser.data.role+ "Panel..."
            })
            navigate('/'+LoggedInUser.data.role)

        } catch {
            toast.error("Error while Login!!", {
                description: "Check your credentials."
            })
        }
    }

    return (<>
        <form onSubmit={handleSubmit(SubmitForm)} action="" className="flex flex-col gap-5">
            <Flex>
                <label htmlFor="email" className="w-2/5 text-lg font-semibold font-mono hover:cursor-pointer transition hover:scale-96">Email :</label>
                <Flex className="w-4/5 flex flex-col">
                    <EmailInput name="email" control={control} errMsg={errors?.email?.message} />
                </Flex>
            </Flex>

            <Flex>
                <label htmlFor="password" className="w-2/5 text-lg font-semibold font-mono hover:cursor-pointer transition hover:scale-96">Password :</label>
                <Flex className="w-4/5 flex flex-col">
                    <PasswordInput name="password" control={control} errMsg={errors?.password?.message} />
                </Flex>
            </Flex>

            <div className="flex w-full justify-end">
                <a href="/forget-password" className="font-semibold text-amber-50 hover:cursor-pointer hover:text-shadow-blue-700 hover:font-normal transition hover:scale-95">🤔 Forget Password? 🧐</a>
            </div>

            <div className="flex w-full">
                <div className="flex w-2/5"></div>
                <div className="flex w-3/5 gap-5">
                    <button type="reset" onClick={() => reset()} disabled={isSubmitting} className="disabled:bg-red-800/30 disabled:cursor-not-allowed w-full font-semibold font-mono bg-red-800 py-2 text-white rounded-lg hover:bg-red-900 transition hover:cursor-pointer hover:scale-96">Reset</button>
                    <button type="submit" disabled={isSubmitting} className="disabled:bg-red-800/30 disabled:cursor-not-allowed w-full font-semibold font-mono bg-blue-800 py-2 text-white rounded-lg hover:bg-blue-950 transition hover:cursor-pointer hover:scale-96">Login</button>
                </div>
            </div>
        </form>
    </>)
}

export default LoginForm; 