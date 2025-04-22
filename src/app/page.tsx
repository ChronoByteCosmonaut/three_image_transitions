"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Image from "next/image";
import styles from "./page.module.scss";
import Link from "next/link";
import FadingImageDisplacement from "@/components/FadingImageDisplacement/FadingImageDisplacement";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.blobContainer} id="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
          <Environment preset="sunset" />
          <FadingImageDisplacement />
          <OrbitControls makeDefault setScale={0.4} />
        </Canvas>
      </div>
    </main>
  );
}
