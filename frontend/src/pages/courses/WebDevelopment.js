import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const WebDevelopment = () => {
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
            <span className="ms-2">4.8 (450 Reviews)</span>
          </div>

          <h1>Web Development Course</h1>

          <div className="video-container mb-4">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/X8BYu3dMKf0?si=U5Hio4zaD00zWGQb"
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
                  This Web Development course provides hands-on experience in building modern and responsive websites using HTML, CSS, JavaScript, and popular frameworks.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>HTML & CSS:</strong> Building structured and visually appealing web pages</li>
                    <li><strong>JavaScript & ES6:</strong> Adding interactivity and functionality</li>
                    <li><strong>React & Frontend Frameworks:</strong> Building scalable and dynamic UIs</li>
                    <li><strong>Backend Development:</strong> Node.js, Express, and database management</li>
                    <li><strong>API Development:</strong> RESTful APIs and GraphQL</li>
                    <li><strong>Deployment & Optimization:</strong> Hosting, performance tuning, and security</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Those starting their web development journey</li>
                    <li><strong>Freelancers:</strong> Expanding their web development skill set</li>
                    <li><strong>Entrepreneurs:</strong> Building their own websites and applications</li>
                    <li><strong>Developers:</strong> Enhancing knowledge with advanced web technologies</li>
                  </ul>
                </>
              ) : (
                <>Learn to build modern, responsive websites from scratch using industry-leading technologies.</>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Master HTML, CSS, and JavaScript</li>
            <li>Develop responsive web applications</li>
            <li>Work with databases and APIs</li>
            <li>Deploy and optimize web applications</li>
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
                <p><strong>📌 Level:</strong> Beginner to Advanced | 🎓 500 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 8h 45m </p>
                <p>🔄 Last Updated: September 5, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Michael Johnson - Full Stack Developer</p>
              <h5>Material Includes</h5>
              <ul>
                <li>8 hours on-demand video</li>
                <li>10 articles</li>
                <li>5 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>No prior coding experience required</li>
                <li>Basic computer skills</li>
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

export default WebDevelopment;
