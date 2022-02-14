import React from "react";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { FaArrowCircleRight } from "react-icons/fa";

const BlogItem = ({ blog }) => {
  return (
    <Row
      className="project-edit-container"
      style={{ padding: "2.5% ", margin: "5% 0", color: "white" }}
    >
      <Col style={{ textAlign: "center" }} lg={6}>
        <h2>
          {blog.blogTitle.length > 15
            ? blog.blogTitle.substring(0, 15) + "..."
            : blog.blogTitle}
        </h2>
        <Image
          src={blog.blogImageUrl}
          alt="Blog Featured Image"
          style={{ height: "200px" }}
          fluid
        />
      </Col>
      <Col>
        <p>{blog.description}</p>
        <p>Posted on: {formatDate(blog.createdAt)}</p>
      </Col>
      <div style={{ textAlign: "right" }}>
        <Link
          to={`/blog/article/${blog._id}`}
          style={{ textDecoration: "none" }}
        >
          Read More <FaArrowCircleRight style={{ fontSize: "1.5em" }} />
        </Link>
      </div>
    </Row>
  );
};

export default BlogItem;
