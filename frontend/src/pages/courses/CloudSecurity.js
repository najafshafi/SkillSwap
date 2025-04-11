import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const CloudSecurity = () => {
  const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.7 (183 Reviews)</span>
          </div>

          <h1>Cloud Security Course</h1>

          <div className="video-container mb-4">
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/0lw4KU5wHsk?si=gqly8JmCpV87VkVQ"
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
                  This Cloud Security course provides in-depth knowledge on securing cloud environments and protecting digital assets from cyber threats.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Cloud Security Fundamentals:</strong> Understanding threats, risks, and security models</li>
                    <li><strong>Identity & Access Management:</strong> Role-based access control, multi-factor authentication</li>
                    <li><strong>Encryption & Data Protection:</strong> Best practices for securing cloud data</li>
                    <li><strong>Compliance & Regulations:</strong> GDPR, HIPAA, ISO standards</li>
                    <li><strong>Cloud Security Tools:</strong> AWS, Azure, Google Cloud security services</li>
                    <li><strong>Incident Response & Risk Management:</strong> Strategies to handle security breaches</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>IT Professionals:</strong> Looking to enhance cloud security knowledge</li>
                    <li><strong>Security Analysts:</strong> Interested in cloud-based threat mitigation</li>
                    <li><strong>Business Owners:</strong> Wanting to secure their cloud infrastructure</li>
                    <li><strong>Developers:</strong> Learning secure coding practices in cloud apps</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn essential cloud security principles, risk mitigation strategies, and best practices to protect cloud-based applications and data.
                  This course is perfect for IT professionals, security analysts, and business owners aiming to enhance cloud security measures.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand cloud security fundamentals</li>
            <li>Implement best security practices</li>
            <li>Protect cloud environments from cyber threats</li>
            <li>Comply with industry security standards</li>
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
                <p><strong>📅 Enrolled on:</strong> June 11, 2024</p>
                <p><strong>📌 Level:</strong> All Levels | 🎓 9 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 1h 30m </p><p> 🔄 Last Updated: May 4, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Jane Smith - Cloud Security Expert</p>
              <h5>Material Includes</h5>
              <ul>
                <li>1.5 hours on-demand video</li>
                <li>4 articles</li>
                <li>3 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>No prior experience required</li>
              </ul>
              <Button 
                variant="primary" 
                className="enroll-button" // Custom Class
                onClick={() => navigate("/courses/enroll")}
              >
                🚀 Enroll Now
              </Button>  
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CloudSecurity;
