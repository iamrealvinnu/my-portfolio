import React, { useState, useEffect, useCallback } from 'react';
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

const OrbitSphere = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(255, 165, 0, 0.1);
  box-shadow: 0 0 50px rgba(255, 165, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
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

const Particles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  animation: ${orbitPulse} 6s linear infinite reverse;
`;

const Particle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
  animation: ${particlePulse} 2s ease-in-out infinite;
`;

const OrbContainer = styled.div`
  position: relative;
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
  cursor: pointer;
`;

const ListeningIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #ffd700;
  text-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const CommandList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  font-size: 0.9em;
  color: #ffd700;
`;

export function EnergyOrb({ onCommand }) {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = useCallback((command) => {
    const lowerCommand = command.toLowerCase();
    console.log('Received command:', lowerCommand);  // Debug log

    // Map commands to actions
    const commandMap = {
      'home': () => onCommand('go to home'),
      'about': () => onCommand('about'),
      'projects': () => onCommand('projects'),
      'contact': () => onCommand('contact')
    };

    // Check each possible command
    Object.keys(commandMap).forEach(key => {
      if (lowerCommand.includes(key)) {
        commandMap[key]();
      }
    });
  }, [onCommand]);

  const startListening = useCallback(() => {
    // Request microphone permission first
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          console.log('Voice recognition started'); // Debug log
        };

        recognition.onresult = (event) => {
          const command = event.results[0][0].transcript;
          console.log('Voice detected:', command); // Debug log
          handleVoiceCommand(command);
        };

        recognition.onerror = (event) => {
          console.error('Voice recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
          console.log('Voice recognition ended'); // Debug log
        };

        recognition.start();
      })
      .catch(error => {
        console.error('Microphone access denied:', error);
        alert('Please allow microphone access to use voice commands');
      });
  }, [handleVoiceCommand]);

  return (
    <OrbContainer onClick={startListening}>
      <Orb isListening={isListening}>
        <OrbitRing duration="4s" />
        <OrbitRing duration="6s" style={{ width: '80%', height: '80%' }} />
        <OrbitRing duration="8s" style={{ width: '120%', height: '120%' }} />
        <Particles>
          {[...Array(20)].map((_, i) => (
            <Particle
              key={i}
              style={{
                top: `${50 + Math.sin(i * 18) * 45}%`,
                left: `${50 + Math.cos(i * 18) * 45}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </Particles>
        <CoreSphere isActive={isListening} />
      </Orb>
      {isListening && (
        <ListeningIndicator>
          Listening... Try saying:
          <CommandList>
            <li>"Go to Home"</li>
            <li>"Show About"</li>
            <li>"Open Projects"</li>
            <li>"Go to Contact"</li>
          </CommandList>
        </ListeningIndicator>
      )}
    </OrbContainer>
  );
} 