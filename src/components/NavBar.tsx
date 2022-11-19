import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Route, Routes, Link, Router} from "react-router-dom";
import Game from "../pages/Game";
import React from "react";


function ColorSchemesExample() {
  return (
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to ="/">Ping Pong :)</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to='/Game'>Game</Nav.Link>
            <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
            <Nav.Link as={Link} to="/Settings">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default ColorSchemesExample;