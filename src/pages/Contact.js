import React from 'react';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';

const Contact = () => {
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
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} />
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