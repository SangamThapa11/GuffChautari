import image from "../../assets/images/scooter.avif"
import AuthSidePanel from "../../components/auth/AuthSidePanel"
import { Navigate, Outlet, useMatches } from "react-router"
import { useAuth } from "../../context/AuthContext"

export interface IAuthOutletContextType{
    title: string,
    subtitle?: string | null | undefined,
    description: string 
}
const AuthLayoutPage = () => {
    const {loggedInUser} = useAuth()
    const matches = useMatches()
    const currentHandle = matches.reverse().find((matchData) => matchData.handle)?.handle as IAuthOutletContextType
    console.log(currentHandle)
   
    if(loggedInUser) {
        return <Navigate to={'/' + loggedInUser.role} />
    } else {
         return (<>
     <div className="flex w-full h-screen">
                <div
                    className="flex items-center justify-center w-full lg:w-2/3 h-screen bg-cover bg-center bg-no-repeat brightness-80"
                    style={{ backgroundImage: `url(${image})` }}>
                    <div className="w-full lg:w-2/3 bg-transparent h-screen brightness-100">
                        <Outlet context={currentHandle} />
                    </div>
                </div>

                <div className="hidden lg:flex w-1/3  bg-blue-950">
                    <AuthSidePanel
                        {...currentHandle}
                    />
                </div>
            </div>
    </>)
    }
   
}
export default AuthLayoutPage