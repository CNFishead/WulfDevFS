import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
// actions
import { listProjects } from "../actions/Project/listProjects";
import { deleteProject } from "../actions/Project/deleteProject";
import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Meta from "../components/Meta";
import ProjectItem from "./ProjectItem";

const Projects = () => {
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const {
    loading,
    projects,
    page: projectPage,
    pages,
  } = useSelector((state) => state.getProjects);
  const { loading: loadingDelete, success: successDelete } = useSelector(
    (state) => state.projectDelete
  );

  useEffect(() => {
    dispatch(listProjects(keyword, pageNumber));
    // eslint-disable-next-line
  }, [dispatch, pageNumber, successDelete]);

  return (
    <>
      <Meta title={`WD | See my latest projects`} />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {loadingDelete && <Loader />}
          {projects &&
            projects.map((project) => {
              return <ProjectItem project={project} />;
            })}
          <Row style={{ width: "100%" }}>
            <Paginate
              pages={pages}
              page={projectPage}
              keyword={keyword ? keyword : ""}
            />
          </Row>
        </Container>
      )}
    </>
  );
};

export default Projects;
