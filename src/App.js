import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Adventures from './pages/Adventures';
import Locations from './pages/Locations';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/adventures" element={<Adventures />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;