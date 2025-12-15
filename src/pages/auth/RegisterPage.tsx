import logo from "../../assets/images/chatlogo.jpg";
import { PageTitle } from "../../components/PageSection";
import RegisterFormComponent from "../../components/auth/RegisterForm";


const RegisterPage = () => {
 

  return (
    <>
      <div className="flex w-full h-screen">
        {/* LEFT SECTION WITH IMAGE */}
        
          {/* SCROLLABLE FORM CONTAINER */}
          <div className="w-full lg:w-5/5 h-screen overflow-y-auto bg-transparent brightness-140">
            <div className="flex flex-col gap-5 mt-10 border border-green-50 bg-white/20 mx-2 lg:mx-10 shadow-lg p-5 rounded-xl">

              {/* LOGO FOR SMALL SCREEN */}
              <div className="flex lg:hidden justify-center">
                <img src={logo} alt="logo image" className="w-24 rounded-full" />
              </div>

              <PageTitle title="Register Here!!" className="text-blue-900 text-center" />

              {/* FORM */}
              <RegisterFormComponent/>

              {/* Divider */}
              <span className="flex items-center">
                <span className="h-px flex-1 bg-black"></span>
                <span className="px-4 text-black font-bold"> OR </span>
                <span className="h-px flex-1 bg-black"></span>
              </span>

              {/* Login Link */}
              <p className="text-sm italic text-center">
                Already have an account?{" "}
                <a href="/" className="text-blue-700 font-bold hover:underline">
                  Login Here
                </a>
              </p>
            </div>
          </div>

      </div>
    </>
  );
};

export default RegisterPage;
