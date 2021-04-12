import React, { useRef, useState } from 'react';
import './index.css';

import { Canvas, useFrame } from '@react-three/fiber';
import { Unit } from '../components/Unit';

import * as data from "../data/colors.json";

function App() {
  const [asseY, cambiaAsse] = useState(0.1);

  const vaiSinistra = () => cambiaAsse(asse => asse + 0.1);
  const vaiDestra = () => cambiaAsse(asse => asse - 0.1);

  return <>
    <Canvas
      gl={{ antialias: false, alpha: false }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <View rotation={[6, asseY, 0.1]} />
    </Canvas>
    <div>
      <button onClick={vaiSinistra}>sinistra</button>
      <button onClick={vaiDestra}>destra</button>
    </div>
  </>
}

function View({ rotation: initialRotation = [6, 0.2, 0.1] }) {
  const group = useRef();

  useFrame((state, delta) => {
    group.current.rotation.z += 0.003;
    group.current.rotation.y += 0.003;
  });

  const colors = data.default;
  const colorKeys = Object.keys(colors);

  const offset = {
    x: 4, y: -7.5
  }

  return (
    <group ref={group} rotation={initialRotation}>
      {colorKeys.filter(key => key !== "255, 255, 255").map((color) => {
        const positions = colors[color];
        return positions.map(pos => {
          const hor = ((pos[0] / 10)) - offset.x;
          const ver = ((pos[1] / 10) * -1) - offset.y;
          return <Unit color={`rgb(${color})`} position={[hor, ver, -3]} />;
        })
      })}
    </group>
  );
}

export default App;
