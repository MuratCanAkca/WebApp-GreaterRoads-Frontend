import React from 'react'
import SectionHeader from '../../common/section-header/section-header'
import Spacer from '../../../common/spacer/spacer'
import { Col, Container, Row } from 'react-bootstrap'
import {MdLocalCarWash ,MdCreditScore} from "react-icons/md"; 
import {TbSteeringWheel} from "react-icons/tb"; 
import "./rent-path.scss"

const RentPath = () => {
  return (
    <section>
        <SectionHeader 
        title="Quick &amp; easy car rental"
        sustitle="Plan your trip now"
        desc="" 
        />
        <Spacer height={50}/>
        <Container className='rent-path'>
            <Row>
                <Col md={4}>
                    <MdLocalCarWash/>
                    <h2>Select car</h2>
                    <p>Select your best car amoung our luxury , hygienic and cheap cars</p>
                </Col>

                <Col md={4}>
                    <MdCreditScore/>
                    <h2>Pay for it</h2>
                    <p>You can pay by credit card , paypall or cash</p>
                </Col>

                <Col md={4}>
                    <TbSteeringWheel/>
                    <h2>Let's Drive</h2>
                    <p>You can drive your rental car until the return time you selected </p>
                </Col>


            </Row>
        </Container>
    </section>
  )
}

export default RentPath