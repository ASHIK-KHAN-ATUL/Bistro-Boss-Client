import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import OrderFood from "../Pages/OrderFood/OrderFood/OrderFood";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUP/SignUp";
import Secret from "../Pages/Shared/Secret/Secret";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../Layouts/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import Reservation from "../Pages/Dashboard/Reservation/reservation";
import AddReview from "../Pages/Dashboard/AddReview/AddReview";
import Bookings from "../Pages/Dashboard/Bookings/Bookings";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import MangeItems from "../Pages/Dashboard/MangeItems/MangeItems";
import ManageBookings from "../Pages/Dashboard/ManageBookings/ManageBookings";
import AdminRoutes from "./AdminRoutes";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'/menu',
          element:<Menu></Menu>
        },
        {
          path:'/orderFood/:category',
          element:<OrderFood></OrderFood>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path:'/secret',
          element:<PrivetRoute><Secret></Secret></PrivetRoute>
        }
      ]
    },
    {
      path:'dashboard',
      element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children:[
        {
          path:'userHome',
          element: <UserHome></UserHome>
        },
        {
          path:'reservation',
          element: <Reservation></Reservation>
        },
        {
          path:'review',
          element: <AddReview></AddReview>
        },
        {
          path:'bookings',
          element: <Bookings></Bookings>
        },
        {
          path:'cart',
          element: <Cart></Cart>
        },
        {
          path: 'payment',
          element: <Payment></Payment>
        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },


        // Admin Routes
        {
          path:'adminHome',
          element: <AdminRoutes><AdminHome></AdminHome></AdminRoutes>
        },
        {
          path:'addItems',
          element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
        },
        {
          path:'manageItems',
          element: <AdminRoutes><MangeItems></MangeItems></AdminRoutes>
        },
        {
          path:'updateItem/:id',
          element: <AdminRoutes><UpdateItem></UpdateItem></AdminRoutes>,
          loader: ({params}) => fetch(`https://bistro-boss-server-tau-ten.vercel.app/menu/${params.id}`)
        },
        {
          path:'manageBookings',
          element: <AdminRoutes><ManageBookings></ManageBookings></AdminRoutes>
        },
        {
          path:'allUsers',
          element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
        },
      ]
    }
  ]);