import React from 'react'
import Footer from "../components/users/common/footer/footer";
import Header from "../components/users/common/header/header";

const UserTemplate = (props) => {
  
  const {children} = props;

  return (
    <>
      <Header/>
        {children}
      <Footer/>

    </>
  )
}

export default UserTemplate