import React, { useEffect } from "react";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  createProject,
  deleteProject,
  listProjects,
} from "../actions/projectActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PROJECT_CREATE_RESET } from "../constants/projectsContstants";

const AdminScreen = () => {
  const page = useParams || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingProject,
    error: errorProject,
    projects,
  } = useSelector((state) => state.getProjects);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.projectDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    project: createdProject,
  } = useSelector((state) => state.projectCreate);

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET });
    if (!userInfo) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/projectedit/${createdProject._id}`);
    } else {
      dispatch(listProjects(page));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProject,
    navigate,
    page,
  ]);

  const createProjectHandler = () => {
    dispatch(createProject());
  };

  const deleteProjHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProject(id));
    }
  };
  const deleteCertHandler = (id) => {
    if (window.confirm("Are you sure")) {
      // dispatch(deleteProject(id));
    }
  };

  return (
    <Container className="admin-screen">
      <Container fluid>
        <Row className="align-items-center">
          <Col>
            <h1 style={{ color: "white" }}>Projects</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button
              className="my-3"
              variant="success"
              onClick={createProjectHandler}
            >
              <i className="fas fa-plus"></i> Create Project
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorProject && <Message variant="danger">{errorProject}</Message>}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loadingProject ? (
          <Loader />
        ) : (
          <Table
            striped
            bordered
            responsive
            hover
            variant="dark"
            className="table-sm"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>GITHUB LINK</th>
                <th>LANGUAGES/STACK</th>
                <th>LIVE PROJECT URL</th>
                <th>IMAGE PATH</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => {
                return (
                  <tr key={project._id}>
                    <td>{project._id}</td>
                    <td>{project.name}</td>
                    <td>{project.githubUrl}</td>
                    <td>
                      {project.languages.map((lang, indx) => {
                        return (
                          <p
                            style={{
                              display: "inline",
                              color: "white",
                              padding: "2%",
                            }}
                            key={indx}
                          >
                            {lang}{" "}
                          </p>
                        );
                      })}
                    </td>
                    <td>{project.liveProjectURL}</td>
                    <td>{project.photo}</td>
                    <td>
                      <Link to={`/admin/projectedit/${project._id}`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteProjHandler(project._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Container>
      <Container fluid>
        <Row className="align-items-center">
          <Col>
            <h1 style={{ color: "white" }}>Certificates</h1>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button
              className="my-3"
              variant="success"
              onClick={createProjectHandler}
            >
              <i className="fas fa-plus"></i> Create Certificate
            </Button>
          </Col>
        </Row>
        <Table
          striped
          bordered
          responsive
          hover
          variant="dark"
          className="table-sm"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ISSUING AUTH</th>
              <th>IMAGE URL</th>
              <th>DATE OF COMPLETION</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project._id}</td>
                  <td>{project.name}</td>
                  <td>{project.githubUrl}</td>
                  <td>{project.languages}</td>
                  <td>{project.liveProjectURL}</td>
                  <td>
                    <Link to={`/admin/project/${project._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteCertHandler(project._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </Container>
  );
};

export default AdminScreen;
