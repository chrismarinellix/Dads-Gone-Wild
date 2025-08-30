import React from 'react';
import { Card, Button } from 'react-bootstrap';

const AdventureCard = ({ adventure, handleBooking }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{adventure.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{adventure.date}</Card.Subtitle>
        <Card.Text>{adventure.description}</Card.Text>
        <ul className="highlights">
          {adventure.highlights.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
        <div className="d-flex justify-content-between align-items-center">
          <span className="price">${adventure.price} per person</span>
          <Button variant="primary" onClick={() => handleBooking(adventure)}>Book Now</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AdventureCard;
