import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BookingModal = ({ show, handleClose, adventure }) => {
  if (!adventure) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Your Adventure</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Adventure:</strong> {adventure.title}</p>
        <p><strong>Date:</strong> {adventure.date}</p>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="tel" placeholder="Enter your phone number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Submit Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
