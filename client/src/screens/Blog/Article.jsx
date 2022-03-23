import React, { useEffect } from "react";
import { Alert, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listBlogDetails } from "../../actions/Blog/listBlogDetails";
import parse from "html-react-parser";
import Loader from "../../components/Loader";

const Article = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, blog } = useSelector((state) => state.blogDetails);
  useEffect(() => {
    if (blog._id !== id) {
      dispatch(listBlogDetails(id));
    }
  }, [blog, dispatch, id]);

  return (
    <Container className="article-container">
      {loading ? (
        <Loader />
      ) : !blog ? (
        <>
          <div className="banner-container">
            <Image
              src={blog.blogImageUrl}
              alt="featured image banner"
              fluid
              className="banner"
            />
          </div>
          <div className="article-content-container">
            {parse(`${parse(`${blog.content}`)}`)}
          </div>
        </>
      ) : (
        <div>
          <Alert variant="danger">Something Went Wrong</Alert>
        </div>
      )}
    </Container>
  );
};

export default Article;
