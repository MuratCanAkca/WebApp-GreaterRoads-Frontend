import React from 'react'
import Loading from '../../components/common/loading.js/loading'
import logo from "../../assets/img/logo/logo.png";
import "./loading-page.scss"
import { Spinner } from 'react-bootstrap';

const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <Loading/>
      {/* <Spinner animation='border' variant='primary' /> */}
      <img src={logo} />
    </div>
  )
}

export default LoadingPage