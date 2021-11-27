import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location }) => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      console.log(history);
      history("/");
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 style={{ color: "white" }}>Admin Sign-in</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>

        <Form.Group controlId="password">
          <FloatingLabel
            controlId="floatinInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Button
          type="submit"
          variant="dark"
          className="styled-button"
          style={{ width: "100%" }}
        >
          Sign-In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;