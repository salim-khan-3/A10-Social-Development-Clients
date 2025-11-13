import { createBrowserRouter } from "react-router";
import MainLayouts from "../MainLayouts/MainLayouts";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Register/Register";
import Login from "../Pages/Login/Login";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import PrivateRoute from "../PrivateRoutes/PrivateRoutes";
import ManageEvents from "../Pages/ManageEvents/ManageEvents";
import JoinedEvents from "../Pages/JoinedEvents/JoinedEvents";
import UpcomingEvents from "../Pages/UpcomingEvents/UpcomingEvents";
import EventDetails from "../Pages/EventDetails/EventDetails";
import UpdateEvent from "../Pages/UpdateEvent/UpdateEvent";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:"register",
        Component:Register
      },
      {
        path:"login",
        Component:Login
      },
      {
        path:"create",
        element:
        <PrivateRoute>
          <CreateEvent></CreateEvent>
        </PrivateRoute>
      },
      {
        path:"manage",
        element:
        <PrivateRoute>
          <ManageEvents></ManageEvents>
        </PrivateRoute>,
      },
      {
        path:"join",
        element:
        <PrivateRoute>
          <JoinedEvents></JoinedEvents>
        </PrivateRoute>
      },
      {
        path:"upcoming",
        loader:()=> fetch("https://social-developments-server.vercel.app/events"),
        Component:UpcomingEvents
      },
      {
        path:"/eventdetails/:id",
        Component:EventDetails
      },
      {
        path:"/updateevent/:id",
        Component:UpdateEvent,
        loader:({params})=> fetch(`https://social-developments-server.vercel.app/events/${params.id}`)
      },
      {
        path:"forgetpassword",
        Component: ForgetPassword
      }
    ]
  },
]);