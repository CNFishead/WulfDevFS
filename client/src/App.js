import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// css styles
import "./App.css";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
// Components
import Header from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./screens/About";
import Projects from "./screens/Projects";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
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
