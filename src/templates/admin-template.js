import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from '../components/admins/common/sidebar/sidebar';

const AdminTemplate = (props) => {
 
    const {children} = props;

    return (
        <Container fluid>
            <Row>
                <Col lg={3} style={{padding:0}}>
                    <SideBar/>
                </Col>
                <Col lg={9}>
                    <Container className='pt-5'>
                        {children}
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminTemplate