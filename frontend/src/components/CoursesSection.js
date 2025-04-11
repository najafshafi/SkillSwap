import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/CoursesSection.css";


const coursesData = [
  {
    category: "Graphic Designing",
    courses: [
      { id: 1, title: "Logo Designing", url: "logo-design", rating: 4.8, hours: 5, price: "Free", img: "https://3.imimg.com/data3/CI/NU/MY-9213828/logo-design-500x500.png" },
      { id: 2, title: "UI/UX Designing", url: "uiux-design", rating: 4.6, hours: 8, price: "$199", img: "https://view.subpage.app/app/company/C532b8873cc5442e2b1f2265b77a7d7dc/domain/MTiT0jFlGh/page/Ma9aQb2DGh/article/Mf8af4eaca3f9b166f045b71fe61100671698987694871/hero/M3a7968025eb1d23e85d85e2d960449b91699239359648.webp" },
      { id: 3, title: "Motion Graphics", url: "motion-graphics", rating: 4.9, hours: 10, price: "$299", img: "https://i.ytimg.com/vi/Hksg2s3gF6s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDeh2vr3Nzz38SinPVV8rHQt-Dw3Q" }
    ]
  },
  {
    category: "Programming & Development",
    courses: [
      { id: 4, title: "Web Development", url: "web-development", rating: 4.7, hours: 12, price: "Free", img: "https://th.bing.com/th/id/OIP.8mqy60LeafplWdtESgy-2wHaFr?rs=1&pid=ImgDetMain" },
      { id: 5, title: "Mobile App Development", url: "mobile-app-development", rating: 4.5, hours: 15, price: "$249", img: "https://www.panoramicinfotech.com/wp-content/uploads/2021/07/app-development-min.jpg" },
      { id: 6, title: "Game Development", url: "game-development", rating: 4.8, hours: 20, price: "$299", img: "https://th.bing.com/th/id/OIP.Rl5UGiiZMvhyUFbuS-o7lQHaFQ?rs=1&pid=ImgDetMain" }
    ]
  },

];

const CoursesSection = () => {
  const navigate = useNavigate(); // Define navigate function

  return (
    <Container className="my-5">
      {/* Header Section */}
      <div className="programs-header text-center pt-5">
        <h2 className="programs-heading">Explore Our Academic Programs</h2>
        <p className="programs-subtext">Enhance your knowledge with expert-led courses</p>
        <hr className="programs-divider" />
      </div>


      {/* Courses Section */}
      {coursesData.map((categoryItem, categoryIndex) => (
        <div key={categoryIndex}>
          <h3 className="fw-bold mt-4 text-secondary">{categoryItem.category}</h3>
          <Row className="justify-content-center">
            {categoryItem.courses.map((course) => (
              <Col key={course.id} md={4} className="mb-4">
                <Card className="shadow-lg border-0 h-100 d-flex flex-column">
                  <Card.Img
                    variant="top"
                    src={course.img}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold">{course.title}</Card.Title>
                      <p className="mb-2">⭐ {course.rating} Rating</p>
                      <p className="text-muted">{course.hours} Hours | {course.price}</p>
                    </div>
                    <Button
                      variant="primary"
                      className="enroll-button" // Custom Class
                      onClick={() => navigate("/courses/enroll")}
                    >
                      🚀 Enroll Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default CoursesSection;
