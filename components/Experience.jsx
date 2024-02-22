"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useRef } from "react";
import { useGLTF,Html, useTexture, AccumulativeShadows, RandomizedLight, Decal, Environment, Center, PresentationControls, OrbitControls } from "@react-three/drei";
import { Vest } from "./Vest";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "./Store";

const Experience = ({ position = [0, 0, 2.5], fov = 25 }) => {
  return (
    <Canvas className="w-full h-full " shadows camera={{ position, fov }} gl={{ preserveDrawingBuffer: true }} eventPrefix="client">
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <ambientLight intensity={1} />
      <directionalLight intensity={4} position={[-2, 0, 10]} />
      <CameraRig>
        <Backdrop />
        <Center>
          <Suspense fallback={
            <Html className="text-black ">loading...</Html>
          }>
          <Vest scale={0.01} />
          </Suspense>
          </Center>
      </CameraRig>
    </Canvas>
  );
};

export default Experience;

function Backdrop() {
  const shadows = useRef()
  useFrame((state, delta) => easing.dampC(shadows.current.getMesh().material.color, state.color, 0.25, delta))
  return (
    <AccumulativeShadows ref={shadows} temporal frames={60} alphaTest={0.85} scale={10} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.29]}>
      <RandomizedLight amount={4} radius={9} intensity={2.5} ambient={0.25} position={[5, 5, -10]} />
      <RandomizedLight amount={4} radius={5} intensity={1.5} ambient={0.55} position={[-5, 5, -9]} />
    </AccumulativeShadows>
  )
}
function CameraRig({ children }) {
  const group = useRef();
  const snap = useSnapshot(state)
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [snap.intro ? -state.viewport.width / 4 : 0, 0, 2], 0.25, delta)
    easing.dampE(group.current.rotation, [state.pointer.y / 10, -state.pointer.x / 5, 0], 0.25, delta);
  });
  return <group ref={group}>{children}</group>;
}
