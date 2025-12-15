import { createBrowserRouter, RouterProvider } from "react-router";
import LandingPage from "../pages/LandinPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgetPasswordPage from "../pages/auth/ForgetPasswordPage";
import UserLayoutPage from "../pages/layout/UserLayoutPage";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import { UserRole } from "./constants";
import CustomerDashboard from "../pages/dashboard/CustomerDashboard";
import { Toaster } from "sonner";
import ActivateUser from "../components/auth/ActivateUser";
import AuthLayoutPage from "../pages/layout/AuthLayoutPage";
import NotFound from "../components/error/NotFound";
import ChatListPage from "../pages/chat/ChatListPage";
import  { UserLayoutProvider } from "../context/UserLayoutContext";
import UserProfilePage from "../UserProfile/UserProfile";


const router = createBrowserRouter([
    {
        path: "/", Component: AuthLayoutPage,
        children: [
            {
                index: true, Component: LandingPage,
                handle: {
                    title: "Login Page",
                    subtitle: "Guff Chautari",
                    description: "For testing: user1@gmail.com, pswd: User1#00 and user2@gmail.com, pswd: User2#00"
                }
            },
            {
                path: "register", element: <RegisterPage />,
                handle: {
                    title: "Register Now",
                    subtitle: "New to Parbat Delight?",
                    description: "Chat freely, connect deeply, and enjoy a smooth, friendly experience with every message."
                }
            },
            {
                path: "activate/:token", Component: ActivateUser,
                handle: {
                    title: "Welcome Back",
                    subtitle: "Hop op!!!",
                    description: "Chat freely, connect deeply, and enjoy a smooth, friendly experience with every message."
                }
            },
            {
                path: "forget-password", element: <ForgetPasswordPage />, handle: {
                    title: "You got stuck?",
                    subtitle: "Request to reset!!!",
                    description: "Chat freely, connect deeply, and enjoy a smooth, friendly experience with every message.",
                }
            },

        ]
    },

    {
        path: "/admin", element: <UserLayoutProvider><UserLayoutPage role={UserRole.ADMIN} /></UserLayoutProvider>,
        children: [
            { index: true, element: <AdminDashboard /> },
            {path:"me", element:<UserProfilePage/>},
            {path: "chat", element: <ChatListPage/>},

            { path: "*", element: <NotFound redirect="/admin" /> }
        ]
    },
    {
        path: "/customer", element: <UserLayoutProvider><UserLayoutPage role={UserRole.CUSTOMER} /></UserLayoutProvider>, children: [
            { index: true, element: <CustomerDashboard /> },
            {path:"me", element:<UserProfilePage/>},
            {path: "chat", element: <ChatListPage/>},
        ]
    },
    {
        path: "*", element: <NotFound redirect="/" />
    }
])
const RouterConfig = () => {
    return <>
        
            <Toaster position="top-right" richColors closeButton />
            <RouterProvider router={router} />
        
    </>
}
export default RouterConfig; 