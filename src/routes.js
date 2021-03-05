import ConditionalLayout from './layout/conditional_layout';
import BlankLayout from './layout/blank_layout';
import LoginUserPage from './pages/login';
import RegisterUserPage from './pages/register';
import LandingPage from './pages/landing';
import SellYourProductsPage from './pages/sell_your_products';
import ProductsPage from './pages/products_views';

//Route Enums
import { SELL_YOUR_PRODUCTS } from './enums';


const Routes = [
    {
        name: "Login User Page",
        path: "/users/login",
        privateRoute: false, //access to all users
        exact: true,
        displaySearchBar: false,
        layout: BlankLayout,
        component: LoginUserPage,
    },
    {
        name: "Register Page",
        path: "/users/register",
        privateRoute: false, //access to all users
        exact: true,
        displaySearchBar: false,
        layout: BlankLayout,
        component: RegisterUserPage,
    },
    {
        name: "Landing Page",
        path: "/",
        privateRoute: false,
        exact: true,
        displaySearchBar: false,
        layout: ConditionalLayout,
        component: LandingPage,

    },
    {
        name: "Sell Your Products Page",
        path: SELL_YOUR_PRODUCTS,
        privateRoute: true,
        exact: true,
        displaySearchBar: false,
        layout: ConditionalLayout,
        component: SellYourProductsPage,

    },
    {
        name: "Products",
        path: "/products/:product_type",
        privateRoute: true,
        exact: true,
        displaySearchBar: true,
        layout: ConditionalLayout,
        component: ProductsPage
    },
]

export default Routes;

