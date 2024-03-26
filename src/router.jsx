
import { createBrowserRouter } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import LoginAdminpage from './pages/LoginAdminpage'


export const router = createBrowserRouter([
    {
        path: '/LogIn',
        element: <Loginpage />
    },

    {
        path: '/',
        element: <Home />
    },

    {
        path: '/SignUp',
        element: <Signuppage />
    },

    {
        path: '/Profile',
        element: <Perfil />
    },
    {
        path: '/LogInAdmin',
        element: <LoginAdminpage />
    },



])
