import React from 'react'
import Slider from '../../components/users/home/slider/slider'
import Spacer from '../../components/common/spacer/spacer'
import MobileApp from '../../components/users/home/mobile-app/mobile-app'
import PopularVehicles from '../../components/users/home/popular-vehicles/popular-vehicles'
import WhyChooseUs from '../../components/users/about/why-choose-us/why-choose-us'

const HomePage = () => {
  return (
    <>
      <Slider/>
      <Spacer/>
      <PopularVehicles/>
      <Spacer/>
      <MobileApp/>
      <Spacer/>
   
      <WhyChooseUs/>
      <Spacer/>
    </>
  )
}

export default HomePage