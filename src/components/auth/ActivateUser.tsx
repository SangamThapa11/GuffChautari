import { Spin } from "antd"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import authSvc from "../../services/auth.service"
import { toast } from "sonner"

const ActivateUser = () => {
    const params = useParams()
    const navigate = useNavigate();

    const activateUserProfile = async() => {
        try {
            await authSvc.activateUserProfile(params.token as string)
            toast.success("Thank you for registering!!!", {
                description: "Your account has been activated successfully, Please Login to continue..."
            })

        }catch{
            toast.error("Error while activation!!!", {
                description: "Sorry! Try Again"
            })
        } finally {
            navigate("/")
        }
    }

    useEffect(() => {
        activateUserProfile()
    }, []) 
    return (<>
    <div className="flex h-96 w-full">
        <Spin fullscreen />
    </div>
    </>)
}

export default ActivateUser