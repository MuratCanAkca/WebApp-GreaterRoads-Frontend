import React from 'react'
import AdminVehicleNew from '../../components/admins/vehicles/admin-vehicle-new'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/users/common/page-header/page-header'

const AdminVehicleNewPage = () => {
  return (
    <>
      <PageHeader title="New Vehicle"/>
      <Spacer/>
      <AdminVehicleNew/>
      <Spacer/>
    </>
  )
}

export default AdminVehicleNewPage