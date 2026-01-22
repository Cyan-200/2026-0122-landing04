import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface GradientBackgroundProps {
  colorA?: string
  colorB?: string
  colorC?: string
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    // Animated gradient with subtle movement
    float t = vUv.y + sin(vUv.x * 2.0 + uTime * 0.2) * 0.05;
    
    vec3 color;
    if (t < 0.5) {
      color = mix(uColorA, uColorB, t * 2.0);
    } else {
      color = mix(uColorB, uColorC, (t - 0.5) * 2.0);
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`

export function GradientBackground({
  colorA = '#0a0a0f',
  colorB = '#1a1a2e',
  colorC = '#16213e',
}: GradientBackgroundProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uColorA: { value: new THREE.Color(colorA) },
          uColorB: { value: new THREE.Color(colorB) },
          uColorC: { value: new THREE.Color(colorC) },
          uTime: { value: 0 },
        }}
      />
    </mesh>
  )
}
