import React, { useEffect } from "react";
//importing typewriter-effect
import Typewriter from "typewriter-effect";
import { Container, Row } from "react-bootstrap";
import Meta from "../components/Meta";

// actions
import { useDispatch, useSelector } from "react-redux";
import BlogItem from "./Blog/BlogItem";
import { getFeaturedArticles } from "../actions/Blog/getFeaturedArticles";
import { listProjects } from "../actions/Project/listProjects";
import { Link } from "react-router-dom";
import ProjectItem from "./ProjectItem";

const Home = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.listBlogs);
  const { projects } = useSelector((state) => state.getProjects);

  const mostRecentProject = projects[0];

  useEffect(() => {
    dispatch(listProjects());
    dispatch(getFeaturedArticles());
  }, [dispatch]);
  return (
    <>
      <Meta title={`WD | Home`} />
      <Container style={{ padding: "5%" }}>
        <div className="typeWriterContainer">
          <div className="typeWriterParent">
            <p className="typeWriterIntro">Hi, I am Austin Howard,</p>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("a Father.")
                  .pauseFor(1000)
                  .deleteAll()

                  .typeString("a Husband.")
                  .pauseFor(1000)
                  .deleteAll()

                  .typeString("a Singer.")
                  .pauseFor(1000)
                  .deleteAll()

                  .typeString("a Visionary.")
                  .pauseFor(1000)
                  .deleteAll()

                  .typeString("a Software Developer!")

                  .start();
              }}
            />
          </div>
          <Row style={{ marginTop: "2%" }}>
            <div style={{ textAlign: "center", padding: "5% 0" }}>
              <h4>Featured Articles</h4>
              <Link to="/list-blogs" style={{ textDecoration: "none" }}>
                See more
              </Link>
            </div>
            {blogs &&
              blogs.map((b) => {
                if (b.isFeatured === true) {
                  return <BlogItem blog={b} />;
                }
                return <div></div>;
              })}
          </Row>
          <Row style={{ marginTop: "2%" }}>
            <div style={{ textAlign: "center", padding: "5% 0" }}>
              <h4>Most Recent Project</h4>
              <Link to="/projects" style={{ textDecoration: "none" }}>
                See more
              </Link>
            </div>
            {mostRecentProject !== undefined && (
              <ProjectItem project={mostRecentProject} />
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
