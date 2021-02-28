export const NAVBAR_TAB_KEYS={
    ALL_PRODUCTS:"all-products",
    ELECTRICAL_PRODUCTS:"electrical-products",
    TOY_PRODUCTS:"toy-products",
    CLOTHES_PRODUCTS:"clothes-products",
    AUTOMOBILE_PRODUCTS:"automobile-products",
    GROCERIES_PRODUCTS:"groceries-products",
    PETS_PRODUCTS:"pets-products",
    SPORTS_PRODUCTS:"sports-products",
    ACCESSORIES_PRODUCTS:"accessories"    
    /** CAUTION:
     *      Dont Forget To Add Same Values to SELL_YOUR_PRODUCTS_PRODUCT_TYPES CONST
    **/
}


export const PRODUCT_TYPE={
    NEW_PRODUCTS:"new-products",
    OLD_PRODUCTS:"old-products"
}

export const SELL_YOUR_PRODUCTS="/users/sell-your-products";

export const SELL_YOUR_PRODUCTS_PRODUCT_TYPES=[
    {
        name:"Toys",
        value:"toys",
        subGroup:[
            {
                name:"Toddler Toys",
                value:"toddlerToys"
            },
            {
                name:"Toys",
                value:"toys"                
            }
        ]
    },
    {
        name:"Electronic",
        value:"electronic",
        subGroup:[
            {
                name:"Mobiles",
                value:"mobiles",
            },
            {
                name:"Tablets",
                value:"tablets", 
            },
            {
                name:"Laptops",
                value:"laptops", 
            },
            {
                name:"Desktops",
                value:"desktops", 
            },
            {
                name:"Cameras",
                value:"cameras", 
            },
            {
                name:"Gaming",
                value:"gaming", 
            },
            {
                name:"Printers",
                value:"printers", 
            },
            {
                name:"Televisions",
                value:"televisions", 
            },
        ]
    },
    {
        name:"Clothes",
        value:"clothes",
        subGroup:[
            {
                name:"Jeans",
                value:"jeans"
            },
            {
                name:"Shorts",
                value:"shorts",
            },
            {
                name:"Shoes",
                value:"shoes",
            },
            {
                name:"Party Wear",
                value:"partyWear",
            },            
            {
                name:"Clothing",
                value:"clothing",
            },
            {
                name:"Lingerie",
                value:"lingerie",
            },
            {
                name:"Jackets",
                value:"jackets",
            },
        ]
    },
    {
        name:"Auto-mobile",
        value:"autoMobile",
        subGroup:[
            {
                name:"Motorcycles",
                value:"motorcycles"                
            },
            {
                name:"Helmets",
                value:"helmets"
            },
            {
                name:"Gloves",
                value:"gloves"
            },
            {
                name:"Auto Parts",
                value:"autoParts"
            },
            {
                name:"Auto Tools",
                value:"autoTools"
            },
            {
                name:"Lubricants",
                value:"lubricants"
            },
        ]

    },
    {
        name:"Groceries",
        value:"groceries",
        subGroup:[
            {
                name:"Food",
                value:"food"            
            },
            {
                name:"Beverages",
                value:"beverages"            
            },
            {
                name:"Breakfast & Snacks",
                value:"snacks"
            },
            {
                name:"Cooking Ingredients",
                value:"cookingIngredients"
            },
            {
                name:"Laundry",
                value:"laundry"
            },
        ]
    },
    {
        name:"Pets",
        value:"pets",
        subGroup:[
            {
                name:"Dogs",
                value:"dogs"                
            },
            {
                name:"Cats",
                value:"cats"
            },
            {
                name:"Pet Food",
                value:"petFood"
            },
        ]
    },
    {
        name:"Sports",
        value:"sports",
        subGroup:[
            {
                name:"Football",
                value:"football"
            },
            {
                name:"Basketball",
                value:"basketball"
            },
            {
                name:"Cricket",
                value:"cricket"
            },
            {
                name:"Table Tennis",
                value:"tableTennis"
            },
            {
                name:"Badminton",
                value:"badminton"
            },
            {
                name:"Nutrition",
                value:"nutrition"
            }
        ]
    },
    {
        name:"Accessories",
        value:"accessories",
        subGroup:[
            {
                name:"Watch",
                value:"watch"
            },
            {
                name:"Sun Glasses",
                value:"sunGlasses"
            },
            {
                name:"Jewellery",
                value:"jewellery"
            },
        ]
    },    
]



