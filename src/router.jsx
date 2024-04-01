import { createBrowserRouter } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Perfil from './pages/Perfil';
import Home from "./pages/Home";
import LoginAdminPage from "./pages/LoginAdminpage";

import AdminDashBoard  from "./pages/AdminDashBoard";
import GrupoDetails from "./components/GrupoDetails";







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

    {
        path: '/AdminLogin',
        element: <LoginAdminPage />
    },

    {
        path: '/AdminDashBoard',
        element: <AdminDashBoard />
    },
    {
        path: '/Grupo/:id',
        element: <GrupoDetails />
    },
    
])
