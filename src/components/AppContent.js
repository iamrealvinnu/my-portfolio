import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';
import { EnergyOrb } from './EnergyOrb';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

const AppContainer = styled.div`
  min-height: 100vh;
  background: rgba(10, 15, 25, 0.95);
`;

const ContentContainer = styled.div`
  padding-top: 80px;
  position: relative;
  z-index: 1;
`;

const OrbContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

function AppContent() {
  const navigate = useNavigate();

  const handleVoiceCommand = (command) => {
    console.log('Received command:', command);
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('home')) {
      navigate('/');
    } else if (lowerCommand.includes('about')) {
      navigate('/about');
    } else if (lowerCommand.includes('projects')) {
      navigate('/projects');
    } else if (lowerCommand.includes('contact')) {
      navigate('/contact');
    }
  };

  return (
    <AppContainer>
      <Navbar />
      <OrbContainer>
        <EnergyOrb onCommand={handleVoiceCommand} />
      </OrbContainer>
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </ContentContainer>
    </AppContainer>
  );
}

export default AppContent; 