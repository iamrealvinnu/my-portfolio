import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import styled from 'styled-components';

const AnimatedFaceContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const FaceModel = ({ speaking }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/stylized_robot_0_9_max.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (speaking && actions.talk) {
      actions.talk.play();
    } else if (actions.idle) {
      actions.idle.play();
    }
  }, [speaking, actions]);

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        scale={4}
        position={[0, -1, 0]}
      />
    </group>
  );
};

function AnimatedFace() {
  const [speaking, setSpeaking] = useState(false);

  return (
    <AnimatedFaceContainer>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        <FaceModel speaking={speaking} />
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI/2}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </AnimatedFaceContainer>
  );
}

export default AnimatedFace; 