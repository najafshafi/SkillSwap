import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Alert, Image, Card, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Signup.css";
import { useAuth } from "../utils/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaTools, FaLock, FaImage } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "Male",
    birthdate: "",
    password: "",
    confirmPassword: "",
    skillsOffered: [],
    profilePicture: null
  });

  const [skillInput, setSkillInput] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      if (file) {
        // Create a preview URL for the selected image
        const previewUrl = URL.createObjectURL(file);
        setPreviewImage(previewUrl);
        setFormData({ ...formData, profilePicture: file });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleAddSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput && skillInput.trim()) {
        const newSkill = skillInput.trim();
        if (!formData.skillsOffered.includes(newSkill)) {
          setFormData({
            ...formData,
            skillsOffered: [...formData.skillsOffered, newSkill]
          });
        }
        setSkillInput('');
      }
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...formData.skillsOffered];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skillsOffered: updatedSkills
    });
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setFormData({ ...formData, profilePicture: null });
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phone ||
      !formData.address ||
      !formData.birthdate ||
      formData.skillsOffered.length === 0
    ) {
      setError("⚠ Please fill in all required fields.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("⚠ Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Submit registration using the Auth Context
      const result = await signup(formData);

      if (result.success) {
        setSuccess("✅ Signup Successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="signup-container py-5 ">
      <Row className="justify-content-center ">
        <Col lg={8} md={10}>
          <Card className="shadow-lg border-0 rounded-lg">
            <Card.Body className="p-4 p-md-5">
              <h2 className="text-center mb-2">Create an Account</h2>
              <p className="text-center text-muted mb-4">Enter your details to sign up</p>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
                  <Row>
                    <Col lg={4} md={6} className="mb-3">
                      <Form.Group controlId="name">
                        <Form.Label>
                          <FaUser className="me-2" />
                          Full Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} className="mb-3">
                      <Form.Group controlId="email">
                        <Form.Label>
                          <FaEnvelope className="me-2" />
                          Email Address <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={6} className="mb-3">
                      <Form.Group controlId="phone">
                        <Form.Label>
                          <FaPhone className="me-2" />
                          Phone Number <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={12} className="mb-3">
                      <Form.Group controlId="address">
                        <Form.Label>
                          <FaMapMarkerAlt className="me-2" />
                          Address <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          placeholder="Enter your full address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                {/* Additional Information Section */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 mb-3">Additional Information</h5>
                  <Row>
                    <Col md={4} className="mb-3">
                      <Form.Group controlId="birthdate">
                        <Form.Label>
                          <FaCalendarAlt className="me-2" />
                          Birthdate <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="birthdate"
                          value={formData.birthdate}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group controlId="gender">
                        <Form.Label>
                          <FaVenusMars className="me-2" />
                          Gender <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          required
                          className="py-2"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mb-3">
                      <Form.Group controlId="skillsOffered">
                        <Form.Label>
                          <FaTools className="me-2" />
                          Skills Offered <span className="text-danger">*</span>
                        </Form.Label>

                        {/* Display skills as badges */}
                        <div className="mb-2">
                          {formData.skillsOffered.map((skill, index) => (
                            <Badge
                              key={index}
                              bg="light"
                              text="dark"
                              className="me-2 mb-2 p-2 d-inline-flex align-items-center"
                            >
                              {skill}
                              <span
                                className="ms-2 text-danger"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleRemoveSkill(index)}
                              >
                                &times;
                              </span>
                            </Badge>
                          ))}
                        </div>

                        {/* Input for new skills */}
                        <Form.Control
                          type="text"
                          placeholder="Type a skill and press Enter"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleAddSkill}
                          className="py-2"
                        />
                        <Form.Text className="text-muted">
                          Press Enter to add a skill
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                {/* Security Section */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 mb-3">Security</h5>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="password">
                        <Form.Label>
                          <FaLock className="me-2" />
                          Password <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="confirmPassword">
                        <Form.Label>
                          <FaLock className="me-2" />
                          Confirm Password <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                {/* Profile Picture Section */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 mb-3">Profile Picture</h5>
                  <Row>
                    <Col md={12}>
                      <Form.Group controlId="profilePicture">
                        <Form.Label>
                          <FaImage className="me-2" />
                          Profile Picture (Optional)
                        </Form.Label>
                        <div className="d-flex align-items-center flex-wrap">
                          {previewImage && (
                            <div className="me-3 mb-2 position-relative">
                              <Image
                                src={previewImage}
                                roundedCircle
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                className="border shadow-sm"
                              />
                              <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 rounded-circle"
                                onClick={handleRemoveImage}
                                style={{ width: "24px", height: "24px", padding: "0" }}
                              >
                                ✕
                              </Button>
                            </div>
                          )}
                          <div className="custom-file-upload">
                            <Form.Control
                              ref={fileInputRef}
                              type="file"
                              name="profilePicture"
                              accept="image/*"
                              onChange={handleChange}
                              className={previewImage ? "w-auto" : ""}
                            />
                            <Form.Text className="text-muted">
                              Upload a profile picture (Max size: 5MB)
                            </Form.Text>
                          </div>
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                <div className="d-grid gap-2 mt-4 w-50 mx-auto">
                  <Button
                    className="py-2 signup-btn"
                    type="submit"
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? "Processing..." : "Sign up"}
                  </Button>
                </div>
                <p className="mt-4 text-center">
                  Already have an account? <Link to="/login" className="fw-bold">Sign in</Link>
                </p>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
