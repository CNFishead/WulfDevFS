import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// constants
import { PROJECT_CREATE_RESET } from "../constants/projectsContstants";

// components
import AdminCertList from "../components/AdminCertList";
import AdminProjectsList from "../components/adminProjectsList";
import AdminBlogList from "../components/AdminBlogList";

const AdminScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: PROJECT_CREATE_RESET });
    if (!userInfo) {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Container fluid className="admin-screen">
      <AdminProjectsList />
      <AdminCertList />
      <AdminBlogList />
    </Container>
  );
};

export default AdminScreen;
