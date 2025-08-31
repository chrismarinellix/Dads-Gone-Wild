import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';

const Terms = () => {
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>Terms & Conditions</h1>
        <p className="lead">Please read these terms carefully before booking your adventure</p>
      </div>

      <Alert variant="info" className="mb-4">
        <Alert.Heading>Important: Group Size Requirements</Alert.Heading>
        <p className="mb-0">
          All adventures require a <strong>minimum of 4 participants</strong> to proceed. 
          If minimum numbers are not met 7 days before departure, the trip may be cancelled or rescheduled.
        </p>
      </Alert>

      <Row>
        <Col lg={12}>
          <Card className="mb-4">
            <Card.Header as="h3">1. Booking & Payment Terms</Card.Header>
            <Card.Body>
              <ul>
                <li><strong>Deposit:</strong> 50% deposit required at time of booking to secure your spot</li>
                <li><strong>Final Payment:</strong> Balance due 7 days before departure</li>
                <li><strong>Group Size:</strong> Minimum 4 people, maximum 6 people per adventure</li>
                <li><strong>Solo/Small Groups:</strong> Contact us to join an existing group or be placed on a waiting list</li>
                <li><strong>Payment Methods:</strong> Bank transfer, credit card (Visa/Mastercard)</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">2. Cancellation Policy</Card.Header>
            <Card.Body>
              <h5>Cancellation by Participant:</h5>
              <ul>
                <li><strong>14+ days before:</strong> Full refund minus $50 admin fee</li>
                <li><strong>7-14 days before:</strong> 50% refund</li>
                <li><strong>Less than 7 days:</strong> No refund (unless we can fill your spot)</li>
                <li><strong>No-show:</strong> No refund</li>
              </ul>
              
              <h5>Cancellation by Dads Gone Wild:</h5>
              <ul>
                <li><strong>Weather:</strong> Full refund or transfer to another date</li>
                <li><strong>Insufficient numbers:</strong> Full refund or option to pay for minimum group size</li>
                <li><strong>Emergency/Safety:</strong> Full refund or transfer</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">3. Weather Policy</Card.Header>
            <Card.Body>
              <p><strong>Safety is our top priority.</strong> Weather decisions are made 48 hours before departure.</p>
              <ul>
                <li><strong>Light rain/drizzle:</strong> Adventures proceed (rain gear provided)</li>
                <li><strong>Heavy rain/storms:</strong> Postponed or cancelled with full refund</li>
                <li><strong>Extreme heat (35°C+):</strong> Modified itinerary or cancellation</li>
                <li><strong>Snow/Ice (winter):</strong> May proceed with modified route if safe</li>
                <li><strong>Fire danger:</strong> Cancelled if Total Fire Ban declared</li>
              </ul>
              <Alert variant="warning" className="mt-3">
                Luke makes all final weather calls based on Bureau of Meteorology forecasts and park conditions.
              </Alert>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">4. Fitness & Health Requirements</Card.Header>
            <Card.Body>
              <ul>
                <li><strong>Fitness Level:</strong> Moderate fitness required - ability to walk 4-6 hours with breaks</li>
                <li><strong>Age:</strong> 18+ or 16+ with parent/guardian</li>
                <li><strong>Medical Conditions:</strong> Must disclose any medical conditions, medications, or dietary requirements</li>
                <li><strong>Pregnancy:</strong> Not recommended for pregnant participants</li>
                <li><strong>Mobility:</strong> Participants must be able to walk unassisted on uneven terrain</li>
              </ul>
              <Alert variant="danger" className="mt-3">
                Failure to disclose medical conditions may result in removal from trip without refund.
              </Alert>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">5. What's Included & Not Included</Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h5>✅ Included:</h5>
                  <ul>
                    <li>All camping equipment (tents, sleeping bags, mats)</li>
                    <li>Cooking equipment and utensils</li>
                    <li>All meals from lunch Day 1 to lunch Day 2</li>
                    <li>Snacks and hot drinks</li>
                    <li>First aid and safety equipment</li>
                    <li>Professional guide (Luke)</li>
                    <li>Pre-trip briefing and packing list</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h5>❌ Not Included:</h5>
                  <ul>
                    <li>Transport to/from meeting point</li>
                    <li>Personal hiking boots (mandatory)</li>
                    <li>Personal clothing and toiletries</li>
                    <li>Personal medications</li>
                    <li>Travel insurance (highly recommended)</li>
                    <li>Alcoholic beverages</li>
                    <li>Personal snacks beyond provided</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">6. Safety & Insurance</Card.Header>
            <Card.Body>
              <ul>
                <li><strong>Experience:</strong> Luke has 20+ years experience leading trips in the Victorian Alps</li>
                <li><strong>Public Liability:</strong> Dads Gone Wild carries $20 million public liability insurance</li>
                <li><strong>Personal Insurance:</strong> Participants must have their own travel/medical insurance</li>
                <li><strong>Emergency Procedures:</strong> Comprehensive emergency plans for all locations</li>
                <li><strong>Communication:</strong> Satellite communicator carried on all trips</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">7. Code of Conduct</Card.Header>
            <Card.Body>
              <p>All participants must:</p>
              <ul>
                <li>Follow guide instructions at all times</li>
                <li>Respect other participants and maintain group harmony</li>
                <li>Practice Leave No Trace principles</li>
                <li>No illegal drugs or excessive alcohol consumption</li>
                <li>Respect wildlife and natural environment</li>
                <li>Maintain appropriate behavior and language</li>
              </ul>
              <Alert variant="warning" className="mt-3">
                Participants may be removed without refund for serious breaches of conduct.
              </Alert>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">8. Liability Waiver</Card.Header>
            <Card.Body>
              <p>
                By booking an adventure with Dads Gone Wild, you acknowledge that outdoor activities involve inherent risks including but not limited to:
              </p>
              <ul>
                <li>Slips, trips, and falls on uneven terrain</li>
                <li>Weather exposure (sun, rain, cold, heat)</li>
                <li>Wildlife encounters</li>
                <li>Allergic reactions to plants or insects</li>
                <li>Altitude-related issues</li>
              </ul>
              <p>
                Participants must sign a detailed waiver before departure. Dads Gone Wild and Luke Mansfield accept no responsibility for personal injury, 
                loss, or damage to personal property except where required by law.
              </p>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">9. Booking Modifications</Card.Header>
            <Card.Body>
              <ul>
                <li><strong>Date Changes:</strong> One free date change if requested 14+ days before</li>
                <li><strong>Participant Substitution:</strong> Allowed up to 7 days before with notification</li>
                <li><strong>Itinerary Changes:</strong> May be modified for safety or weather reasons</li>
                <li><strong>Upgrade/Downgrade:</strong> Subject to availability and price difference</li>
              </ul>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Header as="h3">10. Contact & Complaints</Card.Header>
            <Card.Body>
              <p>For all enquiries, modifications, or concerns:</p>
              <ul>
                <li><strong>Phone:</strong> 0423 417 866</li>
                <li><strong>Email:</strong> luke@hoskinscarpetgallery.com.au</li>
                <li><strong>Response Time:</strong> Within 24 hours during business days</li>
              </ul>
              <p>
                Any complaints should be raised with Luke immediately during the trip so they can be addressed. 
                Written complaints can be submitted within 7 days of trip completion.
              </p>
            </Card.Body>
          </Card>

          <Alert variant="success" className="mt-5">
            <Alert.Heading>Ready to Book?</Alert.Heading>
            <p>
              By proceeding with your booking, you confirm that you have read, understood, and agree to these terms and conditions.
            </p>
            <p className="mb-0">
              <strong>Last updated:</strong> December 2024
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Terms;