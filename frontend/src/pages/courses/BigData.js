import React, { useState } from "react";
import "../../styles/Coursesdetail.css";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Card, Button, ListGroup, Container, Row, Col, ProgressBar } from "react-bootstrap";

const BigData = () => {
  const navigate = useNavigate(); // Define navigate function

  const [showMore, setShowMore] = useState(false);
  return (
    <Container className="mt-5">
      <Row>
        {/* Main Content */}
        <Col md={8}>
          {/* Rating */}
          <div className="mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className="text-warning" />
            ))}
            <span className="ms-2">4.5 (200 Reviews)</span>
          </div>

          {/* Course Title */}
          <h1>Big Data Analytics Course</h1>

          {/* Video Section */}
          {/* Video Section */}
<div className="video-container mb-4">
  <iframe
    width="100%"
    height="400"
    src="https://www.youtube.com/embed/bAyrObl7TYE?si=b_ER-upRHdw1N_Cx"
    title="Big Data Course Intro"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>


          {/* Course Info Tabs */}
          
      <div className="button-container">
        <Button className="styled-button">Course Info</Button>
        <Button className="styled-button">Reviews</Button>
        <Button className="styled-button">Q/A</Button>
        <Button className="styled-button">Announcements</Button>
      </div>

          {/* About Course */}
          <h3>About Course</h3>
          <div className="course-container">
      <p className="course-text">
        {showMore ? (
          <> 
            Big Data courses provide expertise in large-scale data processing and analytics tools. These courses benefit both beginners and experienced professionals.
            <br /><br />
            <strong>Key Topics Covered:</strong>
            <ul className="course-list">
              <li><strong>Big Data Fundamentals:</strong> Data structures, storage, and processing techniques</li>
              <li><strong>Hadoop Ecosystem:</strong> HDFS, MapReduce, Hive, Pig, and Yarn usage</li>
              <li><strong>Apache Spark:</strong> Real-time data processing and machine learning integration</li>
              <li><strong>Data Analytics & Visualization:</strong> Python, R, Tableau, and Power BI</li>
              <li><strong>Cloud & AI Tools:</strong> AWS, Google Cloud, Azure, and AI-based data solutions</li>
              <li><strong>Kafka & Streaming Technologies:</strong> Real-time data streaming and message processing</li>
            </ul>
            <br />
            <strong>Who Should Take These Courses?</strong>
            <ul className="course-list">
              <li><strong>Beginners:</strong> Those who want to learn data science and analytics</li>
              <li><strong>Data Engineers:</strong> Professionals working with Hadoop and Spark</li>
              <li><strong>Business Analysts:</strong> Interested in data-driven decision-making</li>
              <li><strong>IT Professionals:</strong> Looking to upgrade their skills with modern data technologies</li>
            </ul>
          </>
        ) : (
          <> 
            Big Data courses introduce students to fundamental concepts of data analytics and modern technologies. These courses help in understanding large datasets and their applications in real-world scenarios.
            <br /><br />
            You will gain insights into data storage, processing techniques, and visualization methods. Additionally, the courses provide exposure to tools like Hadoop, Spark, and AI-driven analytics, making you industry-ready.
          </>
        )}
      </p>
      <Button className="toggle-button" variant="link" onClick={() => setShowMore(!showMore)}>
        {showMore ? "Show Less" : "Show More"}
      </Button>
    </div>

          {/* What Will You Learn */}
          <h3>What Will You Learn</h3>
          <ul>
            <li>Understand Big Data concepts</li>
            <li>Work with Hadoop and Spark</li>
            <li>Analyze large datasets efficiently</li>
            <li>Implement real-world data solutions</li>
          </ul>
        </Col>

        {/* Right Sidebar */}
        <Col md={4}>
          {/* Course Progress */}
          <Card className="mb-4 p-4 shadow-lg rounded">
  <Card.Body>
    <h3 className="text-primary mb-3">📊 Course Progress</h3>
    
    {/* Progress Bar with Smooth Animation & Better UI */}
    <div className="custom-progress-container">
  <div className="custom-progress-bar"></div>
</div>




    {/* Course Details with Proper Spacing */}
    <div className="course-details">
      <p><strong>📅 Enrolled on:</strong> June 28, 2024</p>
      <p><strong>📌 Level:</strong> All Levels | 🎓 1 Total Enrolled</p>
      <p><strong>⏳ Duration:</strong> 1h 30m </p><p> 🔄 Last Updated: July 2, 2024</p>
    </div>

    {/* CTA Button with Padding */}
    <Button variant="primary" className="w-100 mt-3 fw-bold py-2">🚀 Start Learning</Button>
  </Card.Body>
</Card>


          {/* Instructor & Details */}
          <Card>
            <Card.Body>
              <h5>Instructor</h5>
              <p>John Doe - Data Scientist</p>
              <h5>Material Includes</h5>
              <ul>
                <li>1.5 hours on-demand video</li>
                <li>4 articles</li>
                <li>3 downloadable resources</li>
                <li>Certificate of Completion</li>
              </ul>
              <h5>Requirements</h5>
              <ul>
                <li>No prior experience required</li>
                <li>Basic knowledge of statistics helpful</li>
              </ul>
             <Button 
  variant="primary" 
  className="enroll-button" // Custom Class
  onClick={() => navigate("/courses/enroll")}
>
  🚀 Enroll Now
</Button>       </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BigData;