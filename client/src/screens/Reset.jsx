import React, { useState } from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import axios from "axios";

// Components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(!loading);
      const data = await axios({
        method: "POST",
        url: "/api/auth/forgotpassword",
        data: { email },
      });
      console.log(data);
      if (data.data.success) {
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setError(!error);
      setMessage(e.message);
    }
  };
  return (
    <Container>
      <FormContainer>
        {error && <Message variant="danger">{message}</Message>}
        <h1 style={{ color: "white" }}>Reset Account Password</h1>
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
            <Form.Text>
              Please Enter the Email Associated with the account, if the account
              exists in our system you will receive an email with a link to
              reset your password.
            </Form.Text>
          </Form.Group>
          {loading ? (
            <Loader />
          ) : (
            <Button
              type="submit"
              variant="dark"
              style={{ width: "100%", marginTop: "2%" }}
            >
              Send reset link
            </Button>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Reset;
