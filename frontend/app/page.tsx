"use client";

import { Button, Col, Container, Row, Card } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function Home() {
  const [text, setText] = useState("");

const handleSend = async () => {
  try {
    const response = await fetch("http://localhost:5000/send-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: "905338541810", // burayı input yapabilirsin
        text: text,
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
      <Container className="d-flex justify-content-center   min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <h4 className="text-center mb-4 fw-bold">
                  Mesaj Gönder
                </h4>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Mesaj</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Mesaj yazın..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
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
