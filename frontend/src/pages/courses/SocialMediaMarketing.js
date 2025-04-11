import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const SocialMediaMarketing = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(4)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.6 (420 Reviews)</span>
          </div>

          <h1>Social Media Marketing Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/HjUJf5bKCpU?si=ooaYTDKCDxM_CcmA"
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
                  This Social Media Marketing course teaches essential strategies for leveraging social platforms to grow businesses and brands.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Social Media Fundamentals:</strong> Understanding major platforms and audience targeting</li>
                    <li><strong>Content Strategy:</strong> Creating engaging and shareable content</li>
                    <li><strong>Advertising:</strong> Running paid campaigns on Facebook, Instagram, LinkedIn, and more</li>
                    <li><strong>Analytics & Performance:</strong> Measuring success and optimizing campaigns</li>
                    <li><strong>Influencer Marketing:</strong> Collaborating with influencers for brand growth</li>
                    <li><strong>Automation & Tools:</strong> Using scheduling and analytics tools effectively</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Business Owners:</strong> Growing brands through social media</li>
                    <li><strong>Marketing Professionals:</strong> Enhancing digital marketing skills</li>
                    <li><strong>Content Creators:</strong> Expanding audience and engagement</li>
                    <li><strong>Beginners:</strong> Learning the fundamentals of social media marketing</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn social media marketing strategies to enhance brand visibility, engagement, and sales across multiple platforms.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Develop effective social media strategies</li>
            <li>Create engaging content tailored for each platform</li>
            <li>Utilize paid advertising to reach target audiences</li>
            <li>Analyze and optimize campaign performance</li>
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
                <p><strong>📌 Level:</strong> Beginner to Expert | 🎓 250 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 4h 30m </p><p> 🔄 Last Updated: July 15, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Sarah Johnson - Digital Marketing Expert</p>
              <h5>Material Includes</h5>
              <ul>
                <li>4.5 hours on-demand video</li>
                <li>6 articles</li>
                <li>5 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic knowledge of social media platforms</li>
                <li>Access to a computer and internet</li>
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

export default SocialMediaMarketing;
