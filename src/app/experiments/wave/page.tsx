"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./wave.module.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";
import axios from "axios";
import { Mesh } from "three";

const MovingPlane = () => {
  // State variables to store the vertex and fragment shaders as strings

  const vertexShader = `uniform float u_time;
  uniform float u_mouse;
  varying vec2 vUv;
  varying float vZ;
  
  
  
  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(modelPosition.x * 4.0 + u_time * 2.0) * 0.2;
    modelPosition.y += sin(modelPosition.z * 6.0 + u_time * 2.0) * 0.1;
  
    vZ = modelPosition.y;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
      
    gl_Position = projectedPosition;
  }
  `;

  const fragmentShader = `varying vec2 vUv;

  vec3 colorA = vec3(0.912,0.191,0.652);
  vec3 colorB = vec3(1.000,0.777,0.052);
  
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;
  varying float vZ;
  
  void main() {
    vec3 color = mix(colorA, colorB, vUv.x);
    vec3 movingColor = mix(u_colorA, u_colorB, vZ * 2.0 + 0.5);
    gl_FragColor = vec4(movingColor, 1.0);
  }
  `;

  const meshRef = useRef<Mesh>();

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0,
      },
      u_colorA: { value: new Color("#FFE486") },
      u_colorB: { value: new Color("#FEB3D9") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.u_time.value = clock.getElapsedTime();
  });
  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={1}
    >
      <planeGeometry args={[1, 1, 16, 16]} />

      <shaderMaterial
        vertexShader={vertexShader}
        uniforms={uniforms}
        wireframe={false}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

function Wave() {
  return (
    <div className={styles.waveContainer} id="canvas-container">
      <Canvas camera={{ position: [1.0, 1.0, 1.0] }}>
        <MovingPlane />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default Wave;
