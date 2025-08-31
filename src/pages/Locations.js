import React from 'react';
import { Container, Tabs, Tab, Table } from 'react-bootstrap';
import LocationTab from '../components/LocationTab';

const locations = [
  {
    id: 'feathertop',
    name: 'Mount Feathertop',
    images: [
      './images/Feathertop A.jpg',
      './images/feathertop b.jpg'
    ],
    caption: "Victoria's Most Beautiful Peak",
    subtitle: '1,922m of Pure Adventure',
    description: "Victoria's second-highest mountain and arguably its most photogenic. Unlike the rounded dome of Mount Bogong, Feathertop's distinctive pyramid shape offers unparalleled 360-degree views from its summit.",
    highlights: [
      'The spectacular Razorback Trail - one of Australia\'s most iconic alpine walks',
      'Snow gullies that resemble feathers give the mountain its name',
      'Federation Hut provides a cozy base camp with stunning views',
      'Wildflower meadows in summer, snow adventures in winter'
    ],
    popularWalks: [
      {
        name: 'Razorback Trail',
        difficulty: 'Hard',
        distance: '22km',
        duration: '7-8 hours',
        description: 'The most spectacular alpine ridge walk in Victoria. Start at Diamantina Hut near Mt Hotham and traverse the narrow ridgeline to the summit.'
      },
      {
        name: 'Bungalow Spur Track',
        difficulty: 'Hard',
        distance: '11km',
        duration: '6 hours',
        description: 'A challenging climb from Harrietville through forest to the alpine zone. Steep but rewarding with incredible summit views.'
      },
      {
        name: 'Bon Accord Spur',
        difficulty: 'Moderate-Hard',
        distance: '14km',
        duration: '7 hours',
        description: 'Alternative route from Harrietville that joins the Razorback. Less steep than Bungalow Spur but longer.'
      }
    ]
  },
  {
    id: 'cathedral',
    name: 'Cathedral Ranges',
    images: [
      './images/cathederal A.jpeg',
      './images/cathederal b.jpg',
      './images/cathederal c.jpg'
    ],
    caption: 'Ancient Rock Formations',
    subtitle: '840m of Rugged Beauty',
    description: 'The Cathedral Ranges offer some of Victoria\'s most dramatic and challenging ridge walking. These ancient sedimentary rock formations create a spectacular landscape of jagged peaks, narrow ridges, and steep gullies.',
    highlights: [
      'The famous Razorback Ridge - not for the faint-hearted!',
      'Sugarloaf Peak offers incredible 360-degree views',
      'Native orchids bloom in spring',
      'Riverside camping at Cooks Mill',
      'Rock scrambling and exposed ridge walking'
    ],
    popularWalks: [
      {
        name: 'Southern Circuit',
        difficulty: 'Hard',
        distance: '10.5km',
        duration: '5 hours',
        description: 'Challenging circuit via Wells Cave and Sugarloaf Peak. Involves rock scrambling and exposed ridge walking with stunning views.'
      },
      {
        name: 'Northern Circuit',
        difficulty: 'Hard',
        distance: '13.5km',
        duration: '6 hours',
        description: 'Full northern loop including Cathedral Peak (840m). The complete ridge experience with all major peaks.'
      },
      {
        name: 'Friends Nature Trail',
        difficulty: 'Easy',
        distance: '2km',
        duration: '45 minutes',
        description: 'Perfect family walk through tall Manna Gum forest past historic Cooks Mill. Gentle and scenic.'
      }
    ]
  },
  {
    id: 'grampians',
    name: 'The Grampians (Gariwerd)',
    images: [
      './images/grampians A.jpg',
      './images/grampians b.webp',
      './images/grampians c.jpg',
      './images/grampians d.jpg'
    ],
    caption: 'Majestic Mountain Range',
    subtitle: '1,167m of Ancient Landscapes',
    description: 'The Grampians, known as Gariwerd to the traditional owners, is a majestic mountain range and national park rising from the western Victorian plains. This ancient landscape offers spectacular lookouts, cascading waterfalls, and rich Aboriginal cultural heritage.',
    highlights: [
      'The Pinnacle Lookout - arguably Victoria\'s best view',
      'MacKenzie Falls - stunning 30m waterfall',
      'Grand Canyon loop through moss-covered wonderland',
      'Spring wildflower displays are legendary',
      'Aboriginal rock art sites (viewing where permitted)',
      'Diverse wildlife including kangaroos, emus, and echidnas'
    ],
    popularWalks: [
      {
        name: 'The Pinnacle',
        difficulty: 'Moderate',
        distance: '4.2km',
        duration: '2 hours',
        description: 'Iconic lookout with 360° views over Halls Gap. Rock formations and stunning vistas make this the most popular walk.'
      },
      {
        name: 'MacKenzie Falls',
        difficulty: 'Easy-Moderate',
        distance: '2km',
        duration: '1 hour',
        description: 'Victoria\'s largest waterfall, flowing year-round. Choose between the lookout (easy) or descend to the base (moderate).'
      },
      {
        name: 'The Balconies',
        difficulty: 'Easy',
        distance: '2km',
        duration: '45 minutes',
        description: 'Famous rock formations jutting out over Victoria Valley. Easy walk perfect for sunrise or sunset photography.'
      }
    ]
  }
];

const Locations = () => {
  return (
    <Container className="my-5">
      <div className="text-center">
        <h1>Our Adventure Locations</h1>
        <p>Three spectacular destinations in Victoria's high country</p>
      </div>

      <Tabs defaultActiveKey="feathertop" id="location-tabs" className="mb-3">
        {locations.map(location => (
          <Tab eventKey={location.id} title={location.name} key={location.id}>
            <LocationTab location={location} />
          </Tab>
        ))}
      </Tabs>

      <div className="mt-5">
        <h2>Quick Comparison</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Location</th>
              <th>Difficulty</th>
              <th>Best Feature</th>
              <th>Season</th>
              <th>Highlights</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Mount Feathertop</strong></td>
              <td>Challenging</td>
              <td>Alpine summit views</td>
              <td>Apr & Aug</td>
              <td>Razorback Trail, 360° summit views</td>
            </tr>
            <tr>
              <td><strong>Cathedral Ranges</strong></td>
              <td>Moderate-Challenging</td>
              <td>Ridge walking</td>
              <td>Mar & Oct</td>
              <td>Rock scrambling, dramatic ridges</td>
            </tr>
            <tr>
              <td><strong>The Grampians</strong></td>
              <td>Easy-Moderate</td>
              <td>Diverse landscapes</td>
              <td>May & Sep</td>
              <td>Waterfalls, lookouts, wildflowers</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Locations;