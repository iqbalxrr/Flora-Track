import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import AddPlantPage from "../Pages/AddPlantPage";
import AllPlantsPage from "../Pages/AllPlantsPage";
import MyPlantsPage from "../Pages/MyPlantPage";
import SigninPage from "../Pages/SigninPage";
import SignupPage from "../Pages/SignupPage";
import UpdatePage from "../Pages/UpdatePage";
import DetailsPage from "../Pages/DetailsPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import NotFoundPage from "../Pages/NotFoundPage";
import DashboardPage from "../Pages/DashBoardPages/DashboardPage";
import OverViewPage from "../Pages/DashBoardPages/OverViewPage";
import AllPlantsDashPage from "../Pages/DashBoardPages/AllPlantsDashPage";
import MyPlantsDashPage from "../Pages/DashBoardPages/MyPlantsDashPage";



export const  router = createBrowserRouter([
    {
        path:"/",
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: HomePage
            },
            {
                path:'/addplant',
                Component: AddPlantPage
            },
            {
                path:"/allplants",
                Component: AllPlantsPage
            },
            {
                path: '/myplants',
                Component:MyPlantsPage
            },
            {
                path:"/signin",
                Component: SigninPage
            },
            {
                path:"/signup",
                Component: SignupPage
            }
            ,
            {
                path:"/plantupdate/:_id",
                Component: UpdatePage
            }
            ,
            {
                path:"/plants/:_id",
                element: <PrivateRoute><DetailsPage></DetailsPage></PrivateRoute>
            }
            
        ]

    },
    
    {
        path:"/dashboard",
        Component:DashboardPage,
        children:[
            {
                index: true,
               Component:OverViewPage 
            },
            {
              path:"dashallplants",
              Component:AllPlantsDashPage
            },
            {
              path:"dashmyplants",
              Component:MyPlantsDashPage
            },
            {
             path:"overviewpage",
               Component:OverViewPage 
            },
            
        ]
    }
    ,
    {
        path:"*",
        Component: NotFoundPage
    }

])