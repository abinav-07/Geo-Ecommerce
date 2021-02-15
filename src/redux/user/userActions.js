import axios from 'axios';
import { API_URL } from '../../config';
import { push } from 'react-router-redux'

import { setAuthHeaders, removeAuthHeaders } from '../../services/auth';
import { removeToken } from '../../utils/storage';
// import history from '../../utils/history';
import {
    FETCH_USER,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    USER_REGISTER,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_ERROR,
    USER_REGISTER_RESET,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGOUT,
    USER_LOGOUT_SUCCESS
} from './userTypes';






const onFetchUser = () => {
    return {
        type: FETCH_USER
    }
}

const onFetchUserSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: user
    }
}

const onFetchUserError = (error) => {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

const onRegisterUser = () => {
    return {
        type: USER_REGISTER,

    }
}

const onRegisterUserSuccess = (data) => {
    return {
        type: USER_REGISTER_SUCCESS,
        payload: data
    }
}

const onRegisterUserError = (error) => {
    return {
        type: USER_REGISTER_ERROR,
        payload: error
    }
}

const onRegisterUserReset = () => {
    return {
        type: USER_REGISTER_RESET
    }
}

const onUserLogin=()=>{
    return{
        type:USER_LOGIN
    }
}

const onUserLoginSuccess=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}

const onUserLoginError=(error)=>{
    return{
        type:USER_LOGIN_ERROR,
        payload:error
    }
}

const onUserLogout=()=>{
    return{
        type:USER_LOGOUT
    }
}

const onUserLogoutSuccess=()=>{
    return{
        type:USER_LOGOUT_SUCCESS
    }
}

export const registerUser = (userData,history) => {
    return (dispatch) => {
        dispatch(onRegisterUser());
        axios.post(`${API_URL}/users/register`, userData)
            .then(res => {                
                dispatch(onRegisterUserSuccess(res.data.user));
                localStorage.setItem("user", res.data.token);

                //Tokenization
                setAuthHeaders();        

                history.push("/");

            }).catch(err => {
                if (err.response.data.error) {
                    dispatch(onRegisterUserError(err.response.data.error.details[0]["message"]));
                } else {
                    dispatch(onRegisterUserError(err.response.data));
                }                
            })
    }
}

export const loginUser=(userData,history)=>{
    return (dispatch)=>{
        const rememberMe=userData.rememberMe;
        //Remove Remember Me
        delete userData.rememberMe;
        
        dispatch(onUserLogin());
        axios.post(`${API_URL}/users/login`,userData)
        .then(res=>{                     
            dispatch(onUserLoginSuccess(res.data.user));
            console.log(history);
            if(rememberMe){
                localStorage.setItem("user", res.data.token);
            }else{
                sessionStorage.setItem("user", res.data.token);
            }

            //Tokenization
            setAuthHeaders();            

            history.push("/");
            
            
        }).catch(err=>{ 
            console.log(err);           
            if(err.response.data.error){
                dispatch(onUserLoginError(err.response.data.error.details[0]["message"]));
            }else{
                dispatch(onUserLoginError(err.response.data));
            }
            
        })
    }
}

export const logoutUser=(history)=>{
    return (dispatch)=>{
        dispatch(onUserLogoutSuccess());
        removeAuthHeaders();
        removeToken();
        history.push("/");
    }
}