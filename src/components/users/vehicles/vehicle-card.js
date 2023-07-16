import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { getVehicleImage } from '../../../utils/functions/vehicle';
import "./vehicle-card.scss"
import {Link} from "react-router-dom";

const VehicleCard = (props) => {
    const{id , model , image , pricePerHour} = props;
  return (
    <Card className='vehicle-card'>
      <Card.Img variant="top" src={getVehicleImage(image)} />
      <Card.Body>
        <Card.Title>{model}</Card.Title>
        <Card.Text>
           <sup>$</sup> {pricePerHour.toFixed(2)}
           <span>/hour</span>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <Button variant="dark" as={Link} to={`/vehicles/${id}`}>Rent Car</Button>
      <Button variant="primary" as={Link} to={`/vehicles/${id}`}>Details</Button>
      </Card.Footer>
    </Card>
  )
}

export default VehicleCard