import axios from "axios"
import authHeader from "./auth-header";
const { settings } = require("../utils/settings")

const API_URL = settings.apiURL;

const register = (user) => {
    
    return axios.post(`${API_URL}/register` , user)

}

const login = (credentials) => {
    
    return axios.post(`${API_URL}/login` , credentials)

}

const getUser = () =>{

    return axios.get(`${API_URL}/user` , {headers: authHeader()});

}

const updateUser = (user) =>{

    return axios.put(`${API_URL}/user` , user,{headers: authHeader()});

}

const updatePassword = (passwords) =>{

    return axios.patch(`${API_URL}/user/auth` , passwords ,{headers: authHeader()});

}

/* ADMİN SERVİCES  */ 

const getUsers = () =>{

    return axios.get(`${API_URL}/user/auth/all` , {headers: authHeader()});

}

const getUsersByPage = (page=0, size=20 , sort ="firstName" , direction="ASC") =>{

    return axios.get(`${API_URL}/user/auth/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}` , {headers: authHeader()});

}

const downloadUsers = () => {

    return axios.get(`${API_URL}/excel/download/users` ,
     {headers: {...authHeader() ,
         "Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",}, responseType:"blob",});

}

const getUserById = (id) =>{

    return axios.get(`${API_URL}/user/${id}/auth` , {headers: authHeader()});

}

const updateUserById= (id , user) => {

    return axios.put(`${API_URL}/user/${id}/auth` , user, {headers: authHeader()});

}

const deleteUserById= (id) => {

    return axios.delete(`${API_URL}/user/${id}/auth` , {headers: authHeader()});

}


export { register , login ,getUser , updateUser , updatePassword , getUsers , getUsersByPage , downloadUsers ,getUserById , updateUserById , deleteUserById}

