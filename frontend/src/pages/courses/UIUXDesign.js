import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const UIUXDesign = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.7 (380 Reviews)</span>
          </div>

          <h1>UI/UX Design Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/5BP6bTkmI_g?si=qff1ArSKcEGMC8AQ"
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
                  This UI/UX Design course provides hands-on experience in creating user-friendly and visually appealing digital interfaces.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Fundamentals of UI/UX:</strong> Understanding user experience and interface design principles</li>
                    <li><strong>Wireframing & Prototyping:</strong> Creating mockups using Figma, Adobe XD, and Sketch</li>
                    <li><strong>Visual Design:</strong> Mastering typography, color theory, and layouts</li>
                    <li><strong>User Research & Testing:</strong> Conducting usability tests and improving designs based on feedback</li>
                    <li><strong>Design Systems:</strong> Building scalable and consistent UI components</li>
                    <li><strong>Career Guidance:</strong> Portfolio building and landing jobs in UI/UX design</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Graphic Designers:</strong> Transitioning into UI/UX design</li>
                    <li><strong>Developers:</strong> Enhancing frontend skills with UI/UX knowledge</li>
                    <li><strong>Beginners:</strong> Learning design principles from scratch</li>
                    <li><strong>Business Owners:</strong> Improving product usability and customer experience</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn UI/UX design techniques to create visually appealing and highly functional digital experiences.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Master UI/UX design principles</li>
            <li>Use industry-standard design tools</li>
            <li>Build interactive prototypes and wireframes</li>
            <li>Conduct user research and usability testing</li>
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
                <p><strong>📅 Enrolled on:</strong> May 5, 2024</p>
                <p><strong>📌 Level:</strong> Beginner to Advanced | 🎓 320 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 6h 15m </p><p> 🔄 Last Updated: August 10, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Emma Davis - Senior UI/UX Designer</p>
              <h5>Material Includes</h5>
              <ul>
                <li>6 hours on-demand video</li>
                <li>8 articles</li>
                <li>7 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>No prior design experience required</li>
                <li>Access to a computer with design software</li>
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

export default UIUXDesign;
