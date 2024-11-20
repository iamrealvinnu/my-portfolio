import React from "react";
import styled from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const LoadingAnimation = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid rgba(100, 255, 218, 0.1);
  border-radius: 50%;
  border-top-color: #64ffda;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LoadingAnimation />
    </LoadingContainer>
  );
};

export default LoadingScreen; 