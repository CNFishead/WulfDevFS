import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminScreen from "../../screens/AdminScreen";
import Blog from "../../screens/Blog/Blog";
import BlogEditScreen from "../../screens/Blog/BlogEditScreen";
import CertificateEditScreen from "../../screens/Certificate/CertificateEditScreen";
import ProjectEditScreen from "../../screens/ProjectEditScreen";
import PrivateRoute from "../PrivateRoute";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/blog"
        element={
          <PrivateRoute>
            <Blog />
          </PrivateRoute>
        }
      />
      <Route
        path="/blog-edit/:id"
        element={
          <PrivateRoute>
            <BlogEditScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/projectedit/:id"
        element={
          <PrivateRoute>
            <ProjectEditScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/certificate-edit/:id"
        element={
          <PrivateRoute>
            <CertificateEditScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/adminscreen"
        element={
          <PrivateRoute>
            <AdminScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/adminscreen/projects/:pageNumber"
        element={
          <PrivateRoute>
            <AdminScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/adminscreen/certificates/:certPageNumber"
        element={
          <PrivateRoute>
            <AdminScreen />
          </PrivateRoute>
        }
      />
      <Route
        path="/adminscreen/blogs/:blogPageNumber"
        element={
          <PrivateRoute>
            <AdminScreen />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
