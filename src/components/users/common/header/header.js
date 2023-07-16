import React from 'react'
import {  Container , Nav , Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import logo from "../../../../assets/img/logo/logo.png";
import { settings } from '../../../../utils/settings';
import "./header.scss";
import UserMenu from './user-menu';

const Header = () => {
  return (
    <Navbar bg="white" expand="lg" className='sticky-top main-navbar'>
    <Container >
      <Navbar.Brand as={Link} to="/" title={settings.siteName}>
        <img src={logo} alt={settings.siteName} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mx-auto my-2 my-lg-0"
         
        >
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/vehicles">Vehicles</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/Contact">Contact</Nav.Link>
         
        </Nav>
        
          <UserMenu/>
       
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header