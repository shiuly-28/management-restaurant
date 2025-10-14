import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import RootLayOut from '../layOut/RootLayOut';
import Home from '../Pages/Home';
import Gallery from '../Pages/Gallery';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import FoodPage from '../Pages/FoodPage';
import AllFoods from '../Pages/AllFoods';

import FoodPurchase from '../Pages/FoodPurchase';
import PrivateRoute from '../context/PrivateRoute';
import MyFoodUpdated from '../Pages/MyFoodUpdated';
import Error404 from '../Pages/Error404';
import DashboardLayOut from '../layOut/DashboardLayOut';
import DashboardHome from '../Dashboard/DashboardHome';
import MyProfile from '../Dashboard/MyProfile';
import AddFood from '../Dashboard/AddFood';
import MyFood from '../Dashboard/myFood';
import MyOrders from '../Dashboard/MyOrders';


// import Testimonials from '../Pages/Testimonials';



const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayOut></RootLayOut>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },

            {
                path: 'gallery',
                element: <Gallery></Gallery>
            },
            {
                path: '/allFoods',
                element: <AllFoods></AllFoods>
            },

            {
                path: '/foodPage/:id',
                element: <FoodPage></FoodPage>,
                loader: ({ params }) => fetch(`https://assignment-11-server-resturent.vercel.app/resturent/${params.id}`)
            },
            {
                path: '/foodPurchase/:id',
                element: <PrivateRoute>
                    <FoodPurchase></FoodPurchase>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment-11-server-resturent.vercel.app/resturent/${params.id}`, { credentials: 'include' })
            },

            {
                path: '/myFoodUpdated/:id',
                element: <PrivateRoute>
                    <MyFoodUpdated></MyFoodUpdated>
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://assignment-11-server-resturent.vercel.app/resturent/${params.id}`),
            },



        ]

    },
    {
        path: "/dashboard",
        element: <PrivateRoute>
            <DashboardLayOut></DashboardLayOut>
        </PrivateRoute>,
        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path: "myProfile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "addFood",
                element: <AddFood></AddFood>
            },
            {
                path: 'myFood',

                element:
                    <MyFood></MyFood>


            },
            {
                path: "myOrders",
                element: <PrivateRoute>
                    <MyOrders></MyOrders>
                </PrivateRoute>
            },

        ]
    },
    {
        path: '/*',
        element: <Error404></Error404>
    }
]);


export default router;