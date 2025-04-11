import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const GameDevelopment = () => {
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
            <span className="ms-2">4.2 (180 Reviews)</span>
          </div>

          <h1>Game Development Course</h1>

          <div className="video-container mb-4">
        <iframe
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/H_5u_DVTbbU?si=9VvBBh24WMDnbhED"
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
                  This Game Development course covers essential programming, design, and animation techniques to create engaging video games using modern tools and engines.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Game Design Principles:</strong> Understanding game mechanics and player engagement</li>
                    <li><strong>Unity & Unreal Engine:</strong> Developing games using industry-leading platforms</li>
                    <li><strong>2D & 3D Graphics:</strong> Implementing animations and physics</li>
                    <li><strong>Artificial Intelligence:</strong> Creating intelligent NPCs and game behavior</li>
                    <li><strong>Multiplayer Game Development:</strong> Networking and online features</li>
                    <li><strong>Game Monetization Strategies:</strong> Publishing and marketing games</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Those new to game development</li>
                    <li><strong>Indie Developers:</strong> Looking to improve their skills</li>
                    <li><strong>Programmers:</strong> Wanting to specialize in game programming</li>
                    <li><strong>Game Designers:</strong> Learning to implement creative concepts</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn the fundamentals of game development, from programming basics to advanced game design, using industry-standard engines like Unity and Unreal Engine.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Develop games using Unity and Unreal Engine</li>
            <li>Understand game mechanics and design principles</li>
            <li>Implement AI and multiplayer features</li>
            <li>Create immersive 2D and 3D graphics</li>
            <li>Publish and monetize games successfully</li>
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
                <p><strong>📌 Level:</strong> Beginner to Advanced | 🎓 8 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 3h 45m </p><p> 🔄 Last Updated: July 15, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Emily Carter - Game Developer</p>
              <h5>Material Includes</h5>
              <ul>
                <li>3.5 hours on-demand video</li>
                <li>8 articles</li>
                <li>5 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic understanding of programming is helpful</li>
                <li>Passion for game development</li>
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

export default GameDevelopment;