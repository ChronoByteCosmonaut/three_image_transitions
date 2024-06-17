import { shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { geometry } from "maath";
import { RoundedPlaneGeometry } from "maath/dist/declarations/src/geometry";
export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    // @ts-ignore
    tex: undefined,
    // @ts-ignore
    tex2: undefined,
    // @ts-ignore
    disp: undefined,
  },
  /*glsl */ ` varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
  /*glsl */ ` varying vec2 vUv;
      uniform sampler2D tex;
      uniform sampler2D tex2;
      uniform sampler2D disp;
      uniform float _rot;
      uniform float dispFactor;
      uniform float effectFactor;
      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
        // #include <encodings_fragment>
      }`
);

extend({
  ImageFadeMaterial,
  RoundedPlaneGeometry: geometry.RoundedPlaneGeometry,
});

function FadingImageDisplacement() {
  const ref = useRef();
  const ref2 = useRef();

  const [texture1, texture2, texture3, texture4, dispTexture, dispTexture2] =
    useTexture([
      "/img-before.jpg",
      "/img-after.jpg",
      "/img-shader-3.jpg",
      "/img-shader-4.jpg",
      "/displacement/10.jpg",
      "/displacement/14.jpg",
    ]);
  const [hovered, setHover] = useState(false);
  const [hoveredT, setHoveredT] = useState(false);

  useFrame(() => {
    //@ts-ignore
    ref2.current.dispFactor = THREE.MathUtils.lerp(
      //@ts-ignore
      ref2.current.dispFactor,
      hoveredT ? 1 : 0,
      0.075
    );
  });

  useFrame(() => {
    //@ts-ignore
    ref.current.dispFactor = THREE.MathUtils.lerp(
      //@ts-ignore
      ref.current.dispFactor,
      hovered ? 1 : 0,
      0.075
    );
  });
  return (
    <>
      <mesh
        position={[-1, -0.56, 0]}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        {/* <roundedPlaneGeometry args={[2.25, 4]} /> */}
        <planeGeometry args={[2.25, 4]} />
        {/* @ts-ignore */}

        <imageFadeMaterial
          side={THREE.DoubleSide}
          ref={ref}
          tex={texture1}
          tex2={texture2}
          disp={dispTexture}
          toneMapped={false}
        />
      </mesh>
      <mesh
        position={[1.6, 0.48, -1.04]}
        onPointerOver={(e) => setHoveredT(true)}
        onPointerOut={(e) => setHoveredT(false)}
      >
        {/* @ts-ignore */}
        <roundedPlaneGeometry args={[2.25, 4]} />
        {/* @ts-ignore */}
        <imageFadeMaterial
          side={THREE.DoubleSide}
          ref={ref2}
          tex={texture3}
          tex2={texture4}
          disp={dispTexture2}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export default FadingImageDisplacement;
