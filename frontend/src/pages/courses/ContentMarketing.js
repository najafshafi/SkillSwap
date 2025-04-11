import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const ContentMarketing = () => {
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

          <h1>Content Marketing Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/osVm6UrwEYc?si=EiELmgwSbRRVSr63"
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
                  This Content Marketing course teaches how to create, distribute, and optimize content for engaging audiences and driving business growth.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Content Strategy:</strong> Planning and structuring effective content</li>
                    <li><strong>SEO & Keyword Research:</strong> Optimizing content for search engines</li>
                    <li><strong>Social Media Marketing:</strong> Engaging audiences on multiple platforms</li>
                    <li><strong>Email & Blog Marketing:</strong> Crafting compelling messages and articles</li>
                    <li><strong>Analytics & Performance:</strong> Measuring success and improving strategies</li>
                    <li><strong>Brand Storytelling:</strong> Creating compelling narratives for businesses</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Marketing Professionals:</strong> Looking to refine their content strategies</li>
                    <li><strong>Business Owners:</strong> Wanting to enhance online presence</li>
                    <li><strong>Bloggers & Writers:</strong> Interested in monetizing their content</li>
                    <li><strong>Freelancers:</strong> Seeking to build a career in content marketing</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn how to craft compelling content, optimize for SEO, and engage audiences across multiple platforms. This course is ideal for marketers, bloggers, and business owners looking to enhance their digital presence.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Develop effective content strategies</li>
            <li>Optimize content for SEO and engagement</li>
            <li>Leverage social media for brand growth</li>
            <li>Measure and improve content performance</li>
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
                <p><strong>📅 Enrolled on:</strong> July 10, 2024</p>
                <p><strong>📌 Level:</strong> All Levels | 🎓 2 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 2h 15m </p><p> 🔄 Last Updated: July 15, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Alex Johnson - Digital Marketing Expert</p>
              <h5>Material Includes</h5>
              <ul>
                <li>2.5 hours on-demand video</li>
                <li>5 articles</li>
                <li>4 downloadable resources</li>
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
</Button>              </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContentMarketing;