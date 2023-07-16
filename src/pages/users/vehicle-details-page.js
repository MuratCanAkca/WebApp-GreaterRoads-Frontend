import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/users/common/page-header/page-header'
import Spacer from '../../components/common/spacer/spacer'
import VehicleDetails from '../../components/users/vehicle-details/vehicle-details'
import { getVehicle } from '../../api/vehicle-service'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setVehicle } from '../../store/slices/reservation-slice'
import Loading from '../../components/common/loading.js/loading'

const VehicleDetailsPage = () => {

  const vehicle = useSelector(state => state.reservation.vehicle);

  const [loading , setLoading] = useState(true);
  const {vehicleId} = useParams();
  const dispatch = useDispatch();

  const loadData = async () => {

    try {

      const resp = await getVehicle(vehicleId);
      dispatch(setVehicle(resp.data));

    } catch (error) {
    
      
    }finally{
      setLoading(false);
    }

  }

  useEffect(()=>{
    loadData();
  }, []);


  return (
    <>
      <PageHeader title={vehicle?.model}/>
      <Spacer/>
      {loading ? <Loading/> : <VehicleDetails/> }
      <Spacer/>
    </>
  )
}

export default VehicleDetailsPage