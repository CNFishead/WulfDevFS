import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js"; // optional ( for default css style )
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import draftToHtml from "draftjs-to-html";
import parse from "html-react-parser";
import { Container, Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { createBlog } from "../actions/blogActions";
import { useNavigate, useParams } from "react-router";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = () => {
    setShow(false);
    dispatch(createBlog({ blogTitle: title, content }));
  };
  const getHtml = (editorState) =>
    draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const updateTextDescription = async (state) => {
    await setEditorState(state);
    setContent(convertToRaw(editorState.getCurrentContent()));
  };

  const { loading, error, blog } = useSelector((state) => state.blogDetails);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.blogUpdate);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, id, successUpdate, dispatch, loading, blog, userInfo]);
  console.log(content);
  const submitHandler = () => {};

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
                placeholder="Project Name"
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

export default Blog;
