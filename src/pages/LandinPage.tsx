import logo from "../assets/images/chatlogo.jpg"
import { PageTitle } from "../components/PageSection";
import LoginForm from "../components/auth/LoginForm";
import HorizontalDivider from "../components/divider/HorizontalDivider";
const LandingPage = () => {
    return (
        <>
            <div className="flex w-full h-screen">
                
                    <div className="w-full lg:w-5/5 bg-transparent h-screen brightness-100">
                        <div className="flex flex-col gap-10 mt-10 lg:mt-40 border border-green-50 bg-white/20 mx-2 lg:mx-10 shadow-lg p-5">
                            <div className="flex lg:hidden justify-center">
                                <img src={logo} alt="logo image" className="w-25 rounded-full" />
                            </div>
                            <PageTitle title="Sign In Here!!" className="text-blue-950 text-center" />
                            <HorizontalDivider dividerText="" />
                            <LoginForm /> 
                            
                            <HorizontalDivider dividerText="Or"/>

                            <p className="text-sm italic font-serif text-center">
                                Don't have an account? {"    "}<a href="/register" className="text-blue-700 font-bold hover:cursor-pointer hover:text-blue-400 hover:underline transition hover:scale-96">Register Here</a>
                            </p>
                        </div>
                    </div>

            </div>
        </>
    )
}

export default LandingPage; 