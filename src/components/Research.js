import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const ResearchSection = styled.section`
  background: #0f0f0f;
`;

const ResearchGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Paper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 30px;
  padding: 30px;
  border-radius: 15px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(100, 255, 218, 0.05);
    transform: translateX(10px);
  }

  h3 {
    color: #64ffda;
    margin-bottom: 10px;
  }

  .meta {
    font-size: 0.9rem;
    color: #8892b0;
    margin-bottom: 15px;
  }

  p {
    line-height: 1.6;
  }

  .tags {
    display: flex;
    gap: 10px;
    margin-top: 15px;
  }

  .tag {
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

const Research = () => {
  const researchRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".paper", {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: researchRef.current,
          start: "top center+=100",
          end: "center center",
          toggleActions: "play none none reverse"
        }
      });
    }, researchRef);

    return () => ctx.revert();
  }, []);

  const papers = [
    {
      title: "Advanced Neural Network Architectures for Computer Vision",
      authors: "Vinay Gupta, et al.",
      conference: "International Conference on Machine Learning 2023",
      description: "Novel approach to improving neural network efficiency in computer vision tasks.",
      tags: ["Neural Networks", "Computer Vision", "Deep Learning"],
      link: "#"
    },
    {
      title: "Efficient Natural Language Processing in Healthcare",
      authors: "Vinay Gupta, et al.",
      conference: "Healthcare AI Summit 2023",
      description: "Implementation of NLP techniques for medical record analysis and patient care improvement.",
      tags: ["NLP", "Healthcare", "AI"],
      link: "#"
    }
  ];

  return (
    <ResearchSection id="research" ref={researchRef}>
      <SectionTitle>Research & Publications</SectionTitle>
      <ResearchGrid>
        {papers.map((paper, index) => (
          <Paper 
            key={index} 
            className="paper"
            onClick={() => window.open(paper.link, "_blank")}
          >
            <h3>{paper.title}</h3>
            <div className="meta">
              {paper.authors} | {paper.conference}
            </div>
            <p>{paper.description}</p>
            <div className="tags">
              {paper.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </Paper>
        ))}
      </ResearchGrid>
    </ResearchSection>
  );
};

export default Research; 