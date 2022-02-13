import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { socials } from "../assets/data/socials";

const Footer = () => {
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let year = dateObj.getUTCFullYear();

  let newdate = month + "/" + year;
  return (
    <footer style={{ sticky: "bottom", textAlign: "center" }}>
      <Container className="social-links">
        {socials.map((social, indx) => {
          return (
            <div key={indx} className="social-link">
              <a href={social.social_link}>
                <i className={`${social.social_fa_icon} social-link-icon`} />
              </a>
            </div>
          );
        })}
        <Row>
          <Col style={{ color: "#f3ec78" }}>
            <p>Connect with me!</p>
            <p>Wulf Developments {newdate}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
