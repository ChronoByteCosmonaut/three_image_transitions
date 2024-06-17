"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./images.module.scss";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import FadingImageDisplacement from "@/components/FadingImageDisplacement/FadingImageDisplacement";

function ImagesTransition() {
  return (
    <div className={styles.blobContainer} id="canvas-container">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
        <FadingImageDisplacement />
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}

export default ImagesTransition;
