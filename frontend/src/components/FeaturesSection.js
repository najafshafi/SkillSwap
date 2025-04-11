import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ React Router Hook
import { Container, Row, Col } from "react-bootstrap";
import { Book, Award, Mortarboard } from "react-bootstrap-icons";

import "../styles/Features.css";

const FeaturesSection = () => {
  const navigate = useNavigate(); 

  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-overlay"></div> {/* Full Image Overlay */}
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-10">
              <h2 className="hero-title">SkillSwap: Exchange Skills & Learn</h2>
              <p className="hero-text">
                Connect with experts, share your knowledge, and learn new skills from others in a collaborative community.
              </p>
              <button className="find-courses-btn" onClick={() => navigate("/explore")}>Explore Skills →</button>
            </div>
          </div>
        </div>
      </div>

      <div className="features-box">
        <Container>
          <Row className="text-center">
            <Col md={4} className="feature-box">
              <Mortarboard size={50} className="feature-icon green-icon" />
              <h4 className="feature-title">Learn from Experts</h4>
              <p>Find professionals ready to teach you valuable skills.</p>
            </Col>

            <Col md={4} className="feature-box">
              <Award size={50} className="feature-icon red-icon" />
              <h4 className="feature-title">Share Your Knowledge</h4>
              <p>Offer lessons in skills you excel at and help others grow.</p>
            </Col>

            <Col md={4} className="feature-box">
              <Book size={50} className="feature-icon purple-icon" />
              <h4 className="feature-title">Flexible Scheduling</h4>
              <p>Easily schedule lessons with an integrated calendar system.</p>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default FeaturesSection;
