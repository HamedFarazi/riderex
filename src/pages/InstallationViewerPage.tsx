import React, {
  Suspense,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Grid,
  useProgress,
  TransformControls,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

import { ScooterModel } from "../components/installation-viewer/ScooterModel";
import {
  ProductModel,
  PRODUCT_TRANSFORM,
} from "../components/installation-viewer/ProductModel";
import { InstallationToolbar } from "../components/installation-viewer/InstallationToolbar";

/* ────────────────────────────────────────────────
   Loading Overlay
──────────────────────────────────────────────── */
function LoadingOverlay() {
  const { progress } = useProgress();
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5"
      style={{ background: "rgba(5,5,5,0.95)" }}
    >
      <div
        className="w-14 h-14 rounded-full border-4 animate-spin"
        style={{ borderColor: "rgba(217,4,22,0.2)", borderTopColor: "#D90416" }}
      />
      <div className="text-center">
        <p className="text-white font-semibold">در حال بارگذاری صحنه</p>
        <p className="text-gray-500 text-sm mt-1">{Math.round(progress)}٪</p>
      </div>
      <div
        className="w-48 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "#D90416" }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Toast
──────────────────────────────────────────────── */
function Toast({ message }: { message: string }) {
  return (
    <div
      className="absolute top-20 left-1/2 -translate-x-1/2 z-30 px-5 py-3 rounded-xl text-sm font-bold text-white pointer-events-none"
      style={{
        background: "rgba(217,4,22,0.9)",
        border: "1px solid rgba(255,100,100,0.4)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 24px rgba(217,4,22,0.35)",
      }}
    >
      {message}
    </div>
  );
}

/* ────────────────────────────────────────────────
   Error Boundary
──────────────────────────────────────────────── */
class SceneErrorBoundary extends React.Component<
  React.PropsWithChildren<Record<never, never>>,
  { hasError: boolean }
> {
  constructor(props: React.PropsWithChildren<Record<never, never>>) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-30">
          <span className="text-4xl">⚠️</span>
          <p className="text-gray-400 font-semibold text-center px-8">
            خطا در بارگذاری مدل سه‌بعدی
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "#D90416" }}
          >
            تلاش مجدد
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ────────────────────────────────────────────────
   Draggable Product — with TransformControls
──────────────────────────────────────────────── */
type TransformMode = "translate" | "rotate" | "scale";

interface DraggableProductProps {
  devMode: boolean;
  transformMode: TransformMode;
  onTransformChange: (
    pos: THREE.Vector3,
    rot: THREE.Euler,
    scale: number,
  ) => void;
}

function DraggableProduct({
  devMode,
  transformMode,
  onTransformChange,
}: DraggableProductProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { gl } = useThree();

  const handleDragStart = useCallback(() => {
    gl.domElement.style.pointerEvents = "none";
  }, [gl]);

  const handleDragEnd = useCallback(() => {
    gl.domElement.style.pointerEvents = "auto";
    if (groupRef.current) {
      onTransformChange(
        groupRef.current.position.clone(),
        groupRef.current.rotation.clone(),
        groupRef.current.scale.x,
      );
    }
  }, [gl, onTransformChange]);

  const groupEl = (
    <group
      ref={groupRef}
      position={PRODUCT_TRANSFORM.position}
      rotation={PRODUCT_TRANSFORM.rotation}
      scale={PRODUCT_TRANSFORM.scale}
    >
      <ProductModel />
    </group>
  );

  if (!devMode) return groupEl;

  return (
    <TransformControls
      object={groupRef}
      mode={transformMode}
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
    >
      {groupEl}
    </TransformControls>
  );
}

/* ────────────────────────────────────────────────
   Scene
──────────────────────────────────────────────── */
interface SceneProps {
  productAdded: boolean;
  devMode: boolean;
  transformMode: TransformMode;
  onTransformChange: (
    pos: THREE.Vector3,
    rot: THREE.Euler,
    scale: number,
  ) => void;
}

function Scene({
  productAdded,
  devMode,
  transformMode,
  onTransformChange,
}: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#ff2200" />

      <Environment preset="night" />

      <Grid
        position={[0, -0.01, 0]}
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.5}
        cellColor="#1a1a1a"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#2a0a0a"
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid
      />

      <ScooterModel />

      {productAdded && (
        <DraggableProduct
          devMode={devMode}
          transformMode={transformMode}
          onTransformChange={onTransformChange}
        />
      )}

      <OrbitControls
        makeDefault
        enablePan
        enableZoom
        enableRotate
        minDistance={1}
        maxDistance={20}
        target={[0, 0.5, 0]}
      />
    </>
  );
}

/* ────────────────────────────────────────────────
   Live Transform HUD  (dev mode only)
──────────────────────────────────────────────── */
interface LiveValues {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}

function TransformHUD({
  values,
  onCopy,
}: {
  values: LiveValues;
  onCopy: () => void;
}) {
  const fmt = (n: number) => n.toFixed(3);
  const code =
    `export const PRODUCT_TRANSFORM = {\n` +
    `  position: [${values.position.map(fmt).join(", ")}] as [number, number, number],\n` +
    `  rotation: [${values.rotation.map(fmt).join(", ")}] as [number, number, number],\n` +
    `  scale:    ${fmt(values.scale)},\n};`;

  return (
    <div
      className="absolute bottom-24 right-4 z-20 w-72 rounded-xl overflow-hidden"
      style={{
        background: "rgba(5,5,5,0.95)",
        border: "1px solid rgba(217,4,22,0.35)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(217,4,22,0.15)" }}
      >
        <span className="text-xs font-bold text-[#D90416]">
          ⚙ DEV — Transform Values
        </span>
        <button
          onClick={onCopy}
          className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors"
        >
          📋 Copy
        </button>
      </div>

      {/* values */}
      <div className="px-4 py-3 space-y-1.5 text-xs font-mono">
        {(["position", "rotation", "scale"] as const).map((key) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-500">{key}</span>
            <span className="text-green-400">
              {key === "scale"
                ? fmt(values.scale)
                : `[${(values[key] as [number, number, number]).map(fmt).join(", ")}]`}
            </span>
          </div>
        ))}
      </div>

      {/* copyable code */}
      <pre
        className="px-4 pb-3 text-[10px] text-gray-600 leading-relaxed overflow-x-auto"
        style={{ fontFamily: "monospace" }}
      >
        {code}
      </pre>

      <div className="px-4 pb-3 text-[10px] text-gray-600">
        بعد از تنظیم، این مقادیر را در{" "}
        <span className="text-[#D90416]">ProductModel.tsx</span> جایگزین کنید.
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────
   Main Page
──────────────────────────────────────────────── */
export default function InstallationViewerPage() {
  const [productAdded, setProductAdded] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [devMode, setDevMode] = useState(false);
  const [transformMode, setTransformMode] =
    useState<TransformMode>("translate");
  const [liveValues, setLiveValues] = useState<LiveValues>({
    position: [...PRODUCT_TRANSFORM.position] as [number, number, number],
    rotation: [...PRODUCT_TRANSFORM.rotation] as [number, number, number],
    scale: PRODUCT_TRANSFORM.scale,
  });

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const handleToggleProduct = useCallback(() => {
    setProductAdded((prev) => {
      showToast(prev ? "محصول حذف شد" : "محصول اضافه شد");
      return !prev;
    });
  }, [showToast]);

  const handleResetCamera = useCallback(() => {
    // reset by toggling key — simplest way with R3F
    setSceneReady(false);
    setTimeout(() => setSceneReady(true), 50);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const handleTransformChange = useCallback(
    (pos: THREE.Vector3, rot: THREE.Euler, scale: number) => {
      setLiveValues({
        position: [pos.x, pos.y, pos.z],
        rotation: [rot.x, rot.y, rot.z],
        scale,
      });
    },
    [],
  );

  const handleCopyTransform = useCallback(() => {
    const code =
      `position: [${liveValues.position.map((n) => n.toFixed(3)).join(", ")}] as [number, number, number],\n` +
      `rotation: [${liveValues.rotation.map((n) => n.toFixed(3)).join(", ")}] as [number, number, number],\n` +
      `scale:    ${liveValues.scale.toFixed(3)},`;
    navigator.clipboard
      ?.writeText(code)
      .then(() => showToast("مقادیر کپی شد ✓"));
  }, [liveValues, showToast]);

  /* keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "D") {
        setDevMode((v) => !v);
        return;
      }
      if (!devMode) return;
      if (e.key === "w" || e.key === "W") setTransformMode("translate");
      if (e.key === "e" || e.key === "E") setTransformMode("rotate");
      if (e.key === "r" || e.key === "R") setTransformMode("scale");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [devMode]);

  return (
    <div
      className="fixed inset-0 rtl"
      style={{ background: "#050505", zIndex: 100 }}
    >
      {/* Canvas */}
      <SceneErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [3, 2, 5], fov: 50 }}
          style={{ width: "100%", height: "100%" }}
          onCreated={() => setSceneReady(true)}
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 15, 35]} />
          <Suspense fallback={null}>
            <Scene
              productAdded={productAdded}
              devMode={devMode}
              transformMode={transformMode}
              onTransformChange={handleTransformChange}
            />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>

      {/* Loading */}
      {!sceneReady && <LoadingOverlay />}

      {/* Toast */}
      {toast && <Toast message={toast} />}

      {/* Toolbar */}
      <InstallationToolbar
        productAdded={productAdded}
        onToggleProduct={handleToggleProduct}
        onResetCamera={handleResetCamera}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Status pill */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full z-10"
        style={{
          background: "rgba(5,5,5,0.7)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: sceneReady ? "#22c55e" : "#888" }}
        />
        <span className="text-xs text-gray-500">
          {productAdded ? "۲ مدل بارگذاری شده" : "موتور بارگذاری شده"}
        </span>
      </div>

      {/* Dev mode badge + mode switcher */}
      {devMode && (
        <div
          className="absolute top-16 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: "rgba(5,5,5,0.92)",
            border: "1px solid rgba(217,4,22,0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <span className="text-xs font-bold text-[#D90416] ml-2">⚙ DEV</span>
          {[
            { mode: "translate" as TransformMode, label: "جابجایی", key: "W" },
            { mode: "rotate" as TransformMode, label: "چرخش", key: "E" },
            { mode: "scale" as TransformMode, label: "اندازه", key: "R" },
          ].map((btn) => (
            <button
              key={btn.mode}
              onClick={() => setTransformMode(btn.mode)}
              className="flex flex-col items-center px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all"
              style={{
                background:
                  transformMode === btn.mode
                    ? "#D90416"
                    : "rgba(255,255,255,0.05)",
                color: transformMode === btn.mode ? "#fff" : "#888",
                border:
                  transformMode === btn.mode
                    ? "1px solid rgba(255,100,100,0.5)"
                    : "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span>{btn.label}</span>
              <span style={{ fontSize: "9px", opacity: 0.6 }}>[{btn.key}]</span>
            </button>
          ))}
        </div>
      )}

      {/* Dev mode shortcut hint (always visible) */}
      {/* {!devMode && (
        <div
          className="absolute bottom-24 right-4 z-20 px-3 py-1.5 rounded-lg text-xs text-gray-600 cursor-pointer hover:text-gray-400 transition-colors"
          style={{ background: 'rgba(5,5,5,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}
          onClick={() => setDevMode(true)}
          title="فعال‌سازی حالت تنظیم موقعیت"
        >
          ⚙ Shift+D — حالت تنظیم موقعیت
        </div>
      )} */}

      {/* Live HUD */}
      {devMode && productAdded && (
        <TransformHUD values={liveValues} onCopy={handleCopyTransform} />
      )}
    </div>
  );
}
