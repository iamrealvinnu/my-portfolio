import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const ProjectSection = styled.section`
  background: #0a0a0a;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 25px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    background: rgba(100, 255, 218, 0.05);
  }

  h3 {
    color: #64ffda;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 20px;
    line-height: 1.6;
  }

  .tech-stack {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 15px;
  }

  .tech {
    font-size: 0.8rem;
    padding: 5px 10px;
    background: rgba(100, 255, 218, 0.1);
    border-radius: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #64ffda;
  text-align: center;
  margin-bottom: 50px;
`;

const Projects = () => {
  const projectsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top center+=100",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "AI-Powered Safety App",
      description: "A real-time personal safety application using computer vision and deep learning for threat detection and emergency response.",
      tech: ["TensorFlow", "Python", "OpenCV", "React Native"],
      link: "#"
    },
    {
      title: "Neural Network Visualizer",
      description: "Interactive visualization tool for understanding neural network architectures and learning processes.",
      tech: ["PyTorch", "D3.js", "React", "Python"],
      link: "#"
    },
    {
      title: "NLP Research Platform",
      description: "Platform for analyzing and comparing different NLP models' performance on various language tasks.",
      tech: ["BERT", "Transformers", "Flask", "MongoDB"],
      link: "#"
    }
  ];

  return (
    <ProjectSection id="projects" ref={projectsRef}>
      <SectionTitle>Featured Projects</SectionTitle>
      <ProjectGrid>
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            className="project-card"
            onClick={() => window.open(project.link, "_blank")}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech">{tech}</span>
              ))}
            </div>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </ProjectSection>
  );
};

export default Projects;
