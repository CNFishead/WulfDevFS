import React, { useEffect, useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// actions
import { listProjects } from "../actions/projectActions";
import { Col, Container, Image, Row, Button } from "react-bootstrap";

const Projects = ({ match }) => {
  const page = useParams || 1;

  const dispatch = useDispatch();

  const { loading, error, projects } = useSelector(
    (state) => state.getProjects
  );
  console.log(projects);
  useEffect(() => {
    dispatch(listProjects(page));
  }, [dispatch, page]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          {projects.map((project) => {
            return (
              <Container fluid key={project._id} className="project-container">
                <Row>
                  <Col className="project-container-left">
                    <Image
                      fluid
                      className="project-container-img"
                      src={project.photo}
                      alt={`${project.name} image`}
                    />
                    <div>
                      <Button>Github Link</Button>
                    </div>
                  </Col>
                  <Col className="project-container-right">
                    <span style={{ width: "100%" }}>{project.name}</span>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Container>
      )}
    </>
  );
};

export default Projects;
