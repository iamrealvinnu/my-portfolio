import React from 'react';
import styled from 'styled-components';
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

const HomeTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  // ... other styles
`;

const HomeSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  // ... other styles
`;

function Home() {
  return (
    <HomeContainer>
      <Chatbot />
    </HomeContainer>
  );
}

export default Home;
