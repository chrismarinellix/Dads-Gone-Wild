import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Accordion, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      setFormStatus('success');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 5000);
    })
    .catch(() => {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    });
  };

  return (
    <Container className="my-5">
      <div className="text-center">
        <h1>Let's Start Your Adventure</h1>
        <p>Got questions? Ready to book? Just want to chat about the mountains? We'd love to hear from you!</p>
      </div>

      <Row className="my-5">
        <Col md={6}>
          <h2>Get in Touch</h2>
          <p><i className="fas fa-phone"></i> 0423 417 866</p>
          <p><i className="fas fa-envelope"></i> luke@hoskinscarpetgallery.com.au</p>
          <p><i className="fas fa-map-marker-alt"></i> Based in Melbourne, VIC</p>
        </Col>
        <Col md={6}>
          <h2>Send Us a Message</h2>
          {formStatus === 'success' && (
            <Alert variant="success">
              Thanks for your message! Luke will get back to you soon.
            </Alert>
          )}
          {formStatus === 'error' && (
            <Alert variant="danger">
              Oops! Something went wrong. Please try again or email Luke directly.
            </Alert>
          )}
          <Form 
            name="contact" 
            method="POST" 
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: 'none' }}>
              <input name="bot-field" />
            </div>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" placeholder="Enter your name" required />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" name="message" rows={3} placeholder="Tell us about your adventure plans..." required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h2>Frequently Asked Questions</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>What fitness level do I need?</Accordion.Header>
              <Accordion.Body>
                We cater to various fitness levels. As long as you can walk for a few hours with breaks, you'll be fine. We adjust pace to the group and Luke ensures everyone is comfortable.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>What if the weather is bad?</Accordion.Header>
              <Accordion.Body>
                We monitor weather closely and will reschedule if conditions are dangerous. Light rain won't stop us - some of the best adventures happen in mixed weather!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Can I bring my own gear?</Accordion.Header>
              <Accordion.Body>
                Absolutely! While we provide everything, you're welcome to bring your own gear if you prefer. Just let us know what you're bringing.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;