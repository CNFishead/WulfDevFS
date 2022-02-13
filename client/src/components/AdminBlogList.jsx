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
// actions/utilites
import { deleteBlog } from "../actions/Blog/deleteBlog";
import { listBlogs } from "../actions/Blog/listBlogs";
import formatDate from "../utils/formatDate";

// constants
import { BLOG_CREATE_RESET } from "../constants/blogConstants";

const AdminBlogList = () => {
  const { blogPageNumber } = useParams() || 1;
  const { keyword } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingBlog,
    blogs,
    pages,
    page,
  } = useSelector((state) => state.listBlogs);

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading: loadingDelete, success: successDelete } = useSelector(
    (state) => state.blogDelete
  );

  const {
    loading: loadingCreate,
    success: successCreate,
    blog: createdBlog,
  } = useSelector((state) => state.blogCreate);

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });
    if (successCreate) {
      navigate(`/admin/blog-edit/${createdBlog._id}`);
    } else {
      dispatch(listBlogs(keyword, blogPageNumber));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdBlog,
    navigate,
    blogPageNumber,
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
      {loadingCreate && <Loader />}
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
              <th>TITLE</th>
              <th>Date</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => {
              return (
                <tr key={blog._id}>
                  <td>{blog.blogTitle}</td>
                  <td>{formatDate(blog.createdAt)}</td>
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
      <Row style={{ width: "100%", margin: "2% 0" }}>
        {pages > 1 && (
          <Pagination style={{ justifyContent: "center" }}>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item
                key={x + 1}
                style={{ color: "#012f41" }}
                href={`/admin/adminscreen/certificates/${x + 1}`}
                active={x + 1 === page}
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

export default AdminBlogList;
