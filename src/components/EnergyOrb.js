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

export function EnergyOrb({ onCommand }) {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startListening = useCallback(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setIsActive(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        
        if (transcript.toLowerCase().includes('hey jarvis')) {
          speak("Yes, how can I help you?");
        } else if (isListening) {
          onCommand(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        recognition.start(); // Restart to keep listening
      };

      recognition.start();
    }
  }, [isListening, onCommand]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    startListening();
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [startListening]);

  return (
    <OrbitSphere>
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
      <CoreSphere isActive={isActive || isListening} />
    </OrbitSphere>
  );
} 