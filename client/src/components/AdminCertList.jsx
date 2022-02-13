import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Button,
  Table,
  Col,
  Row,
  Container,
  Pagination,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
// components
import Loader from "./Loader";
// actions
import { createCertificate } from "../actions/Certificate/createCertificate";
import { deleteCertificate } from "../actions/Certificate/deleteCertificate";
import { listCertificates } from "../actions/Certificate/listCertificates";
// constants
import { CERTIFICATE_CREATE_RESET } from "../constants/certConstants";

const AdminProjectsList = () => {
  const { certPageNumber } = useParams() || 1;
  const { keyword } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    loading: loadingCertificate,
    certificates,
    pages,
    page,
  } = useSelector((state) => state.listCerts);

  const { loading: loadingDelete, success: successDelete } = useSelector(
    (state) => state.certDelete
  );

  const {
    loading: loadingCreate,
    success: successCreate,
    certificate: createdCertificate,
  } = useSelector((state) => state.certCreate);

  useEffect(() => {
    dispatch({ type: CERTIFICATE_CREATE_RESET });
    if (successCreate) {
      navigate(`/admin/certificate-edit/${createdCertificate._id}`);
    } else {
      dispatch(listCertificates(keyword, certPageNumber));
    }
    // eslint-disable-next-line
  }, [
    dispatch,
    keyword,
    navigate,
    certPageNumber,
    successCreate,
    successDelete,
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
      {loadingCreate && <Loader />}
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
              <th>NAME</th>
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
                  <td>{certificate.name}</td>
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
      <Row style={{ width: "100%", margin: "2% 0" }}>
        {pages > 1 && (
          <Pagination style={{ justifyContent: "center" }}>
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item
                key={x + 1}
                style={{ color: "#012f41" }}
                href={`/admin/adminscreen/certificates/${x + 1}`}
                active={x + 1 === page}
              >
                {x + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Row>
    </Container>
  );
};

export default AdminProjectsList;
