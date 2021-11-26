import React from "react";
import { Container, Image, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import logo from "../assets/Images/WulfBrandingLogoLightSmall.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <Container fluid className="navbar-container">
        <Link to="/">
          <Image className="navbar-brand-logo" src={logo} alt="logo" />
        </Link>
        <div style={{ textAlign: "end" }}>
          <h2>Wulf Developments</h2>
          <h4>Software Developer</h4>
          <h6
            onClick={
              userInfo
                ? logoutHandler
                : () => {
                    navigate("/login");
                  }
            }
            className="navbar-signature gradient-text"
          >
            Austin Howard
          </h6>
        </div>
      </Container>
      <Container className="nav-links">
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/resume">Resume</Link>
        {userInfo && <Link to="/adminpanel">Admin Panel</Link>}
      </Container>
    </nav>
  );
};

export default Header;
