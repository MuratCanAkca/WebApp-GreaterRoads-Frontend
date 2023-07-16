import React from 'react'
import Spacer from '../../components/common/spacer/spacer'
import PageHeader from '../../components/users/common/page-header/page-header'
import ReservationDetails from '../../components/users/reservations/reservation-details'

const ReservationDetailsPage = () => {
  return (
    <>
      <PageHeader title="Reservation Details"/>
      <Spacer/>
      <ReservationDetails/>
      <Spacer/>
    </>
  )
}

export default ReservationDetailsPage