import axios from 'axios';
import { API_URL } from '../../config';
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

//Actions

const onAddSellerProducts = () => {
    return ({
        type: ADDING_SELLER_PRODUCTS
    });
}

const onAddSellerProductsSuccess = (data) => {
    return {
        type: ADDING_SELLER_PRODUCTS_SUCCESS,
        payload: data
    }
};

const onAddSellerProductsError = (data) => {
    return {
        type: ADDING_SELLER_PRODUCTS_ERROR,
        payload: data
    }
}

export const onAddSellerProductsReset = () => {
    return {
        type: ADDING_SELLER_PRODUCTS_RESET
    }
}

const onGetAllSellerProducts = () => {
    return {
        type: GET_ALL_SELLER_PRODUCTS
    }
}

const onGetAllSellerProductsSuccess = (data) => {
    return {
        type: GET_ALL_SELLER_PRODUCTS_SUCCESS,
        payload: data
    }
}

const onGetAllSellerProductsError = (data) => {
    return {
        type: GET_ALL_SELLER_PRODUCTS_ERROR,
        payload: data
    }
}

const onDeleteSellerProduct = () => {
    return {
        type: DELETE_SELLER_PRODUCT
    }
}

const onDeleteSellerProductSuccess = (data) => {
    return {
        type: DELETE_SELLER_PRODUCT_SUCCESS,
        payload: data
    }
}

const onDeleteSellerProductError = (data) => {
    return {
        type: DELETE_SELLER_PRODUCT_ERROR,
        payload: data
    }
}

export const onDeleteSellerProductReset = () => {
    return {
        type: DELETE_SELLER_PRODUCT_RESET
    }
}

const onUpdateSellerProduct = () => {
    return {
        type: UPDATE_SELLER_PRODUCT
    }
}

const onUpdateSellerProductSuccess = (data) => {
    return {
        type: UPDATE_SELLER_PRODUCT_SUCCESS,
        payload: data
    }
}

const onUpdateSellerProductError = (data) => {
    return {
        type: UPDATE_SELLER_PRODUCT_ERROR,
        payload: data
    }
}

export const onUpdateSellerProductReset = () => {
    return {
        type: UPDATE_SELLER_PRODUCT_RESET
    }
}

//Methods
export const addSellerProducts = (formValues) => {
    return (dispatch) => {
        dispatch(onAddSellerProducts());
        axios.post(`${API_URL}/users/add-seller-products`, formValues)
            .then(res => {
                dispatch(onAddSellerProductsSuccess(res.data));
            }).catch(err => {
                console.log(err.response);
                if (err.response.data.details) {
                    dispatch(onAddSellerProductsError(err.response.data.details[0]["message"]));
                } else {
                    dispatch(onAddSellerProductsError(err.response.data.message));
                }
            })
    }
}

export const getAllSellerProducts = (user_id) => {
    return (dispatch) => {
        dispatch(onGetAllSellerProducts());
        axios.get(`${API_URL}/users/get-seller-products?user_id=${user_id}`)
            .then(res => {
                dispatch(onGetAllSellerProductsSuccess(res.data));
            }).catch(err => {               
                dispatch(onGetAllSellerProductsError(err.response.data.message));
            });
    }
}

export const deleteSellerProduct = (value) => {
    return (dispatch) => {
        dispatch(onDeleteSellerProduct());
        axios.post(`${API_URL}/users/delete-seller-product`, value)
            .then(res => {                
                dispatch(onDeleteSellerProductSuccess(res.data));
            }).catch(err => {
                console.log(err.response);
                if (err.response.data.details) {
                    dispatch(onDeleteSellerProductError(err.response.data.details[0]["message"]));
                } else {
                    dispatch(onDeleteSellerProductError(err.response.data.message));
                }
            });
    }
}

export const updateSellerProduct = (value) => {
    return (dispatch) => {
        dispatch(onUpdateSellerProduct());
        axios.post(`${API_URL}/users/update-seller-product`,value )
            .then(res => {                
                dispatch(onUpdateSellerProductSuccess(res.data));
            }).catch(err => {
                console.log(err);
                if (err.response.data.details) {
                    dispatch(onUpdateSellerProductError(err.response.data.details[0]["message"]));
                } else {
                    dispatch(onUpdateSellerProductError(err.response.data));
                }
            })

    }
}