import reduceReducers from 'reduce-reducers';
import {
    ADDING_SELLER_PRODUCTS,
    ADDING_SELLER_PRODUCTS_SUCCESS,
    ADDING_SELLER_PRODUCTS_ERROR,
    GET_ALL_SELLER_PRODUCTS,
    GET_ALL_SELLER_PRODUCTS_SUCCESS,
    GET_ALL_SELLER_PRODUCTS_ERROR,
    DELETE_SELLER_PRODUCT,
    DELETE_SELLER_PRODUCT_SUCCESS,
    DELETE_SELLER_PRODUCT_ERROR,
    DELETE_SELLER_PRODUCT_RESET,
    ADDING_SELLER_PRODUCTS_RESET,
    UPDATE_SELLER_PRODUCT,
    UPDATE_SELLER_PRODUCT_SUCCESS,
    UPDATE_SELLER_PRODUCT_ERROR,
    UPDATE_SELLER_PRODUCT_RESET
} from './sellerProductsTypes';

//Initial State Values
const initialState = {
    //Adding Seller Products State
    addingSellerProducts: false,
    addingSellerProductsSuccess: null,
    addingSellerProductsError: null,

    //Deleting Seller Products State
    deletingSellerProduct: false,
    deletingSellerProductSuccess: null,
    deletingSellerProductError: null,

    //Update Seller Products State
    updatingSellerProduct: false,
    updatingSellerProductSuccess: null,
    updatingSellerProductError: null
}

const sellerAllProductsInitialState = {
    gettingAllSellerProducts: false,
    allSellerProducts: null,
    gettingAllSellerProductsError: null
}

const addingSellerProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDING_SELLER_PRODUCTS:
            return {
                ...state,
                addingSellerProducts: true,
                addingSellerProductsSuccess: null,
                addingSellerProductsError: null
            }
        case ADDING_SELLER_PRODUCTS_SUCCESS:
            return {
                ...state,
                addingSellerProducts: false,
                addingSellerProductsSuccess: action.payload,
                addingSellerProductsError: null
            }
        case ADDING_SELLER_PRODUCTS_ERROR:
            return {
                ...state,
                addingSellerProducts: false,
                addingSellerProductsSuccess: null,
                addingSellerProductsError: action.payload
            }
        case ADDING_SELLER_PRODUCTS_RESET:
            return {
                ...state,
                addingSellerProducts: false,
                addingSellerProductsSuccess: null,
                addingSellerProductsError: null
            }
        default:
            return state;
    }
}

const getSellerAllProductsReducer = (state = sellerAllProductsInitialState, action) => {
    switch (action.type) {
        case GET_ALL_SELLER_PRODUCTS:
            return {
                ...state,
                gettingAllSellerProducts: true,
                allSellerProducts: null,
                gettingAllSellerProductsError: null
            }
        case GET_ALL_SELLER_PRODUCTS_SUCCESS:
            return {
                ...state,
                gettingAllSellerProducts: false,
                allSellerProducts: action.payload,
                gettingAllSellerProductsError: null,
            }
        case GET_ALL_SELLER_PRODUCTS_ERROR:
            return {
                ...state,
                gettingAllSellerProducts: false,
                allSellerProducts: null,
                gettingAllSellerProductsError: action.payload
            }
        default:
            return state;
    }
}

const deleteSellerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_SELLER_PRODUCT:
            return {
                ...state,
                deletingSellerProduct: true,
                deletingSellerProductSuccess: null,
                deletingSellerProductError: null
            }
        case DELETE_SELLER_PRODUCT_SUCCESS:
            return {
                ...state,
                deletingSellerProduct: false,
                deletingSellerProductSuccess: action.payload,
                deletingSellerProductError: null
            }
        case DELETE_SELLER_PRODUCT_ERROR:
            return {
                ...state,
                deletingSellerProductSuccess: null,
                deletingSellerProductError: action.payload
            }
        case DELETE_SELLER_PRODUCT_RESET:
            return {
                ...state,
                deletingSellerProduct: false,
                deletingSellerProductSuccess: null,
                deletingSellerProductError: null
            }
        default:
            return state;
    }
}

const updateSellerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SELLER_PRODUCT:
            return {
                ...state,
                updatingSellerProduct: true,
                updatingSellerProductSuccess: null,
                updatingSellerProductError: null
            }
        case UPDATE_SELLER_PRODUCT_SUCCESS:
            return {
                ...state,
                updatingSellerProduct: false,
                updatingSellerProductSuccess: action.payload,
                updatingSellerProductError: null
            }
        case UPDATE_SELLER_PRODUCT_ERROR:
            return {
                ...state,
                updatingSellerProduct: false,
                updatingSellerProductSuccess: null,
                updatingSellerProductError: action.payload
            }
        case UPDATE_SELLER_PRODUCT_RESET:
            return {
                ...state,
                updatingSellerProduct: false,
                updatingSellerProductSuccess: null,
                updatingSellerProductError: null
            }
        default:
            return state;
    }
}

export const reducer = reduceReducers(addingSellerProductsReducer, deleteSellerProductReducer, updateSellerProductReducer);
export const sellerAllProductsReducer = getSellerAllProductsReducer;