import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import AdventureCard from '../components/AdventureCard';
import BookingModal from '../components/BookingModal';

const adventures = [
  {
    id: 1,
    title: 'Cathedral Ranges Autumn Adventure',
    date: 'March 14-16, 2025',
    difficulty: 'Moderate',
    spots: 4,
    description: 'Experience the Cathedral Ranges in perfect autumn weather. Tackle the famous Razorback ridge, explore Sugarloaf Peak, and camp under crisp autumn skies.',
    highlights: ['Razorback Ridge traverse', 'Sugarloaf Peak summit', 'Autumn colors & cool weather'],
    price: 395,
    location: 'cathedral'
  },
  {
    id: 2,
    title: 'Mount Feathertop Post-Summer Trek',
    date: 'April 18-20, 2025',
    difficulty: 'Challenging',
    spots: 5,
    description: 'Conquer Victoria\'s second-highest peak via the spectacular Razorback Trail. Perfect weather conditions with clear views and comfortable temperatures.',
    highlights: ['Razorback Trail experience', '360° summit views', 'Federation Hut camping'],
    price: 395,
    location: 'feathertop'
  },
  {
    id: 3,
    title: 'Grampians Autumn Explorer',
    date: 'May 9-11, 2025',
    difficulty: 'Moderate',
    spots: 6,
    description: 'Discover the ancient landscapes of the Grampians. Perfect autumn conditions for hiking to MacKenzie Falls, The Pinnacle, and the Grand Canyon.',
    highlights: ['The Pinnacle lookout', 'MacKenzie Falls', 'Grand Canyon loop'],
    price: 395,
    location: 'grampians'
  },
  {
    id: 4,
    title: 'Mount Feathertop Winter Challenge',
    date: 'August 15-17, 2025',
    difficulty: 'Advanced',
    spots: 3,
    description: 'A true winter adventure! Experience Mount Feathertop in snow conditions. Winter gear provided, including snowshoes if needed. An unforgettable experience!',
    highlights: ['Snow-covered peaks', 'Winter camping experience', 'All winter gear provided'],
    price: 445,
    location: 'feathertop'
  }
];

const Adventures = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedAdventure, setSelectedAdventure] = useState(null);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (adventure) => {
    setSelectedAdventure(adventure);
    setShowModal(true);
  }

  const filteredAdventures = adventures.filter(adv => filter === 'all' || adv.location === filter);

  return (
    <Container className="my-5">
      <div className="text-center">
        <h1>2024-2025 Adventure Calendar</h1>
        <p>Join us for unforgettable weekend adventures in Victoria's high country</p>
      </div>

      <div className="text-center my-4">
        <ButtonGroup>
          <Button variant="secondary" onClick={() => setFilter('all')}>All Locations</Button>
          <Button variant="secondary" onClick={() => setFilter('feathertop')}>Mount Feathertop</Button>
          <Button variant="secondary" onClick={() => setFilter('cathedral')}>Cathedral Ranges</Button>
          <Button variant="secondary" onClick={() => setFilter('grampians')}>The Grampians</Button>
        </ButtonGroup>
      </div>

      <Row>
        {filteredAdventures.map(adventure => (
          <Col md={6} key={adventure.id}>
            <AdventureCard adventure={adventure} handleBooking={handleShowModal} />
          </Col>
        ))}
      </Row>

      <BookingModal show={showModal} handleClose={handleCloseModal} adventure={selectedAdventure} />
    </Container>
  );
};

export default Adventures;