import React, { useEffect, useState } from 'react'
import SectionHeader from '../../common/section-header/section-header'
import { getVehicleByPage } from '../../../../api/vehicle-service';
import Loading from '../../../common/loading.js/loading';
import VehicleBar from './vehicle-bar';
import PopularVehicle from './popular-vehicle';
import Spacer from '../../../common/spacer/spacer';

const PopularVehicles = () => {

    const [vehicles , setVehicles]=useState([]);
    const [activeVehicle , setActiveVehicle]=useState({});
    const [loading , setLoading]=useState(true);

    const loadData =async () => {
        try {
            const resp = await getVehicleByPage();
            const data=resp.data.content;
            setVehicles(data);
            if(data.length > 0) setActiveVehicle(data[0]);
        } catch (error) {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadData();
    },[])


  return (
    <div>
        <SectionHeader 
        title="Popular Vehicle Models" 
        subTitle="Lux &amp; economic" 
        desc="To contribute to positive change and achieve our sustainability goals with many extraordinary"/>
        <Spacer height={30}/>
        {loading ? <Loading/>:
        <>      
            <VehicleBar vehicles={vehicles} activeVehicle={activeVehicle} setActiveVehicle={setActiveVehicle}/>
            <Spacer height={50}/>
            <PopularVehicle activeVehicle={activeVehicle}/>
        </>

        }

    </div>
  )
}

export default PopularVehicles