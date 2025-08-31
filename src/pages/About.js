import React from 'react';
import { Container, Row, Col, Image, Card, Carousel } from 'react-bootstrap';

const About = () => {
  const lukePhotos = [
    { src: './images/luke 1.jpg', alt: 'Luke on the trail' },
    { src: './images/luke 2.JPG', alt: 'Luke at summit' },
    { src: './images/luke 5.jpg', alt: 'Luke hiking' },
    { src: './images/luke 4.JPG', alt: 'Luke in the mountains' }
  ];

  const carouselImageStyle = {
    height: '500px',
    width: '100%',
    objectFit: 'cover'
  };

  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col lg={12} className="text-center">
          <h1>G'day! I'm Luke Mansfield</h1>
          <p className="lead">Your guide to Victoria's high country adventures</p>
          <p>After 20+ years of exploring these mountains, I'm passionate about sharing the transformative power of the Australian bush with fellow dads who need a break from the daily grind.</p>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col lg={12}>
          <Carousel interval={3000} fade>
            {lukePhotos.map((photo, index) => (
              <Carousel.Item key={index}>
                <Image 
                  src={photo.src} 
                  alt={photo.alt} 
                  style={carouselImageStyle}
                  className="d-block w-100"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h2>Why Dad's Gone Wild?</h2>
          <p>It started with a simple observation. As a dad myself, I watched my mates struggle to find time for adventure. They'd talk about wanting to get outdoors, to challenge themselves, to disconnect from the constant demands of work and family life. But the barriers were always the same - no gear, no time to plan, no knowledge of where to go.</p>
          <blockquote className="blockquote text-center my-4">
            <p className="mb-0">I realized that what busy dads needed wasn't just a hiking trip - they needed someone to remove every obstacle between them and the mountains.</p>
          </blockquote>
          <p>That's when Dad's Gone Wild was born. I handle everything - the gear, the planning, the logistics. All you need to do is show up with a pair of boots and an open mind. In just one weekend, you'll experience the best of Victoria's high country, make genuine connections with like-minded blokes, and return home recharged.</p>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <h2>Experience & Values</h2>
          <Row>
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <i className="fas fa-compass fa-3x mb-3"></i>
                  <Card.Title>Local Knowledge</Card.Title>
                  <Card.Text>Two decades exploring every trail, peak, and hidden gem in the Victorian Alps</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center">
                <Card.Body>
                  <i className="fas fa-leaf fa-3x mb-3"></i>
                  <Card.Title>Environmental Advocate</Card.Title>
                  <Card.Text>Passionate about conservation and Leave No Trace principles</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default About;