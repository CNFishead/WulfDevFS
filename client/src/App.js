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

// Components
import Header from "./components/Navbar";
// import Footer from "./components/Footer";
// css styles
import "./App.css";
import Certificates from "./screens/Certificates";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
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
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
