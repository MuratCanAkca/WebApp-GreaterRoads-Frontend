import axios from "axios";
import authHeader from "./auth-header";
const { settings } = require("../utils/settings")


const API_URL = settings.apiURL;

const getVehicles =()=> {
    return axios.get(`${API_URL}/car/visitors/all`);
} ;

const getVehicle =(id)=> {
    return axios.get(`${API_URL}/car/visitors/${id}`);
} ;

const getVehicleByPage = (page=0, size=10 , sort ="model" , direction="ASC") => {
    return axios.get(`${API_URL}/car/visitors/pages?page=${page}&size=${size}&sort=${sort}&direction=${direction}`)
}

const getVehicleImage = (id) => {
    if(Array.isArray(id)) id = id[0];
    return axios.get(`${settings.apiURL}/files/display/${id}` , {responseType:"arraybuffer",})
}

/* ADMIN SERVİCES */

const downloadVehicles = () => {
    return axios.get(`${API_URL}/excel/download/cars` ,
    {headers: {...authHeader() ,
        "Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",}, responseType:"blob",});
}



const uploadVehicleImage = (image) => {
    return axios.post(`${settings.apiURL}/files/upload` , image , {
        headers: {...authHeader(),
        "Content-Type":"multipart/form-data",}
    } );
}

/* const deleteVehicleImage = (id) => {
    return axios.post(`${settings.apiURL}/files/upload` , image , {
        headers: {...authHeader(),
        "Content-Type":"multipart/form-data",}
    } );
}
 */
const createVehicle = (imageId , vehicle) => {
    return axios.post(`${settings.apiURL}/car/admin/${imageId}/add` , vehicle ,{headers: authHeader(),})
}

const deleteVehicleById = (id) => {
    return axios.delete(`${settings.apiURL}/car/admin/${id}/auth`  ,{headers: authHeader(),})
}

const updateVehicle = (imageId , vehicleId,vehicle) => {
    return axios.put(`${settings.apiURL}/car/admin/auth?id=${vehicleId}&imageId=${imageId}` , vehicle ,{headers: authHeader(),})
}




export {getVehicles , getVehicle,getVehicleByPage ,getVehicleImage ,downloadVehicles ,uploadVehicleImage , createVehicle ,deleteVehicleById , updateVehicle };