import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Image,
  FloatingLabel,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import parse from "html-react-parser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// eslint-disable-next-line

// actions
import { listBlogDetails } from "../../actions/Blog/listBlogDetails";
import { updateBlog } from "../../actions/Blog/updateBlog";
// Components
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
// constants
import { BLOG_UPDATE_RESET } from "../../constants/blogConstants";
import Meta from "../../components/Meta";
import { setAlert } from "../../actions/alert";

const BlogEditScreen = () => {
  // useful declartions
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select from state the items we need
  const { loading, blog } = useSelector((state) => state.blogDetails);
  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    (state) => state.blogUpdate
  );

  // Component State
  const [uploading, setUploading] = useState(false);
  const [show, setShow] = useState(false);
  const [blogData, setBlogData] = useState({
    _id: "",
    blogTitle: "",
    content: "",
    isFeatured: false,
    description: "",
    blogImageUrl: "",
  });
  const editorRef = useRef(null);
  // destructure state
  // eslint-disable-next-line
  const { blogTitle, content, isFeatured, description, blogImageUrl, _id } =
    blogData;
  // Helper Functions go here
  // These functions handle the modal opening and closing.
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    if (editorRef.current) {
      setBlogData({ ...blogData, content: editorRef.current.getContent() });
    }
  };
  // handles the creation of a new blog.
  const handleCreate = () => {
    setShow(false);
    dispatch(
      updateBlog({
        _id,
        blogTitle,
        isFeatured,
        description,
        blogImageUrl,
        content: editorRef.current.getContent(),
      })
    );
  };

  // UseEffect Block should only need to run once, we just want to do two things
  // If a blog is updated, go back to blogs, else, take from state
  // the blog and render the content
  useEffect(() => {
    // On a successful update, navigate back to the blogs page.
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      navigate("/admin/adminscreen");
    } else {
      // if there isnt a blogTitle or id, dispatch to get from state that blog
      if (!blog.blogTitle || blog._id !== id) {
        dispatch(listBlogDetails(id));
      } else {
        // Set the state of the editor.
        setBlogData(blog);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, navigate, successUpdate, blogTitle, blog]);

  const uploadFileHandler = async (e) => {
    // files, is an array, since we have the ability to upload multiple
    // files we only want the first file.
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    //Triggers the Loader component
    setUploading(true);

    //This makes the request to the backend
    try {
      const config = {
        headers: {
          // Has to have the multipart/form-data!
          // Also only Admins can upload a file, need token
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);

      //Once the post request is finished, setImage to data, setUploading to false, to remove Loader
      //Component
      setBlogData({ ...blogData, blogImageUrl: data.data });
      setUploading(false);
    } catch (error) {
      console.error(error);
      dispatch(setAlert(`Image uploading Failed`, "danger"));
      setUploading(false);
    }
  };
  return (
    <>
      <Meta title={`Edit Blog: ${blog.blogTitle}`} />
      <Container className="project-edit-container" style={{ padding: "5%" }}>
        {loadingUpdate && <Loader />}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Form style={{ width: "75%", margin: "5% auto" }}>
              <FormContainer>
                <Container style={{ padding: "5% 0" }}>
                  <h4 style={{ color: "white" }}>Blog Image</h4>
                  <Image src={`${blogImageUrl}`} fluid />
                </Container>
                <Form.Group>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Blog Title"
                    className="mb-3"
                  >
                    <Form.Control
                      value={blogTitle}
                      name="title"
                      placeholder="Title"
                      onChange={(e) =>
                        setBlogData({ ...blogData, blogTitle: e.target.value })
                      }
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                  <Form.Control
                    type="text"
                    value={blogImageUrl}
                    onChange={(e) =>
                      setBlogData({ ...blogData, blogImageUrl: e.target.value })
                    }
                  />
                  <Form.Control type="file" onChange={uploadFileHandler} />
                  {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId="description">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Blog Summary"
                    className="mb-3"
                  >
                    <Form.Control
                      as="textarea"
                      value={description}
                      placeholder="Blog Summary"
                      style={{ height: "100px" }}
                      onChange={(e) =>
                        setBlogData({
                          ...blogData,
                          description: e.target.value,
                        })
                      }
                      required
                    ></Form.Control>
                    <Form.Text id="descriptionHelpBlock" muted>
                      Please enter a good description of the blog, it must be
                      less than 500 characters. {500 - description.length}/500
                      characters remaining, This will be displayed on the Blogs
                      page.
                    </Form.Text>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Featured Article?"
                    value={isFeatured}
                    onChange={(e) =>
                      setBlogData({ ...blogData, isFeatured: !isFeatured })
                    }
                    style={{ color: "white" }}
                  />
                  <Form.Text id="descriptionHelpBlock" muted>
                    Featured Articles, will display on the Home Page
                  </Form.Text>
                </Form.Group>
              </FormContainer>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={parse(blogData.content)}
                apiKey="dh9kclzz1mh67rg0cyvkmrqs6rso8b5aunovwvd57l9fz4qw"
                init={{
                  height: 500,
                  menubar: "insert",
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor codesample",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount autolink",
                  ],
                  toolbar:
                    "undo redo | formatselect | image | codesample |" +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  codesample_languages: [
                    { text: "HTML/XML", value: "markup" },
                    { text: "JavaScript", value: "javascript" },
                    { text: "CSS", value: "css" },
                  ],
                }}
              />
              <Container
                style={{ paddingTop: "5%", textAlign: "center" }}
                fluid
              >
                <Button variant="primary" onClick={handleShow}>
                  See the article
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{blogTitle}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div style={{ textAlign: "center" }}>
                      <h6>Description</h6>
                      <p>{description}</p>
                    </div>
                    <div className="article-content-container">
                      {editorRef.current &&
                        parse(editorRef.current.getContent())}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {isFeatured && (
                        <code>
                          This article will be featured on the home page!
                        </code>
                      )}
                    </div>
                  </Modal.Body>
                  <Button variant="secondary" onClick={handleClose}>
                    Keep Editing
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleCreate}
                    type="submit"
                  >
                    Update Blog
                  </Button>
                </Modal>
              </Container>
            </Form>
          </>
        )}
      </Container>
    </>
  );
};

export default BlogEditScreen;
