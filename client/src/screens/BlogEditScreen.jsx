import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Button, Modal } from "react-bootstrap";
import parse from "html-react-parser";
import draftToHtml from "draftjs-to-html";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
// eslint-disable-next-line
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"; // optional ( for default css style )

// actions
import { listBlogDetails, updateBlog } from "../actions/blogActions";
// Components
import Loader from "../components/Loader";
import Message from "../components/Message";
// constants
import { BLOG_UPDATE_RESET } from "../constants/blogConstants";

const BlogEditScreen = () => {
  // useful declartions
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  // Select from state the items we need
  const { loading, error, blog } = useSelector((state) => state.blogDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.blogUpdate);
  const { userInfo } = useSelector((state) => state.userLogin);

  // Component State
  // eslint-disable-next-line
  const [uploading, setUploading] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(
      draftToHtml(convertFromRaw(blog.content.blocks))
    )
  );
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // Helper Functions go here
  // These functions handle the modal opening and closing.
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // handles the creation of a new blog.
  const handleCreate = () => {
    setShow(false);
    dispatch(updateBlog({ blogTitle: title, content }));
  };
  const getHtml = (editorState) =>
    draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const updateTextDescription = async (state) => {
    await setEditorState(state);
    setContent(convertToRaw(editorState.getCurrentContent()));
  };

  const submitHandler = () => {
    console.log(`updated`);
  };

  // UseEffect Block should only need to run once, we just want to do two things
  // If a blog is updated, go back to blogs, else, take from state
  // the blog and render the content
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    // On a successful update, navigate back to the blogs page.
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET });
      navigate("/blogs");
    } else {
      // if there isnt a blogTitle or id, dispatch to get from state that blog
      if (!blog.blogTitle || blog._id !== id) {
        dispatch(listBlogDetails(id));
      } else {
        // Set the state of the editor.
        setTitle(blog.blogTitle);
        console.log(title);
        setContent(updateTextDescription(blog.content.blocks[0]));
      }
    }
    // eslint-disable-next-line
  }, [dispatch, navigate, successUpdate, title, updateTextDescription]);

  return (
    <Container>
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form style={{ padding: "8%" }} onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <FloatingLabel
              controlId="floatingInput"
              label="Blog Title"
              className="mb-3"
            >
              <Form.Control
                type="name"
                value={title}
                placeholder="palceholder"
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <div>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="rich-editor demo-wrapper"
              editorClassName="editorClassName"
              onEditorStateChange={updateTextDescription}
            />
          </div>
          <Container style={{ paddingTop: "5%", textAlign: "center" }}>
            <Button variant="primary" onClick={handleShow}>
              See the article
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{parse(getHtml(editorState))}</Modal.Body>
              <Button variant="secondary" onClick={handleClose}>
                Keep Editing
              </Button>
              <Button variant="success" onClick={handleCreate}>
                Create Post
              </Button>
            </Modal>
          </Container>
        </Form>
      )}
    </Container>
  );
};

export default BlogEditScreen;
