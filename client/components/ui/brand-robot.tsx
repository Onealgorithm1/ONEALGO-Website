import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* BrandRobot — OneAlgorithm's own "machine gaze" for /services/website-development.
   Built from research/robot/robot-ref-v1.png: graphite chassis, amber eyes,
   orange neck ring, blue antenna tip. Head + body follow the pointer, eyes blink.
   If public/models/robot.glb exists (scripts/tripo-robot.mjs) it is shown instead
   of the procedural body — same follow rig. Cursor-follow idea after
   alexperezcedeno's Robot Hero (21st.dev); geometry and materials are ours. */

const ORANGE = "#ffa634", BLUE = "#005eaa", GRAPHITE = "#1c1c1e";
export const ROBOT_GLB = "/models/robot.glb";

const chassis = new THREE.MeshStandardMaterial({ color: GRAPHITE, roughness: 0.55, metalness: 0.15 });
const visor = new THREE.MeshPhysicalMaterial({ color: "#050505", roughness: 0.08, metalness: 0.2, clearcoat: 1 });
const amber = new THREE.MeshBasicMaterial({ color: ORANGE, toneMapped: false });
const blue = new THREE.MeshBasicMaterial({ color: BLUE, toneMapped: false });

function useFollow(reduced: boolean) {
  const body = useRef<THREE.Group>(null), head = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (!body.current || !head.current) return;
    const d = Math.min(dt, 0.1), x = reduced ? 0 : s.pointer.x, y = reduced ? 0 : s.pointer.y;
    const t = s.clock.elapsedTime;
    body.current.position.y = reduced ? 0 : Math.sin(t * 1.4) * 0.03;
    body.current.rotation.y = THREE.MathUtils.lerp(body.current.rotation.y, x * 0.45, 6 * d);
    body.current.rotation.z = THREE.MathUtils.lerp(body.current.rotation.z, -x * 0.08, 6 * d);
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, x * 0.5, 10 * d);
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, -y * 0.35, 10 * d);
  });
  return { body, head };
}

function Eyes({ reduced }: { reduced: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    const c = clock.elapsedTime % 3.6; // blink every 3.6s for 0.18s
    g.current.scale.y = !reduced && c < 0.18 ? Math.max(0.08, 1 - Math.sin((c / 0.18) * Math.PI)) : 1;
  });
  return (
    <group ref={g} position={[0, 0.02, 0.415]}>
      {[-0.085, 0.085].map((x) => (
        <mesh key={x} position={[x, 0, 0]} material={amber}><circleGeometry args={[0.035, 32]} /></mesh>
      ))}
      <pointLight position={[0, 0, 0.2]} color={ORANGE} intensity={0.6} distance={1.2} />
    </group>
  );
}

function ProceduralRobot({ reduced }: { reduced: boolean }) {
  const { body, head } = useFollow(reduced);
  return (
    <group ref={body} position={[0, -0.35, 0]}>
      <mesh material={chassis} position={[0, 0.1, 0]}><capsuleGeometry args={[0.3, 0.25, 8, 32]} /></mesh>
      {[-0.36, 0.36].map((x) => (
        <mesh key={x} material={chassis} position={[x, 0.12, 0]} rotation={[0, 0, x > 0 ? -0.15 : 0.15]}><capsuleGeometry args={[0.08, 0.22, 6, 20]} /></mesh>
      ))}
      <mesh material={amber} position={[0, 0.44, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.22, 0.008, 12, 64]} /></mesh>
      <group ref={head} position={[0, 0.78, 0]}>
        <mesh material={chassis}><sphereGeometry args={[0.34, 48, 48]} /></mesh>
        <mesh material={visor} position={[0, 0.02, 0.22]} scale={[1, 0.8, 0.6]}><sphereGeometry args={[0.3, 48, 32]} /></mesh>
        <Eyes reduced={reduced} />
        <group position={[0.05, 0.32, -0.05]} rotation={[0, 0, -0.25]}>
          <mesh material={chassis} position={[0, 0.08, 0]}><cylinderGeometry args={[0.01, 0.014, 0.16, 12]} /></mesh>
          <mesh material={blue} position={[0, 0.17, 0]}><sphereGeometry args={[0.02, 16, 16]} /></mesh>
          <pointLight position={[0, 0.2, 0]} color={BLUE} intensity={0.4} distance={0.8} />
        </group>
      </group>
    </group>
  );
}

function GlbRobot({ url, reduced }: { url: string; reduced: boolean }) {
  const { scene } = useGLTF(url);
  const { body, head } = useFollow(reduced);
  // ponytail: a generated GLB is one mesh — the whole model turns; no separate head rig.
  return (
    <group ref={body} position={[0, -0.5, 0]}>
      <group ref={head}><primitive object={scene} scale={1.1} /></group>
    </group>
  );
}

/* Fit the rig to whichever axis runs out first. It used to divide by viewport.width
   alone, so in a short wide panel (slide 01 of the hero carousel) the scale came from
   the generous width and the head clipped off the top. The rig occupies roughly 1.3
   units across and 2.5 tall, shadow included. */
function Fit({ children }: { children: React.ReactNode }) {
  const { viewport } = useThree();
  const scale = Math.min(1.45, viewport.width / 2.6, viewport.height / 2.5);
  return <group scale={scale}>{children}</group>;
}

export function BrandRobot({ className = "" }: { className?: string }) {
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [glb, setGlb] = useState(false);
  useEffect(() => {
    fetch(ROBOT_GLB, { method: "HEAD" })
      .then((r) => setGlb(r.ok && /model|octet/.test(r.headers.get("content-type") || "")))
      .catch(() => {});
  }, []);
  return (
    <div className={className} aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.2, 4.2], fov: 35 }} gl={{ antialias: true, alpha: true }} frameloop={reduced ? "demand" : "always"}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 3]} intensity={2.6} color="#fff6ea" />
        <directionalLight position={[-4, 1, -2]} intensity={1.4} color={ORANGE} />
        <directionalLight position={[0, -2, -3]} intensity={0.5} color={BLUE} />
        <Fit>
          <Suspense fallback={<ProceduralRobot reduced={reduced} />}>
            {glb ? <GlbRobot url={ROBOT_GLB} reduced={reduced} /> : <ProceduralRobot reduced={reduced} />}
          </Suspense>
          <ContactShadows position={[0, -0.95, 0]} opacity={0.55} scale={5} blur={2.4} far={2} color="#000" />
        </Fit>
      </Canvas>
    </div>
  );
}
export default BrandRobot;
