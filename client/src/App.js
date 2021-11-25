import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// css styles
import "./App.css";

// Screen imports
import Home from "./screens/Home";
import Header from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
