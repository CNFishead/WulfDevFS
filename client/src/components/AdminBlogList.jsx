import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Table, Col, Row, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// components
import Message from "./Message";
import Loader from "./Loader";
// actions
import { deleteBlog, listBlogs } from "../actions/blogActions";

// constants
import { BLOG_CREATE_RESET } from "../constants/blogConstants";

const AdminBlogList = () => {
  const { page, keyword } = useParams() || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingBlog,
    error: errorBlog,
    blogs,
  } = useSelector((state) => state.listBlogs);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.blogDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    blog: createdBlog,
  } = useSelector((state) => state.blogCreate);

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });
    if (successCreate) {
      navigate(`/admin/certificate-edit/${createdBlog._id}`);
    } else {
      dispatch(listBlogs(keyword, page));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdBlog,
    navigate,
    page,
    keyword,
  ]);

  const createBlogHandler = () => {
    navigate("/admin/blog");
  };

  const deleteBlogHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteBlog(id));
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ color: "white" }}>Blogs</h1>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button
            className="my-3"
            variant="success"
            onClick={createBlogHandler}
          >
            <i className="fas fa-plus"></i> Create An Article
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorBlog && <Message variant="danger">{errorBlog}</Message>}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingBlog ? (
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
              <th>TITLE</th>
              <th>BLURB</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              let date = new Date(blog.dateOfCompletion);
              console.log(date);
              return (
                <tr key={blog._id}>
                  <td>{blog._id}</td>
                  <td>{blog.blogTitle}</td>
                  <td>{blog.content.blocks[0].text.substring(0, 40)}</td>
                  <td>
                    <Link to={`/admin/blog-edit/${blog._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteBlogHandler(blog._id)}
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

export default AdminBlogList;
