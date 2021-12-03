import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { listBlogs } from "../actions/blogActions";

const Blogs = () => {
  // eslint-disable-next-line
  const { loading, error, blogs } = useSelector((state) => state.listBlogs);
  const { page, keyword } = useParams() || 1;
  // eslint-disable-next-line
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listBlogs(keyword, page));
    // eslint-disable-next-line
  }, []);
  return (
    <Container>
      {blogs.map((blog) => {
        return (
          <div style={{ color: "white" }}>
            <p>{blog.blogTitle}</p>
            <p>{blog.content.blocks[0].text}</p>
          </div>
        );
      })}
    </Container>
  );
};

export default Blogs;
