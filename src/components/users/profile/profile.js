import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { useSelector } from 'react-redux';
import {FaUserCircle} from "react-icons/fa"
import ProfileForm from './profile-form';
import PasswordForm from './password-form';

const Profile = () => {

    const user = useSelector((state) => state.auth.user);

  return (
    <Container>
        <Row className='g-5'>
            <Col lg={2}>
                <FaUserCircle size="120"/>
                <h4>{`${user.firstName} ${user.lastName}`}</h4>
                <p>{user.email}</p>
            </Col>
            
            <Col lg={5}>
                <h3>Update Profile</h3>
                <ProfileForm user={user}/>
            </Col>

            <Col lg={5}>
                <h3>Update Password</h3>
                <PasswordForm/>
            </Col>
        </Row>
    </Container>
  )
}

export default Profile