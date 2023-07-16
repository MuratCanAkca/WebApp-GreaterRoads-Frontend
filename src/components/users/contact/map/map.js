import React from 'react'
import { Container } from 'react-bootstrap'
import { settings } from '../../../../utils/settings'

const Map = () => {
  return (
    <Container fluid>
     <iframe src={settings.mapEmbedUrl}
     width="100%" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
     </Container>
  )
}

export default Map