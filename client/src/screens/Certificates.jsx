import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "../components/Loader";
import Message from "../components/Message";

// actions
import { listCertificates } from "../actions/certificateActions";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Certificates = ({ match }) => {
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const {
    loading,
    error,
    certificates,
    // page,
    // pages,
  } = useSelector((state) => state.listCerts);

  useEffect(() => {
    dispatch(listCertificates(keyword, pageNumber));
    // eslint-disable-next-line
  }, [dispatch, pageNumber]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container style={{ padding: "5%", minHeight: "700px" }}>
          <Row style={{ textAlign: "center" }} className="gradient-text">
            <Col>
              <h1>Awards/Certificates</h1>
            </Col>
          </Row>
          <Row style={{ justifyContent: "space-around" }}>
            {certificates.map((certificate) => {
              return (
                <Col
                  key={certificate._id}
                  lg={6}
                  xl={4}
                  style={{
                    padding: "2%",
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                  }}
                >
                  <p style={{ textAlign: "center" }} className="gradient-text">
                    {certificate.name}
                  </p>
                  <Image
                    src={certificate.certificateImageUrl}
                    alt={`${certificate.name}`}
                    fluid
                  />
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Certificates;
