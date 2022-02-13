import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Button,
  Table,
  Col,
  Row,
  Container,
  Pagination,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// components
import Loader from "./Loader";
// actions
import { listProjects } from "../actions/Project/listProjects";
import { createProject } from "../actions/Project/createProject";
import { deleteProject } from "../actions/Project/deleteProject";
// constants
import { PROJECT_CREATE_RESET } from "../constants/projectsContstants";

const AdminProjectsList = () => {
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingProject,
    projects,
    pages,
    page: projectPage,
  } = useSelector((state) => state.getProjects);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingDelete, success: successDelete } = useSelector(
    (state) => state.projectDelete
  );

  const {
    loading: loadingCreate,
    success: successCreate,
    project: createdProject,
  } = useSelector((state) => state.projectCreate);

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET });
    if (successCreate) {
      navigate(`/admin/projectedit/${createdProject._id}`);
    } else {
      dispatch(listProjects(keyword, pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdProject,
    navigate,
    pageNumber,
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

      {loadingCreate && <Loader />}
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
              <th>NAME</th>
              <th>GITHUB LINK</th>
              <th>LANGUAGES/STACK</th>
              <th>IMAGE PATH</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              return (
                <tr key={project._id}>
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
      <Row style={{ width: "100%", margin: "2% 0" }}>
        {pages > 1 && (
          <Pagination style={{ justifyContent: "center" }}>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item
                key={x + 1}
                style={{ color: "#012f41" }}
                href={`/admin/adminscreen/projects/${x + 1}`}
                active={x + 1 === projectPage}
              >
                {x + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Row>
    </Container>
  );
};

export default AdminProjectsList;
