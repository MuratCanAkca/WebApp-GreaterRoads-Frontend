import React from 'react'
import "./mobile-app.scss"
import { Col, Container, Row } from 'react-bootstrap'
import SectionHeader from '../../common/section-header/section-header'
import btn from "../../../../assets/img/buttons/phone.jpeg"
import apple from "../../../../assets/img/buttons/app-store.png"
import playStore from "../../../../assets/img/buttons/play-store.png"


const MobileApp = () => {
  return (
    <Container fluid className='mobile-app'>
        <Container>
            <Row className='g-5'>
                <Col md={6}>
                    <SectionHeader title="Download our app to get" subTitle="Download now" alignment=""/>
                    <p>
                        indirmek ıcın buraya gereklı olan acıklama yazılacak ve dafa fazlası bla bla balsdhlakhdoıakuhgdouaıkhgsdoaukhıskhhoıuhdudıhduhıdhsdhıdhuhıusdsudsıud
                    </p>

                    <div className='store'>
                        <a href='https://play.google.com'>
                             <img src={playStore} alt='Download from Google Play' className='img-fluid play-store' />      
                           
                        </a>
                        <a href='https://apple.com'>
                            <img src={apple} alt='Download from App Store' className='img-fluid app-store' />
                        </a>
                    </div>

                </Col>
                <Col md={6} >
                    
                    <img src={btn} alt='' className='img-fluid' />
                </Col>
            </Row>
        </Container>
    </Container>
  )
}

export default MobileApp