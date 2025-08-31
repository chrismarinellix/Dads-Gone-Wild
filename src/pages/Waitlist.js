import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Waitlist = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      <Row className="justify-content-center">
        <Col lg={8}>
          <div className="text-center mb-5">
            <h1>Join the Waitlist</h1>
            <Alert variant="warning" className="mt-3">
              <Alert.Heading>🏔️ 2025 & 2026 Fully Booked!</Alert.Heading>
              <p className="mb-0">
                Due to overwhelming demand, all adventures for 2025 and 2026 are now fully booked. 
                Join our waiting list below to be notified of cancellations or when 2027 bookings open.
              </p>
            </Alert>
          </div>

          <Card>
            <Card.Body>
              <h3 className="mb-4">Priority Waitlist Registration</h3>
              
              {formStatus === 'success' && (
                <Alert variant="success">
                  You've been added to the waitlist! We'll notify you as soon as spots become available.
                </Alert>
              )}
              {formStatus === 'error' && (
                <Alert variant="danger">
                  Oops! Something went wrong. Please try again or email Luke directly.
                </Alert>
              )}

              <Form 
                name="waitlist" 
                method="POST" 
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="waitlist" />
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
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control type="tel" name="phone" placeholder="Your contact number" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formGroupSize" className="mb-3">
                      <Form.Label>Expected Group Size *</Form.Label>
                      <Form.Select name="groupSize" required>
                        <option value="">Select group size...</option>
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people (minimum for private group)</option>
                        <option value="5">5 people</option>
                        <option value="6">6 people (maximum)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="formLocation" className="mb-3">
                      <Form.Label>Preferred Location(s) *</Form.Label>
                      <div>
                        <Form.Check 
                          type="checkbox"
                          id="location-feathertop"
                          name="location_feathertop"
                          label="Mount Feathertop"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="location-cathedral"
                          name="location_cathedral"
                          label="Cathedral Ranges"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="location-grampians"
                          name="location_grampians"
                          label="The Grampians"
                        />
                        <Form.Check 
                          type="checkbox"
                          id="location-any"
                          name="location_any"
                          label="Any location - I'm flexible!"
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTimeframe" className="mb-3">
                      <Form.Label>When are you looking to book? *</Form.Label>
                      <Form.Select name="timeframe" required>
                        <option value="">Select timeframe...</option>
                        <option value="cancellation">Any 2025/2026 cancellation</option>
                        <option value="early2027">Early 2027 (Jan-Mar)</option>
                        <option value="mid2027">Mid 2027 (Apr-Aug)</option>
                        <option value="late2027">Late 2027 (Sep-Dec)</option>
                        <option value="2028">2028 or later</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formFlexibility" className="mb-3">
                  <Form.Label>Date Flexibility</Form.Label>
                  <Form.Select name="flexibility">
                    <option value="">Select flexibility...</option>
                    <option value="weekends">Weekends only</option>
                    <option value="weekdays">Can do weekdays</option>
                    <option value="anytime">Completely flexible</option>
                    <option value="school-holidays">School holidays preferred</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formPriority" className="mb-3">
                  <Form.Label>Waitlist Priority</Form.Label>
                  <div>
                    <Form.Check 
                      type="checkbox"
                      id="priority-cancellation"
                      name="priority_cancellation"
                      label="I'm interested in last-minute cancellations (can book with short notice)"
                    />
                    <Form.Check 
                      type="checkbox"
                      id="priority-group"
                      name="priority_group"
                      label="I have a group of 4+ ready to book immediately"
                    />
                    <Form.Check 
                      type="checkbox"
                      id="priority-flexible"
                      name="priority_flexible"
                      label="I'm flexible on dates and locations"
                    />
                  </div>
                </Form.Group>

                <Form.Group controlId="formNotes" className="mb-3">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="notes" 
                    rows={3} 
                    placeholder="Tell us about any special requirements, preferred dates, or other information..." 
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    label="Send me updates about new adventures and availability"
                    defaultChecked
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? 'Adding to Waitlist...' : 'Join Waitlist'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <h4>How the Waitlist Works</h4>
              <ol>
                <li><strong>Priority Notification:</strong> You'll be the first to know when spots become available</li>
                <li><strong>Cancellation Alerts:</strong> Get notified immediately if someone cancels their booking</li>
                <li><strong>2027 Early Access:</strong> Waitlist members get first choice when 2027 bookings open</li>
                <li><strong>No Obligation:</strong> Being on the waitlist doesn't commit you to booking</li>
                <li><strong>Fair Queue:</strong> We process waitlist requests in order, prioritizing groups of 4+</li>
              </ol>
              
              <Alert variant="info" className="mt-3">
                <strong>Tip:</strong> Groups of 4 or more have the best chance of securing spots, as we require minimum 
                4 participants per adventure. Consider joining forces with friends!
              </Alert>
            </Card.Body>
          </Card>

          <div className="text-center mt-4">
            <p>Have questions? <Link to="/contact">Contact Luke directly</Link></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Waitlist;