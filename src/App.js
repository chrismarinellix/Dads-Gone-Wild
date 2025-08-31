import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Adventures from './pages/Adventures';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Maps from './pages/Maps';
import Booking from './pages/Booking';
import Waitlist from './pages/Waitlist';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/adventures" element={<Adventures />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/waitlist" element={<Waitlist />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;