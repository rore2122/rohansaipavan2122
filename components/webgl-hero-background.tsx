"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float uTime;
  uniform vec2 uMouse;

  uniform vec3 uColorBase;
  uniform vec3 uColorNavy;
  uniform vec3 uColorCrimson;

  varying vec2 vUv;

  vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
  }

  vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 1.0) * x);
  }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
     -0.577350269189626,
      0.024390243902439
    );

    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    i = mod289(i);

    vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0)) +
      i.x + vec3(0.0, i1.x, 1.0)
    );

    vec3 m = max(
      0.5 - vec3(
        dot(x0, x0),
        dot(x12.xy, x12.xy),
        dot(x12.zw, x12.zw)
      ),
      0.0
    );

    m *= m;
    m *= m;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;

    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    float t = uTime * 0.045;

    vec2 pos = uv * 2.4;
    pos.x += t;

    float d = distance(uv, uMouse);

    pos += (uv - uMouse) * smoothstep(0.55, 0.0, d) * 0.5;

    float n1 = snoise(pos + t);
    float n2 = snoise(pos * 1.7 - t * 1.2 + n1 * 0.6);
    float n3 = snoise(pos * 0.7 + n2 * 0.4 - t * 0.6);

    float blendNavy = smoothstep(0.05, 0.85, n2);
    float blendCrimson = smoothstep(0.25, 0.95, n3);

    vec3 color = uColorBase;

    color = mix(color, uColorNavy, blendNavy * 0.30);
    color = mix(color, uColorCrimson, blendCrimson * 0.14);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const { viewport } = useThree();

  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      targetMouse.current.set(
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight
      );
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorBase: { value: new THREE.Color("#e7e9ec") },
      uColorNavy: { value: new THREE.Color("#102a4c") },
      uColorCrimson: { value: new THREE.Color("#b51218") },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) {
      return;
    }

    mouse.current.lerp(targetMouse.current, 0.025);

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    (materialRef.current.uniforms.uMouse.value as THREE.Vector2).copy(
      mouse.current
    );
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function WebGLHeroBackground() {
  const [ready, setReady] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    setTouchDevice(window.matchMedia("(pointer: coarse)").matches);

    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  /*
   * MOBILE / TABLET
   *
   * Uses the CSS cinematic animation instead of WebGL.
   * IMPORTANT: this div must NOT use the "webgl-hero-background"
   * class, because the CSS hides that class on phones.
   * With Reduce Motion on, it still renders (static, via "is-reduced").
   */
  if (touchDevice) {
    return (
      <div
        className={`mobile-cinematic-background${
          reduced ? " is-reduced" : ""
        }`}
        aria-hidden="true"
      >
        <div className="mobile-cinematic-orb orb-one" />
        <div className="mobile-cinematic-orb orb-two" />
        <div className="mobile-cinematic-orb orb-three" />
        <div className="mobile-cinematic-noise" />
      </div>
    );
  }

  /*
   * DESKTOP with Reduce Motion: skip the heavy shader.
   */
  if (reduced) {
    return null;
  }

  /*
   * DESKTOP: WebGL cinematic background.
   */
  return (
    <div className="webgl-hero-background" aria-hidden="true">
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
