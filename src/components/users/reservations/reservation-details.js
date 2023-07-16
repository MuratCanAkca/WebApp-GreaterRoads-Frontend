import React, { useEffect, useState } from 'react'
import { Accordion, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import { getReservation } from '../../../api/reservation-service';
import Loading from '../../common/loading.js/loading';
import {GiCheckMark} from "react-icons/gi";
import {BsArrowBarLeft} from "react-icons/bs";
import { getVehicleImage } from '../../../utils/functions/vehicle';
import { formatDateTimeToLLL } from '../../../utils/functions/date-time';

const ReservationDetails = () => {

    const [loading, setLoading] = useState(true)
    const [reservation, setReservation] = useState({})
    const {reservationId} = useParams();
    const navigate = useNavigate();

    const loadData = async() => {

        try {
            const resp = await getReservation(reservationId);
            setReservation(resp.data);

        } catch (error) {
            
            console.log(error);

        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        
        loadData();

    }, [])
    
    
    
  return (
    <Container>
        {loading ? <Loading/> :
        <Row>
            <Col md={6}>
                <h2 className='text-center'>{reservation.carId.model}</h2>
                <img src={getVehicleImage(reservation.carId.image)} alt={reservation.carId.model} className='img-fluid'/>
                <Button variant='primary' onClick={()=> navigate(-1)}><BsArrowBarLeft/>Back to Reservations</Button>
            </Col>
            <Col md={6}>

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                    <Accordion.Header>Reservation Details</Accordion.Header>
                    <Accordion.Body>

                    <Table striped bordered hover>
                        
                        <tbody>

                            <tr>
                                <td>Pick Up Location</td>
                                <td>{reservation.pickUpLocation}</td>
                            </tr>

                            <tr>
                                <td>Drop Off Location</td>
                                <td>{reservation.dropOffLocation}</td>
                            </tr>

                            <tr>
                                <td>Pick Up Time</td>
                                <td>{formatDateTimeToLLL(reservation.pickUpTime)}</td>
                            </tr>

                            <tr>
                                <td>Drop Off Time</td>
                                <td>{formatDateTimeToLLL(reservation.dropOffTime)}</td>
                            </tr>

                            <tr>
                                <td>Status</td>
                                <td>{reservation.status}</td>
                            </tr>

                            <tr>
                                <td>Price</td>
                                <td>${reservation.totalPrice}</td>
                            </tr>
                           
                        </tbody>
                    </Table>
          
                    </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                    <Accordion.Header>Vehicle Details</Accordion.Header>
                    <Accordion.Body>

                    <Table striped bordered hover>
                        
                        <tbody>

                            <tr>
                                <td>Model</td>
                                <td>{reservation.carId.model}</td>
                            </tr>

                            <tr>
                                <td>Doors</td>
                                <td>{reservation.carId.doors}</td>
                            </tr>

                            <tr>
                                <td>Seats</td>
                                <td>{reservation.carId.seats}</td>
                            </tr>

                            <tr>
                                <td>Luggage</td>
                                <td>{reservation.carId.luggage}</td>
                            </tr>

                            <tr>
                                <td>Transmission</td>
                                <td>{reservation.carId.transmission}</td>
                            </tr>

                           {reservation.carId.airConditioning &&  
                           <tr>
                                <td>Air conditioning</td>
                                <td><GiCheckMark/></td>
                            </tr>}

                            <tr>
                                <td>Fuel Type</td>
                                <td>{reservation.carId.fuelType}</td>
                            </tr>

                            <tr>
                                <td>Age</td>
                                <td>{reservation.carId.age}</td>
                            </tr>
                           
                        </tbody>
                    </Table>
          
                    </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

            </Col>
        </Row>
        }
    </Container>
  )
}

export default ReservationDetails