export const getToken=()=>{
    const token=localStorage.getItem('user')||sessionStorage.getItem("user");    
    return token;
}

export const removeToken = () => {
	localStorage.removeItem('user');
	sessionStorage.removeItem('user');
};

export const getAdminToken=()=>{
    const token=sessionStorage.getItem('admin');
    return token;
}

export const removeAdminToken=()=>{
    sessionStorage.removeItem("admin");
}