import React from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Points } from "@react-three/drei";

const positions = new Float32Array([
  -1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0, 0, 0, 1, 0, 0, -1,
]);

const colors = new Float32Array([
  1, 0, 0, 1, 0.5, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
]);

const sizes = new Float32Array([5, 5, 5, 5, 5, 5, 5, 5]);

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 100], fov: 75 }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <Points positions={positions} colors={colors} sizes={sizes} />
      </Canvas>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
