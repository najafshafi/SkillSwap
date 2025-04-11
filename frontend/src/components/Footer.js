import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <Container>
        <Row className="align-items-start">
          {/* Left Section */}
          <Col md={3}>
            <h5 className="d-flex align-items-center">Skill Swap</h5>
            <p className="text-light">
              Learning often happens in classrooms but it doesn’t have to.
            </p>
            <p className="fw-bold">+1 (24551) 21456871</p>
            <p className="text-light">mobile@number.com</p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              {[
                "About Us",
                "Contact Us",
                "Dashboard",
                "Instructor",
                "Registration",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-light text-decoration-none d-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Resources */}
          <Col md={3}>
            <h5>Resources</h5>
            <ul className="list-unstyled">
              {["Courses", "Membership", "Instructor", "FAQs"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-light text-decoration-none d-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Support */}
          <Col md={3}>
            <h5>Support</h5>
            <ul className="list-unstyled">
              {["Forums", "Documentation", "Terms", "Community"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-light text-decoration-none d-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
