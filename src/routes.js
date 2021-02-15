import LoginUserPage from './pages/login';
import RegisterUserPage from './pages/register';
import LandingPage from './pages/landing';
import BlankLayout from './layout/blank_layout';
import ConditionalLayout from './layout/conditional_layout';

const Routes=[
    {
        name:"Login User Page",
        path:"/users/login",
        privateRoute:false, //access to all users
        exact:true,
        displaySearchBar:false,
        layout:BlankLayout,
        component:LoginUserPage,
    },
    {
        name:"Register Page",
        path:"/users/register",
        privateRoute:false, //access to all users
        exact:true,
        displaySearchBar:false,
        layout:BlankLayout,
        component:RegisterUserPage,
    },
    {
        name:"Landing Page",
        path:"/",
        privateRoute:false,
        exact:true,
        displaySearchBar:false,
        layout:ConditionalLayout,
        component:LandingPage,

    },
    {
        name:"Sell Your Products Page",
        path:"/users/sell-products",
        privateRoute:true,
        exact:true,
        displaySearchBar:true,
        layout:ConditionalLayout,
        component:"",

    }
]

export default Routes;

