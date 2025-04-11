import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const SEO = () => {    
  const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.3 (310 Reviews)</span>
          </div>

          <h1>SEO (Search Engine Optimization) Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/xsVTqzratPs?si=KB5gVUw-pAS84hbc"
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
                  This SEO course covers key strategies to optimize websites for search engines, increase visibility, and drive organic traffic.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>SEO Basics:</strong> Understanding search engines and ranking factors</li>
                    <li><strong>Keyword Research:</strong> Finding high-ranking and low-competition keywords</li>
                    <li><strong>On-Page Optimization:</strong> Meta tags, content optimization, and internal linking</li>
                    <li><strong>Off-Page SEO:</strong> Link building and social media impact</li>
                    <li><strong>Technical SEO:</strong> Site speed, mobile optimization, and structured data</li>
                    <li><strong>Local SEO:</strong> Optimizing for local search and Google My Business</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Bloggers & Content Creators:</strong> Boosting website visibility</li>
                    <li><strong>Marketing Professionals:</strong> Improving SEO strategy for businesses</li>
                    <li><strong>Entrepreneurs:</strong> Driving organic traffic to online stores</li>
                    <li><strong>Beginners:</strong> Learning SEO fundamentals for career growth</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn SEO techniques to rank higher in search engines, optimize content, and drive traffic to websites.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand search engine algorithms</li>
            <li>Perform keyword research effectively</li>
            <li>Optimize website structure and content</li>
            <li>Implement link-building strategies</li>
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
                <p><strong>📌 Level:</strong> Beginner to Advanced | 🎓 120 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 3h 45m </p><p> 🔄 Last Updated: August 1, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Michael Brown - SEO Specialist</p>
              <h5>Material Includes</h5>
              <ul>
                <li>3.5 hours on-demand video</li>
                <li>5 articles</li>
                <li>4 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic understanding of websites</li>
                <li>Access to a computer and internet</li>
              </ul>
<Button 
  variant="primary" 
  className="enroll-button" // Custom Class
  onClick={() => navigate("/courses/enroll")}
>
  🚀 Enroll Now
</Button>               </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SEO;
