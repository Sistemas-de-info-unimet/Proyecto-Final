import { createBrowserRouter } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Signuppage from './pages/Signuppage';
import Home from './pages/Home'

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

    



])
