import { createBrowserRouter } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Perfil from './pages/Perfil';
import Home from "./pages/Home";


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
        path: '/Home',
        element: <Home />
    },

    {
        path: '/Profile',
        element: <Perfil />
    },

])
