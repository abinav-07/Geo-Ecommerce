import reduceReducers from 'reduce-reducers';

import {
    GETTING_ALL_CUSTOMER_DETAILS,
    GETTING_ALL_CUSTOMER_DETAILS_SUCCESS,
    GETTING_ALL_CUSTOMER_DETAILS_ERROR,
    DELETING_CUSTOMER,
    DELETING_CUSTOMER_SUCCESS,
    DELETING_CUSTOMER_ERROR,
    DELETING_CUSTOMER_RESET
} from './adminTypes';

const initialState = {
    //Customer States
    gettingAllCustomerDetails: false,
    customerDetails: [],
    gettingAllCustomerDetailsError: null,

    //Deleting Customer States
    deletingCustomer: false,
    deletingCustomerSuccess: null,
    deletingCustomerError: null
}

const gettingAllCustomerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETTING_ALL_CUSTOMER_DETAILS:
            return {
                ...state,
                gettingAllCustomerDetails: true,
                customerDetails: [],
                gettingAllCustomerDetailsError: null
            }
        case GETTING_ALL_CUSTOMER_DETAILS_SUCCESS:
            return {
                ...state,
                gettingAllCustomerDetails: false,
                customerDetails: action.payload,
                gettingAllCustomerDetailsError: null
            }
        case GETTING_ALL_CUSTOMER_DETAILS_ERROR:
            return {
                ...state,
                gettingAllCustomerDetails: false,
                customerDetails: [],
                gettingAllCustomerDetailsError: action.payload
            }
        default:
            return state;
    }
}

const deletingCustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETING_CUSTOMER:
            return {
                ...state,
                deletingCustomer: true,
                deletingCustomerSuccess: null,
                deletingCustomerError: null
            }
        case DELETING_CUSTOMER_SUCCESS:
            return {
                ...state,
                deletingCustomer: false,
                deletingCustomerSuccess: action.payload,
                deletingCustomerError: null
            }
        case DELETING_CUSTOMER_ERROR:
            return {
                ...state,
                deletingCustomer: false,
                deletingCustomerSuccess: null,
                deletingCustomerError: action.payload
            }
        case DELETING_CUSTOMER_RESET:
            return {
                ...state,
                deletingCustomer: false,
                deletingCustomerSuccess: null,
                deletingCustomerError: null
            }
        default:
            return state;
    }
};

export const reducer = reduceReducers(gettingAllCustomerDetailsReducer, deletingCustomerReducer);
