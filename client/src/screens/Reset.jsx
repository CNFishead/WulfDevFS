import React, { useState } from "react";
import { Form, Button, FloatingLabel, Container } from "react-bootstrap";
import axios from "axios";

// Components
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { useDispatch } from "react-redux";
import { setAlert } from "../actions/alert";

const Reset = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(!loading);
      const { data } = await axios({
        method: "POST",
        url: "/api/auth/forgotpassword",
        data: { email },
      });
      if (data.success) {
        setLoading(false);
      }
      dispatch(setAlert(`Email sent successfully`, "success"));
    } catch (e) {
      setLoading(false);
      dispatch(setAlert(e.message, "danger"));
    }
  };
  return (
    <>
      <Meta title={`WD | Reset Admin password`} />
      <Container>
        <FormContainer>
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
                Please Enter the Email Associated with the account, if the
                account exists in our system you will receive an email with a
                link to reset your password.
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
    </>
  );
};

export default Reset;
