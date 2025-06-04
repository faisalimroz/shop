
import {
    createBrowserRouter
} from "react-router-dom";
import Layout from "../Layout/Layout";
import AuthLayout from "../Layout/AuthLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/SignUp/SignUp";
import ShopDashboard from "../Pages/ShopDashboard/ShopDashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop-dashboard',
                element: <ShopDashboard />
            },
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/signin',
                element: <Login />
            }
        ]
    }
]);