import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const MotionGraphics = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.8 (320 Reviews)</span>
          </div>

          <h1>Motion Graphics Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/js6H0WqGMT8?si=HW0ZodxGBmLHC0Fx"
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
                  This Motion Graphics course teaches the fundamentals of animation, visual effects, and video editing using industry-leading tools.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Fundamentals of Motion Design:</strong> Understanding keyframes and animation principles</li>
                    <li><strong>Adobe After Effects:</strong> Creating animations and visual effects</li>
                    <li><strong>Typography Animation:</strong> Bringing text to life</li>
                    <li><strong>3D Motion Graphics:</strong> Using Cinema 4D and Blender</li>
                    <li><strong>Visual Effects:</strong> Compositing and rendering techniques</li>
                    <li><strong>Finalizing Projects:</strong> Exporting and optimizing videos for different platforms</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Those new to motion graphics and animation</li>
                    <li><strong>Graphic Designers:</strong> Expanding into animated content</li>
                    <li><strong>Filmmakers & Content Creators:</strong> Enhancing video storytelling</li>
                    <li><strong>Marketing Professionals:</strong> Creating engaging promotional videos</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn to create stunning motion graphics and animations using Adobe After Effects, Cinema 4D, and Blender.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Master motion graphics and animation techniques</li>
            <li>Create professional-quality animations using After Effects</li>
            <li>Work with typography, 3D elements, and visual effects</li>
            <li>Export and optimize videos for different platforms</li>
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
                <p><strong>📌 Level:</strong> Beginner to Advanced | 🎓 45 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 5h 30m </p><p> 🔄 Last Updated: July 5, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Michael Johnson - Motion Graphics Designer</p>
              <h5>Material Includes</h5>
              <ul>
                <li>5.5 hours on-demand video</li>
                <li>8 articles</li>
                <li>5 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic knowledge of design software preferred</li>
                <li>A computer with Adobe After Effects installed</li>
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

export default MotionGraphics;
