import React from "react";
import { Col, Container, Image, Nav, Row } from "react-bootstrap";

const ProjectItem = ({ project }) => {
  return (
    <Container fluid key={project._id} className="project-container">
      <Row>
        <Row className="project-container-title">
          <Col>{project.name}</Col>
        </Row>
        <Col lg={6} className="project-container-left">
          <Image
            fluid
            className="project-container-img"
            src={project.photo}
            alt={`${project.name} image`}
          />
          <Nav fill className="project-links" style={{ padding: "5%" }}>
            <Nav.Item>
              <Nav.Link href={project.githubUrl}>
                <i className="fab fa-github" /> Github Link
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={project.liveProjectURL}>
                <i className="fas fa-external-link-alt" /> Live Project
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col className="project-container-right">
          <Container>
            <h4
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Description
            </h4>
            <p style={{ textIndent: "40px", color: "white" }}>
              {project.description}
            </p>
          </Container>
          <Container fluid>
            <h4
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              Languages/Stack Used
            </h4>
            <Container fluid style={{ textAlign: "center" }}>
              {project.languages.map((language, indx) => {
                return (
                  <p
                    style={{
                      display: "inline",
                      color: "white",
                      padding: "2%",
                    }}
                    key={indx}
                  >
                    {language}{" "}
                  </p>
                );
              })}
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectItem;
