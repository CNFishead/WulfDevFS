import React, { useEffect } from "react";

import { Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { listBlogs } from "../../actions/Blog/listBlogs";
// components
import Meta from "../../components/Meta";
import Loader from "../../components/Loader";
// actions
import BlogItem from "./BlogItem";
const Blogs = () => {
  // eslint-disable-next-line
  const { loading, blogs } = useSelector((state) => state.listBlogs);
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
        {loading ? (
          <Loader />
        ) : (
          blogs &&
          blogs.map((blog) => {
            return <BlogItem blog={blog} />;
          })
        )}
      </Container>
    </>
  );
};

export default Blogs;
