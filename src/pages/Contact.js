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
            {/* Booking & Availability */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Why are you booked until 2027?</Accordion.Header>
              <Accordion.Body>
                Our small group adventures (maximum 6 people) have become incredibly popular! With Luke personally guiding every trip and our commitment to quality over quantity, we can only run a limited number of adventures each year. The combination of word-of-mouth recommendations and returning groups has filled our calendar through 2026.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Can I join a waiting list?</Accordion.Header>
              <Accordion.Body>
                Yes! We have a priority waitlist system. <Link to="/waitlist">Join our waitlist</Link> to be notified immediately when spots become available due to cancellations, or to get early access when 2027 bookings open. Waitlist members get first choice on all available dates.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What happens if someone cancels?</Accordion.Header>
              <Accordion.Body>
                Cancellations do happen occasionally. When they do, we immediately notify our waitlist members in order of registration. If you're flexible with dates and have a group of 4+ ready to go, you have the best chance of securing a cancelled spot.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>How far in advance should I book?</Accordion.Header>
              <Accordion.Body>
                Currently, we recommend booking at least 12-18 months in advance. When 2027 bookings open, popular dates (weekends, school holidays) will fill quickly. Join our waitlist for early access notifications.
              </Accordion.Body>
            </Accordion.Item>

            {/* Adventure Details */}
            <Accordion.Item eventKey="4">
              <Accordion.Header>How long are the adventures?</Accordion.Header>
              <Accordion.Body>
                Most adventures are 2 days/1 night, perfect for a weekend escape. We depart Saturday morning and return Sunday afternoon. Custom trips can be arranged for groups wanting longer adventures.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>What time do we start and finish?</Accordion.Header>
              <Accordion.Body>
                We typically meet at 7:00 AM on Saturday at the designated meeting point. Return time is usually between 4-6 PM on Sunday, depending on the trail and group pace. Exact times are confirmed a week before your adventure.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>What's included in the price?</Accordion.Header>
              <Accordion.Body>
                Everything you need for the adventure: all camping gear (tents, sleeping bags, mats), cooking equipment, all meals (breakfast, lunch, dinner, snacks), safety equipment, and expert guiding by Luke. You just need to bring personal items and appropriate clothing.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="7">
              <Accordion.Header>Do you offer day trips or only overnight?</Accordion.Header>
              <Accordion.Body>
                Our standard adventures are overnight experiences, as we believe the camping experience is a huge part of the adventure. However, we can arrange day hikes for groups with specific needs. Contact us to discuss options.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="8">
              <Accordion.Header>Can kids join the adventures?</Accordion.Header>
              <Accordion.Body>
                Yes! We welcome adventurous kids aged 10 and above who can handle the hiking distances. Kids under 16 must be accompanied by a parent or guardian. We can adjust routes for family groups - just let us know when booking.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="9">
              <Accordion.Header>What's the age limit?</Accordion.Header>
              <Accordion.Body>
                No upper age limit! As long as you're reasonably fit and your doctor is happy for you to participate, you're welcome. Our oldest adventurer was 73! We adjust the pace to suit the group.
              </Accordion.Body>
            </Accordion.Item>

            {/* Preparation & Gear */}
            <Accordion.Item eventKey="10">
              <Accordion.Header>What fitness level do I need?</Accordion.Header>
              <Accordion.Body>
                You should be able to walk for 4-6 hours with regular breaks while carrying a daypack (5-8kg). We're not racing - it's about enjoying the journey. If you can walk for an hour without stopping, you can build up to our adventures.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="11">
              <Accordion.Header>What should I wear?</Accordion.Header>
              <Accordion.Body>
                Layered clothing is key! Bring moisture-wicking base layers, insulating mid-layers, and a waterproof jacket. Avoid cotton - it gets cold when wet. We'll send a detailed packing list when you book. Good hiking boots are essential.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="12">
              <Accordion.Header>What personal items should I bring?</Accordion.Header>
              <Accordion.Body>
                Personal items include: hiking boots, clothing layers, hat, sunglasses, sunscreen, personal medications, water bottles (2L capacity), headlamp, toiletries, and camera. We provide a comprehensive packing list upon booking.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="13">
              <Accordion.Header>Do I need hiking boots?</Accordion.Header>
              <Accordion.Body>
                Yes, proper hiking boots with ankle support are essential for safety and comfort. They should be well broken-in before the trip. Trail runners are acceptable for some easier routes. No street sneakers please!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="14">
              <Accordion.Header>Can I bring my own gear?</Accordion.Header>
              <Accordion.Body>
                Absolutely! Many experienced hikers prefer their own sleeping bag or tent. Just let us know what you're bringing so we can adjust our packing. You'll still get the same price as we're providing the guiding service.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="15">
              <Accordion.Header>What about dietary requirements?</Accordion.Header>
              <Accordion.Body>
                We cater to all dietary requirements including vegetarian, vegan, gluten-free, and allergies. Just let us know when booking. Luke is an excellent bush chef and ensures everyone eats well!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="16">
              <Accordion.Header>Can I charge my phone/camera?</Accordion.Header>
              <Accordion.Body>
                We bring portable power banks for emergency use. However, part of the experience is disconnecting from technology! Bring your own power bank if you need regular charging. There's no mains power on the trail.
              </Accordion.Body>
            </Accordion.Item>

            {/* Safety & Experience */}
            <Accordion.Item eventKey="17">
              <Accordion.Header>Is it safe for beginners?</Accordion.Header>
              <Accordion.Body>
                Yes! Luke has years of experience guiding beginners safely through these trails. We choose routes appropriate to the group's experience level and provide all safety equipment and briefings. You're in good hands.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="18">
              <Accordion.Header>What safety equipment do you provide?</Accordion.Header>
              <Accordion.Body>
                We carry comprehensive first aid kits, emergency shelter, emergency beacon (EPIRB), maps, compass, GPS, emergency food, and water purification. Luke is trained in wilderness first aid.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="19">
              <Accordion.Header>Do you have first aid training?</Accordion.Header>
              <Accordion.Body>
                Yes, Luke holds current wilderness first aid certification and has extensive experience handling minor injuries and emergencies in remote areas. We also carry comprehensive first aid supplies and emergency communication devices.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="20">
              <Accordion.Header>What about wildlife encounters?</Accordion.Header>
              <Accordion.Body>
                Australian wildlife is generally harmless if respected. We might see kangaroos, wallabies, wombats, and various birds. Snakes are rare and avoid humans. Luke will brief you on wildlife safety. It's all part of the adventure!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="21">
              <Accordion.Header>Are the trails difficult?</Accordion.Header>
              <Accordion.Body>
                We offer trails ranging from moderate to challenging. The Cathedral Ranges involve some rock scrambling, Mount Feathertop is a longer hike with elevation gain, and the Grampians offers various difficulty levels. We match the trail to your group's ability.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="22">
              <Accordion.Header>What if the weather is bad?</Accordion.Header>
              <Accordion.Body>
                We monitor weather constantly and will postpone if conditions are dangerous (extreme heat, bushfire risk, severe storms). Light rain or cool weather doesn't stop us - that's what good gear is for! Some of our best adventures have been in moody weather.
              </Accordion.Body>
            </Accordion.Item>

            {/* Logistics */}
            <Accordion.Item eventKey="23">
              <Accordion.Header>Where do we meet?</Accordion.Header>
              <Accordion.Body>
                Meeting points vary by location. Typically, we meet at a landmark in Melbourne for carpooling, or directly at the trailhead if you're driving yourself. Full details including GPS coordinates are provided a week before your trip.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="24">
              <Accordion.Header>Is transport included?</Accordion.Header>
              <Accordion.Body>
                Transport from the meeting point to the trailhead can be arranged. Many groups prefer to carpool. If you need transport from Melbourne, we can organize this for an additional fee. Let us know your needs when booking.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="25">
              <Accordion.Header>Can I leave my car somewhere safe?</Accordion.Header>
              <Accordion.Body>
                Yes, all our trailheads have designated parking areas. Some are free, others may have a small fee. Your car will be safe for the duration of the trip. We'll provide specific parking information for your chosen location.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="26">
              <Accordion.Header>What about accommodation before/after?</Accordion.Header>
              <Accordion.Body>
                If you're traveling from interstate or want to break up the journey, we can recommend accommodation near the trailheads. Many groups enjoy a pub meal together after the adventure!
              </Accordion.Body>
            </Accordion.Item>

            {/* Payment & Policies */}
            <Accordion.Item eventKey="27">
              <Accordion.Header>When do I pay the balance?</Accordion.Header>
              <Accordion.Body>
                A 50% deposit secures your booking, with the balance due 30 days before your adventure. This helps us finalize food purchases and equipment preparation. We'll send a reminder email.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="28">
              <Accordion.Header>What payment methods do you accept?</Accordion.Header>
              <Accordion.Body>
                We accept bank transfer (preferred), credit card (Visa/Mastercard), and PayPal. Payment plans can be arranged for groups. Full payment details are provided when you book.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="29">
              <Accordion.Header>What's your cancellation policy?</Accordion.Header>
              <Accordion.Body>
                More than 60 days: Full refund minus $100 admin fee. 30-60 days: 50% refund. Less than 30 days: No refund unless we can fill your spot from the waitlist. We strongly recommend travel insurance. See full <Link to="/terms">Terms & Conditions</Link>.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="30">
              <Accordion.Header>Do you offer group discounts?</Accordion.Header>
              <Accordion.Body>
                Our prices are already competitive for all-inclusive adventures. However, if you bring a full group of 6, we offer a 10% discount for the group organizer. Corporate team-building groups may be eligible for special rates.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;