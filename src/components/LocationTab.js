import React, { useState, useEffect } from 'react';
import { Row, Col, Image, Carousel } from 'react-bootstrap';

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
    </div>
  );
};

export default LocationTab;
