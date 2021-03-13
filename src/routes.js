import ConditionalLayout from './layout/conditional_layout';
import BlankLayout from './layout/blank_layout';
import AdminLayout from './layout/admin_layout';
import LoginUserPage from './pages/login';
import RegisterUserPage from './pages/register';
import LandingPage from './pages/landing';
import SellYourProductsPage from './pages/sell_your_products';
import ProductsPage from './pages/products_views';
import LoginAdminPage from './pages/admin/login';
import AdminCustomerPage from './pages/admin/customer';
import AdminCustomerProductDetails from './pages/admin/customer/customer_products_details';
import AdminRatingsPage from './pages/admin/ratings';

//Route Enums
import { SELL_YOUR_PRODUCTS, ADMIN_NAV_BAR_KEYS } from './enums';


const Routes = [
    {
        name: "Login User Page",
        path: "/users/login",
        privateRoute: false, //access to all users
        adminRoute: false,
        exact: true,
        displaySearchBar: false,
        layout: BlankLayout,
        component: LoginUserPage,
    },
    {
        name: "Register Page",
        path: "/users/register",
        privateRoute: false, //access to all users
        adminRoute: false,
        exact: true,
        displaySearchBar: false,
        layout: BlankLayout,
        component: RegisterUserPage,
    },
    {
        name: "Landing Page",
        path: "/",
        privateRoute: false,
        adminRoute: false,
        exact: true,
        displaySearchBar: false,
        layout: ConditionalLayout,
        component: LandingPage,

    },
    {
        name: "Sell Your Products Page",
        path: SELL_YOUR_PRODUCTS,
        privateRoute: true,
        adminRoute: false,
        exact: true,
        displaySearchBar: false,
        layout: ConditionalLayout,
        component: SellYourProductsPage,

    },
    {
        name: "Products",
        path: "/products/:product_type",
        privateRoute: true,
        adminRoute: false,
        exact: true,
        displaySearchBar: true,
        layout: ConditionalLayout,
        component: ProductsPage
    },
    {
        name: "Admin Login Page",
        path: "/admin/login",
        privateRoute: false,
        adminRoute: true,
        exact: true,
        displaySearchBar: false,
        layout: BlankLayout,
        component: LoginAdminPage
    },
    {
        name: "Admin Customer Page",
        path: `/admin/${ADMIN_NAV_BAR_KEYS.CUSTOMER_DETAILS}`,
        privateRoute: true,
        adminRoute: true,
        exact: true,
        displaySearchBar: false,
        layout: AdminLayout,
        component: AdminCustomerPage
    },
    {
        name: "Admin Customer Product Details Page",
        path: `/admin/${ADMIN_NAV_BAR_KEYS.CUSTOMER_DETAILS}/product-details`,
        privateRoute: true,
        adminRoute: true,
        exact: true,
        displaySearchBar: false,
        layout: AdminLayout,
        component: AdminCustomerProductDetails
    },
    {
        name:"Admin Ratings Page",
        path:`/admin/${ADMIN_NAV_BAR_KEYS.RATINGS_DETAILS}`,
        privateRoute:true,
        adminRoute:true,
        exact:true,
        displaySearchBar:false,
        layout:AdminLayout,
        component:AdminRatingsPage
    }
]

export default Routes;

