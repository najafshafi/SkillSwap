import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const MachineLearning = () => {    const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <div className="mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.7 (350 Reviews)</span>
          </div>

          <h1>Machine Learning Course</h1>

          <div className="video-container mb-4">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/GwIo3gDZCVQ"
              title="Machine Learning Course Intro"
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
                  This Machine Learning course provides an in-depth understanding of AI algorithms, data modeling, and real-world applications. Learn from industry experts and work on hands-on projects.
                  <br /><br />
                  <strong>Key Topics Covered:</strong>
                  <ul className="course-list">
                    <li><strong>Supervised & Unsupervised Learning:</strong> Learn classification, regression, clustering</li>
                    <li><strong>Neural Networks & Deep Learning:</strong> Implement AI models using TensorFlow & PyTorch</li>
                    <li><strong>Data Preprocessing & Feature Engineering:</strong> Handle missing data and optimize models</li>
                    <li><strong>Model Evaluation:</strong> Metrics, validation techniques, and hyperparameter tuning</li>
                    <li><strong>Real-World Applications:</strong> Predictive analytics, recommender systems, and automation</li>
                  </ul>
                  <br />
                  <strong>Who Should Take This Course?</strong>
                  <ul className="course-list">
                    <li><strong>Beginners:</strong> Wanting to enter the field of AI and ML</li>
                    <li><strong>Data Scientists:</strong> Looking to enhance their machine learning skills</li>
                    <li><strong>Software Engineers:</strong> Interested in integrating ML into applications</li>
                    <li><strong>Business Analysts:</strong> Using ML for data-driven decision-making</li>
                  </ul>
                </>
              ) : (
                <>
                  Learn the fundamentals of Machine Learning, its algorithms, and real-world applications to become an AI expert.
                </>
              )}
            </p>
            <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </Button>
          </div>

          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand core ML concepts and algorithms</li>
            <li>Work with TensorFlow and PyTorch for AI modeling</li>
            <li>Build predictive models and automate decision-making</li>
            <li>Apply ML techniques to real-world datasets</li>
            <li>Optimize and evaluate machine learning models</li>
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
                <p><strong>📅 Enrolled on:</strong> May 10, 2024</p>
                <p><strong>📌 Level:</strong> Intermediate to Advanced | 🎓 25 Total Enrolled</p>
                <p><strong>⏳ Duration:</strong> 3h 45m </p><p> 🔄 Last Updated: July 1, 2024</p>
              </div>
              <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>Dr. Sarah Johnson - AI Researcher</p>
              <h5>Material Includes</h5>
              <ul>
                <li>3.5 hours on-demand video</li>
                <li>8 articles</li>
                <li>5 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>Basic programming knowledge (Python recommended)</li>
                <li>Understanding of basic math concepts</li>
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

export default MachineLearning;
