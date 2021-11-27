import React, { useEffect, useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
// actions
import { listProjects } from "../actions/projectActions";

const Projects = ({ match }) => {
  const { page } = useParams || 1;

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
        <>
          {projects.map((project, indx) => {
            return (
              <div
                key={project._id}
                style={{
                  background: "white",
                  padding: "2%",
                  margin: "10px auto",
                }}
              >
                <span>{project.name}</span>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Projects;
