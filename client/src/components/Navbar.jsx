import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/Images/WulfBrandingLogoLightSmall.png";

const Header = () => {
  return (
    <nav className="navbar">
      <Container fluid className="navbar-container">
        <Link to="/">
          <Image className="navbar-brand-logo" src={logo} alt="logo" />
        </Link>
        <div style={{ textAlign: "end" }}>
          <h2>Wulf Developments</h2>
          <h4>Software Developer</h4>
          <h6 className="navbar-signature gradient-text">Austin Howard</h6>
        </div>
      </Container>
      <Container className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/resume">Resume</Link>
      </Container>
    </nav>
  );
};

export default Header;
