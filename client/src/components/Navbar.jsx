import React from "react";
import { Container, Image, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/Auth/logout";
import logo from "../assets/Images/WulfBrandingLogoLightSmall.png";

// Resume
import resume from "../assets/data/AustinResume.docx";
import { socials } from "../assets/data/socials";

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
          <div className="social-links">
            {socials.map((social, indx) => {
              return (
                <div key={indx} className="social-link">
                  <a href={social.social_link}>
                    <i
                      className={`${social.social_fa_icon} social-link-icon`}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <Nav fill className="nav-links">
        <Nav.Item>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/certificates">Certificates</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/projects">
            Projects
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={resume} download>
            <i className="fas fa-file-download" /> Resume
          </Nav.Link>
        </Nav.Item>
        {userInfo && (
          <Nav.Item>
            <Nav.Link as={Link} to="/admin/adminscreen">
              Admin Screen
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </nav>
  );
};

export default Header;
