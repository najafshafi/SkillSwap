import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const MobileAppDevelopment = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.4 (280 Reviews)</span>
          </div>

          <h1>Mobile App Development Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/7nQsQ0rvYqQ?si=pAtboPuQyS0T9B2P"
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
                  This Mobile App Development course provides hands-on experience in building applications for Android and iOS platforms using modern frameworks.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Introduction to Mobile App Development:</strong> Basics of iOS & Android development</li>
                    <li><strong>React Native & Flutter:</strong> Cross-platform development techniques</li>
                    <li><strong>UI/UX Design:</strong> Best practices for mobile app interfaces</li>
                    <li><strong>Database & API Integration:</strong> Firebase, RESTful APIs, GraphQL</li>
                    <li><strong>Testing & Debugging:</strong> Best tools and practices</li>
                    <li><strong>Publishing Apps:</strong> Deploying to Google Play Store & Apple App Store</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Those looking to start a career in mobile app development</li>
                    <li><strong>Web Developers:</strong> Expanding into mobile technologies</li>
                    <li><strong>Entrepreneurs:</strong> Building their own mobile applications</li>
                    <li><strong>Software Engineers:</strong> Enhancing their skill set in mobile development</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn to develop high-quality mobile applications for Android and iOS with modern tools and frameworks.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand mobile app development fundamentals</li>
            <li>Build cross-platform apps using React Native & Flutter</li>
            <li>Integrate APIs and manage databases in mobile apps</li>
            <li>Publish and maintain apps on App Stores</li>
            <li>Optimize performance and ensure security</li>
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
                <p><strong>📅 Enrolled on:</strong> June 5, 2024</p>
                <p><strong>📌 Level:</strong> Beginner to Intermediate | 🎓 30 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 4h 15m </p><p> 🔄 Last Updated: July 3, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Emily Davis - Mobile App Developer</p>
              <h5>Material Includes</h5>
              <ul>
                <li>4 hours on-demand video</li>
                <li>6 articles</li>
                <li>4 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic programming knowledge (JavaScript or Dart preferred)</li>
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

export default MobileAppDevelopment;