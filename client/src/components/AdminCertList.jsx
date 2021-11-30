import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Button, Table, Col, Row, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// components
import Message from "./Message";
import Loader from "./Loader";
// actions
import {
  listCertificates,
  createCertificate,
  deleteCertificate,
} from "../actions/certificateActions";
// constants
import { CERTIFICATE_CREATE_RESET } from "../constants/certConstants";

const AdminProjectsList = () => {
  const { page, keyword } = useParams() || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingCertificate,
    error: errorCertificate,
    certificates,
  } = useSelector((state) => state.listCerts);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.certDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    certificate: createdCertificate,
  } = useSelector((state) => state.certCreate);

  useEffect(() => {
    dispatch({ type: CERTIFICATE_CREATE_RESET });
    if (successCreate) {
      navigate(`/admin/certificate-edit/${createdCertificate._id}`);
    } else {
      dispatch(listCertificates(keyword, page));
    }
  }, [
    dispatch,
    userInfo,
    successDelete,
    successCreate,
    createdCertificate,
    navigate,
    page,
    keyword,
  ]);

  const createCertHandler = () => {
    dispatch(createCertificate());
  };

  const deleteCertHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteCertificate(id));
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ color: "white" }}>Certificates</h1>
        </Col>
        <Col style={{ textAlign: "right" }}>
          <Button
            className="my-3"
            variant="success"
            onClick={createCertHandler}
          >
            <i className="fas fa-plus"></i> Create Certificate
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorCertificate && (
        <Message variant="danger">{errorCertificate}</Message>
      )}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loadingCertificate ? (
        <Loader />
      ) : (
        <Table
          striped
          bordered
          responsive
          hover
          variant="dark"
          className="table-sm"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ISSUING AUTHORITY</th>
              <th>DATE OF COMPLETION</th>
              <th>IMAGE PATH</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {certificates.map((certificate) => {
              let date = new Date(certificate.dateOfCompletion);
              console.log(date);
              return (
                <tr key={certificate._id}>
                  <td>{certificate._id}</td>
                  <td>{certificate.name}</td>
                  <td>{certificate.issuingAuthority}</td>
                  {/* Date, starts at zero, so add 1 for it to display correctly */}
                  <td>{`${date.getMonth() + 1}-${
                    date.getDate() + 1
                  }-${date.getFullYear()}`}</td>
                  <td>{certificate.certificateImageUrl}</td>
                  <td>
                    <Link to={`/admin/certificate-edit/${certificate._id}`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteCertHandler(certificate._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminProjectsList;
