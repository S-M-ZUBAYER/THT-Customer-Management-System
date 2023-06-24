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
import AfterSalesInstruction from "../../components/Pages/AdminPage/AdminDashboard/ProductDetailsOutlet/AfterSalesInstruction";
import Inventory from "../../components/Pages/AdminPage/AdminDashboard/ProductDetailsOutlet/Inventory";
import Invoice from "../../components/Pages/AdminPage/AdminDashboard/ProductDetailsOutlet/Invoice";
import ShowIcons from "../../components/Pages/AdminPage/AdminDashboard/IconsCategory/ShowIcons";
import AdminDashboard from "../../components/Pages/AdminPage/AdminDashboard/AdminDashboard";


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
                element:<PrivateRoute><CustomerService_1></CustomerService_1></PrivateRoute>
            },
            {
                path:"/customer-2",
                element:<PrivateRoute><CustomerService_2></CustomerService_2></PrivateRoute>
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
                element: <Contact></Contact>
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
                path:"/admin/dashboard",
                element:<PrivateRoute><AdminDashboard></AdminDashboard></PrivateRoute>
            },
            {
                path:"/admin/users",
                element:<PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path:"/admin/questionAnswer",
                element:<PrivateRoute><QandA></QandA></PrivateRoute>
            },
            {
                path:"/admin/icon",
                element:<PrivateRoute><AddIcon></AddIcon></PrivateRoute>
            },
                {
                    path:"/admin/icon/:name",
                    element:<PrivateRoute><ShowIcons></ShowIcons></PrivateRoute>
                    },
            {
                path:"/admin/mallProduct",
                element:<PrivateRoute><AddMallProducts></AddMallProducts></PrivateRoute>
            },
            {
                path:"/admin/eventProduct",
                element:<PrivateRoute><EventProducts></EventProducts></PrivateRoute>
            },
            {
                path:"/admin/mallProduct/details/:model",
                element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                children:[
                    {
                        path:"/admin/mallProduct/details/:model/afterSales",
                        element:<PrivateRoute><AfterSales></AfterSales></PrivateRoute>
                    },
                    {
                        path:"/admin/mallProduct/details/:model/inventory",
                        element:<PrivateRoute><Inventory></Inventory></PrivateRoute>
                    },
                    {
                        path:"/admin/mallProduct/details/:model/invoice",
                        element:<PrivateRoute><Invoice></Invoice></PrivateRoute>
                    },
                    {
                        path:"/admin/mallProduct/details/:model/instruction",
                        element:<PrivateRoute><AfterSalesInstruction></AfterSalesInstruction></PrivateRoute>
                    },
                ]
            },
            {
                path:"/admin/eventProduct/details/:model",
                element:<PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                children:[
                    {
                        path:"/admin/eventProduct/details/:model/afterSales",
                        element:<PrivateRoute><AfterSales></AfterSales></PrivateRoute>
                    },
                    {
                        path:"/admin/eventProduct/details/:model/inventory",
                        element:<PrivateRoute><Inventory></Inventory></PrivateRoute>
                    },
                    {
                        path:"/admin/eventProduct/details/:model/invoice",
                        element:<PrivateRoute><Invoice></Invoice></PrivateRoute>
                    },
                    {
                        path:"/admin/eventProduct/details/:model/instruction",
                        element:<PrivateRoute><AfterSalesInstruction></AfterSalesInstruction></PrivateRoute>
                    },
                ]
            },
            {
                path:"/admin/mallProduct/add",
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            },
            {
                path:"/admin/eventProduct/add",
                element:<PrivateRoute><AddProduct></AddProduct></PrivateRoute>
            }
        ]
    }
]
)


