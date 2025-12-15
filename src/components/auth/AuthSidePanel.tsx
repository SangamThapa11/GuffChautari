import logo from "../../assets/images/chatlogo.jpg"

interface IAuthSidePanelProps {
  title: string, 
  subtitle?: string | undefined | null, 
  description: string
}
const AuthSidePanel = ({title, subtitle, description}: Readonly<IAuthSidePanelProps>) => {
    return (<>
        <div className="flex flex-col gap-10 justify-center items-center w-full">
            <img src={logo} alt="" className="w-40 rounded-full "></img>
            <div className="flex flex-col gap-7 text-center">
                <h1 className="text-white text-5xl font-extrabold font-serif">{title}</h1>
                <h1 className="text-white text-3xl font-extrabold font-serif">{subtitle}</h1>
                <p className="text-white mx-5 text-1xl font-semibold font-sans">{description}</p>
            </div>
        </div>
    </>)
}

export default AuthSidePanel
