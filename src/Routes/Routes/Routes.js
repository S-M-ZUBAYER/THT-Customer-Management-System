import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Mainpage/Main";
import ErrorPage from "../../components/Pages/ErrorPage/ErrorPage";
import Home from "../../components/Pages/HomePage/Home";
import Admin from "../../components/Pages/AdminPage/Admin";
import Account from "../../components/Pages/Accountpage/Account";
import Contact from "../../components/Pages/ContactPage/Contact";
import Login from "../../components/Pages/LoginPage/Login";
import Register from "../../components/Pages/RegisterPage/Register";
import CustomerService_1 from "../../components/Pages/CustomerServicePage/CustomerService_1";
import CustomerService_2 from "../../components/Pages/CustomerServicePage/CustomerService_2";
import AllUsers from "../../components/Pages/AdminPage/AdminDashboard/AllUsers";
import QandA from "../../components/Pages/AdminPage/AdminDashboard/QandA";
import AddIcon from "../../components/Pages/AdminPage/AdminDashboard/AddIcon";
import AddMallProducts from "../../components/Pages/AdminPage/AdminDashboard/MallProducts";
import EventProducts from "../../components/Pages/AdminPage/AdminDashboard/EventProducts";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ProductDetails from "../../components/Pages/AdminPage/AdminDashboard/ProductDetails";
import AddProduct from "../../components/Pages/AdminPage/AdminDashboard/AddProduct";
import AfterSales from "../../components/Pages/AdminPage/AdminDashboard/ProductDetailsOutlet/AfterSales";

export const routes=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/home",
                element:<Home></Home>
            },
            {
                path:"/customer-1",
                element:<CustomerService_1></CustomerService_1>
            },
            {
                path:"/customer-2",
                element:<CustomerService_2></CustomerService_2>
            },
            // {
            //     path:"/admin",
            //     element:<Admin></Admin>
            // },
            {
                path:"account",
                element:<PrivateRoute><Account></Account></PrivateRoute>
            },
            {
                path:"contact",
                element:<Contact></Contact>
            },
            {
                path:"login",
                element:<Login></Login>
            },
            {
                path:"register",
                element:<Register></Register>
            }
        ]
    },
    {
        path:"/admin",
        element:<PrivateRoute><Admin></Admin></PrivateRoute>
        ,
        children:[
            {
                path:"/admin/users",
                element:<AllUsers></AllUsers>
            },
            {
                path:"/admin/questionAnswer",
                element:<QandA></QandA>
            },
            {
                path:"/admin/icon",
                element:<AddIcon></AddIcon>
            },
            {
                path:"/admin/mallProduct",
                element:<AddMallProducts></AddMallProducts>
            },
            {
                path:"/admin/eventProduct",
                element:<EventProducts></EventProducts>
            },
            {
                path:"/admin/mallProduct/details/:model",
                element:<ProductDetails></ProductDetails>
            },
            {
                path:"/admin/eventProduct/details/:model",
                element:<ProductDetails></ProductDetails>,
                children:[
                    {
                        path:"admin/eventProduct/details/:model/afterSales",
                        element:<AfterSales></AfterSales>
                    }
                ]
            },
            {
                path:"/admin/mallProduct/add",
                element:<AddProduct></AddProduct>
            },
            {
                path:"/admin/eventProduct/add",
                element:<AddProduct></AddProduct>
            }
        ]
    }
])