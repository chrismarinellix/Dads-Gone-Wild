import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
        coordinates: [
          [-36.8750, 147.2750], // Diamantina Hut start
          [-36.8850, 147.2600], // Bon Accord Junction
          [-36.8950, 147.2400], // Big Dipper
          [-36.9050, 147.2200], // Twin Knobs
          [-36.9150, 147.1900], // Federation Hut
          [-36.9083, 147.1375], // Mount Feathertop Summit
        ],
        waypoints: [
          { position: [-36.8750, 147.2750], name: 'Diamantina Hut', description: 'Starting point near Mt Hotham' },
          { position: [-36.9150, 147.1900], name: 'Federation Hut', description: 'Historic mountain hut with water' },
          { position: [-36.9083, 147.1375], name: 'Summit', description: '1,922m - Victoria\'s second highest peak' },
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
    center: [-37.4167, 145.7000],
    trails: [
      {
        id: 'southern',
        name: 'Southern Circuit',
        difficulty: 'Hard',
        distance: '10.5km',
        duration: '5 hours',
        elevation: '500m gain',
        description: 'Challenging circuit via Wells Cave and Sugarloaf Peak',
        coordinates: [
          [-37.4300, 145.6900], // Cooks Mill
          [-37.4250, 145.6950], // Wells Cave
          [-37.4200, 145.7000], // Sugarloaf Peak
          [-37.4150, 145.7050], // South Jawbone
          [-37.4200, 145.6950], // The Farmyard
          [-37.4300, 145.6900], // Return
        ],
        waypoints: [
          { position: [-37.4300, 145.6900], name: 'Cooks Mill', description: 'Historic sawmill site' },
          { position: [-37.4250, 145.6950], name: 'Wells Cave', description: 'Rock scrambling required' },
          { position: [-37.4200, 145.7000], name: 'Sugarloaf Peak', description: '740m - Spectacular views' },
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
        coordinates: [
          [-37.4100, 145.7100], // Neds Gully
          [-37.4050, 145.7150], // Little Cathedral
          [-37.4000, 145.7200], // Cathedral Peak
          [-37.3950, 145.7150], // The Farmyard
          [-37.4000, 145.7100], // Little River Track
          [-37.4100, 145.7100], // Return
        ],
        waypoints: [
          { position: [-37.4100, 145.7100], name: 'Neds Gully', description: 'Northern trailhead' },
          { position: [-37.4000, 145.7200], name: 'Cathedral Peak', description: '840m - Highest point' },
          { position: [-37.3950, 145.7150], name: 'The Farmyard', description: 'Rock formations' },
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
        coordinates: [
          [-37.4300, 145.6900], // Cooks Mill
          [-37.4280, 145.6920], // Creek crossing
          [-37.4260, 145.6940], // Lookout
          [-37.4280, 145.6920], // Return via creek
          [-37.4300, 145.6900], // Cooks Mill
        ],
        waypoints: [
          { position: [-37.4300, 145.6900], name: 'Cooks Mill', description: 'Easy walking track' },
          { position: [-37.4260, 145.6940], name: 'Forest Lookout', description: 'Valley views' },
        ],
        color: '#95E77E'
      }
    ]
  },
  grampians: {
    name: 'The Grampians',
    center: [-37.2333, 142.4167],
    trails: [
      {
        id: 'pinnacle',
        name: 'The Pinnacle',
        difficulty: 'Moderate',
        distance: '4.2km',
        duration: '2 hours',
        elevation: '260m gain',
        description: 'Iconic lookout with 360° views',
        coordinates: [
          [-37.2450, 142.4100], // Wonderland Carpark
          [-37.2420, 142.4120], // Silent Street
          [-37.2400, 142.4140], // Cool Chamber
          [-37.2380, 142.4160], // Bridal Veil Falls
          [-37.2350, 142.4180], // The Pinnacle
        ],
        waypoints: [
          { position: [-37.2450, 142.4100], name: 'Wonderland Carpark', description: 'Start point' },
          { position: [-37.2400, 142.4140], name: 'Cool Chamber', description: 'Rock formations' },
          { position: [-37.2350, 142.4180], name: 'The Pinnacle', description: 'Best views in Grampians' },
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
        coordinates: [
          [-37.2100, 142.3800], // Carpark
          [-37.2080, 142.3820], // Lookout
          [-37.2060, 142.3840], // Base of falls
        ],
        waypoints: [
          { position: [-37.2100, 142.3800], name: 'MacKenzie Falls Carpark', description: 'Two trail options' },
          { position: [-37.2080, 142.3820], name: 'Falls Lookout', description: 'Wheelchair accessible' },
          { position: [-37.2060, 142.3840], name: 'Falls Base', description: 'Steep stairs down' },
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
        coordinates: [
          [-37.2200, 142.4000], // Reed Lookout Carpark
          [-37.2180, 142.4020], // Track junction
          [-37.2160, 142.4040], // The Balconies
        ],
        waypoints: [
          { position: [-37.2200, 142.4000], name: 'Reed Lookout', description: 'Easy walk starts here' },
          { position: [-37.2160, 142.4040], name: 'The Balconies', description: 'Iconic rock formations' },
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
                <Card className="mt-3">
                  <Card.Header>Trail Waypoints</Card.Header>
                  <ListGroup variant="flush">
                    {selectedTrail.waypoints.map((waypoint, idx) => (
                      <ListGroup.Item key={idx}>
                        <strong>{waypoint.name}</strong>
                        <br />
                        <small>{waypoint.description}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
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
                      
                      {trail.waypoints.map((waypoint, idx) => (
                        <Marker key={idx} position={waypoint.position}>
                          <Popup>
                            <strong>{waypoint.name}</strong>
                            <br />
                            {waypoint.description}
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
                {trailsData.cathedral.trails.map(trail => (
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
                <Card className="mt-3">
                  <Card.Header>Trail Waypoints</Card.Header>
                  <ListGroup variant="flush">
                    {selectedTrail.waypoints.map((waypoint, idx) => (
                      <ListGroup.Item key={idx}>
                        <strong>{waypoint.name}</strong>
                        <br />
                        <small>{waypoint.description}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              )}
            </Col>
            
            <Col lg={8}>
              <div style={{ height: '600px', position: 'relative' }}>
                <MapContainer 
                  center={trailsData.cathedral.center} 
                  zoom={12} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {trailsData.cathedral.trails.map(trail => (
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
                      
                      {trail.waypoints.map((waypoint, idx) => (
                        <Marker key={idx} position={waypoint.position}>
                          <Popup>
                            <strong>{waypoint.name}</strong>
                            <br />
                            {waypoint.description}
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
                {trailsData.grampians.trails.map(trail => (
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
                <Card className="mt-3">
                  <Card.Header>Trail Waypoints</Card.Header>
                  <ListGroup variant="flush">
                    {selectedTrail.waypoints.map((waypoint, idx) => (
                      <ListGroup.Item key={idx}>
                        <strong>{waypoint.name}</strong>
                        <br />
                        <small>{waypoint.description}</small>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card>
              )}
            </Col>
            
            <Col lg={8}>
              <div style={{ height: '600px', position: 'relative' }}>
                <MapContainer 
                  center={trailsData.grampians.center} 
                  zoom={11} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {trailsData.grampians.trails.map(trail => (
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
                      
                      {trail.waypoints.map((waypoint, idx) => (
                        <Marker key={idx} position={waypoint.position}>
                          <Popup>
                            <strong>{waypoint.name}</strong>
                            <br />
                            {waypoint.description}
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
        <Col>
          <Card>
            <Card.Body>
              <h5>How to use the interactive maps:</h5>
              <ul>
                <li>Click on any trail in the list to highlight it on the map</li>
                <li>Click on markers to see waypoint information</li>
                <li>Zoom in/out using mouse wheel or +/- buttons</li>
                <li>Drag to move around the map</li>
                <li>Trail colors indicate different routes</li>
                <li>Difficulty badges show trail challenge level</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Maps;