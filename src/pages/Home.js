import React from 'react';
import { Carousel, Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  // All images with their location info
  const allSlides = [
    {
      image: './images/Feathertop A.jpg',
      name: 'Mount Feathertop',
      caption: "Victoria's Most Beautiful Peak",
      subtitle: '1,922m of Pure Adventure'
    },
    {
      image: './images/feathertop b.jpg',
      name: 'Mount Feathertop',
      caption: "Victoria's Most Beautiful Peak",
      subtitle: '1,922m of Pure Adventure'
    },
    {
      image: './images/cathederal A.jpeg',
      name: 'Cathedral Ranges',
      caption: 'Ancient Rock Formations',
      subtitle: '840m of Rugged Beauty'
    },
    {
      image: './images/cathederal b.jpg',
      name: 'Cathedral Ranges',
      caption: 'Ancient Rock Formations',
      subtitle: '840m of Rugged Beauty'
    },
    {
      image: './images/cathederal c.jpg',
      name: 'Cathedral Ranges',
      caption: 'Ancient Rock Formations',
      subtitle: '840m of Rugged Beauty'
    },
    {
      image: './images/grampians A.jpg',
      name: 'The Grampians (Gariwerd)',
      caption: 'Majestic Mountain Range',
      subtitle: '1,167m of Ancient Landscapes'
    },
    {
      image: './images/grampians c.jpg',
      name: 'The Grampians (Gariwerd)',
      caption: 'Majestic Mountain Range',
      subtitle: '1,167m of Ancient Landscapes'
    },
    {
      image: './images/grampians d.jpg',
      name: 'The Grampians (Gariwerd)',
      caption: 'Majestic Mountain Range',
      subtitle: '1,167m of Ancient Landscapes'
    }
  ];

  const carouselImageStyle = {
    height: '600px',
    objectFit: 'cover',
    width: '100%'
  };

  const captionStyle = {
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))',
    paddingBottom: '30px',
    paddingTop: '20px'
  };

  return (
    <div>
      <Carousel interval={4000} fade>
        {allSlides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={slide.image}
              alt={slide.name}
              style={carouselImageStyle}
            />
            <Carousel.Caption style={captionStyle}>
              <h2>{slide.name}</h2>
              <h4>{slide.caption}</h4>
              <p>{slide.subtitle}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="my-5">
        <div className="text-center">
          <h2>No Gear? No Worries! We've Got You Covered</h2>
          <p className="lead">Welcome to Dad's Gone Wild - where busy dads rediscover adventure in Victoria's spectacular high country. Leave the planning to us and just bring your sense of adventure!</p>
        </div>

        <Row className="mt-5">
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-campground fa-3x mb-3"></i>
                <Card.Title>All Gear Provided</Card.Title>
                <Card.Text>
                  From tents to sleeping bags, cooking equipment to safety gear - we bring everything. You just need comfortable shoes and a daypack.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-users fa-3x mb-3"></i>
                <Card.Title>Small Groups Only</Card.Title>
                <Card.Text>
                  Maximum 6 adventurers per trip ensures an intimate, personalized experience where you'll make real connections.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-mountain fa-3x mb-3"></i>
                <Card.Title>Expert Local Guide</Card.Title>
                <Card.Text>
                  Luke Mansfield, your experienced guide, knows every trail, viewpoint, and secret spot in the Victorian Alps.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center">
              <Card.Body>
                <i className="fas fa-utensils fa-3x mb-3"></i>
                <Card.Title>Meals Included</Card.Title>
                <Card.Text>
                  Hearty bush tucker and campfire meals. Special dietary requirements? No problem - just let us know.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;