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

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
