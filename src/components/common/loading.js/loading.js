import React from 'react'
import "./loading.scss";
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div className='loading'>
    <Spinner animation="border" />;
    </div>
  )
}

export default Loading