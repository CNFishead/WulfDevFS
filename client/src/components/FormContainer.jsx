import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container style={{ padding: "2% 0", textAlign: "center" }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={12} lg={8}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
