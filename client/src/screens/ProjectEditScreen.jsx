import React, { useEffect, useState } from "react";
import { Container, Form, Button, FloatingLabel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { PROJECT_UPDATE_RESET } from "../constants/projectsContstants";
import { listProjectDetails, updateProject } from "../actions/projectActions";
import axios from "axios";
// import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const ProjectEditScreen = ({ match }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveProjectURL, setLiveProjectURL] = useState("");
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, project } = useSelector(
    (state) => state.projectDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.projectUpdate);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET });
      navigate("/projects");
    } else {
      if (!project.name || project._id !== id) {
        dispatch(listProjectDetails(id));
      } else {
        setName(project.name);
        setPhoto(project.photo);
        setGithubUrl(project.githubUrl);
        setLiveProjectURL(project.liveProjectURL);
        setLanguages(project.languages);
        setDescription(project.description);
      }
    }
  }, [navigate, id, successUpdate, dispatch, loading, project]);

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
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/uploads", formData, config);

      //Once the post request is finished, setImage to data, setUploading to false, to remove Loader
      //Component
      setPhoto(data.data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProject({
        _id: id,
        name,
        photo,
        languages,
        description,
      })
    );
  };
  return (
    <Container className="project-edit-container">
      <Container>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <FormContainer>
            <h1 style={{ color: "white" }}>Edit Project</h1>
            <Container style={{ padding: "5%" }}>
              <h4 style={{ color: "white" }}>Project Image</h4>
              <Image src={`/${photo}`} fluid />
            </Container>
            <Form onSubmit={submitHandler} style={{ color: "black" }}>
              <Form.Group controlId="name">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Project name"
                  className="mb-3"
                >
                  <Form.Control
                    type="name"
                    value={name}
                    placeholder="Project Name"
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="githubUrl">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Github URL"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={githubUrl}
                    placeholder="Github URL"
                    onChange={(e) => setGithubUrl(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="liveProjectURL">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Live Project Location"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={liveProjectURL}
                    placeholder="Live Project Location"
                    onChange={(e) => setLiveProjectURL(e.target.value)}
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="image" className="mb-3">
                <Form.Control type="text" value={photo} />
                <Form.Control type="file" onChange={uploadFileHandler} />
                {uploading && <Loader />}
              </Form.Group>
              <Form.Group controlId="languages">
                <FloatingLabel
                  controlId="floatingInput"
                  label="What Langauges/Stack did you use?"
                >
                  <Form.Control
                    type="text"
                    placeholder="What Langauges/Stack did you use?"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value.split(","))}
                  ></Form.Control>
                  <Form.Text id="languagesHelpBlock" muted>
                    Enter the values as comma (,) seperated values
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId="description">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Project Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    value={description}
                    placeholder="Project Name"
                    style={{ height: "100px" }}
                    onChange={(e) => setDescription(e.target.value)}
                  ></Form.Control>
                  <Form.Text id="descriptionHelpBlock" muted>
                    Please enter a good description of the project, it must be
                    less than 500 characters. {500 - description.length}/500
                    characters remaining
                  </Form.Text>
                </FloatingLabel>
              </Form.Group>
              <Button type="submit" variant="dark" style={{ width: "100%" }}>
                Update
              </Button>
            </Form>
          </FormContainer>
        )}
      </Container>
    </Container>
  );
};

export default ProjectEditScreen;
