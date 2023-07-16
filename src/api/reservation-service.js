import axios from "axios"
import authHeader from "./auth-header";
const { settings } = require("../utils/settings")

const API_URL = settings.apiURL;


const isVehicleAvailable = (dto) =>{

    const {carId ,pickUpDateTime , dropOffDateTime} =dto;

    return axios.get(`${API_URL}/reservations/auth?carId=${carId}&pickUpDateTime=${pickUpDateTime}&dropOffDateTime=${dropOffDateTime}` ,
     {headers: authHeader()});

}

const createReservation = ( carId ,reservation) => { 
    
    return axios.post(`${API_URL}/reservations/add?carId=${carId}` , reservation,
     {headers: authHeader()});

}

const getReservations = ( ) => { 
    
    return axios.get(`${API_URL}/reservations/auth/all` , 
     {headers: authHeader()});

}

const getReservation = (id) => { 
    
    return axios.get(`${API_URL}/reservations/${id}/auth` , 
     {headers: authHeader()});

}

/**Admın SERVİCES */

const getReservationsAdmin = () => { 
    
    return axios.get(`${API_URL}/reservations/admin/all` , 
     {headers: authHeader()});

}

const getReservationByIdAdmin = (id) => { 
    
    return axios.get(`${API_URL}/reservations/${id}/admin` , 
     {headers: authHeader()});

}

const updateReservationByIdAdmin = (carId , reservationId , reservation) => { 
    
    return axios.put(`${API_URL}/reservations/admin/auth?carId=${carId}&reservationId=${reservationId}` , reservation , 
     {headers: authHeader()});

}

const deleteReservationByIdAdmin = (id) => { 
    
    return axios.delete(`${API_URL}/reservations/admin/${id}/auth`  , 
     {headers: authHeader()});

}

const downloadReservations = () => {

    return axios.get(`${API_URL}/excel/download/reservations` ,
     {headers: {...authHeader() ,
         "Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",}, responseType:"blob",});

}



export { isVehicleAvailable , createReservation ,getReservations ,
    getReservation , getReservationsAdmin , getReservationByIdAdmin , 
    updateReservationByIdAdmin , deleteReservationByIdAdmin , downloadReservations}
