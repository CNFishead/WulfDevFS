import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "../../components/Loader";
import Meta from "../../components/Meta";
// actions
import { listCertificates } from "../../actions/Certificate/listCertificates";
import { Card, Col, Container, Pagination, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Certificates = () => {
  const { pageNumber } = useParams() || 1;
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const { loading, certificates, page, pages } = useSelector(
    (state) => state.listCerts
  );

  useEffect(() => {
    dispatch(listCertificates(keyword, pageNumber));
    // eslint-disable-next-line
  }, [dispatch, pageNumber]);

  return (
    <>
      <Meta
        title={`WD | Awards and Accolades`}
        description={`My acheivments, both big and small!`}
      />
      {loading ? (
        <Loader />
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
                    backgroundColor: "rgba(0,0,0,0) !important",
                  }}
                >
                  <Card className="certificate-card">
                    <Card.Img
                      variant="top"
                      src={`${certificate.certificateImageUrl}`}
                      fluid
                    />
                    <Card.Body>
                      <Card.Title className="gradient-text">
                        {certificate.issuingAuthority}
                      </Card.Title>
                      <Card.Text
                        style={{ color: "white", fontWeight: "lighter" }}
                      >
                        {certificate.name}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Row style={{ width: "100%", margin: "2% 0" }}>
            {pages > 1 && (
              <Pagination style={{ justifyContent: "center" }}>
                {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item
                    key={x + 1}
                    style={{ color: "#012f41" }}
                    href={`/certificates/page/${x + 1}`}
                    active={x + 1 === page}
                  >
                    {x + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Certificates;
