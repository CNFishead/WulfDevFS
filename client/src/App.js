import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Screen imports
import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";
import About from "./screens/About";
import Projects from "./screens/Projects";
import Certificates from "./screens/Certificate/Certificates";
import Blogs from "./screens/Blog/Blogs";
import Reset from "./screens/Reset";
import ResetPassword from "./screens/ResetPassword";

// actions/utilities
import setAuthToken from "./utils/setAuthToken";
import { useSelector } from "react-redux";
// Components
import Header from "./components/Navbar";
import Footer from "./components/Footer";

// css styles
import "./App.css";
import AdminRoutes from "./components/Routes/AdminRoutes";
import Alert from "./components/Alert";
import Article from "./screens/Blog/Article";

const App = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  if (userInfo) {
    setAuthToken(userInfo.token);
  }
  return (
    <Router>
      <Alert />
      <Header />
      <Routes>
        <Route path="/list-blogs" element={<Blogs />} />
        <Route path="/blog/article/:id" element={<Article />} />
        {/* Admin Routes and Admin Screen */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route
          path="/certificates/page/:pageNumber"
          element={<Certificates />}
        />
        <Route path="/projects/page/:pageNumber" element={<Projects />} exact />
        <Route path="/about" element={<About />} />
        <Route path="/resetpassword" element={<Reset />} />
        <Route
          path="/auth/resetpassword/:resettoken"
          element={<ResetPassword />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
