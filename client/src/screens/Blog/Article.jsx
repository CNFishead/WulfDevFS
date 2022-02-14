import React, { useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listBlogDetails } from "../../actions/Blog/listBlogDetails";
import parse from "html-react-parser";

const Article = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, blog } = useSelector((state) => state.blogDetails);
  useEffect(() => {
    if (blog._id !== id) {
      dispatch(listBlogDetails(id));
    }
  }, [blog, dispatch]);

  return (
    <Container className="article-container">
      <div className="banner-container">
        <Image
          src={blog.blogImageUrl}
          alt="featured image banner"
          fluid
          className="banner"
        />
      </div>
      <div className="article-content-container">
        {blog && parse(`${parse(`${blog.content}`)}`)}
      </div>
    </Container>
  );
};

export default Article;
