import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Image, Badge, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/profile.css";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaPencilAlt, FaTools, FaCreditCard, FaHistory, FaDollarSign, FaRegCreditCard } from "react-icons/fa";
import { useAuth } from "../utils/AuthContext";
import { userApi, paymentApi } from "../utils/api";

// Format date helper function
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";

  try {
    const date = new Date(dateStr);
    // Check if date is valid
    if (isNaN(date.getTime())) return "Invalid Date";

    // Format the date as MM/DD/YYYY
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const Profile = ({ setNavbarProfilePic }) => {
  const { user, isAuthenticated, fetchUserProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    birthdate: "",
    skillsOffered: [],
  });

  const [paymentData, setPaymentData] = useState({
    totalSpent: 0,
    paymentMethods: [],
    recentTransactions: []
  });

  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  // Use the user data from AuthContext
  useEffect(() => {
    if (user && isAuthenticated) {



      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        gender: user.gender || "",
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : "",
        skillsOffered: user.skillsOffered || []
      });

      // Set profile image if available
      if (user.profilePicture) {


        // Check if the profile picture is a full URL, path, or data URL
        let pictureUrl = user.profilePicture;

        // If it's a relative path (not a data URL and doesn't start with http)
        if (!pictureUrl.startsWith('data:') && !pictureUrl.startsWith('http')) {
          // Construct full URL using the API base URL
          const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
          pictureUrl = `${apiBaseUrl}${pictureUrl.startsWith('/') ? '' : '/'}${pictureUrl}`;

        }

        setProfileImage(pictureUrl);
        setNavbarProfilePic(pictureUrl);

        // Also update localStorage for consistency
        localStorage.setItem("profilePic", pictureUrl);
      } else {
        // Use stored profile image if available
        const storedImage = localStorage.getItem("profilePic");
        if (storedImage) {

          setProfileImage(storedImage);
          setNavbarProfilePic(storedImage);
        } else {

          // Clear the current profile image if no user image exists
          setProfileImage(null);
        }
      }

      // Fetch payment data
      fetchPaymentData();
    } else if (isAuthenticated) {
      // If authenticated but no user data, fetch it once
      fetchUserData();
    }
  }, [user, isAuthenticated]);

  // Fetch user data only if needed
  const fetchUserData = async () => {
    try {
      setLoading(true);
      await fetchUserProfile();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
      setError("Failed to load profile data. Please try again.");
    }
  };

  // Fetch payment data from API
  const fetchPaymentData = async () => {
    try {
      // Call the real payment API
      const data = await paymentApi.getPaymentData();
      setPaymentData(data);
    } catch (error) {
      console.error("Error fetching payment data:", error);
      // If the API fails, use mock data for now
      const mockPaymentData = {
        totalSpent: 0,
        paymentMethods: [],
        recentTransactions: []
      };
      setPaymentData(mockPaymentData);
    }
  };

  // Handle profile image change
  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setLoading(true);

        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageData = reader.result;

          // Update local state
          setProfileImage(imageData);
          setNavbarProfilePic(imageData);
          localStorage.setItem("profilePic", imageData);

          // Save directly to server (only the profile pic, not other fields)
          try {
            // Create FormData with just the profile picture
            const formData = new FormData();
            const blob = await fetch(imageData).then(r => r.blob());
            formData.append('profilePicture', blob, 'profile-image.jpg');

            // Add other fields to avoid losing data
            Object.keys(profileData).forEach(key => {
              if (key !== 'profilePicture' && key !== 'skillsOffered') {
                formData.append(key, profileData[key]);
              }
            });

            // Add skills array without stringifying again
            if (profileData.skillsOffered && Array.isArray(profileData.skillsOffered)) {
              // Send skills as separate items instead of stringifying the array
              profileData.skillsOffered.forEach((skill, index) => {
                formData.append(`skillsOffered[${index}]`, skill);
              });
            }

            // Use the FormData directly with axios
            const response = await userApi.updateProfileWithFormData(formData);



            // Refresh user data
            await fetchUserProfile();

            setSuccess("Profile picture updated successfully!");
            setTimeout(() => setSuccess(""), 3000);
          } catch (error) {
            console.error("Error updating profile picture:", error);
            setError("Failed to update profile picture. Please try again.");
            setTimeout(() => setError(""), 3000);
          }

          setLoading(false);
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error processing image:", error);
        setError("Failed to process image. Please try again.");
        setLoading(false);
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  // Handle save profile changes
  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      // Create FormData directly
      const formData = new FormData();

      // Add all non-skill, non-profilePicture fields
      Object.keys(profileData).forEach(key => {
        if (key !== 'skillsOffered' && key !== 'profilePicture') {
          formData.append(key, profileData[key]);
        }
      });

      // Add skills individually to avoid serialization issues
      if (profileData.skillsOffered && Array.isArray(profileData.skillsOffered)) {
        profileData.skillsOffered.forEach((skill, index) => {
          formData.append(`skillsOffered[${index}]`, skill);
        });
      }

      // Handle profile picture
      if (profileImage) {
        if (profileImage.startsWith('data:image')) {
          const response = await fetch(profileImage);
          const blob = await response.blob();
          formData.append('profilePicture', blob, 'profile-image.jpg');
        }
      }



      // Use the FormData API directly



      // Refresh the user data in the context
      await fetchUserProfile();

      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  // Format skills array for display
  const formatSkills = (skills) => {
    if (!Array.isArray(skills) || !skills.length) return "No skills listed";
    return skills.join(", ");
  };

  return (
    <Container fluid className="profile-container py-5">
      <Row className="justify-content-center">
        <Col lg={10} md={11}>
          <Card className="shadow-lg border-0 rounded-lg mb-4">
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <div className="d-flex flex-column flex-md-row align-items-center mb-4">
                <div className="position-relative me-md-4 mb-3 mb-md-0">
                  <label htmlFor="profile-pic-upload" className="profile-image-label">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        roundedCircle
                        className="profile-image border shadow"
                        style={{ width: '130px', height: '130px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="profile-placeholder rounded-circle d-flex align-items-center justify-content-center">
                        <FaUser size={50} />
                      </div>
                    )}
                    <div className="edit-overlay rounded-circle">
                      <FaPencilAlt className="edit-icon" />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="profile-pic-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleProfilePicChange}
                  />
                </div>

                <div className="text-center text-md-start flex-grow-1">
                  <h2 className="mb-1">{profileData.name || "Your Name"}</h2>
                  <p className="text-muted mb-2">
                    <FaEnvelope className="me-2" />
                    {profileData.email || "Your Email"}
                  </p>
                  <div className="d-flex justify-content-center justify-content-md-start">
                    <Button
                      variant={isEditing ? "secondary" : "primary"}
                      className="me-2"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </Button>
                    {isEditing && (
                      <Button
                        variant="success"
                        onClick={handleSaveProfile}
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {isEditing ? (
                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaUser className="me-2" />
                          Full Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaEnvelope className="me-2" />
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="py-2"
                          disabled
                        />
                        <Form.Text className="text-muted">
                          Email cannot be changed
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaPhone className="me-2" />
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaCalendarAlt className="me-2" />
                          Birth Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="birthdate"
                          value={profileData.birthdate}
                          onChange={handleInputChange}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaMapMarkerAlt className="me-2" />
                          Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="py-2"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaVenusMars className="me-2" />
                          Gender
                        </Form.Label>
                        <Form.Select
                          name="gender"
                          value={profileData.gender}
                          onChange={handleInputChange}
                          className="py-2"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="fw-bold">
                          <FaTools className="me-2" />
                          Skills Offered
                        </Form.Label>

                        {/* Current skills displayed as badges */}
                        <div className="mb-2">
                          {profileData.skillsOffered && profileData.skillsOffered.map((skill, index) => (
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
                                onClick={() => {
                                  const updatedSkills = [...profileData.skillsOffered];
                                  updatedSkills.splice(index, 1);
                                  setProfileData({
                                    ...profileData,
                                    skillsOffered: updatedSkills
                                  });
                                }}
                              >
                                &times;
                              </span>
                            </Badge>
                          ))}
                        </div>

                        {/* Input field for new skills */}
                        <Form.Control
                          type="text"
                          placeholder="Type a skill and press Enter"
                          value={skillInput || ""}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (skillInput && skillInput.trim()) {
                                const newSkill = skillInput.trim();
                                if (!profileData.skillsOffered.includes(newSkill)) {
                                  setProfileData({
                                    ...profileData,
                                    skillsOffered: [...profileData.skillsOffered, newSkill]
                                  });
                                }
                                setSkillInput('');
                              }
                            }
                          }}
                          className="py-2"
                        />
                        <Form.Text className="text-muted">
                          Press Enter to add a skill
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              ) : (
                <>
                  <Row className="mt-4">
                    <Col md={6} className="mb-4">
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body>
                          <h5 className="border-bottom pb-2 mb-3">Contact Information</h5>
                          <div className="mb-3">
                            <p className="mb-2 fw-bold">
                              <FaPhone className="me-2 text-primary" />
                              Phone Number
                            </p>
                            <p className="text-muted ms-4">{profileData.phone || "Not provided"}</p>
                          </div>
                          <div className="mb-3">
                            <p className="mb-2 fw-bold">
                              <FaMapMarkerAlt className="me-2 text-primary" />
                              Address
                            </p>
                            <p className="text-muted ms-4">{profileData.address || "Not provided"}</p>
                          </div>
                          <div className="mb-3">
                            <p className="mb-2 fw-bold">
                              <FaEnvelope className="me-2 text-primary" />
                              Email
                            </p>
                            <p className="text-muted ms-4">{profileData.email || "Not provided"}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Card className="h-100 border-0 shadow-sm">
                        <Card.Body>
                          <h5 className="border-bottom pb-2 mb-3">Personal Information</h5>
                          <div className="mb-3">
                            <p className="mb-2 fw-bold">
                              <FaCalendarAlt className="me-2 text-primary" />
                              Birth Date
                            </p>
                            <p className="text-muted ms-4">
                              {profileData.birthdate
                                ? new Date(profileData.birthdate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                                : "Not provided"}
                            </p>
                          </div>
                          <div className="mb-3">
                            <p className="mb-2 fw-bold">
                              <FaVenusMars className="me-2 text-primary" />
                              Gender
                            </p>
                            <p className="text-muted ms-4">{profileData.gender || "Not provided"}</p>
                          </div>
                          <div className="mb-3">
                            <p className="mb-2 fw-bold">
                              <FaTools className="me-2 text-primary" />
                              Skills Offered
                            </p>
                            <p className="text-muted ms-4">{formatSkills(profileData.skillsOffered)}</p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {/* Payment Information Section */}
                  <Row>
                    <Col md={12} className="mb-4">
                      <Card className="border-0 shadow-sm">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="border-bottom pb-2 m-0">Payment Information</h5>
                            <div className="payment-summary">
                              <Badge bg="primary" className="payment-badge">
                                <FaDollarSign className="me-1" />
                                Total Spent: ${paymentData.totalSpent.toFixed(2)}
                              </Badge>
                            </div>
                          </div>

                          {/* Payment Methods */}
                          <div className="mb-4">
                            <h6 className="fw-bold mb-3">
                              <FaCreditCard className="me-2 text-primary" />
                              Payment Methods
                            </h6>

                            <Row className="g-3">
                              {paymentData.paymentMethods.map(method => (
                                <Col md={6} key={method.id}>
                                  <div className={`payment-method-card p-3 rounded ${method.isDefault ? 'default-card' : ''}`}>
                                    <div className="d-flex justify-content-between align-items-center">
                                      <div>
                                        <FaRegCreditCard className="me-2 text-primary" />
                                        <span className="fw-bold">{method.type} •••• {method.lastFour}</span>
                                      </div>
                                      {method.isDefault && <Badge bg="success">Default</Badge>}
                                    </div>
                                    <div className="text-muted mt-2 small">Expires: {method.expiryDate}</div>
                                  </div>
                                </Col>
                              ))}

                              <Col md={6}>
                                <div className="payment-method-add p-3 rounded d-flex align-items-center justify-content-center">
                                  <Button variant="outline-primary" size="sm">
                                    <FaRegCreditCard className="me-2" />
                                    Add Payment Method
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                          </div>

                          {/* Recent Transactions */}
                          <div>
                            <h6 className="fw-bold mb-3">
                              <FaHistory className="me-2 text-primary" />
                              {showAllTransactions ? "All Transactions" : "Recent Transactions"}
                            </h6>

                            <div className="table-responsive">
                              <Table hover className="transaction-table">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {paymentData.recentTransactions.map(transaction => (
                                    <tr key={transaction._id || `${transaction.description}-${transaction.createdAt}`}>
                                      <td>{formatDate(transaction.createdAt)}</td>
                                      <td>{transaction.description}</td>
                                      <td className="fw-bold">${transaction.amount.toFixed(2)}</td>
                                      <td>
                                        <Badge bg={transaction.status === 'completed' ? 'success' : 'warning'}>
                                          {transaction.status}
                                        </Badge>
                                      </td>
                                    </tr>
                                  ))}
                                  {paymentData.recentTransactions.length === 0 && (
                                    <tr>
                                      <td colSpan="4" className="text-center py-3">No transactions found</td>
                                    </tr>
                                  )}
                                </tbody>
                              </Table>
                            </div>

                            <div className="text-center mt-3">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setShowAllTransactions(!showAllTransactions);
                                  if (!showAllTransactions) {
                                    // Fetch all transactions when viewing all
                                    paymentApi.getAllTransactions()
                                      .then(data => {
                                        setPaymentData({
                                          ...paymentData,
                                          recentTransactions: data || []
                                        });
                                      })
                                      .catch(err => {
                                        console.error("Error fetching all transactions:", err);
                                      });
                                  } else {
                                    // Fetch only recent transactions when toggling back
                                    fetchPaymentData();
                                  }
                                }}
                              >
                                {showAllTransactions ? "Show Recent Only" : "View All Transactions"}
                              </Button>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
