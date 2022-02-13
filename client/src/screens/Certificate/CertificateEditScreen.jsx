import React, { useEffect, useState } from "react";
import { Container, FloatingLabel, Form, Button, Image } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// actions
import { listCertificateDetails } from "../../actions/Certificate/listCertificateDetails";
import { updateCertificate } from "../../actions/Certificate/updateCertificate";
// Components
import Loader from "../../components/Loader";

// constants
import { CERTIFICATE_UPDATE_RESET } from "../../constants/certConstants";
import appendLeadingZeroes from "../../utils/appendLeadingZeroes";
import { setAlert } from "../../actions/alert";
import Meta from "../../components/Meta";
const CertificateEditScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams() || 1;

  const [name, setName] = useState("");
  const [certificateImageUrl, setCertificateImageUrl] = useState("");
  const [issuingAuthority, setIssuingAuthority] = useState("");
  const [dateOfCompletion, setDateOfCompletion] = useState(Date);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { loading, certificate } = useSelector((state) => state.certDetails);

  const { loading: loadingUpdate, success: successUpdate } = useSelector(
    (state) => state.certUpdate
  );

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CERTIFICATE_UPDATE_RESET });
      navigate("/certificates");
    } else {
      if (!certificate.name || certificate._id !== id) {
        dispatch(listCertificateDetails(id));
      } else {
        setName(certificate.name);
        setCertificateImageUrl(certificate.certificateImageUrl);
        let date = new Date(certificate.dateOfCompletion);
        let formatted_date = `${date.getFullYear()}-${appendLeadingZeroes(
          date.getMonth() + 1
        )}-${appendLeadingZeroes(date.getDate() + 1)}`;
        setDateOfCompletion(formatted_date);
        setIssuingAuthority(certificate.issuingAuthority);
      }
    }
  }, [navigate, id, successUpdate, dispatch, loading, certificate]);

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
      setCertificateImageUrl(data.data);
      setUploading(false);
    } catch (error) {
      dispatch(setAlert(error.message, "danger"));
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCertificate({
        _id: id,
        name,
        certificateImageUrl,
        issuingAuthority,
        dateOfCompletion,
      })
    );
  };

  return (
    <>
      <Meta title={`WD | Cert Edit: ${certificate.name}`} />
      <Container className="project-edit-container">
        <Container>
          {loadingUpdate && <Loader />}
          {loading ? (
            <Loader />
          ) : (
            <FormContainer>
              <h1 style={{ color: "white" }}>Edit Certificate</h1>
              <Container style={{ padding: "5%" }}>
                <h4 style={{ color: "white" }}>Certificate Image</h4>
                <Image src={`${certificateImageUrl}`} fluid />
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
                <Form.Group controlId="issuingAuthority">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Name of institution of Authority"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={issuingAuthority}
                      placeholder="Name of institution of Authority"
                      onChange={(e) => setIssuingAuthority(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="certificateImageUrl">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Image path"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      value={certificateImageUrl}
                      placeholder="Live Project Location"
                      onChange={(e) => setCertificateImageUrl(e.target.value)}
                    ></Form.Control>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group controlId="image" className="mb-3">
                  <Form.Control type="text" value={certificateImageUrl} />
                  <Form.Control type="file" onChange={uploadFileHandler} />
                  {uploading && <Loader />}
                </Form.Group>
                <Form.Group controlId="dateOfCompletion">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Date of Completion"
                  >
                    <Form.Control
                      type="date"
                      placeholder=""
                      value={dateOfCompletion}
                      onChange={(e) => setDateOfCompletion(e.target.value)}
                    ></Form.Control>
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
    </>
  );
};

export default CertificateEditScreen;
