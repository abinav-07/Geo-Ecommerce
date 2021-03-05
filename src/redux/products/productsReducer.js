import {
    GETTING_ALL_PRODUCTS,
    GETTING_ALL_PRODUCTS_SUCCESS,
    GETTING_ALL_PRODUCTS_ERROR
} from './productsTypes';

//Initial Values
const initialState = {
    //getting all product
    gettingAllProducts: false,
    allProducts: [],
    gettingAllProductsError: null
}

const gettingAllProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_ALL_PRODUCTS:
            return {
                ...state,
                gettingAllProducts: true,
                allProducts: [],
                gettingAllProductsError: null
            }
        case GETTING_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                gettingAllProducts: false,
                allProducts: action.payload,
                gettingAllProductsError: null
            }
        case GETTING_ALL_PRODUCTS_ERROR:
            return {
                ...state,
                gettingAllProducts: false,
                allProducts: [],
                gettingAllProductsError: action.payload
            }

        default:
            return state;
    }
}

export const reducer=gettingAllProductsReducer;