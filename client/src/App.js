import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// Screen imports
import Home from "./screens/Home";
import Header from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Container fluid>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
