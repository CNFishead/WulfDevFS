import React, { useEffect, useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// actions
import { listProjects, deleteProject } from "../actions/projectActions";
import { Col, Container, Image, Row, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Projects = ({ match }) => {
  const page = useParams || 1;

  const dispatch = useDispatch();

  const { loading, error, projects } = useSelector(
    (state) => state.getProjects
  );
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.projectDelete);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProject(id));
    }
  };
  useEffect(() => {
    console.log(projects);
    dispatch(listProjects(page));
    // eslint-disable-next-line
  }, [dispatch, page, successDelete]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {projects.map((project) => {
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
                    <Nav
                      fill
                      className="project-links"
                      style={{ padding: "5%" }}
                    >
                      <Nav.Item>
                        <Nav.Link href={project.githubUrl}>
                          <i className="fab fa-github" /> Github Link
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link href={project.liveProjectURL}>
                          <i className="fas fa-external-link-alt" /> Live
                          Project
                        </Nav.Link>
                      </Nav.Item>
                      {userInfo && (
                        <>
                          <Nav.Item>
                            <Nav.Link
                              as={Link}
                              to={`/admin/projectedit/${project._id}`}
                              className="project-link-edit"
                            >
                              <i className="fas fa-edit" /> Edit Project
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item onClick={() => deleteHandler(project._id)}>
                            <Nav.Link href="" className="project-link-delete">
                              <i className="fas fa-trash-alt" /> Delete
                            </Nav.Link>
                          </Nav.Item>
                        </>
                      )}
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
          })}
        </Container>
      )}
    </>
  );
};

export default Projects;
