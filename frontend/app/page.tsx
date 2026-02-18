"use client";

import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function Home() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSend = async () => {
    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: phoneNumber,
          text: message,
          firstName:firstName,
          lastName:lastName
        }),
      });

      const data = await response.json();
      console.log(data);

      alert("Mesaj gönderildi!");
    } catch (error) {
      console.error(error);
      alert("Hata oluştu!");
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <Container className="d-flex justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={12} lg={12} className="mt-5">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <h4 className="text-center mb-4 fw-bold">
                  Mesaj Gönder
                </h4>

                <Form>

                  <Form.Group className="mb-3">
                    <Form.Label>İsim</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="İsim"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Soyisim</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Soyisim"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Tel No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Tel No"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Mesaj</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Mesaj yazın..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="button"
                    variant="dark"
                    className="w-100 rounded-3"
                    onClick={handleSend}
                  >
                    Gönder
                  </Button>

                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
