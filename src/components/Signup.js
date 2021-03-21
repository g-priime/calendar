import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
//import TitleLogInPage from "./TitleLogInPage";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const displayNameRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  //const [currentUser, setCurrentUser] = useState();
  //const { updateDisplayName } = useAuth();

  //const pageTitle = "Create Your Account";

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      let username = displayNameRef.current.value;

      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        displayNameRef.current.value
      ).then((data) => {
        console.log(username);
        const { user } = data;
        if (user) {
          user.updateProfile({
            displayName: username,
          });
        }
      });
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      setError(errorMessage);
      console.log(errorCode);
    } finally {
      if (errorCode === "auth/email-already-in-use") {
        history.push("/signup");
      } else {
        history.push("/");
      }
    }

    setLoading(false);
  }

  return (
    <div className="ImageGallery">
      {
      //<TitleLogInPage pageTitle={pageTitle} />
}
      <Container
        className="d-flex justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="displayName"
                  ref={displayNameRef}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100 button-forms"
                type="submit"
              >
                Create Account
              </Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
