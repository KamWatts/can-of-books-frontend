import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>Best Books by Kameron Watts and Anthony Keith</Navbar.Brand>
      </Navbar>
    )
  }
}

export default Footer;
