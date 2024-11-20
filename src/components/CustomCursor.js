import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  transition: transform 0.1s ease;
  z-index: 9999;
`;

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.style.transform = `translate3d(${e.clientX - 7.5}px, ${e.clientY - 7.5}px, 0)`;
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <Cursor ref={cursorRef} />;
}

export default CustomCursor; 