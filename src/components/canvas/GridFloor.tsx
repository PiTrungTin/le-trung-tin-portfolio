import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  uniform float uTime;
  uniform float uOpacity;
  uniform float uScrollOffset;
  uniform vec3 uCameraPos;

  void main() {
    float scrollSpeed = uScrollOffset * 1.2;
    vec2 gridUv = vUv * 16.0;
    gridUv.y += uTime * 0.18 + scrollSpeed;

    vec2 grid = abs(fract(gridUv - 0.5) - 0.5) / fwidth(gridUv);
    float line = min(grid.x, grid.y);

    vec2 majorUv = vUv * 4.0;
    majorUv.y += uTime * 0.18 + scrollSpeed;
    vec2 majorGrid = abs(fract(majorUv - 0.5) - 0.5) / fwidth(majorUv);
    float majorLine = min(majorGrid.x, majorGrid.y);

    float gridLine = 1.0 - min(line, 1.0);
    float majorGridLine = 1.0 - min(majorLine, 1.0);
    float combinedGrid = gridLine * 0.25 + majorGridLine * 0.75;

    float pulse = 0.82 + 0.18 * sin(uTime * 1.6 + vWorldPosition.z * 0.35);
    float glow = combinedGrid * pulse;

    vec3 viewDir = normalize(uCameraPos - vWorldPosition);
    vec3 normal = vec3(0.0, 1.0, 0.0);
    float fresnel = 1.0 - abs(dot(normal, viewDir));
    float edgeFade = smoothstep(0.3, 1.0, fresnel);
    edgeFade = 0.2 + edgeFade * 0.8;

    vec3 baseColor = vec3(0.42, 0.82, 1.0);
    vec3 edgeColor = vec3(1.0, 0.69, 0.56);
    vec3 color = mix(baseColor, edgeColor, fresnel * 0.25);

    float alpha = glow * uOpacity * edgeFade;

    float distFromCenter = length(vWorldPosition.xz) / 15.0;
    float distFade = 1.0 - smoothstep(0.3, 1.0, distFromCenter);
    alpha *= distFade;

    gl_FragColor = vec4(color, alpha);
  }
`

export function GridFloor() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const scroll = useScroll()
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uOpacity: { value: 0.28 },
    uScrollOffset: { value: 0 },
    uCameraPos: { value: new THREE.Vector3(0, 3, 8) },
  }), [])

  useFrame(({ camera }, delta) => {
    const material = materialRef.current
    material.uniforms.uTime.value += delta
    material.uniforms.uScrollOffset.value = scroll.offset
    material.uniforms.uOpacity.value = 0.28 - scroll.range(0, 1) * 0.1
    material.uniforms.uCameraPos.value.copy(camera.position)
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} scale={[30, 30, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}
