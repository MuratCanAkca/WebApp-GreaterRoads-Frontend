import React from 'react'
import PageHeader from '../../components/users/common/page-header/page-header'
import Spacer from '../../components/common/spacer/spacer'
import RentPath from '../../components/users/about/rent-path/rent-path'
import WhyChooseUs from '../../components/users/about/why-choose-us/why-choose-us'

const AboutPage = () => {
  return (
    <>
        
        <PageHeader title="About Us" />
        <Spacer height={50}/>
        <RentPath/>
        <Spacer height={50}/>
        <WhyChooseUs/>
        <Spacer />
    </>

  )
}

export default AboutPage