import axios from "axios"
import authHeader from "../api/auth-header"
const { settings } = require("../utils/settings");


const API_URL = settings.apiURL;

const sendMessage = (message) => {
    
    return axios.post(`${API_URL}/contactmessage/visitor` , message)

}

const getMessages = () => { 
    
    return axios.get(`${API_URL}/contactmessage` ,   {headers: authHeader()});

}

const getMessagesByPage = (page=0, size=20 , sort ="subject" , direction="ASC") => { 
    
    return axios.get(`${API_URL}/contactmessage/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}` ,   {headers: authHeader()});

}

const getMessage = (id) => { 
    
    return axios.get(`${API_URL}/contactmessage/${id}` ,   {headers: authHeader()});

}

const deleteMessage = (id) => { 
    
    return axios.delete(`${API_URL}/contactmessage/${id}` ,   {headers: authHeader()});

}



export { sendMessage  , getMessages , getMessagesByPage , getMessage ,deleteMessage}