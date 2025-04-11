import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8}>
          <h2>Shopping Cart</h2>
          <Card className="p-3">
            <Row>
              <Col md={3}>
                <img
                  src="https://via.placeholder.com/100"
                  alt="Product"
                  className="img-fluid"
                />
              </Col>
              <Col md={6}>
                <h5>Nutrition: Meal Plan</h5>
                <p>$250.00</p>
              </Col>
              <Col md={3}>
                <Button variant="danger" size="sm">
                  Remove
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h4>Cart Totals</h4>
            <p>Subtotal: $250.00</p>
            <h5>Total: $250.00</h5>
            <Button
              className="mt-3"
              variant="warning"
              onClick={() => navigate("/paypal-checkout")}
            >
              PayPal
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
