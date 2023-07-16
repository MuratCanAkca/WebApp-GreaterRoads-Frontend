
import Swal from "sweetalert2";

export const question = (title ,text="" ) => { 
    
   return Swal.fire({
        title,
        text,
        icon :"question",
        showCancelButton: true,
       
      })
 }

 export const toast =(title , icon)=>{
     //success , warning , question , error , info
     return Swal.fire({
          position: 'top-end',
          icon,
          title,
          showConfirmButton: false,
          timer: 3000
        })
 }