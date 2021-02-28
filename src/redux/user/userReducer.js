import reduceReducers from 'reduce-reducers';

import {
    USER_REGISTER,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_REGISTER_RESET,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_LOGOUT_SUCCESS,
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    USER_ERROR_RESET
} from './userTypes';

const initialState = {
    //Register User
    registeringUser: false,
    registrationSuccess: null,
    registrationError: null,

    //Logging State
    loggingIn: false,
    loggingError: null,

    //Fetching User
    gettingUser: false,
    user: null,
    gettingUserError: null
}

const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER:
            return {
                ...state,
                registeringUser: true,
                registrationSuccess: null,
                registrationError: null
            }
        case USER_REGISTER_SUCCESS:
            //User Response
            const User=action?.payload;            
            return {
                ...state,
                registeringUser: false,
                user: {
                    user_id:User.user_id,
                    first_name:User.first_name,
                    last_name:User.last_name,
                    email:User.email
                },
                registrationError: null
            }
        case USER_REGISTER_ERROR:
            return {
                ...state,
                registeringUser: false,
                registrationSuccess: null,
                registrationError: action?.payload
            }
        case USER_REGISTER_RESET:
            return{
                ...state,
                registeringUser: false,
                registrationSuccess: null,
                registrationError: null
            }
        default:
            return state
    }
}

const userLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                loggingIn: true,
                loggingError: null
            }
        case USER_LOGIN_SUCCESS:
            const User=action?.payload;
            return {
                ...state,
                loggingIn: false,
                user: {
                    user_id:User.user_id,
                    first_name:User.first_name,
                    last_name:User.last_name,
                    email:User.email
                },
                loggingError: null
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                loggingIn: false,
                user: null,
                loggingError: action?.payload
            }
            default:
                return state
    }
}

const userLogoutReducer=(state=initialState,action)=>{
    switch (action.type) {
        case USER_LOGOUT_SUCCESS:
            return{
                ...state,
                loggingIn: false,
                user: null,
                loggingError: null
            }            
    
        default:
            return state;
    }
}

const userErrorReset=(state=initialState,action)=>{
    switch (action.type) {
        case USER_ERROR_RESET:
            return{
                ...state,
                loggingError: null,
                registrationError: null
            }
            
    
        default:
            return state;
    }
}

export const reducer = reduceReducers(userRegisterReducer, userLoginReducer, userLogoutReducer,userErrorReset);