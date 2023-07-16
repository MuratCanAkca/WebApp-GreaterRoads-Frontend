import { settings } from "../settings"

export const getVehicleImage = (id) => { 
    if(Array.isArray(id)) id = id[0];
    return `${settings.apiURL}/files/display/${id}`

 }