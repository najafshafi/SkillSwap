import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const NetworkSecurity = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.2 (275 Reviews)</span>
          </div>

          <h1>Network Security Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/lYvijnPI1Rg?si=5PGspaNlxnOwyKEa"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

          <div className="button-container">
            <Button className="styled-button">Course Info</Button>
            <Button className="styled-button">Reviews</Button>
            <Button className="styled-button">Q/A</Button>
            <Button className="styled-button">Announcements</Button>
          </div>

          <h3>About Course</h3>
          <div className="course-container">
            <p className="course-text">
              {showMore ? (
                <>
                  This Network Security course covers essential cybersecurity principles, securing networks, and preventing cyber threats.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Network Security Fundamentals:</strong> Understanding cybersecurity basics</li>
                    <li><strong>Firewalls & VPNs:</strong> Protecting network communications</li>
                    <li><strong>Ethical Hacking:</strong> Identifying vulnerabilities and penetration testing</li>
                    <li><strong>Cryptography:</strong> Encryption techniques and security protocols</li>
                    <li><strong>Incident Response:</strong> Detecting and mitigating security threats</li>
                    <li><strong>Cloud Security:</strong> Securing cloud environments</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>IT Professionals:</strong> Strengthening network security skills</li>
                    <li><strong>Security Analysts:</strong> Enhancing cybersecurity knowledge</li>
                    <li><strong>Network Administrators:</strong> Learning advanced security techniques</li>
                    <li><strong>Beginners:</strong> Interested in a career in cybersecurity</li>
                  </ul>
                </>
              ) : (
                <>
                  Gain hands-on experience in network security, cybersecurity fundamentals, and advanced security protocols.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand cybersecurity principles</li>
            <li>Implement network security solutions</li>
            <li>Secure networks using firewalls and encryption</li>
            <li>Detect and mitigate cyber threats</li>
          </ul>
        </Col>

        <Col md={4}>
          <Card className="mb-4 p-4 shadow-lg rounded">
            <Card.Body>
              <h3 className="text-primary mb-3">📊 Course Progress</h3>
              <div className="custom-progress-container">
                <div className="custom-progress-bar"></div>
              </div>
              <div className="course-details">
                <p><strong>📅 Enrolled on:</strong> April 10, 2024</p>
                <p><strong>📌 Level:</strong> Intermediate to Advanced | 🎓 60 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 4h 15m </p><p> 🔄 Last Updated: July 8, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Sarah Williams - Cybersecurity Expert</p>
              <h5>Material Includes</h5>
              <ul>
                <li>4 hours on-demand video</li>
                <li>6 articles</li>
                <li>4 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic IT knowledge preferred</li>
                <li>A computer with internet access</li>
              </ul>
<Button 
  variant="primary" 
  className="enroll-button" // Custom Class
  onClick={() => navigate("/courses/enroll")}
>
  🚀 Enroll Now
</Button>              </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NetworkSecurity;