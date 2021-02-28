import {NAVBAR_TAB_KEYS, PRODUCT_TYPE, SELL_YOUR_PRODUCTS} from '../../enums'
export const NavbarItems=[
    {
        name:"Products",
        label:"Products",
        subMenu:[
            {
                name:"All Products",
                label:"All Products",
                path:`/products/${NAVBAR_TAB_KEYS.ALL_PRODUCTS}`
            },            
            {
                name:"Electrical Products",
                label:"Electrical Products",
                path:`/products/${NAVBAR_TAB_KEYS.ELECTRICAL_PRODUCTS}`
            },
            {
                name:"Toy Products",
                label:"Toy Products",
                path:`/products/${NAVBAR_TAB_KEYS.TOY_PRODUCTS}`
            },
            {
                name:"Clothes Products",
                label:"Clothes Products",
                path:`/products/${NAVBAR_TAB_KEYS.CLOTHES_PRODUCTS}`
            },
            {
                name:"Automobile Products",
                label:"Automobile Products",
                path:`/products/${NAVBAR_TAB_KEYS.AUTOMOBILE_PRODUCTS}`
            },
            {
                name:"Groceries Products",
                label:"Groceries Products",
                path:`/products/${NAVBAR_TAB_KEYS.GROCERIES_PRODUCTS}`
            },
            {
                name:"Pets Products",
                label:"Pets Products",
                path:`/products/${NAVBAR_TAB_KEYS.PETS_PRODUCTS}`
            },
            {
                name:"Sports Products",
                label:"Sports Products",
                path:`/products/${NAVBAR_TAB_KEYS.SPORTS_PRODUCTS}`
            },
            {
                name:"Accessories",
                label:"Accessories",
                path:`/products/${NAVBAR_TAB_KEYS.ACCESSORIES_PRODUCTS}`
            }
        ]        
    },
    {
        name:"New",
        label:"New",
        path:`/products/${PRODUCT_TYPE.NEW_PRODUCTS}`
    },
    {
        name:"Old",
        label:"Old",
        path:`/products/${PRODUCT_TYPE.OLD_PRODUCTS}`
    },
    {
        name:"Sell Your Products",
        label:"Sell Your Products",
        path:SELL_YOUR_PRODUCTS
    },
    {
        name:"Contact",
        label:"Contact",
        path:"/contact"
    }
]

export const UserProfileItems=[
    {
        name:"User",
        label:"User",        
    }
]

