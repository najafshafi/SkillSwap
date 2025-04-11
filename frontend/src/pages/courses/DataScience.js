import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const DataScience = () => {
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

          <h1>Data Science Course</h1>

          <div className="video-container mb-4">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/X3paOmcrTjQ"
              title="Data Science Course Intro"
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
                  This Data Science course covers data analysis, machine learning, and statistical modeling to extract meaningful insights from data.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Data Science Fundamentals:</strong> Understanding data structures, processing, and visualization</li>
                    <li><strong>Python for Data Science:</strong> Libraries like NumPy, Pandas, and Matplotlib</li>
                    <li><strong>Machine Learning:</strong> Supervised & unsupervised learning techniques</li>
                    <li><strong>Deep Learning:</strong> Basics of neural networks and TensorFlow</li>
                    <li><strong>Big Data & AI:</strong> Working with large datasets and AI-driven analytics</li>
                    <li><strong>Data Ethics & Privacy:</strong> Ensuring responsible data usage</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Interested in data analysis and AI</li>
                    <li><strong>Data Analysts:</strong> Enhancing skills with machine learning</li>
                    <li><strong>Researchers:</strong> Using data-driven approaches</li>
                    <li><strong>IT Professionals:</strong> Transitioning to data science roles</li>
                  </ul>
                </>
              ) : (
                <>
                  Explore the world of data science with hands-on projects and real-world applications. Learn data manipulation, machine learning models, and AI-powered analytics.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Master data science techniques</li>
            <li>Analyze complex datasets effectively</li>
            <li>Implement machine learning models</li>
            <li>Use AI and big data tools</li>
            <li>Understand ethical considerations in data science</li>
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
                <p><strong>📌 Level:</strong> Intermediate | 🎓 1 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 2h 15m </p><p> 🔄 Last Updated: August 5, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Dr. Emily Johnson - Data Science Expert</p>
              <h5>Material Includes</h5>
              <ul>
                <li>2 hours on-demand video</li>
                <li>6 articles</li>
                <li>4 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic Python knowledge helpful</li>
                <li>Interest in data analytics</li>
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

export default DataScience;
