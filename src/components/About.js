import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 100px 150px;
  color: #8892b0;
  
  @media (max-width: 768px) {
    padding: 100px 50px;
  }
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  color: #64ffda;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Interests = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const InterestCard = styled.div`
  background: #112240;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #233554;
  
  h3 {
    color: #64ffda;
    margin-bottom: 10px;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  
  li {
    margin-bottom: 10px;
    position: relative;
    padding-left: 20px;
    
    &:before {
      content: "▹";
      position: absolute;
      left: 0;
      color: #64ffda;
    }
  }
`;

const AboutText = styled.p`
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  // ... other styles
`;

function About() {
  return (
    <AboutContainer>
      <Section>
        <Title></Title>
        <AboutText>
          Hi, I'm Vinay Gupta 👋
          <br /><br />
          An AI and Machine Learning enthusiast with a keen interest in neural networks, 
          computer vision, natural language processing (NLP), and large language models (LLMs). 
          I enjoy exploring how cutting-edge technology can solve real-world problems and 
          enhance everyday experiences.
        </AboutText>
      </Section>

      <Section>
        <Title>What Drives Me? 🔍</Title>
        <List>
          <li>Unraveling the complexities of AI and ML to create impactful solutions.</li>
          <li>Staying updated on the latest advancements in AI and tech trends.</li>
          <li>Contributing to innovative projects that bridge theory and application.</li>
        </List>
      </Section>

      <Section>
        <Title>Current Interests 🌟</Title>
        <Interests>
          <InterestCard>
            <h3>Deep Learning Techniques</h3>
            <p>Neural Networks, CNN, RNN, Transformers</p>
          </InterestCard>
          <InterestCard>
            <h3>Generative AI and LLMs</h3>
            <p>GPT models, BERT, Stable Diffusion</p>
          </InterestCard>
          <InterestCard>
            <h3>AI Ethics and Responsible Tech</h3>
            <p>Bias mitigation, Fairness in AI</p>
          </InterestCard>
        </Interests>
      </Section>

      <Section>
        <Title>Let's Connect! 💡</Title>
        <p>
          I'm always eager to network, share knowledge, and collaborate on projects 
          that inspire innovation and creativity in the field of AI. Reach out if 
          you'd like to discuss ideas, opportunities, or trends in tech!
        </p>
      </Section>
    </AboutContainer>
  );
}

export default About;

