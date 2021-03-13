import axios from 'axios';
import { API_URL } from '../../config';
import {
    GETTING_ALL_PRODUCTS,
    GETTING_ALL_PRODUCTS_SUCCESS,
    GETTING_ALL_PRODUCTS_ERROR
} from './productsTypes';


//Actions
const onGettingAllProducts = () => {
    return {
        type: GETTING_ALL_PRODUCTS
    }
}

const onGettingAllProductsSuccess = (data) => {
    return {
        type: GETTING_ALL_PRODUCTS_SUCCESS,
        payload: data
    }
}

const onGettingAllProductsError = (data) => {
    return {
        type: GETTING_ALL_PRODUCTS_ERROR,
        payload: data
    }
}

export const getAllProducts = (user_id) => {    
    return (dispatch => {
        dispatch(onGettingAllProducts());
        axios.get(`${API_URL}/products/get-all-products?user_id=${user_id}`)
            .then(res => {
                dispatch(onGettingAllProductsSuccess(res.data));
            }).catch(err => {                
                dispatch(onGettingAllProductsError(err.response.data.message));
            });
    });
} 