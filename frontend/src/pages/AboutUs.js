import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="container-fluid px-0">
      {/* Main Wrapper */}
      <div className="bg-light-gray">
        {/* Updated Hero Section */}
        <div className="hero-section d-flex align-items-center">
          <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
            <div className="hero-text">
              <h1 className="hero-title" style={{ color: "#1a237e" }}>
                Helping businesses{" "}
                <span className="highlight">
                  succeed through the power of video.
                </span>
              </h1>
              <p className="hero-description" style={{ color: "#1a237e" }}>
                SkillSwap is transforming the way people connect and learn.
                Through our platform, individuals can share their expertise,
                exchange skills, and grow together in a collaborative
                environment. Discover a world of opportunities to learn and
                teach skills that matter most to you.
              </p>
              <button className="btn btn-primary mt-3">
                Join SkillSwap Today
              </button>
            </div>
            <div className="hero-image">
              <div id="blob-page">
                <div className="blob-image-container">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/background.jpg`}
                    alt="Abstract Blob"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Things That Make Us Proud */}
        <div className="text-center py-5">
          <h2 className="section-title">Things that make us proud</h2>
          <p>choose your learning level</p>
        </div>

        {/* Skill Levels Section */}
        <div className="row mx-0 py-1 d-flex justify-content-center">
          {[
            {
              title: "Beginner",
              desc: "With analysis tools, to help your ideas with current and future clients.",
              icon: "🔰",
            },
            {
              title: "Intermediate",
              desc: "Faster collection, quoting, enrollment, and reporting in Italian and English.",
              icon: "🚀",
            },
            {
              title: "Advanced",
              desc: "All services for our team of industry experts, personal training.",
              icon: "🎯",
            },
            {
              title: "Mastery",
              desc: "We can help you set up and manage your groups if you are become our partner.",
              icon: "🏆",
            },
          ].map((item, index) => (
            <div key={index} className="col-md-3 text-center px-3">
              <div className="card p-4 border-0 shadow-sm hover-effect">
                <h3>{item.icon}</h3>
                <h5 className="mt-3">{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>{" "}
      {/* <-- Correctly closed the main background div */}
      {/* Our Team Section (White Background) */}
      <div className="py-5 text-center" style={{ background: "white" }}>
        <h2 className="section-title">Our Team</h2>
        <div className="row mx-0 d-flex justify-content-center mt-4">
          {[
            { img: "/images/team1.jpg", name: "Devon Lane", role: "Professor" },
            {
              img: "/images/team2.jpg",
              name: "Courtney Henry",
              role: "Associate Professor",
            },
            {
              img: "/images/team3.jpg",
              name: "Jane Cooper",
              role: "Assistant Professor",
            },
            {
              img: "/images/team4.jpg",
              name: "Esther Howard",
              role: "Visual Artist",
            },
          ].map((member, index) => (
            <div key={index} className="col-md-3 text-center mb-4">
              <img
                src={member.img}
                alt={member.name}
                className="img-fluid team-img"
              />
              <h5 className="mt-3">{member.name}</h5>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Internal CSS */}
      <style>
        {`
          .hero-section {
            background: #f8f9fa;
            padding: 60px 0;
          }
          .hero-text {
            max-width: 50%;
          }
          .hero-title {
            font-size: 2.5rem;
            font-weight: bold;
          }
          .highlight {
            color: #6a11cb;
          }
          .hero-description {
            font-size: 1.1rem;
            margin-top: 15px;
          }
          .hero-image img {
            max-width: 100%;
            border-radius: 10px;
          }
          .section-title {
            font-size: 2.5rem;
            font-weight: bold;
          }
          .bg-light-gray {
            background: #f8f9fa !important;
            padding: 50px 0;
          }
          .hover-effect {
            background: white;
            border-radius: 10px;
            transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .hover-effect:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          }
          .team-img {
            width: 150px;
            height: 150px;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;
