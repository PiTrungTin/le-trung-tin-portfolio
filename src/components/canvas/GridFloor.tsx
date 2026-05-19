import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vPosition = position;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uScrollOffset;
  uniform vec3 uCameraPos;

  void main() {
    // Scrolling UV offset (Tron-like movement toward camera)
    float scrollSpeed = uScrollOffset * 2.0;
    vec2 gridUv = vUv * 20.0;
    gridUv.y += uTime * 0.3 + scrollSpeed;

    // Grid lines
    vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
    float line = min(grid.x, grid.y);

    // Thicker major grid lines (every 5)
    vec2 majorUv = vUv * 4.0;
    majorUv.y += uTime * 0.3 + scrollSpeed;
    vec2 majorGrid = abs(fract(majorUv - 0.5) - 0.5) / fwidth(majorUv);
    float majorLine = min(majorGrid.x, majorGrid.y);

    // Combine lines with different weights
    float gridLine = 1.0 - min(line, 1.0);
    float majorGridLine = 1.0 - min(majorLine, 1.0);
    float combinedGrid = gridLine * 0.3 + majorGridLine * 0.7;

    // Pulsing glow
    float pulse = 0.7 + 0.3 * sin(uTime * 2.0 + vWorldPosition.z * 0.5);
    float glow = combinedGrid * pulse;

    // Fresnel edge fade (fade out at edges)
    vec3 viewDir = normalize(uCameraPos - vWorldPosition);
    vec3 normal = vec3(0.0, 1.0, 0.0);
    float fresnel = 1.0 - abs(dot(normal, viewDir));
    float edgeFade = smoothstep(0.3, 1.0, fresnel);
    edgeFade = 0.3 + edgeFade * 0.7; // Never fully transparent in center

    // Color: neon cyan with slight magenta tint at edges
    vec3 baseColor = vec3(0.0, 1.0, 1.0); // cyan
    vec3 edgeColor = vec3(1.0, 0.0, 1.0); // magenta
    vec3 color = mix(baseColor, edgeColor, fresnel * 0.3);

    float alpha = glow * uOpacity * edgeFade;

    // Fade grid based on distance from center
    float distFromCenter = length(vWorldPosition.xz) / 15.0;
    float distFade = 1.0 - smoothstep(0.3, 1.0, distFromCenter);
    alpha *= distFade;

    gl_FragColor = vec4(color, alpha);
  }
`

export function GridFloor() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const scroll = useScroll()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 0.6 },
    uScrollOffset: { value: 0 },
    uCameraPos: { value: new THREE.Vector3(0, 3, 8) },
  }), [])

  useFrame(({ camera }, delta) => {
    uniforms.uTime.value += delta
    uniforms.uScrollOffset.value = scroll.offset

    const sectionProgress = scroll.range(0, 1)
    // Fade grid slightly as user scrolls deeper
    uniforms.uOpacity.value = 0.6 - sectionProgress * 0.3

    uniforms.uCameraPos.value.copy(camera.position)
  })

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
      scale={[30, 30, 1]}
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
