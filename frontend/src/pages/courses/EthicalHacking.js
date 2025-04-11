import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const EthicalHacking = () => {
  const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(3)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">3.8 (150 Reviews)</span>
          </div>

          <h1>Ethical Hacking Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/cKEf8H9cQGM?si=IbHTDVQjU5FF01QR"
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
                  This Ethical Hacking course provides in-depth knowledge on cybersecurity, penetration testing, and hacking methodologies to protect systems from malicious attacks.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Cybersecurity Fundamentals:</strong> Understanding vulnerabilities and security threats</li>
                    <li><strong>Penetration Testing:</strong> Ethical hacking tools and methodologies</li>
                    <li><strong>Network Security:</strong> Securing wired and wireless networks</li>
                    <li><strong>Malware Analysis:</strong> Detecting and preventing malware attacks</li>
                    <li><strong>Social Engineering Attacks:</strong> Phishing, impersonation, and countermeasures</li>
                    <li><strong>Security Compliance & Laws:</strong> Understanding cyber laws and regulations</li>
                    <li><strong>Bug Bounty & Red Teaming:</strong> Real-world scenarios and ethical hacking challenges</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>IT Professionals:</strong> Looking to specialize in cybersecurity</li>
                    <li><strong>Ethical Hackers:</strong> Learning advanced hacking techniques</li>
                    <li><strong>System Administrators:</strong> Enhancing network security skills</li>
                    <li><strong>Students & Enthusiasts:</strong> Wanting to build a career in ethical hacking</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn essential ethical hacking techniques, cybersecurity principles, and penetration testing skills to protect organizations from cyber threats. This course is perfect for IT professionals, ethical hackers, and students.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand ethical hacking fundamentals</li>
            <li>Perform penetration testing on systems</li>
            <li>Secure networks from cyber threats</li>
            <li>Analyze and prevent malware attacks</li>
            <li>Learn about cyber laws and compliance</li>
            <li>Develop advanced hacking skills for security enhancement</li>
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
                <p><strong>📅 Enrolled on:</strong> May 15, 2024</p>
                <p><strong>📌 Level:</strong> Intermediate | 🎓 5 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 2h 15m </p><p> 🔄 Last Updated: July 10, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Michael Lee - Cybersecurity Expert</p>
              <h5>Material Includes</h5>
              <ul>
                <li>2.5 hours on-demand video</li>
                <li>6 articles</li>
                <li>4 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic understanding of networking concepts</li>
                <li>Interest in cybersecurity and ethical hacking</li>
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

export default EthicalHacking;
