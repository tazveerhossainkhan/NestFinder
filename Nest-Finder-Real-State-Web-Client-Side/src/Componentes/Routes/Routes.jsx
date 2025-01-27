import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/User/Home/Home";
import Login from "../Pages/Shared/Navbar/NavItems/Login";
import Register from "../Pages/Shared/Navbar/NavItems/Register";
import Dashboard from "../Pages/Shared/Navbar/NavItems/Dashboard";
import ErrorPage from "../Pages/Shared/ErrorPage";
import MyProfile from "../Pages/User/MyProfile/MyProfile";
import DashboardLayout from "../Layout/DashboardLayout";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import ManageProperties from "../Pages/Admin/Mange Properties/ManageProperties";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import Wishlist from "../Pages/User/Wishlist/Wishlist";
import AgentProfile from "../Pages/Agent/Agent Profile/AgentProfile";
import AddProperty from "../Pages/Agent/Add Property/AddProperty";
import MyAddedProperties from "../Pages/Agent/My Added Property/MyAddedProperties";
import PropertyDetails from "../Pages/User/PropertyDetails/PropertyDetails";
import AllProperties from "../Pages/Shared/Navbar/NavItems/AllProperties";
import AdminRoute from "./AdminRoute";
import PrivateRoutes from "./PrivateRoutes";
import MakeOffer from "../Pages/User/MakeOffer/MakeOffer";
import PropertyBought from "../Pages/User/PropertyBought/PropertyBought";
import RequestedProperties from "../Pages/Agent/Requested Properties/RequestedProperties"
import AddReview from "../Pages/User/AddReview/AddReview";
import ManageReviews from "../Pages/Admin/Manage Reviews/ManageReviews";
import MyReview from "../Pages/User/MyReview/MyReview";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
            },
            {
                path: '/propertyDetails/:id',
                element: <PrivateRoutes><PropertyDetails></PropertyDetails></PrivateRoutes>,
                loader: ({params}) => fetch(`https://nest-finder-server.vercel.app/propertyDetails/${params.id}`)
            },
            {
                path: '/allProperties',
                element: <PrivateRoutes><AllProperties></AllProperties></PrivateRoutes>
            },

        ]
    },

    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            //user
            {
                path: '/dashboard/myProfile',
                element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
            },
            {
                path: '/dashboard/wishlist',
                element: <PrivateRoutes><Wishlist></Wishlist></PrivateRoutes>
            },
            {
                path: '/dashboard/myReviews',
                element: <PrivateRoutes><MyReview></MyReview></PrivateRoutes>
            },
            {
                path: '/dashboard/makeOffer/:id',
                element: <PrivateRoutes><MakeOffer></MakeOffer></PrivateRoutes>,
                loader: ({params}) => fetch(`https://nest-finder-server.vercel.app/wishlist/${params.id}`)
            },
            {
                path: '/dashboard/addReview/:id',
                element: <PrivateRoutes><AddReview></AddReview></PrivateRoutes>,
                loader: ({params}) => fetch(`https://nest-finder-server.vercel.app/propertyReview/${params.id}`)
            },
            {
                path: '/dashboard/propertyBought',
                element: <PrivateRoutes><PropertyBought></PropertyBought></PrivateRoutes>
            },

            //admin
            {
                path: '/dashboard/manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: '/dashboard/adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: '/dashboard/manageProperties',
                element: <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
            },
            {
                path: '/dashboard/manageReviews',
                element: <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
            },
            
            //agent
            {
                path:'/dashboard/agentProfile',
                element: <PrivateRoutes><AgentProfile></AgentProfile></PrivateRoutes>
            },
            {
                path: '/dashboard/addProperty',
                element: <PrivateRoutes><AddProperty></AddProperty></PrivateRoutes>
            },
            {
                path: '/dashboard/myAddedProperties',
                element:  <PrivateRoutes><MyAddedProperties></MyAddedProperties></PrivateRoutes>
            },
            {
                path: '/dashboard/requestedProperties',
                element: <PrivateRoutes><RequestedProperties></RequestedProperties></PrivateRoutes>
            }

        ]
    }
]);
export default router;