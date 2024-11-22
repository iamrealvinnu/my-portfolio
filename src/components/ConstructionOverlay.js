import React from 'react';
import styled, { keyframes } from 'styled-components';

const flashIn = keyframes`
  0% { 
    transform: translateY(-100%);
    opacity: 0;
  }
  100% { 
    transform: translateY(0);
    opacity: 1;
  }
`;

const progressFill = keyframes`
  0% { width: 0%; }
  30% { width: 35%; }
  65% { width: 55%; }
  100% { width: 65%; }
`;

const digAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const bulldozerMove = keyframes`
  0% { transform: translateX(100%); }
  45% { transform: translateX(0); }
  55% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);  /* Changed from 0.9 to 0.25 for 75% transparency */
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFA500;
  animation: ${flashIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ProgressBar = styled.div`
  width: 300px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #FFA500;
    border-radius: 10px;
    animation: ${progressFill} 1.8s ease-out forwards;
  }
`;

const ConstructionText = styled.div`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  font-weight: bold;
`;

const ProgressText = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 0.5s ease-out 1s forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const WorkerEmoji = styled.div`
  font-size: 4rem;
  animation: ${digAnimation} 1s infinite ease-in-out;
`;

const Bulldozer = styled.div`
  font-size: 4rem;
  animation: ${bulldozerMove} 8s infinite linear;
  position: absolute;
  bottom: 20%;
`;

const ConstructionOverlay = () => {
  return (
    <OverlayContainer>
      <ConstructionText>
        🚧 Work in Progress 🚧
      </ConstructionText>
      <ProgressText>65% Complete</ProgressText>
      <ProgressBar />
      <WorkerEmoji>👷‍♂️</WorkerEmoji>
      <Bulldozer>🚛</Bulldozer>
      <ProgressText>Check back soon for more amazing features!</ProgressText>
    </OverlayContainer>
  );
};

export default ConstructionOverlay; 