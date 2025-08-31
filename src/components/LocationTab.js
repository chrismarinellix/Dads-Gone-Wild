import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Carousel, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LocationTab = ({ location }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through images
  useEffect(() => {
    if (location.images && location.images.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => 
          (prevIndex + 1) % location.images.length
        );
      }, 5000); // Change image every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [location.images]);

  const imageStyle = {
    height: '400px',
    objectFit: 'cover',
    width: '100%'
  };

  const captionStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
    color: 'white',
    padding: '20px',
    textAlign: 'center'
  };

  return (
    <div>
      <h2>{location.name}</h2>
      <p>{location.description}</p>
      <Row>
        <Col md={6}>
          <div className="position-relative">
            {location.images ? (
              <Carousel 
                activeIndex={activeIndex} 
                onSelect={setActiveIndex}
                interval={5000}
                fade
              >
                {location.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image 
                      src={image} 
                      fluid 
                      style={imageStyle}
                      alt={`${location.name} view ${index + 1}`}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Image 
                src={location.image} 
                fluid 
                style={imageStyle}
                alt={location.name}
              />
            )}
            <div style={captionStyle}>
              <h4 className="mb-1">{location.caption || location.name}</h4>
              <p className="mb-0">{location.subtitle}</p>
            </div>
          </div>
        </Col>
        <Col md={6}>
          <h4>Why We Love It</h4>
          <ul>
            {location.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </Col>
      </Row>
      
      {location.popularWalks && (
        <Row className="mt-5">
          <Col>
            <h3>Popular Walks in {location.name}</h3>
            <Row className="mt-3">
              {location.popularWalks.map((walk, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card h-100>
                    <Card.Body>
                      <Card.Title>{walk.name}</Card.Title>
                      <div className="mb-2">
                        <Badge 
                          bg={
                            walk.difficulty === 'Easy' ? 'success' :
                            walk.difficulty === 'Easy-Moderate' ? 'info' :
                            walk.difficulty === 'Moderate' ? 'warning' :
                            walk.difficulty === 'Moderate-Hard' ? 'warning' :
                            'danger'
                          }
                          className="me-2"
                        >
                          {walk.difficulty}
                        </Badge>
                      </div>
                      <Card.Text>
                        <small className="text-muted">
                          <strong>Distance:</strong> {walk.distance}<br />
                          <strong>Duration:</strong> {walk.duration}
                        </small>
                      </Card.Text>
                      <Card.Text>
                        {walk.description}
                      </Card.Text>
                      <Link to="/maps" className="btn btn-sm btn-outline-primary">
                        View on Map →
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default LocationTab;
