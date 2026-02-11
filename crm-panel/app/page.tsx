"use client";
 
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import Form from 'react-bootstrap/Form';

export default function Home() {

  const [text, setText] = useState("");


const handleSend = async () => {
  await fetch("http://localhost:3000/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      number: "38977863796",
      message: text,
    }),
  });
};

  return (
 <Container fluid >
<h3 className="text-center mb-4">Mesaj Gönder...</h3>
  <Row className="justify-content-center">
  <Col xs={12} md={5}>
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

        <Button variant="primary" onClick={handleSend}>
          Gönder
        </Button>
      </Form>
 </Col>
    </Row>
    </Container>
  );
}