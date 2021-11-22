import React from "react";
import {
  Container,
  Image,
  Navbar,
  Offcanvas,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/WulfBrandingLogoLightSmall.png";

const Header = () => {
  return (
    <Navbar bg="dark" expand={false} variant="dark" sticky="top">
      <Container fluid className="header">
        <Navbar.Brand as={Link} to="/" style={{ margin: "0 auto" }}>
          <Image src={logo} style={{ borderRadius: "50%" }} />
        </Navbar.Brand>
        <Navbar.Text>
          <h1>Wulf Developments</h1>
        </Navbar.Text>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          style={{ position: "absolute", top: "5%", right: "5%" }}
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <h3>Junior Software Devloper</h3>
              <h6>Austin Howard</h6>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                <NavDropdown.Item as={Link} to="/action">
                  Action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
