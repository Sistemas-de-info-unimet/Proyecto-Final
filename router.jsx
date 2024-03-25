import { createBrowserRouter } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Perfil from './pages/Perfil';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Loginpage />
    },

    {
        path: '/SignUp',
        element: <Signuppage />
    },

    {
        path: '/Perfil',
        element: <Perfil />
    },

])
