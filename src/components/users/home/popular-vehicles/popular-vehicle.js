import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { settings } from '../../../../utils/settings';
import {RiGasStationFill , RiCarLine , RiCaravanLine} from "react-icons/ri";
import { IoIosSnow } from 'react-icons/io';
import {MdOutlineAirlineSeatReclineExtra} from "react-icons/md";
import {GiJoystick , GiCalendarHalfYear} from "react-icons/gi";
import { Button } from 'react-bootstrap';
import "./popular-vehicle.scss";
import Spacer from '../../../common/spacer/spacer';
import { getVehicleImage } from '../../../../utils/functions/vehicle';
import {Link} from "react-router-dom";
//import { getVehicleImage } from '../../../../api/vehicle-service';


const PopularVehicle = (props) => {

    /* const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState("") */

    const {activeVehicle} =props;
    const {image , model , age , airCondinitioning , doors , fuelType , id , luggage , pricePerHour , seats , transmission} = activeVehicle;

  /*   const loadImage =async () => { 
        if(!image) return;
        setLoading(true);
        try {
            
            const resp = await getVehicleImage(image);
            const imageBase64=Buffer.from(resp.data).toString("base64");
            //resimi string formatına ceviriyor
            setImageSrc(`data:${resp.headers["content-type"]};base64,${imageBase64}`);

        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }


    useEffect(() => {
     
        loadImage();

    }, [activeVehicle]) */
    


  return (
    <Container className='popular-vehicle'>
        <Row className='g-5'>
            <Col md={8}>
                <img src={`${settings.apiURL}/files/display/${image[0]}`} className='img-fluid' alt={model}/>
            </Col>
            <Col md={4}>
                <h2>
                    <sup>$</sup>
                    <span>{pricePerHour}</span>
                </h2>
                <p>rent per hour</p>

                <ul>
                    <li><RiCarLine/> Model: {model}</li>
                    <li><RiCarLine/> Doors: {doors}</li>
                    <li><MdOutlineAirlineSeatReclineExtra/> Seats: {seats}</li>
                    <li><RiCaravanLine/> Luggage: {luggage}</li>
                    <li><GiJoystick/> Transmission:{transmission}</li>
                    {airCondinitioning && <li><IoIosSnow/> Air conditioning</li>} 
                    <li><RiGasStationFill/> Fuel Type: {fuelType}</li>
                    <li><GiCalendarHalfYear/> Age: {age}</li>
                </ul>
                <Spacer height={30}/>
                <Button variant='primary' as={Link} to={`/vehicles/${id}`} >Rent Now</Button>

            </Col>
        </Row>
    </Container>
  )
}

export default PopularVehicle