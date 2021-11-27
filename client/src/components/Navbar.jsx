import React from "react";
import { Container, Image, Nav } from "react-bootstrap";
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
      <Nav fill variant="tabs" className="nav-links">
        <Nav.Item activeClass="active">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/blog">Blog</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/projects">
            Projects
          </Nav.Link>
        </Nav.Item>
        {userInfo && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin">
              Admin Screen
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </nav>
  );
};

export default Header;
