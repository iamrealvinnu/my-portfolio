import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import { EnergyOrb } from './components/EnergyOrb';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

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
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('go to home') || lowerCommand.includes('show home')) {
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