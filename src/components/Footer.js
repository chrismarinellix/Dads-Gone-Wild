import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Dads Gone Wild</h5>
            <p>Rediscover adventure in Victoria's spectacular high country</p>
            <p className="mb-0">
              <small>© 2024 Dads Gone Wild. All rights reserved.</small>
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/adventures" className="text-light">Our Adventures</Link></li>
              <li><Link to="/booking" className="text-light">Book Now</Link></li>
              <li><Link to="/waitlist" className="text-light">Join Waitlist</Link></li>
              <li><Link to="/contact" className="text-light">Contact</Link></li>
              <li><Link to="/terms" className="text-light">Terms & Conditions</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="mb-3">
              <a href="https://instagram.com/dadsgonewildadventures" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fab fa-instagram fa-2x"></i>
              </a>
              <a href="https://facebook.com/dadsgonewildadventures" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fab fa-facebook fa-2x"></i>
              </a>
              <a href="https://youtube.com/@dadsgonewildadventures" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fab fa-youtube fa-2x"></i>
              </a>
              <a href="mailto:luke@hoskinscarpetgallery.com.au" className="text-light">
                <i className="fas fa-envelope fa-2x"></i>
              </a>
            </div>
            <p>
              <i className="fas fa-phone"></i> 0423 417 866<br />
              <i className="fas fa-map-marker-alt"></i> Based in Melbourne, VIC
            </p>
            <div className="mt-3">
              <small className="text-muted">
                Follow us for adventure updates, trail conditions, and amazing photos from the Victorian Alps!
              </small>
            </div>
          </Col>
        </Row>
        <hr className="border-secondary" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">
              <small>
                <Link to="/terms" className="text-light me-3">Privacy Policy</Link>
                <Link to="/terms" className="text-light me-3">Terms of Service</Link>
                <span className="text-muted">Website by Dads Gone Wild</span>
              </small>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;