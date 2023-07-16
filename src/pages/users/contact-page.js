import React from 'react'
import PageHeader from '../../components/users/common/page-header/page-header'
import Spacer from '../../components/common/spacer/spacer'
import ContactForm from '../../components/users/contact/contact-form/contact-form'
import Map from '../../components/users/contact/map/map'

const ContactPage = () => {
  return (
    <>
    
      <PageHeader title="Contact Us" />
      <Spacer/>
      <ContactForm/>
      <Spacer/>
      <Map/>

    </>
  )
}

export default ContactPage