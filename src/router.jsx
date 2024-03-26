
import { createBrowserRouter } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Perfil from './pages/Perfil';


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
        path: '/Home',
        element: <Home />
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
