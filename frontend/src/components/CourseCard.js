import React from "react";
import { Card, Button } from "react-bootstrap";

const CourseCard = ({ image, title, author, rating, reviews, buttonText }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>By {author}</Card.Text>
        <Card.Text>⭐ {rating} ({reviews})</Card.Text>
        <Button variant="primary">{buttonText}</Button>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
