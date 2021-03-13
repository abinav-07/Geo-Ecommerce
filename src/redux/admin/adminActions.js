import axios from 'axios';
import { API_URL } from '../../config';
import {
    GETTING_ALL_CUSTOMER_DETAILS,
    GETTING_ALL_CUSTOMER_DETAILS_SUCCESS,
    GETTING_ALL_CUSTOMER_DETAILS_ERROR,
    DELETING_CUSTOMER,
    DELETING_CUSTOMER_SUCCESS,
    DELETING_CUSTOMER_ERROR,
    DELETING_CUSTOMER_RESET
} from './adminTypes';

const onGetAllCustomerDetails = () => {
    return {
        type: GETTING_ALL_CUSTOMER_DETAILS
    }
}

const onGetAllCustomerDetailsSuccess = (data) => {
    return {
        type: GETTING_ALL_CUSTOMER_DETAILS_SUCCESS,
        payload: data
    }
}

const onGetAllCustomerDetailsError = (data) => {
    return {
        type: GETTING_ALL_CUSTOMER_DETAILS_ERROR,
        payload: data
    }
}

const onDeletingCustomer = () => {
    return {
        type: DELETING_CUSTOMER
    }
}

const onDeletingCustomerSuccess = (data) => {
    return {
        type: DELETING_CUSTOMER_SUCCESS,
        payload: data
    }
}

const onDeletingCustomerError = (data) => {
    return {
        type: DELETING_CUSTOMER_ERROR,
        payload: data
    }
}

export const onDeletingCustomerReset=()=>{
    return {
        type:DELETING_CUSTOMER_RESET
    }
}

export const getAllCustomerDetails = () => {
    return (dispatch => {
        dispatch(onGetAllCustomerDetails());
        axios.get(`${API_URL}/admin/get-all-customer-details`)
            .then(res => {
                dispatch(onGetAllCustomerDetailsSuccess(res.data));
            }).catch(err => {
                dispatch(onGetAllCustomerDetailsError(err.response.data.message));
            })
    })
};

export const deleteCustomer = (value) => {
    return (dispatch => {
        dispatch(onDeletingCustomer());
        axios.post(`${API_URL}/admin/delete-customer`,value)
            .then(res => {                
                dispatch(onDeletingCustomerSuccess(res.data));
            }).catch(err => {
                dispatch(onDeletingCustomerError(err.response.data.message));
            })
    })
}