import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import gsap from "gsap";
import Notification from "./Notification";

const ContactSection = styled.section`
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactContent = styled.div`
  max-width: 800px;
  width: 100%;
  text-align: center;

  h2 {
    color: #ffffff;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  p {
    color: #ffffff;
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto 2rem auto;
    opacity: 0.9;
    letter-spacing: 0.5px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  border-radius: 15px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: 2px solid #64ffda;
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;

  &:focus {
    outline: 2px solid #64ffda;
  }
`;

const SubmitButton = styled.button`
  background: #64ffda;
  color: #0a0a0a;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
  justify-content: center;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #64ffda;
  }
`;

const SocialIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: currentColor;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const SuccessPopup = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(100, 255, 218, 0.1);
  border: 1px solid #64ffda;
  padding: 20px;
  border-radius: 8px;
  color: #64ffda;
  backdrop-filter: blur(10px);
  z-index: 1000;
  animation: ${props => props.isClosing ? fadeOut : fadeIn} 0.3s ease-in-out;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CheckIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #64ffda;
  color: #0a192f;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Contact = () => {
  const contactRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top center+=100",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        console.log('Message sent successfully!');
        // Show success notification
        setShowNotification(true);
        // Clear form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    // Show success popup
    setShowSuccess(true);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Hide popup after 5 seconds
    setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsClosing(false);
      }, 300);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <ContactSection id="contact" ref={contactRef}>
      {showNotification && (
        <Notification message="Message sent successfully! 🚀" />
      )}
      {showSuccess && (
        <SuccessPopup isClosing={isClosing}>
          <CheckIcon>✓</CheckIcon>
          <div>
            <h4 style={{ margin: '0 0 5px 0' }}>Message Sent Successfully!</h4>
            <p style={{ margin: 0, fontSize: '0.9em', opacity: 0.8 }}>
              We'll get back to you as soon as possible.
            </p>
          </div>
        </SuccessPopup>
      )}
      <ContactContent className="contact-content">
        <h2>Get In Touch</h2>
        <p>
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions.
        </p>
        <ContactForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit">
            Send Message
            <i className="fas fa-paper-plane" style={{ marginLeft: '10px' }}></i>
          </SubmitButton>
        </ContactForm>
        <SocialLinks>
          <SocialLink href="https://github.com/iamrealvinnu" target="_blank">
            <i className="fab fa-github"></i>
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/guptavinayc/" target="_blank">
            <i className="fab fa-linkedin-in"></i>
          </SocialLink>
          <SocialLink href="https://x.com/theVinayG" target="_blank">
            <SocialIcon viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </SocialIcon>
          </SocialLink>
        </SocialLinks>
      </ContactContent>
    </ContactSection>
  );
};

export default Contact;
