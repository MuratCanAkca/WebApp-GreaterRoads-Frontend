import React from 'react'
import Vehicle from '../../components/users/vehicles/vehicles'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/users/common/page-header/page-header'

const VehiclePage = () => {
  return (
    <>
      <PageHeader title="Vehicles"/>
      <Spacer/>
      <Vehicle/>
      <Spacer/>
    </>
  )
}

export default VehiclePage