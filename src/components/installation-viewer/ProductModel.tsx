import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

const MODEL_PATH = '/images/products/leather chair 3d model.glb';

useGLTF.preload(MODEL_PATH);

type GLTFResult = GLTF & {
  nodes:     Record<string, THREE.Mesh>;
  materials: Record<string, THREE.Material>;
};

/* ─────────────────────────────────────────────────────────────
   PRODUCT_TRANSFORM
   ─────────────────
   Single configuration block — adjust these values to place the
   product on the scooter. DO NOT change the rendering code below.

   Three.js coordinate system:
     X → left (−) / right (+)
     Y → down (−) / up    (+)
     Z → back (−) / front (+)   ← front = toward viewer by default

   How to calibrate:
     1. Open /installation-viewer/scooter in the browser.
     2. Add the product.
     3. Press Shift+D to enable DEV mode.
     4. Drag the product with the red/green/blue arrows.
     5. Copy the values from the HUD and paste them here.
───────────────────────────────────────────────────────────── */
export const PRODUCT_TRANSFORM = {
  position: [-0.003, 0.148, -0.064] as [number, number, number],
  rotation: [0.000,  1.571,  0.000] as [number, number, number],
  scale:    0.180,
};

/* ─────────────────────────────────────────────────────────────
   Rendering — do not edit below unless changing the mesh setup
───────────────────────────────────────────────────────────── */
function ProductMesh() {
  const { scene } = useGLTF(MODEL_PATH) as GLTFResult;

  React.useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow    = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  /* Rendered WITHOUT its own transform so the parent <group>
     in DraggableProduct (InstallationViewerPage) owns position/rotation/scale.
     When devMode is OFF the parent group uses PRODUCT_TRANSFORM values. */
  return <primitive object={scene} />;
}

export function ProductModel() {
  return (
    <Suspense fallback={null}>
      <ProductMesh />
    </Suspense>
  );
}
