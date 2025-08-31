import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Accordion, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [groupSize, setGroupSize] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (response.ok) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="my-5">
      <div className="text-center">
        <h1>Let's Start Your Adventure</h1>
        <p>Got questions? Ready to book? Just want to chat about the mountains? We'd love to hear from you!</p>
        <Alert variant="warning" className="mt-3">
          <Alert.Heading>🏔️ 2025 & 2026 Fully Booked!</Alert.Heading>
          <p className="mb-0">
            Due to overwhelming demand, all adventures for 2025 and 2026 are now fully booked. 
            Join our waiting list below to be notified of cancellations or when 2027 bookings open.
          </p>
        </Alert>
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
            
            <Row>
              <Col md={6}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name *</Form.Label>
                  <Form.Control type="text" name="name" placeholder="Enter your name" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address *</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter your email" required />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" name="phone" placeholder="Your contact number" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formGroupSize" className="mb-3">
                  <Form.Label>Group Size *</Form.Label>
                  <Form.Select 
                    name="groupSize" 
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    required
                  >
                    <option value="">Select group size...</option>
                    <option value="1">1 person (will join existing group)</option>
                    <option value="2">2 people (will join existing group)</option>
                    <option value="3">3 people (will join existing group)</option>
                    <option value="4">4 people (minimum for private group)</option>
                    <option value="5">5 people</option>
                    <option value="6">6 people (maximum)</option>
                  </Form.Select>
                  {groupSize && parseInt(groupSize) < 4 && (
                    <Form.Text className="text-warning">
                      Note: Minimum 4 people required for a private adventure. We'll add you to an existing group or waiting list.
                    </Form.Text>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Preferred Location</Form.Label>
                  <Form.Select name="location">
                    <option value="">Any location</option>
                    <option value="feathertop">Mount Feathertop</option>
                    <option value="cathedral">Cathedral Ranges</option>
                    <option value="grampians">The Grampians</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Preferred Dates (2027 onwards)</Form.Label>
                  <Form.Control type="text" name="dates" placeholder="e.g., March 2027" />
                  <Form.Text className="text-muted">
                    2025 & 2026 fully booked - taking 2027 expressions of interest
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                name="message" 
                rows={4} 
                placeholder="Tell us about your group, fitness levels, any special requirements..." 
                required 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check 
                type="checkbox"
                id="terms-checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
                label={
                  <>
                    I have read and accept the{' '}
                    <Link to="/terms" target="_blank">Terms & Conditions</Link> *
                  </>
                }
              />
            </Form.Group>

            <Alert variant="info" className="mb-3">
              <small>
                <strong>Important:</strong> All adventures require a minimum of 4 participants. 
                Trips may be cancelled if minimum numbers aren't met. Full details in our{' '}
                <Link to="/terms">Terms & Conditions</Link>.
              </small>
            </Alert>

            <Button 
              variant="primary" 
              type="submit" 
              disabled={isSubmitting || !termsAccepted}
              size="lg"
            >
              {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
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