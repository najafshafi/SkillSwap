import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";
import { useAuth } from "../utils/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Function to validate email format
  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading spinner

    // Client-side validation for email and password
    if (!isEmailValid(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      setLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        console.log("Login successful, redirecting to home");

        // We added navigation in AuthContext, but as a fallback we'll also navigate here
        // The navigation in either place should work, but having both ensures reliability
        navigate("/home");
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading spinner after the request completes
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="login-row">
        <Col md={6} className="login-form-container">
          <div className="login-form">
            <h2>Welcome back</h2>
            <p>Please enter your details</p>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="login-btn mt-3"
                style={{ width: "100%" }}
                disabled={loading} // Disable button when loading
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Sign in"}
              </Button>
              <p className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </Form>
          </div>
        </Col>
        <Col md={6} className="login-illustration">
          <div className="illustration"></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
