import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const LogoDesign = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.3 (220 Reviews)</span>
          </div>

          <h1>Logo Design Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/NfkQeOSmIMY?si=1iOESjePsYEP9mzB"
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
                  This Logo Design course teaches you the fundamentals of graphic design, branding, and professional logo creation using top industry tools like Adobe Illustrator and Photoshop.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Design Principles:</strong> Understanding composition, balance, and color theory</li>
                    <li><strong>Branding Strategies:</strong> Creating impactful and memorable logos</li>
                    <li><strong>Typography in Design:</strong> Using fonts effectively in logo creation</li>
                    <li><strong>Adobe Illustrator & Photoshop:</strong> Mastering industry-standard tools</li>
                    <li><strong>Client Work & Presentation:</strong> Preparing professional logo presentations</li>
                    <li><strong>Freelancing & Business:</strong> Starting a career in logo design</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Those new to graphic design</li>
                    <li><strong>Freelancers:</strong> Looking to enhance their logo design skills</li>
                    <li><strong>Business Owners:</strong> Wanting to design their own brand logos</li>
                    <li><strong>Design Professionals:</strong> Expanding their portfolio and expertise</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn the fundamentals of logo design, branding, and the use of professional design tools to create stunning logos.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Create professional logos using Adobe Illustrator & Photoshop</li>
            <li>Understand branding and design principles</li>
            <li>Develop typography skills for logo design</li>
            <li>Present and deliver logos to clients professionally</li>
            <li>Start a freelancing career in logo design</li>
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
                <p><strong>📅 Enrolled on:</strong> April 20, 2024</p>
                <p><strong>📌 Level:</strong> Beginner to Intermediate | 🎓 12 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 2h 30m </p><p> 🔄 Last Updated: June 10, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Michael Smith - Graphic Designer</p>
              <h5>Material Includes</h5>
              <ul>
                <li>2.5 hours on-demand video</li>
                <li>6 articles</li>
                <li>4 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic understanding of design principles is helpful</li>
                <li>Interest in branding and logo creation</li>
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

export default LogoDesign;