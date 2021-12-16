import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import About from "./screens/About";
import Projects from "./screens/Projects";
import AdminScreen from "./screens/AdminScreen";
import ProjectEditScreen from "./screens/ProjectEditScreen";
import CertificateEditScreen from "./screens/CertificateEditScreen";
import BlogEditScreen from "./screens/BlogEditScreen";

// Components
import Header from "./components/Navbar";
// import Footer from "./components/Footer";
// css styles
import "./App.css";
import Certificates from "./screens/Certificates";
import Blog from "./screens/Blog";
import Blogs from "./screens/Blogs";
import Reset from "./screens/Reset";
import ResetPassword from "./screens/ResetPassword";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/listblogs" element={<Blogs />} />
        <Route path="/admin/blog" element={<Blog />} />
        <Route path="/admin/blog-edit/:id" element={<BlogEditScreen />} />
        <Route path="/admin/projectedit/:id" element={<ProjectEditScreen />} />
        <Route
          path="/admin/certificate-edit/:id"
          element={<CertificateEditScreen />}
        />
        <Route path="/admin/adminscreen" element={<AdminScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/projects/page/:pageNumber" element={<Projects />} exact />
        <Route path="/about" element={<About />} />
        <Route path="/resetpassword" element={<Reset />} />
        <Route
          path="/api/auth/resetpassword/:resettoken"
          element={<ResetPassword />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
