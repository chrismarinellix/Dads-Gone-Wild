import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Tabs, Tab, ListGroup, ProgressBar, Alert } from 'react-bootstrap';
import { XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom icons for different waypoint types
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
             <i class="fas fa-${icon}" style="color: white; font-size: 14px;"></i>
           </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
    className: 'custom-div-icon'
  });
};

// Icons for different waypoint types
const waypointIcons = {
  start: createCustomIcon('#28a745', 'play'),
  summit: createCustomIcon('#dc3545', 'mountain'),
  lookout: createCustomIcon('#17a2b8', 'eye'),
  waterfall: createCustomIcon('#007bff', 'water'),
  hut: createCustomIcon('#ffc107', 'home'),
  cave: createCustomIcon('#6c757d', 'dungeon'),
  camping: createCustomIcon('#28a745', 'campground'),
  parking: createCustomIcon('#343a40', 'parking')
};

// Component to handle map centering when trail is selected
const CenterMap = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// Trail data with coordinates
const trailsData = {
  feathertop: {
    name: 'Mount Feathertop',
    center: [-36.9083, 147.1375],
    trails: [
      {
        id: 'razorback',
        name: 'Razorback Trail',
        difficulty: 'Hard',
        distance: '22km',
        duration: '7-8 hours',
        elevation: '600m gain',
        description: 'The most popular route via the spectacular alpine ridge',
        elevationProfile: [
          { km: 0, elevation: 1700, label: 'Diamantina Hut' },
          { km: 2, elevation: 1750, label: 'Bon Accord' },
          { km: 5, elevation: 1780, label: 'Big Dipper' },
          { km: 8, elevation: 1820 },
          { km: 11, elevation: 1850, label: 'Twin Knobs' },
          { km: 14, elevation: 1880 },
          { km: 17, elevation: 1900, label: 'Federation Hut' },
          { km: 19, elevation: 1920 },
          { km: 22, elevation: 1922, label: 'Summit' }
        ],
        coordinates: [
          [-36.8750, 147.2750], // Diamantina Hut start
          [-36.8850, 147.2600], // Bon Accord Junction
          [-36.8950, 147.2400], // Big Dipper
          [-36.9050, 147.2200], // Twin Knobs
          [-36.9150, 147.1900], // Federation Hut
          [-36.9083, 147.1375], // Mount Feathertop Summit
        ],
        waypoints: [
          { 
            position: [-36.8750, 147.2750], 
            name: 'Diamantina Hut', 
            type: 'start',
            description: 'Starting point near Mt Hotham',
            elevation: '1,700m',
            facilities: ['Parking', 'Toilets', 'Trail information'],
            photo: './images/Feathertop A.jpg'
          },
          { 
            position: [-36.8850, 147.2600], 
            name: 'Bon Accord Junction', 
            type: 'lookout',
            description: 'Trail junction with panoramic views',
            elevation: '1,750m',
            distance: '2km from start'
          },
          { 
            position: [-36.8950, 147.2400], 
            name: 'Big Dipper', 
            type: 'lookout',
            description: 'Dramatic dip in the ridgeline',
            elevation: '1,780m',
            distance: '5km from start',
            warning: 'Exposed section - dangerous in bad weather'
          },
          { 
            position: [-36.9050, 147.2200], 
            name: 'Twin Knobs', 
            type: 'lookout',
            description: 'Twin rocky outcrops along the ridge',
            elevation: '1,850m',
            distance: '8km from start'
          },
          { 
            position: [-36.9150, 147.1900], 
            name: 'Federation Hut', 
            type: 'hut',
            description: 'Historic mountain hut built in 1969',
            elevation: '1,750m',
            facilities: ['Emergency shelter', 'Water tank', 'Camping nearby'],
            distance: '10km from start',
            photo: './images/feathertop b.jpg'
          },
          { 
            position: [-36.9083, 147.1375], 
            name: 'Mount Feathertop Summit', 
            type: 'summit',
            description: 'Victoria\'s second highest peak',
            elevation: '1,922m',
            distance: '11km from start',
            highlights: ['360° views', 'Alpine environment', 'Summit cairn'],
            photo: './images/feathertop b.jpg'
          },
        ],
        color: '#FF6B6B'
      },
      {
        id: 'bungalow',
        name: 'Bungalow Spur Track',
        difficulty: 'Hard',
        distance: '11km',
        duration: '6 hours',
        elevation: '1,400m gain',
        description: 'Steep climb from Harrietville through forest to alpine zone',
        elevationProfile: [
          { km: 0, elevation: 480, label: 'Harrietville' },
          { km: 2, elevation: 780 },
          { km: 3.5, elevation: 1080 },
          { km: 5, elevation: 1380, label: 'Old Bungalow' },
          { km: 6.5, elevation: 1580 },
          { km: 8, elevation: 1780 },
          { km: 9.5, elevation: 1880 },
          { km: 11, elevation: 1922, label: 'Summit' }
        ],
        coordinates: [
          [-37.0500, 147.0833], // Harrietville start
          [-37.0200, 147.1000], // Tobias Gap
          [-36.9800, 147.1200], // Bungalow
          [-36.9500, 147.1300], // Federation Hut junction
          [-36.9083, 147.1375], // Summit
        ],
        waypoints: [
          { position: [-37.0500, 147.0833], name: 'Harrietville', description: 'Valley start point (480m)' },
          { position: [-36.9800, 147.1200], name: 'Old Bungalow Site', description: 'Historic hut ruins' },
          { position: [-36.9083, 147.1375], name: 'Summit', description: 'Amazing 360° views' },
        ],
        color: '#4ECDC4'
      },
      {
        id: 'bon-accord',
        name: 'Bon Accord Spur',
        difficulty: 'Moderate-Hard',
        distance: '14km',
        duration: '7 hours',
        elevation: '1,200m gain',
        description: 'Alternative route from Harrietville joining the Razorback',
        elevationProfile: [
          { km: 0, elevation: 480, label: 'Harrietville' },
          { km: 2, elevation: 680 },
          { km: 4, elevation: 980 },
          { km: 6, elevation: 1280 },
          { km: 8, elevation: 1580 },
          { km: 10, elevation: 1750, label: 'Join Razorback' },
          { km: 12, elevation: 1850 },
          { km: 14, elevation: 1922, label: 'Summit' }
        ],
        coordinates: [
          [-37.0500, 147.0833], // Harrietville
          [-37.0100, 147.1500], // Bon Accord Creek
          [-36.9700, 147.2000], // Tree line
          [-36.8850, 147.2600], // Join Razorback
          [-36.9083, 147.1375], // Summit
        ],
        waypoints: [
          { position: [-37.0500, 147.0833], name: 'Harrietville', description: 'Start from town' },
          { position: [-36.8850, 147.2600], name: 'Razorback Junction', description: 'Join main ridge trail' },
        ],
        color: '#95E77E'
      }
    ]
  },
  cathedral: {
    name: 'Cathedral Ranges',
    center: [-37.4090, 145.7120],
    zoom: 13,
    trails: [
      {
        id: 'southern',
        name: 'Southern Circuit',
        difficulty: 'Hard',
        distance: '10.5km',
        duration: '5 hours',
        elevation: '500m gain',
        description: 'Challenging circuit via Wells Cave and Sugarloaf Peak',
        elevationProfile: [
          { km: 0, elevation: 300, label: 'Cooks Mill' },
          { km: 1.5, elevation: 420 },
          { km: 2.5, elevation: 520, label: 'Wells Cave' },
          { km: 4, elevation: 620 },
          { km: 5.5, elevation: 740, label: 'Sugarloaf Peak' },
          { km: 7, elevation: 650 },
          { km: 8.5, elevation: 550 },
          { km: 10.5, elevation: 300, label: 'Return' }
        ],
        coordinates: [
          [-37.4220, 145.7030], // Cooks Mill
          [-37.4180, 145.7080], // Wells Cave
          [-37.4140, 145.7120], // Sugarloaf Peak
          [-37.4100, 145.7160], // South Jawbone
          [-37.4120, 145.7100], // The Farmyard
          [-37.4220, 145.7030], // Return
        ],
        waypoints: [
          { 
            position: [-37.4220, 145.7030], 
            name: 'Cooks Mill',
            type: 'parking',
            description: 'Historic sawmill site and main trailhead',
            elevation: '300m',
            facilities: ['Parking', 'Toilets', 'Picnic area'],
            photo: './images/cathederal A.jpeg'
          },
          { 
            position: [-37.4180, 145.7080], 
            name: 'Wells Cave',
            type: 'cave',
            description: 'Natural rock shelter - scrambling required',
            elevation: '520m',
            distance: '2.5km from start',
            highlights: ['Rock formations', 'Aboriginal heritage site'],
            photo: './images/cathederal b.jpg'
          },
          { 
            position: [-37.4140, 145.7120], 
            name: 'Sugarloaf Peak',
            type: 'summit',
            description: '740m - Spectacular 360° views',
            elevation: '740m',
            distance: '4km from start',
            highlights: ['Best sunrise spot', 'Views to Melbourne'],
            photo: './images/cathederal c.jpg'
          },
        ],
        color: '#FF6B6B'
      },
      {
        id: 'northern',
        name: 'Northern Circuit',
        difficulty: 'Hard',
        distance: '13.5km',
        duration: '6 hours',
        elevation: '600m gain',
        description: 'Full northern loop including Cathedral Peak',
        elevationProfile: [
          { km: 0, elevation: 350, label: 'Neds Gully' },
          { km: 2, elevation: 550 },
          { km: 3, elevation: 700, label: 'Little Cathedral' },
          { km: 5, elevation: 840, label: 'Cathedral Peak' },
          { km: 7, elevation: 750, label: 'The Farmyard' },
          { km: 9, elevation: 650 },
          { km: 11, elevation: 500 },
          { km: 13.5, elevation: 350, label: 'Return' }
        ],
        coordinates: [
          [-37.4050, 145.7150], // Neds Gully
          [-37.3990, 145.7180], // Little Cathedral
          [-37.3950, 145.7210], // Cathedral Peak
          [-37.3980, 145.7170], // The Farmyard
          [-37.4020, 145.7140], // Little River Track
          [-37.4050, 145.7150], // Return
        ],
        waypoints: [
          { 
            position: [-37.4050, 145.7150], 
            name: 'Neds Gully',
            type: 'start',
            description: 'Northern trailhead with camping',
            elevation: '350m',
            facilities: ['Camping', 'Water', 'Toilets'],
            photo: './images/cathederal A.jpeg'
          },
          { 
            position: [-37.3950, 145.7210], 
            name: 'Cathedral Peak',
            type: 'summit',
            description: '840m - Highest point in the range',
            elevation: '840m',
            distance: '5km from start',
            highlights: ['360° views', 'Rock scrambling required'],
            photo: './images/cathederal b.jpg',
            warning: 'Technical climbing - experienced hikers only'
          },
          { 
            position: [-37.3980, 145.7170], 
            name: 'The Farmyard',
            type: 'lookout',
            description: 'Unique rock formations resembling farm animals',
            elevation: '750m',
            distance: '7km from start',
            highlights: ['Rock formations', 'Photography spot'],
            photo: './images/cathederal c.jpg'
          },
        ],
        color: '#4ECDC4'
      },
      {
        id: 'friends',
        name: 'Friends Nature Trail',
        difficulty: 'Easy',
        distance: '2km',
        duration: '45 minutes',
        elevation: '50m gain',
        description: 'Family-friendly loop through forest',
        elevationProfile: [
          { km: 0, elevation: 300, label: 'Start' },
          { km: 0.5, elevation: 320 },
          { km: 1, elevation: 350, label: 'Lookout' },
          { km: 1.5, elevation: 330 },
          { km: 2, elevation: 300, label: 'Return' }
        ],
        coordinates: [
          [-37.4220, 145.7030], // Cooks Mill
          [-37.4200, 145.7050], // Creek crossing
          [-37.4180, 145.7070], // Lookout
          [-37.4200, 145.7050], // Return via creek
          [-37.4220, 145.7030], // Cooks Mill
        ],
        waypoints: [
          { 
            position: [-37.4220, 145.7030], 
            name: 'Cooks Mill',
            type: 'start',
            description: 'Easy walking track through forest',
            elevation: '300m',
            facilities: ['Parking', 'Picnic tables', 'BBQ']
          },
          { 
            position: [-37.4180, 145.7070], 
            name: 'Forest Lookout',
            type: 'lookout',
            description: 'Valley views through the trees',
            elevation: '350m',
            distance: '1km from start',
            photo: './images/cathederal c.jpg'
          },
        ],
        color: '#95E77E'
      }
    ]
  },
  grampians: {
    name: 'The Grampians',
    center: [-37.1760, 142.5200],
    zoom: 12,
    trails: [
      {
        id: 'pinnacle',
        name: 'The Pinnacle',
        difficulty: 'Moderate',
        distance: '4.2km',
        duration: '2 hours',
        elevation: '260m gain',
        description: 'Iconic lookout with 360° views',
        elevationProfile: [
          { km: 0, elevation: 320, label: 'Carpark' },
          { km: 0.8, elevation: 380, label: 'Silent Street' },
          { km: 1.5, elevation: 420, label: 'Cool Chamber' },
          { km: 1.8, elevation: 480, label: 'Bridal Veil' },
          { km: 2.1, elevation: 580, label: 'The Pinnacle' },
          { km: 2.5, elevation: 520 },
          { km: 3.2, elevation: 420 },
          { km: 4.2, elevation: 320, label: 'Return' }
        ],
        coordinates: [
          [-37.1680, 142.5270], // Wonderland Carpark
          [-37.1660, 142.5280], // Silent Street
          [-37.1640, 142.5290], // Cool Chamber
          [-37.1620, 142.5300], // Bridal Veil Falls
          [-37.1600, 142.5310], // The Pinnacle
        ],
        waypoints: [
          { 
            position: [-37.1680, 142.5270], 
            name: 'Wonderland Carpark', 
            type: 'start',
            description: 'Main trailhead for The Pinnacle',
            elevation: '320m',
            facilities: ['Parking', 'Toilets', 'Trail maps'],
            photo: './images/grampians A.jpg'
          },
          { 
            position: [-37.1660, 142.5280], 
            name: 'Silent Street', 
            type: 'lookout',
            description: 'Narrow canyon between towering rock walls',
            elevation: '380m',
            distance: '0.8km from start'
          },
          { 
            position: [-37.1640, 142.5290], 
            name: 'Cool Chamber', 
            type: 'cave',
            description: 'Natural rock shelter with cool temperatures',
            elevation: '420m',
            distance: '1.5km from start',
            highlights: ['Rock formations', 'Natural shelter', 'Photography spot']
          },
          { 
            position: [-37.1620, 142.5300], 
            name: 'Bridal Veil Falls', 
            type: 'waterfall',
            description: 'Seasonal waterfall (flows after rain)',
            elevation: '480m',
            distance: '1.8km from start'
          },
          { 
            position: [-37.1600, 142.5310], 
            name: 'The Pinnacle', 
            type: 'summit',
            description: 'Most photographed lookout in the Grampians',
            elevation: '580m',
            distance: '2.1km from start',
            highlights: ['360° views', 'Halls Gap views', 'Sunrise/sunset spot'],
            photo: './images/grampians c.jpg',
            warning: 'Steep dropoffs - supervise children'
          },
        ],
        color: '#FF6B6B'
      },
      {
        id: 'mackenzie',
        name: 'MacKenzie Falls',
        difficulty: 'Easy-Moderate',
        distance: '2km',
        duration: '1 hour',
        elevation: '150m descent',
        description: 'Victoria\'s largest waterfall',
        elevationProfile: [
          { km: 0, elevation: 450, label: 'Carpark' },
          { km: 0.3, elevation: 440, label: 'Lookout' },
          { km: 0.5, elevation: 400 },
          { km: 0.7, elevation: 350 },
          { km: 1, elevation: 300, label: 'Falls Base' },
          { km: 1.3, elevation: 350 },
          { km: 1.5, elevation: 400 },
          { km: 1.8, elevation: 440 },
          { km: 2, elevation: 450, label: 'Return' }
        ],
        coordinates: [
          [-37.2280, 142.4460], // Carpark
          [-37.2270, 142.4470], // Lookout
          [-37.2260, 142.4480], // Base of falls
        ],
        waypoints: [
          { 
            position: [-37.2280, 142.4460], 
            name: 'MacKenzie Falls Carpark',
            type: 'parking',
            description: 'Two trail options - lookout or base',
            elevation: '450m',
            facilities: ['Parking', 'Toilets', 'Picnic area'],
            photo: './images/grampians d.jpg'
          },
          { 
            position: [-37.2270, 142.4470], 
            name: 'Falls Lookout',
            type: 'lookout',
            description: 'Wheelchair accessible viewing platform',
            elevation: '440m',
            distance: '300m from carpark',
            highlights: ['Accessible path', 'Best photography angle']
          },
          { 
            position: [-37.2260, 142.4480], 
            name: 'Falls Base',
            type: 'waterfall',
            description: 'Victoria\'s largest waterfall - 35m drop',
            elevation: '300m',
            distance: '1km from carpark',
            highlights: ['Swimming hole (summer)', 'Rainbow in spray'],
            photo: './images/grampians A.jpg',
            warning: '260 steep steps - slippery when wet'
          },
        ],
        color: '#4ECDC4'
      },
      {
        id: 'balconies',
        name: 'The Balconies',
        difficulty: 'Easy',
        distance: '2km',
        duration: '45 minutes',
        elevation: '50m gain',
        description: 'Famous rock formations over Victoria Valley',
        elevationProfile: [
          { km: 0, elevation: 520, label: 'Reed Lookout' },
          { km: 0.5, elevation: 530 },
          { km: 1, elevation: 540, label: 'The Balconies' },
          { km: 1.5, elevation: 530 },
          { km: 2, elevation: 520, label: 'Return' }
        ],
        coordinates: [
          [-37.2150, 142.5020], // Reed Lookout Carpark
          [-37.2140, 142.5030], // Track junction
          [-37.2130, 142.5040], // The Balconies
        ],
        waypoints: [
          { 
            position: [-37.2150, 142.5020], 
            name: 'Reed Lookout',
            type: 'parking',
            description: 'Easy walk starts here - spectacular valley views',
            elevation: '520m',
            facilities: ['Parking', 'Viewing platform'],
            photo: './images/grampians c.jpg'
          },
          { 
            position: [-37.2140, 142.5030], 
            name: 'Track Junction',
            type: 'lookout',
            description: 'Views improve as you walk',
            elevation: '530m',
            distance: '500m from carpark'
          },
          { 
            position: [-37.2130, 142.5040], 
            name: 'The Balconies',
            type: 'summit',
            description: 'Iconic rock formations jutting over Victoria Valley',
            elevation: '540m',
            distance: '1km from carpark',
            highlights: ['Most photographed spot', 'Sunset location', 'Wedding photos'],
            photo: './images/grampians d.jpg',
            warning: 'No barriers - supervise children closely'
          },
        ],
        color: '#95E77E'
      }
    ]
  }
};

const Maps = () => {
  const [selectedLocation, setSelectedLocation] = useState('feathertop');
  const [selectedTrail, setSelectedTrail] = useState(null);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'success';
      case 'Easy-Moderate': return 'info';
      case 'Moderate': return 'warning';
      case 'Moderate-Hard': return 'warning';
      case 'Hard': return 'danger';
      default: return 'secondary';
    }
  };

  const location = trailsData[selectedLocation];

  return (
    <Container fluid className="my-4">
      <div className="text-center mb-4">
        <h1>Interactive Trail Maps</h1>
        <p className="lead">Explore our adventure locations with detailed trail information</p>
      </div>

      <Tabs
        activeKey={selectedLocation}
        onSelect={(k) => {
          setSelectedLocation(k);
          setSelectedTrail(null);
        }}
        className="mb-3"
      >
        <Tab eventKey="feathertop" title="Mount Feathertop">
          <Row>
            <Col lg={4}>
              <h3>Mount Feathertop Trails</h3>
              <ListGroup>
                {location.trails.map(trail => (
                  <ListGroup.Item 
                    key={trail.id}
                    active={selectedTrail?.id === trail.id}
                    onClick={() => setSelectedTrail(trail)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5>{trail.name}</h5>
                        <p className="mb-1">{trail.description}</p>
                        <small>
                          <Badge bg={getDifficultyColor(trail.difficulty)} className="me-2">
                            {trail.difficulty}
                          </Badge>
                          {trail.distance} • {trail.duration} • {trail.elevation}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {selectedTrail && (
                <>
                  <Card className="mt-3">
                    <Card.Header>
                      <i className="fas fa-route me-2"></i>
                      Trail Details
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col xs={4} className="text-center">
                          <i className="fas fa-hiking fa-2x text-primary mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.distance}</strong></p>
                          <small className="text-muted">Distance</small>
                        </Col>
                        <Col xs={4} className="text-center">
                          <i className="fas fa-clock fa-2x text-info mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.duration}</strong></p>
                          <small className="text-muted">Duration</small>
                        </Col>
                        <Col xs={4} className="text-center">
                          <i className="fas fa-chart-line fa-2x text-success mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.elevation}</strong></p>
                          <small className="text-muted">Elevation</small>
                        </Col>
                      </Row>
                      
                      <div className="mb-3">
                        <strong>Difficulty Level</strong>
                        <ProgressBar 
                          now={
                            selectedTrail.difficulty === 'Easy' ? 25 :
                            selectedTrail.difficulty === 'Easy-Moderate' ? 40 :
                            selectedTrail.difficulty === 'Moderate' ? 50 :
                            selectedTrail.difficulty === 'Moderate-Hard' ? 75 :
                            100
                          }
                          variant={
                            selectedTrail.difficulty === 'Easy' ? 'success' :
                            selectedTrail.difficulty === 'Easy-Moderate' ? 'info' :
                            selectedTrail.difficulty === 'Moderate' ? 'warning' :
                            'danger'
                          }
                          label={selectedTrail.difficulty}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  
                  {selectedTrail.elevationProfile && (
                    <Card className="mt-3">
                      <Card.Header>
                        <i className="fas fa-chart-area me-2"></i>
                        Elevation Profile
                      </Card.Header>
                      <Card.Body>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={selectedTrail.elevationProfile}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="km" 
                              label={{ value: 'Distance (km)', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis 
                              label={{ value: 'Elevation (m)', angle: -90, position: 'insideLeft' }}
                              domain={['dataMin - 50', 'dataMax + 50']}
                            />
                            <ChartTooltip 
                              formatter={(value) => [`${value}m`, 'Elevation']}
                              labelFormatter={(label) => `${label} km`}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="elevation" 
                              stroke="#28a745" 
                              fill="#28a74530"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                        <div className="mt-2 text-center">
                          <small className="text-muted">
                            Total Ascent: {selectedTrail.elevation} • 
                            Highest Point: {Math.max(...selectedTrail.elevationProfile.map(p => p.elevation))}m
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                  
                  <Card className="mt-3">
                    <Card.Header>
                      <i className="fas fa-map-pin me-2"></i>
                      Waypoints ({selectedTrail.waypoints.length})
                    </Card.Header>
                    <ListGroup variant="flush">
                      {selectedTrail.waypoints.map((waypoint, idx) => (
                        <ListGroup.Item key={idx} className="d-flex align-items-start">
                          <div className="me-3">
                            <Badge 
                              bg={
                                waypoint.type === 'start' ? 'success' :
                                waypoint.type === 'summit' ? 'danger' :
                                waypoint.type === 'hut' ? 'warning' :
                                waypoint.type === 'lookout' ? 'info' :
                                'secondary'
                              }
                              style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              {idx + 1}
                            </Badge>
                          </div>
                          <div className="flex-grow-1">
                            <strong>{waypoint.name}</strong>
                            {waypoint.elevation && <Badge bg="light" text="dark" className="ms-2">{waypoint.elevation}</Badge>}
                            <br />
                            <small className="text-muted">{waypoint.description}</small>
                            {waypoint.distance && (
                              <div className="mt-1">
                                <small className="text-primary">
                                  <i className="fas fa-route me-1"></i>
                                  {waypoint.distance}
                                </small>
                              </div>
                            )}
                            {waypoint.warning && (
                              <div className="mt-1">
                                <small className="text-danger">
                                  <i className="fas fa-exclamation-triangle me-1"></i>
                                  {waypoint.warning}
                                </small>
                              </div>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </>
              )}
            </Col>
            
            <Col lg={8}>
              <div style={{ height: '600px', position: 'relative' }}>
                <MapContainer 
                  center={location.center} 
                  zoom={11} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {selectedTrail && (
                    <CenterMap center={selectedTrail.coordinates[0]} zoom={13} />
                  )}
                  
                  {location.trails.map(trail => (
                    <React.Fragment key={trail.id}>
                      <Polyline 
                        positions={trail.coordinates} 
                        color={trail.color}
                        weight={selectedTrail?.id === trail.id ? 6 : 3}
                        opacity={selectedTrail?.id === trail.id ? 1 : 0.5}
                        dashArray={selectedTrail?.id === trail.id ? null : "5, 10"}
                      >
                        <Tooltip permanent={selectedTrail?.id === trail.id} direction="center">
                          <div style={{ fontWeight: 'bold', fontSize: '12px' }}>
                            {trail.name}
                            <br />
                            <small>{trail.distance} • {trail.duration}</small>
                          </div>
                        </Tooltip>
                      </Polyline>
                      
                      {/* Add distance markers along the trail */}
                      {selectedTrail?.id === trail.id && trail.coordinates.map((coord, idx) => {
                        if (idx % 2 === 0 && idx > 0 && idx < trail.coordinates.length - 1) {
                          return (
                            <CircleMarker
                              key={`km-${idx}`}
                              center={coord}
                              radius={4}
                              fillColor="white"
                              color={trail.color}
                              weight={2}
                              fillOpacity={1}
                            >
                              <Tooltip permanent direction="top">
                                <small>{Math.round((idx / trail.coordinates.length) * 22)}km</small>
                              </Tooltip>
                            </CircleMarker>
                          );
                        }
                        return null;
                      })}
                      
                      {trail.waypoints.map((waypoint, idx) => (
                        <Marker 
                          key={idx} 
                          position={waypoint.position}
                          icon={waypointIcons[waypoint.type] || waypointIcons.lookout}
                        >
                          <Popup maxWidth={300}>
                            <div style={{ minWidth: '250px' }}>
                              <h5 style={{ marginBottom: '10px', color: '#2e7d32' }}>
                                {waypoint.name}
                              </h5>
                              
                              {waypoint.photo && (
                                <img 
                                  src={waypoint.photo} 
                                  alt={waypoint.name}
                                  style={{ 
                                    width: '100%', 
                                    height: '150px', 
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    marginBottom: '10px'
                                  }}
                                />
                              )}
                              
                              <p style={{ marginBottom: '8px' }}>
                                {waypoint.description}
                              </p>
                              
                              {waypoint.elevation && (
                                <p style={{ marginBottom: '5px' }}>
                                  <strong>Elevation:</strong> {waypoint.elevation}
                                </p>
                              )}
                              
                              {waypoint.distance && (
                                <p style={{ marginBottom: '5px' }}>
                                  <strong>Distance:</strong> {waypoint.distance}
                                </p>
                              )}
                              
                              {waypoint.facilities && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>Facilities:</strong>
                                  <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                                    {waypoint.facilities.map((facility, i) => (
                                      <li key={i}>{facility}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {waypoint.highlights && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>Highlights:</strong>
                                  <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                                    {waypoint.highlights.map((highlight, i) => (
                                      <li key={i}>{highlight}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {waypoint.warning && (
                                <Alert variant="warning" className="mt-2 mb-0" style={{ padding: '8px' }}>
                                  <small><strong>⚠️ Warning:</strong> {waypoint.warning}</small>
                                </Alert>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="cathedral" title="Cathedral Ranges">
          <Row>
            <Col lg={4}>
              <h3>Cathedral Ranges Trails</h3>
              <ListGroup>
                {location.trails.map(trail => (
                  <ListGroup.Item 
                    key={trail.id}
                    active={selectedTrail?.id === trail.id}
                    onClick={() => setSelectedTrail(trail)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5>{trail.name}</h5>
                        <p className="mb-1">{trail.description}</p>
                        <small>
                          <Badge bg={getDifficultyColor(trail.difficulty)} className="me-2">
                            {trail.difficulty}
                          </Badge>
                          {trail.distance} • {trail.duration} • {trail.elevation}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {selectedTrail && (
                <>
                  <Card className="mt-3">
                    <Card.Header>
                      <i className="fas fa-route me-2"></i>
                      Trail Details
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col xs={4} className="text-center">
                          <i className="fas fa-hiking fa-2x text-primary mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.distance}</strong></p>
                          <small className="text-muted">Distance</small>
                        </Col>
                        <Col xs={4} className="text-center">
                          <i className="fas fa-clock fa-2x text-info mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.duration}</strong></p>
                          <small className="text-muted">Duration</small>
                        </Col>
                        <Col xs={4} className="text-center">
                          <i className="fas fa-chart-line fa-2x text-success mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.elevation}</strong></p>
                          <small className="text-muted">Elevation</small>
                        </Col>
                      </Row>
                      
                      <div className="mb-3">
                        <strong>Difficulty Level</strong>
                        <ProgressBar 
                          now={
                            selectedTrail.difficulty === 'Easy' ? 25 :
                            selectedTrail.difficulty === 'Easy-Moderate' ? 40 :
                            selectedTrail.difficulty === 'Moderate' ? 50 :
                            selectedTrail.difficulty === 'Moderate-Hard' ? 75 :
                            100
                          }
                          variant={
                            selectedTrail.difficulty === 'Easy' ? 'success' :
                            selectedTrail.difficulty === 'Easy-Moderate' ? 'info' :
                            selectedTrail.difficulty === 'Moderate' ? 'warning' :
                            'danger'
                          }
                          label={selectedTrail.difficulty}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  
                  {selectedTrail.elevationProfile && (
                    <Card className="mt-3">
                      <Card.Header>
                        <i className="fas fa-chart-area me-2"></i>
                        Elevation Profile
                      </Card.Header>
                      <Card.Body>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={selectedTrail.elevationProfile}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="km" 
                              label={{ value: 'Distance (km)', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis 
                              label={{ value: 'Elevation (m)', angle: -90, position: 'insideLeft' }}
                              domain={['dataMin - 50', 'dataMax + 50']}
                            />
                            <ChartTooltip 
                              formatter={(value) => [`${value}m`, 'Elevation']}
                              labelFormatter={(label) => `${label} km`}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="elevation" 
                              stroke="#28a745" 
                              fill="#28a74530"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                        <div className="mt-2 text-center">
                          <small className="text-muted">
                            Total Ascent: {selectedTrail.elevation} • 
                            Highest Point: {Math.max(...selectedTrail.elevationProfile.map(p => p.elevation))}m
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                  
                  <Card className="mt-3">
                    <Card.Header>
                      <i className="fas fa-map-pin me-2"></i>
                      Waypoints ({selectedTrail.waypoints.length})
                    </Card.Header>
                    <ListGroup variant="flush">
                      {selectedTrail.waypoints.map((waypoint, idx) => (
                        <ListGroup.Item key={idx} className="d-flex align-items-start">
                          <div className="me-3">
                            <Badge 
                              bg={
                                waypoint.type === 'start' ? 'success' :
                                waypoint.type === 'summit' ? 'danger' :
                                waypoint.type === 'hut' ? 'warning' :
                                waypoint.type === 'lookout' ? 'info' :
                                'secondary'
                              }
                              style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              {idx + 1}
                            </Badge>
                          </div>
                          <div className="flex-grow-1">
                            <strong>{waypoint.name}</strong>
                            {waypoint.elevation && <Badge bg="light" text="dark" className="ms-2">{waypoint.elevation}</Badge>}
                            <br />
                            <small className="text-muted">{waypoint.description}</small>
                            {waypoint.distance && (
                              <div className="mt-1">
                                <small className="text-primary">
                                  <i className="fas fa-route me-1"></i>
                                  {waypoint.distance}
                                </small>
                              </div>
                            )}
                            {waypoint.warning && (
                              <div className="mt-1">
                                <small className="text-danger">
                                  <i className="fas fa-exclamation-triangle me-1"></i>
                                  {waypoint.warning}
                                </small>
                              </div>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </>
              )}
            </Col>
            
            <Col lg={8}>
              <div style={{ height: '600px', position: 'relative' }}>
                <MapContainer 
                  center={location.center} 
                  zoom={location.zoom || 13} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {selectedTrail && <CenterMap center={location.center} zoom={location.zoom || 13} />}
                  
                  {location.trails.map(trail => (
                    <React.Fragment key={trail.id}>
                      <Polyline 
                        positions={trail.coordinates} 
                        color={trail.color}
                        weight={selectedTrail?.id === trail.id ? 5 : 3}
                        opacity={selectedTrail?.id === trail.id ? 1 : 0.6}
                      >
                        <Tooltip permanent={selectedTrail?.id === trail.id}>
                          {trail.name}
                        </Tooltip>
                      </Polyline>
                      
                      {selectedTrail?.id === trail.id && trail.coordinates.map((coord, idx) => {
                        if (idx > 0 && idx < trail.coordinates.length - 1 && idx % 2 === 0) {
                          return (
                            <CircleMarker
                              key={`km-${idx}`}
                              center={coord}
                              radius={4}
                              fillColor="white"
                              color={trail.color}
                              weight={2}
                              fillOpacity={1}
                            >
                              <Tooltip permanent direction="top">
                                <small>{Math.round((idx / trail.coordinates.length) * parseFloat(trail.distance))}km</small>
                              </Tooltip>
                            </CircleMarker>
                          );
                        }
                        return null;
                      })}
                      
                      {trail.waypoints.map((waypoint, idx) => (
                        <Marker 
                          key={idx} 
                          position={waypoint.position}
                          icon={waypointIcons[waypoint.type] || waypointIcons.lookout}
                        >
                          <Popup maxWidth={300}>
                            <div style={{ minWidth: '250px' }}>
                              <h5 style={{ marginBottom: '10px', color: '#2e7d32' }}>
                                {waypoint.name}
                              </h5>
                              
                              {waypoint.photo && (
                                <img 
                                  src={waypoint.photo} 
                                  alt={waypoint.name}
                                  style={{ 
                                    width: '100%', 
                                    height: '150px', 
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    marginBottom: '10px'
                                  }}
                                />
                              )}
                              
                              <p style={{ marginBottom: '8px' }}>
                                {waypoint.description}
                              </p>
                              
                              {waypoint.elevation && (
                                <p style={{ marginBottom: '5px' }}>
                                  <strong>Elevation:</strong> {waypoint.elevation}
                                </p>
                              )}
                              
                              {waypoint.distance && (
                                <p style={{ marginBottom: '5px' }}>
                                  <strong>Distance:</strong> {waypoint.distance}
                                </p>
                              )}
                              
                              {waypoint.facilities && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>Facilities:</strong>
                                  <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                                    {waypoint.facilities.map((facility, i) => (
                                      <li key={i}>{facility}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {waypoint.highlights && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>Highlights:</strong>
                                  <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                                    {waypoint.highlights.map((highlight, i) => (
                                      <li key={i}>{highlight}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {waypoint.warning && (
                                <Alert variant="warning" className="mt-2 mb-0" style={{ padding: '8px' }}>
                                  <small><strong>⚠️ Warning:</strong> {waypoint.warning}</small>
                                </Alert>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="grampians" title="The Grampians">
          <Row>
            <Col lg={4}>
              <h3>Grampians Trails</h3>
              <ListGroup>
                {location.trails.map(trail => (
                  <ListGroup.Item 
                    key={trail.id}
                    active={selectedTrail?.id === trail.id}
                    onClick={() => setSelectedTrail(trail)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5>{trail.name}</h5>
                        <p className="mb-1">{trail.description}</p>
                        <small>
                          <Badge bg={getDifficultyColor(trail.difficulty)} className="me-2">
                            {trail.difficulty}
                          </Badge>
                          {trail.distance} • {trail.duration} • {trail.elevation}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              {selectedTrail && (
                <>
                  <Card className="mt-3">
                    <Card.Header>
                      <i className="fas fa-route me-2"></i>
                      Trail Details
                    </Card.Header>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col xs={4} className="text-center">
                          <i className="fas fa-hiking fa-2x text-primary mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.distance}</strong></p>
                          <small className="text-muted">Distance</small>
                        </Col>
                        <Col xs={4} className="text-center">
                          <i className="fas fa-clock fa-2x text-info mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.duration}</strong></p>
                          <small className="text-muted">Duration</small>
                        </Col>
                        <Col xs={4} className="text-center">
                          <i className="fas fa-chart-line fa-2x text-success mb-2"></i>
                          <p className="mb-0"><strong>{selectedTrail.elevation}</strong></p>
                          <small className="text-muted">Elevation</small>
                        </Col>
                      </Row>
                      
                      <div className="mb-3">
                        <strong>Difficulty Level</strong>
                        <ProgressBar 
                          now={
                            selectedTrail.difficulty === 'Easy' ? 25 :
                            selectedTrail.difficulty === 'Easy-Moderate' ? 40 :
                            selectedTrail.difficulty === 'Moderate' ? 50 :
                            selectedTrail.difficulty === 'Moderate-Hard' ? 75 :
                            100
                          }
                          variant={
                            selectedTrail.difficulty === 'Easy' ? 'success' :
                            selectedTrail.difficulty === 'Easy-Moderate' ? 'info' :
                            selectedTrail.difficulty === 'Moderate' ? 'warning' :
                            'danger'
                          }
                          label={selectedTrail.difficulty}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                  
                  {selectedTrail.elevationProfile && (
                    <Card className="mt-3">
                      <Card.Header>
                        <i className="fas fa-chart-area me-2"></i>
                        Elevation Profile
                      </Card.Header>
                      <Card.Body>
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={selectedTrail.elevationProfile}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="km" 
                              label={{ value: 'Distance (km)', position: 'insideBottom', offset: -5 }}
                            />
                            <YAxis 
                              label={{ value: 'Elevation (m)', angle: -90, position: 'insideLeft' }}
                              domain={['dataMin - 50', 'dataMax + 50']}
                            />
                            <ChartTooltip 
                              formatter={(value) => [`${value}m`, 'Elevation']}
                              labelFormatter={(label) => `${label} km`}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="elevation" 
                              stroke="#28a745" 
                              fill="#28a74530"
                              strokeWidth={2}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                        <div className="mt-2 text-center">
                          <small className="text-muted">
                            Total Ascent: {selectedTrail.elevation} • 
                            Highest Point: {Math.max(...selectedTrail.elevationProfile.map(p => p.elevation))}m
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  )}
                  
                  <Card className="mt-3">
                    <Card.Header>
                      <i className="fas fa-map-pin me-2"></i>
                      Waypoints ({selectedTrail.waypoints.length})
                    </Card.Header>
                    <ListGroup variant="flush">
                      {selectedTrail.waypoints.map((waypoint, idx) => (
                        <ListGroup.Item key={idx} className="d-flex align-items-start">
                          <div className="me-3">
                            <Badge 
                              bg={
                                waypoint.type === 'start' ? 'success' :
                                waypoint.type === 'summit' ? 'danger' :
                                waypoint.type === 'hut' ? 'warning' :
                                waypoint.type === 'lookout' ? 'info' :
                                'secondary'
                              }
                              style={{ width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              {idx + 1}
                            </Badge>
                          </div>
                          <div className="flex-grow-1">
                            <strong>{waypoint.name}</strong>
                            {waypoint.elevation && <Badge bg="light" text="dark" className="ms-2">{waypoint.elevation}</Badge>}
                            <br />
                            <small className="text-muted">{waypoint.description}</small>
                            {waypoint.distance && (
                              <div className="mt-1">
                                <small className="text-primary">
                                  <i className="fas fa-route me-1"></i>
                                  {waypoint.distance}
                                </small>
                              </div>
                            )}
                            {waypoint.warning && (
                              <div className="mt-1">
                                <small className="text-danger">
                                  <i className="fas fa-exclamation-triangle me-1"></i>
                                  {waypoint.warning}
                                </small>
                              </div>
                            )}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card>
                </>
              )}
            </Col>
            
            <Col lg={8}>
              <div style={{ height: '600px', position: 'relative' }}>
                <MapContainer 
                  center={location.center} 
                  zoom={location.zoom || 12} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {selectedTrail && <CenterMap center={location.center} zoom={location.zoom || 12} />}
                  
                  {location.trails.map(trail => (
                    <React.Fragment key={trail.id}>
                      <Polyline 
                        positions={trail.coordinates} 
                        color={trail.color}
                        weight={selectedTrail?.id === trail.id ? 5 : 3}
                        opacity={selectedTrail?.id === trail.id ? 1 : 0.6}
                      >
                        <Tooltip permanent={selectedTrail?.id === trail.id}>
                          {trail.name}
                        </Tooltip>
                      </Polyline>
                      
                      {selectedTrail?.id === trail.id && trail.coordinates.map((coord, idx) => {
                        if (idx > 0 && idx < trail.coordinates.length - 1 && idx % 2 === 0) {
                          return (
                            <CircleMarker
                              key={`km-${idx}`}
                              center={coord}
                              radius={4}
                              fillColor="white"
                              color={trail.color}
                              weight={2}
                              fillOpacity={1}
                            >
                              <Tooltip permanent direction="top">
                                <small>{Math.round((idx / trail.coordinates.length) * parseFloat(trail.distance))}km</small>
                              </Tooltip>
                            </CircleMarker>
                          );
                        }
                        return null;
                      })}
                      
                      {trail.waypoints.map((waypoint, idx) => (
                        <Marker 
                          key={idx} 
                          position={waypoint.position}
                          icon={waypointIcons[waypoint.type] || waypointIcons.lookout}
                        >
                          <Popup maxWidth={300}>
                            <div style={{ minWidth: '250px' }}>
                              <h5 style={{ marginBottom: '10px', color: '#2e7d32' }}>
                                {waypoint.name}
                              </h5>
                              
                              {waypoint.photo && (
                                <img 
                                  src={waypoint.photo} 
                                  alt={waypoint.name}
                                  style={{ 
                                    width: '100%', 
                                    height: '150px', 
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    marginBottom: '10px'
                                  }}
                                />
                              )}
                              
                              <p style={{ marginBottom: '8px' }}>
                                {waypoint.description}
                              </p>
                              
                              {waypoint.elevation && (
                                <p style={{ marginBottom: '5px' }}>
                                  <strong>Elevation:</strong> {waypoint.elevation}
                                </p>
                              )}
                              
                              {waypoint.distance && (
                                <p style={{ marginBottom: '5px' }}>
                                  <strong>Distance:</strong> {waypoint.distance}
                                </p>
                              )}
                              
                              {waypoint.facilities && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>Facilities:</strong>
                                  <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                                    {waypoint.facilities.map((facility, i) => (
                                      <li key={i}>{facility}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {waypoint.highlights && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>Highlights:</strong>
                                  <ul style={{ marginBottom: 0, paddingLeft: '20px' }}>
                                    {waypoint.highlights.map((highlight, i) => (
                                      <li key={i}>{highlight}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {waypoint.warning && (
                                <Alert variant="warning" className="mt-2 mb-0" style={{ padding: '8px' }}>
                                  <small><strong>⚠️ Warning:</strong> {waypoint.warning}</small>
                                </Alert>
                              )}
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </React.Fragment>
                  ))}
                </MapContainer>
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <Row className="mt-4">
        <Col lg={8}>
          <Card>
            <Card.Body>
              <h5><i className="fas fa-info-circle me-2"></i>How to use the interactive maps:</h5>
              <Row>
                <Col md={6}>
                  <ul>
                    <li>Click on any trail in the list to highlight it on the map</li>
                    <li>Click on waypoint markers to see detailed information and photos</li>
                    <li>Selected trails show distance markers along the route</li>
                    <li>Zoom in/out using mouse wheel or +/- buttons</li>
                    <li>Drag to move around the map</li>
                    <li>Dashed lines indicate unselected trails</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <strong>Trail Difficulty:</strong>
                  <div className="mt-2">
                    <Badge bg="success" className="me-2">Easy</Badge> Suitable for beginners<br/>
                    <Badge bg="info" className="me-2">Easy-Moderate</Badge> Some fitness required<br/>
                    <Badge bg="warning" className="me-2">Moderate</Badge> Good fitness needed<br/>
                    <Badge bg="danger" className="me-2">Hard</Badge> Experienced hikers only
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card>
            <Card.Header>
              <i className="fas fa-map-signs me-2"></i>
              Map Legend
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  backgroundColor: '#28a745', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  <i className="fas fa-play" style={{ color: 'white', fontSize: '10px' }}></i>
                </div>
                <span>Trail Start/Parking</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  backgroundColor: '#dc3545', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  <i className="fas fa-mountain" style={{ color: 'white', fontSize: '10px' }}></i>
                </div>
                <span>Summit/Peak</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  backgroundColor: '#17a2b8', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  <i className="fas fa-eye" style={{ color: 'white', fontSize: '10px' }}></i>
                </div>
                <span>Lookout/Viewpoint</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  backgroundColor: '#ffc107', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  <i className="fas fa-home" style={{ color: 'white', fontSize: '10px' }}></i>
                </div>
                <span>Hut/Shelter</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <div style={{ 
                  backgroundColor: '#007bff', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  <i className="fas fa-water" style={{ color: 'white', fontSize: '10px' }}></i>
                </div>
                <span>Waterfall/Water Source</span>
              </div>
              <div className="d-flex align-items-center">
                <div style={{ 
                  backgroundColor: '#6c757d', 
                  width: '25px', 
                  height: '25px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginRight: '10px'
                }}>
                  <i className="fas fa-dungeon" style={{ color: 'white', fontSize: '10px' }}></i>
                </div>
                <span>Cave/Rock Formation</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Maps;