import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import About from "./screens/About";
import Projects from "./screens/Projects";
import AdminScreen from "./screens/AdminScreen";
import ProjectEditScreen from "./screens/ProjectEditScreen";

// Components
import Header from "./components/Navbar";
import Footer from "./components/Footer";
// css styles
import "./App.css";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/admin/projectedit/:id" element={<ProjectEditScreen />} />
        <Route path="/admin/adminscreen" element={<AdminScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
