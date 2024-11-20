import React, { useEffect } from 'react';
import styled from 'styled-components';

const JarvisContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #64ffda;
  font-size: 2rem;
  z-index: 10;
`;

function Jarvis() {
  useEffect(() => {
    const greetUser = () => {
      const currentHour = new Date().getHours();
      let greeting;

      if (currentHour < 12) {
        greeting = "Good morning";
      } else if (currentHour < 18) {
        greeting = "Good afternoon";
      } else {
        greeting = "Good evening";
      }

      const msg = new SpeechSynthesisUtterance(
        `${greeting}! Welcome to my portfolio. My name is Vinay Gupta. I'm an AI and Machine Learning enthusiast with a focus on neural networks and NLP. I enjoy exploring how technology can solve real-world problems.`
      );
      window.speechSynthesis.speak(msg);
    };

    greetUser();
  }, []);

  return (
    <JarvisContainer>
      <h1>Jarvis</h1>
      <p>How can I assist you today?</p>
    </JarvisContainer>
  );
}

export default Jarvis; 