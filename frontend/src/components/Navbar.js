import React from "react";
import { Navbar, Nav, Container, Dropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { useAuth } from "../utils/AuthContext";
import { FaGraduationCap } from "react-icons/fa";

const AppNavbar = ({ navbarProfilePic, showEnrolledCourses, isAdmin }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  // Logout function now uses the one from AuthContext
  const handleLogout = () => {
    logout();
  };


  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          Skill Swap
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="ms-auto">
            {/* Show only if user is authenticated */}
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/courses">
                  Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/enrolled-courses" className="d-flex align-items-center">
                  <FaGraduationCap className="me-1" /> My Courses
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About Us
                </Nav.Link>
                <Nav.Link as={Link} to="/contact">
                  Contact Us
                </Nav.Link>

                {/* Profile Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="div"
                    className="profile-dropdown"
                    id="profile-dropdown"
                  >
                    <img
                      src={
                        navbarProfilePic ||
                        user?.profilePicture ||
                        "/images/default-avatar.png"
                      }
                      alt="Profile"
                      className="profile-pic"
                    />
                    {user?.name || "User"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/enrolled-courses">
                      My Courses
                    </Dropdown.Item>

                    {/* Admin Menu Items */}
                    {isAdmin && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item className="fw-bold text-primary pe-none">Admin Menu</Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/add-course">
                          Add New Course
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to="/admin/manage-courses">
                          Manage Courses
                        </Dropdown.Item>
                      </>
                    )}

                    <Dropdown.Divider />
                    <Dropdown.Item
                      style={{ transition: '0.3s' }}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#f8d7da';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}

                      onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
