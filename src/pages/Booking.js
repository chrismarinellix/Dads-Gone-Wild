import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Badge, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Booking = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Adventure packages with pricing
  const packages = [
    {
      id: 'feathertop-weekend',
      name: 'Mount Feathertop Weekend',
      location: 'Mount Feathertop',
      duration: '2 days, 1 night',
      difficulty: 'Hard',
      price: 599,
      includes: [
        'All camping equipment',
        'All meals (lunch to lunch)',
        'Professional guide',
        'Safety equipment',
        'Pre-trip briefing'
      ],
      dates: '2027 dates coming soon'
    },
    {
      id: 'cathedral-adventure',
      name: 'Cathedral Ranges Adventure',
      location: 'Cathedral Ranges',
      duration: '2 days, 1 night',
      difficulty: 'Moderate-Hard',
      price: 549,
      includes: [
        'All camping equipment',
        'All meals (lunch to lunch)',
        'Professional guide',
        'Safety equipment',
        'Pre-trip briefing'
      ],
      dates: '2027 dates coming soon'
    },
    {
      id: 'grampians-explorer',
      name: 'Grampians Explorer',
      location: 'The Grampians',
      duration: '2 days, 1 night',
      difficulty: 'Moderate',
      price: 529,
      includes: [
        'All camping equipment',
        'All meals (lunch to lunch)',
        'Professional guide',
        'Safety equipment',
        'Pre-trip briefing'
      ],
      dates: '2027 dates coming soon'
    },
    {
      id: 'custom-group',
      name: 'Custom Group Adventure',
      location: 'Your choice',
      duration: 'Flexible',
      difficulty: 'Tailored to group',
      price: 649,
      includes: [
        'Customized itinerary',
        'All equipment provided',
        'All meals included',
        'Professional guide',
        'Choose your dates'
      ],
      dates: 'Available from 2027'
    }
  ];

  const handlePayment = async () => {
    if (!selectedPackage || !groupSize || !termsAccepted) {
      alert('Please select a package, group size, and accept terms');
      return;
    }

    setLoading(true);
    
    const selected = packages.find(p => p.id === selectedPackage);
    const totalPrice = selected.price * parseInt(groupSize);
    
    // For now, show payment instructions
    // In production, this would redirect to Stripe Checkout
    alert(`Total: $${totalPrice} AUD\n\nTo complete booking:\n1. Bank transfer to BSB: 123-456, Account: 12345678\n2. Reference: Your name + ${selected.name}\n3. Email confirmation to luke@hoskinscarpetgallery.com.au\n\nOr call Luke on 0423 417 866 to pay by card.`);
    
    setLoading(false);
  };

  const calculateTotal = () => {
    if (!selectedPackage || !groupSize) return 0;
    const selected = packages.find(p => p.id === selectedPackage);
    return selected ? selected.price * parseInt(groupSize) : 0;
  };

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>Book Your Adventure</h1>
        <p className="lead">Select your package and secure your spot</p>
        <Alert variant="warning">
          <strong>Note:</strong> 2025 & 2026 are fully booked. Taking bookings for 2027.
        </Alert>
      </div>

      <Row>
        <Col lg={8}>
          <h3 className="mb-4">Adventure Packages</h3>
          <Row>
            {packages.map(pkg => (
              <Col md={6} key={pkg.id} className="mb-4">
                <Card 
                  className={selectedPackage === pkg.id ? 'border-primary' : ''}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">{pkg.name}</h5>
                      <Form.Check
                        type="radio"
                        name="package"
                        checked={selectedPackage === pkg.id}
                        onChange={() => setSelectedPackage(pkg.id)}
                      />
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <Badge bg="success" className="me-2">{pkg.location}</Badge>
                      <Badge bg="info" className="me-2">{pkg.duration}</Badge>
                      <Badge bg={
                        pkg.difficulty === 'Hard' ? 'danger' :
                        pkg.difficulty === 'Moderate-Hard' ? 'warning' :
                        'primary'
                      }>
                        {pkg.difficulty}
                      </Badge>
                    </div>
                    
                    <h3 className="text-primary">${pkg.price} <small className="text-muted">per person</small></h3>
                    
                    <p className="text-muted small">{pkg.dates}</p>
                    
                    <h6>Includes:</h6>
                    <ListGroup variant="flush" className="small">
                      {pkg.includes.map((item, idx) => (
                        <ListGroup.Item key={idx} className="ps-0 py-1">
                          <i className="fas fa-check text-success me-2"></i>
                          {item}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h4>Booking Summary</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Selected Package</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={selectedPackage ? packages.find(p => p.id === selectedPackage)?.name : 'None selected'}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Group Size *</Form.Label>
                  <Form.Select 
                    value={groupSize}
                    onChange={(e) => setGroupSize(e.target.value)}
                    required
                  >
                    <option value="">Select group size...</option>
                    <option value="1">1 person (join existing group)</option>
                    <option value="2">2 people (join existing group)</option>
                    <option value="3">3 people (join existing group)</option>
                    <option value="4">4 people (private group)</option>
                    <option value="5">5 people</option>
                    <option value="6">6 people (maximum)</option>
                  </Form.Select>
                  {groupSize && parseInt(groupSize) < 4 && (
                    <Form.Text className="text-warning">
                      Minimum 4 for private group
                    </Form.Text>
                  )}
                </Form.Group>

                <Alert variant="info">
                  <h5>Total: ${calculateTotal()} AUD</h5>
                  {groupSize && selectedPackage && (
                    <small>
                      ${packages.find(p => p.id === selectedPackage)?.price} × {groupSize} {parseInt(groupSize) === 1 ? 'person' : 'people'}
                    </small>
                  )}
                </Alert>

                <Form.Group className="mb-3">
                  <Form.Check 
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    label={
                      <>
                        I accept the <Link to="/terms" target="_blank">Terms & Conditions</Link> *
                      </>
                    }
                  />
                </Form.Group>

                <Alert variant="warning" className="small">
                  <strong>Payment Options:</strong>
                  <ul className="mb-0 mt-2">
                    <li>50% deposit to secure booking</li>
                    <li>Balance due 7 days before trip</li>
                    <li>Bank transfer or card accepted</li>
                  </ul>
                </Alert>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-100"
                  onClick={handlePayment}
                  disabled={!selectedPackage || !groupSize || !termsAccepted || loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Payment'}
                </Button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Secure payment processing<br/>
                    <i className="fas fa-lock me-2"></i>
                    Your information is safe
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <Card bg="light">
            <Card.Body>
              <h4>Payment & Booking Process</h4>
              <Row className="mt-3">
                <Col md={3}>
                  <div className="text-center">
                    <i className="fas fa-calendar-check fa-3x text-primary mb-2"></i>
                    <h5>1. Select Package</h5>
                    <p className="small">Choose your adventure and dates</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <i className="fas fa-credit-card fa-3x text-primary mb-2"></i>
                    <h5>2. Pay Deposit</h5>
                    <p className="small">50% deposit secures your spot</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <i className="fas fa-envelope fa-3x text-primary mb-2"></i>
                    <h5>3. Receive Confirmation</h5>
                    <p className="small">Get booking details & packing list</p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="text-center">
                    <i className="fas fa-hiking fa-3x text-primary mb-2"></i>
                    <h5>4. Adventure Time!</h5>
                    <p className="small">Meet at departure point</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Alert variant="info">
            <h5>Need Help Booking?</h5>
            <p>
              Call Luke directly on <strong>0423 417 866</strong> or email{' '}
              <a href="mailto:luke@hoskinscarpetgallery.com.au">luke@hoskinscarpetgallery.com.au</a>
            </p>
            <p className="mb-0">
              We're happy to discuss custom dates, group bookings, or answer any questions about our adventures.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Booking;