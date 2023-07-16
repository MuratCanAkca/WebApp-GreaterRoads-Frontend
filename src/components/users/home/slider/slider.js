import React from 'react'
import "./slider.scss"
import { Carousel } from 'react-bootstrap'
import sliderData from "./slider.json";

const Slider = () => {
  return (
    <div className='slider'>
        
    <Carousel>
        {sliderData.map((item , index) =>(
            <Carousel.Item key={index}>
            <img
             
              src={require(`../../../../assets/img/slider/${item.image}`)}
              alt={item.title}
            />
            <Carousel.Caption>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </Carousel.Caption>
            </Carousel.Item>
        ))}
        
    </Carousel>

    </div>
  )
}

export default Slider