import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Table, Col, Row, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// components
import Message from "./Message";
import Loader from "./Loader";
// actions
import {
  listProjects,
  createProject,
  deleteProject,
} from "../actions/projectActions";
// constants
import { PROJECT_CREATE_RESET } from "../constants/projectsContstants";

const AdminProjectsList = () => {
  const { page, keyword } = useParams() || 1;
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
    if (successCreate) {
      navigate(`/admin/projectedit/${createdProject._id}`);
    } else {
      dispatch(listProjects(keyword, page));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProject,
    navigate,
    page,
    keyword,
  ]);

  const createProjectHandler = () => {
    dispatch(createProject());
  };

  const deleteProjHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProject(id));
    }
  };
  return (
    <Container fluid>
      <Row>
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
                          }}
                          key={indx}
                        >
                          {lang},{" "}
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
  );
};

export default AdminProjectsList;
