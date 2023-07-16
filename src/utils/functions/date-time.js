import moment from "moment";
//import { date } from "yup";

export const combineDateAndTime = (date , time) => { 
    
    return moment(`${date} ${time}`).format("MM/DD/YYYY HH:mm:ss");

 }

 export const checkExpireDate = (expireDate) => {

    if(!expireDate) return false;
    if(expireDate.includes("_")) return false;

    const date = moment(`28/${expireDate}` , "DD/MM/YY");
    if(!date.isValid()) return false;
    if(date<new Date()) return false;
    return true;

 }

 export const getCurrentDate = () => {

    return moment().format("YYYY-MM-DD")

 }

 export const getDate = (dateTime) =>{

    return moment(dateTime).format("YYYY-MM-DD");

 }

 export const getTime = (dateTime) =>{

   return moment(dateTime).format("HH:mm");

}

 export const checkDates = (dates) => {

    const {pickUpDate , pickupTime, dropOffDate , dropOffTime}=dates;
    const date1 = moment(`${pickUpDate} ${pickupTime}`);
    const date2 = moment(`${dropOffDate} ${dropOffTime}`);
    return date2>=date1.add(1,"h");

 }

 export const formatDateTimeToLLL = (dateTime) =>{
   return moment(dateTime).format("lll");
 }