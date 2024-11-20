import React from 'react';
import styled from 'styled-components';
import AnimatedFace from './AnimatedFace';
import Chatbot from './Chatbot';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 150px;
  color: #8892b0;
  
  @media (max-width: 768px) {
    padding: 0 50px;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <AnimatedFace />
      <Chatbot />
    </HomeContainer>
  );
}

export default Home;
