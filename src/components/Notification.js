import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  15% {
    transform: translateY(20px);
    opacity: 1;
  }
  85% {
    transform: translateY(20px);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  animation: ${slideIn} 3s ease-in-out forwards;
`;

const NotificationContent = styled.div`
  background: rgba(100, 255, 218, 0.1);
  backdrop-filter: blur(10px);
  padding: 15px 25px;
  border-radius: 8px;
  border: 1px solid #64ffda;
  color: #64ffda;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.2);

  i {
    font-size: 1.2rem;
  }
`;

const Notification = ({ message }) => {
  return (
    <NotificationWrapper>
      <NotificationContent>
        <i className="fas fa-check-circle"></i>
        {message}
      </NotificationContent>
    </NotificationWrapper>
  );
};

export default Notification; 