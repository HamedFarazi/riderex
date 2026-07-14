import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

const MODEL_PATH = '/images/products/scooter 3d model.glb';

// Pre-load for performance
useGLTF.preload(MODEL_PATH);

type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

function ScooterMesh() {
  const { scene } = useGLTF(MODEL_PATH) as GLTFResult;

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1}
    />
  );
}

export function ScooterModel() {
  return (
    <Suspense fallback={null}>
      <ScooterMesh />
    </Suspense>
  );
}
