import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

import { Canvas } from '@react-three/fiber';
import Bars from './Bars';
import ItaliaPixel from './ItaliaPixel';


function App() {
  return <>
    <Canvas gl={{ antialias: false, alpha: true }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Router>
        <Switch>
          <Route path="/bars">
            <Bars />
          </Route>
          <Route path="/pixel">
            <ItaliaPixel />
          </Route>
        </Switch>
      </Router>
    </Canvas>
  </>
}

export default App;
