import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { listBlogs } from "../../actions/Blog/listBlogs";
// components
import Meta from "../../components/Meta";

const Blogs = () => {
  // eslint-disable-next-line
  const { loading, error, blogs } = useSelector((state) => state.listBlogs);
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();
  // eslint-disable-next-line
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listBlogs(keyword, pageNumber));
    // eslint-disable-next-line
  }, [dispatch]);
  return (
    <>
      <Meta title={`WD | View my blog`} />
      <Container>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div style={{ color: "white" }}>
                <p>{blog.blogTitle}</p>
                <p></p>
              </div>
            );
          })}
      </Container>
    </>
  );
};

export default Blogs;
