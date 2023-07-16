import React from 'react'
import "./why-choose-us.scss";
import { Button, Col, Container, Row } from 'react-bootstrap';
import logo from "../../../../assets/img/buttons/wcu.jpeg"
import SectionHeader from '../../common/section-header/section-header';
import {GiPayMoney ,GiTakeMyMoney ,GiVacuumCleaner} from "react-icons/gi"
import Spacer from '../../../common/spacer/spacer';

const WhyChooseUs = () => {
  return (
    <Container fluid className='why-choose-us'>
        <img src={logo} alt='vehicles' className='img-fluid' />
        <Spacer height={30}/>
        <Container>
            <Row>
                <Col md={6}>
                    <SectionHeader 
                    title="Best valued deals you will ever find"
                    subtitle="Whu choose us" />
                    <p>Whether you are flying into undefined for a short break or a longer stay , you can take the stress out of your onward journey by renting car</p>
                    <Button className='btnAbout' variant="primary">Rent Now</Button>
                </Col>
                <Col md={6}>
                    <ul>
                        <li>
                            <div><GiPayMoney/></div>
                            <div>
                                <h3>Price Equalization</h3>
                                <p>İf you find the same service cheaper , we will provide the service at the price you found</p>
                            </div>
                        </li>
                        <li>
                            <div><GiTakeMyMoney/></div>
                            <div>
                                <h3>No Extra price</h3>
                                <p>You will not encounter surprise payments. You know exactly what you're paying for</p>
                            </div>
                        </li>
                        <li>
                            <div><GiVacuumCleaner/></div>
                            <div>
                                <h3>Hygienic Cars</h3>
                                <p>We disinfect our vehicles before giving them to you to keep you safe in the drivers's seat</p>
                            </div>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    </Container>
  )
}

export default WhyChooseUs