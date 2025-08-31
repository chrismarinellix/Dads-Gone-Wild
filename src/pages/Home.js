import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  // All images with their location info
  const allSlides = [
    {
      image: './images/feathertop b.jpg',
      name: 'Mount Feathertop',
      caption: "Victoria's Most Beautiful Peak",
      subtitle: '1,922m of Pure Adventure'
    },
    {
      image: './images/Feathertop A.jpg',
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
      {/* Modern Hero Section */}
      <HeroSection />

      {/* Modern Feature Cards */}
      <FeatureCards />
      
      {/* Image Gallery Section */}
      <Container className="my-5">
        <div className="text-center mb-5">
          <h2 className="text-4xl font-bold mb-4">Explore Our Destinations</h2>
          <p className="text-xl text-gray-600">Three iconic Victorian alpine locations, each offering unique adventures</p>
        </div>
        <Carousel interval={4000} fade>
          {allSlides.map((slide, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100 rounded-lg"
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
      </Container>
    </div>
  );
};

export default Home;