import React, { useState } from 'react';
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

const Container = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 15, 25, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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

function Chatbot() {
  const [isActive, setIsActive] = useState(false);

  // Simulate activity every second (like a heartbeat)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsActive(prev => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
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
        <CoreSphere isActive={isActive} />
      </OrbitSphere>
    </Container>
  );
}

export default Chatbot;
