import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const orbitPulse = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1) rotate(180deg);
    opacity: 0.6;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 0.8;
  }
`;

const particlePulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

const OrbContainer = styled.div`
  position: relative;
  cursor: pointer;
`;

const Orb = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 165, 0, 0.1);
  box-shadow: 0 0 50px rgba(255, 165, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const OrbitRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(255, 165, 0, 0.3);
  animation: ${orbitPulse} ${props => props.duration || '4s'} linear infinite;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgba(255, 165, 0, 0.3);
  }
  
  &:before { transform: rotate(60deg); }
  &:after { transform: rotate(-60deg); }
`;

const CoreSphere = styled.div`
  width: 100px;
  height: 100px;
  background: radial-gradient(circle at 30% 30%, #ffd700, #ff8c00);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 165, 0, 0.5);
  animation: ${particlePulse} ${props => props.isActive ? '1s' : '2s'} ease-in-out infinite;
`;

const DebugPanel = styled.div`
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  width: 300px;
  z-index: 1000;
  
  button {
    margin: 10px 0;
    padding: 8px 16px;
    background: #64ffda;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    color: #000;
    font-weight: bold;
    
    &:hover {
      background: #4ad3b3;
    }
  }
`;

const StatusMessage = styled.div`
  color: ${props => props.isError ? '#ff4444' : '#64ffda'};
  margin: 5px 0;
  font-size: 0.9em;
`;

export function EnergyOrb({ onCommand }) {
  const [isListening, setIsListening] = useState(false);
  const [debugMessage, setDebugMessage] = useState('Click to start');
  const [isError, setIsError] = useState(false);

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setDebugMessage('Speech recognition not supported. Please use Chrome.');
      setIsError(true);
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setDebugMessage('Starting...');
    setIsError(false);

    recognition.onstart = () => {
      setIsListening(true);
      setDebugMessage('🎤 Listening...');
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript;
      setDebugMessage(`Heard: "${command}"`);
      console.log('Command received:', command);
      onCommand(command);
    };

    recognition.onerror = (event) => {
      setDebugMessage(`Error: ${event.error}`);
      setIsError(true);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setDebugMessage('Ready for next command');
    };

    try {
      recognition.start();
    } catch (err) {
      setDebugMessage(`Error: ${err.message}`);
      setIsError(true);
    }
  }, [onCommand]);

  return (
    <OrbContainer>
      <Orb onClick={startListening}>
        <OrbitRing duration="4s" />
        <OrbitRing duration="6s" style={{ width: '80%', height: '80%' }} />
        <OrbitRing duration="8s" style={{ width: '120%', height: '120%' }} />
        <CoreSphere isActive={isListening} />
      </Orb>

      <DebugPanel>
        <StatusMessage isError={isError}>{debugMessage}</StatusMessage>
        <button onClick={startListening}>
          {isListening ? '🎤 Listening...' : 'Click to Start'}
        </button>
        <div style={{ marginTop: '5px', fontSize: '0.8em', opacity: 0.8 }}>
          Try saying: "home", "about", "projects", "contact"
        </div>
      </DebugPanel>
    </OrbContainer>
  );
}

export default EnergyOrb;