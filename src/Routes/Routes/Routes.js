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

export const routes=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
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
            {
                path:"/admin",
                element:<Admin></Admin>
            },
            {
                path:"account",
                element:<Account></Account>
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
    }
])