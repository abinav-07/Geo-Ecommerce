import axios from 'axios';
import { getToken } from '../utils/storage';

export const setAuthHeaders=()=>{
    const token=getToken();    
    if(token){
        axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;
    }
}

export const removeAuthHeaders=()=>{
    delete axios.defaults.headers.common["Authorization"];
}




