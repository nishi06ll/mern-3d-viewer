import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  useGLTF,
  Environment,
  Bounds,
} from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);

  return <primitive object={scene} />;
}

export default function ModelViewer({ modelUrl }) {
  return (
    <div style={{ height: "300px" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        
        <color attach="background" args={["#f5f5f5"]} />

        <ambientLight intensity={2} />

        <Environment preset="sunset" />

        <Bounds fit clip observe margin={1.2}><Suspense fallback={
  <mesh>
    <boxGeometry />
    <meshStandardMaterial color="gray" />
  </mesh>
}>
          
  <Model url={modelUrl} />
</Suspense>
        </Bounds>

        <OrbitControls />

      </Canvas>
    </div>
  );
}