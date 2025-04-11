import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "../styles/testimonials.css"; // Use this if your CSS is in `src/styles/`


const testimonials = [
  {
    id: 1,
    company: "Systems Limited",
    text: "This course helped me master front-end development. The projects were very insightful!",
    rating: 5,
    name: "Mustafa",
    role: "Web Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    logoColor: "text-warning",
  },
  {
    id: 2,
    company: "10Pearls",
    text: "The Logo Designing module was amazing. I can now create professional logos with ease!",
    rating: 5,
    name: "Shiza",
    role: "Logo Designer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    logoColor: "text-dark fw-bold",
  },
  {
    id: 3,
    company: "Folio3 Pvt Ltd",
    text: "I built my first full-stack web application thanks to this platform. The lessons were easy to follow.",
    rating: 5,
    name: "Ali",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    logoColor: "text-success fw-bold",
  },
];

const TestimonialsSection = () => {
  return (
    <Container className="testimonials-container text-center">


      {/* <h5 className="testimonials-subheading text-uppercase text-muted">
        Testimonials
      </h5> */}
      <h2 className="testimonials-heading">
        What Our <span className="text-primary">Students Say</span>
      </h2>
      <Row className="justify-content-center mt-4">
        {testimonials.map((testimonial) => (
          <Col key={testimonial.id} md={4} className="mb-4">
            <Card className="testimonial-card">
              <h5 className={testimonial.logoColor}>{testimonial.company}</h5>
              <p className="text-muted">{testimonial.text}</p>
              <div className="testimonial-stars">
                {"⭐".repeat(testimonial.rating)}
              </div>
              <div className="d-flex align-items-center mt-3">
                <Image
                  src={testimonial.image}
                  roundedCircle
                  width={50}
                  height={50}
                  className="me-3"
                />
                <div>
                  <h6 className="testimonial-name">{testimonial.name}</h6>
                  <small className="testimonial-role">{testimonial.role}</small>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TestimonialsSection;
