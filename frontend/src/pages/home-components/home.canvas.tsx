import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sparkles, MeshDistortMaterial } from '@react-three/drei'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

// Create a store for scroll progress that can be accessed from R3F
let scrollProgress = 0

interface GradientOrbProps {
  position: [number, number, number]
  baseColor: string
  scrollColor: string
  scale?: number
  speed?: number
}

function GradientOrb({ position, baseColor, scrollColor, scale = 1, speed = 0.3 }: GradientOrbProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!)
  const initialY = position[1]

  const baseColorObj = useMemo(() => new THREE.Color(baseColor), [baseColor])
  const scrollColorObj = useMemo(() => new THREE.Color(scrollColor), [scrollColor])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.3
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.05
      meshRef.current.rotation.z = clock.getElapsedTime() * 0.03
    }

    // Lerp color based on scroll progress
    if (materialRef.current) {
      const currentColor = baseColorObj.clone().lerp(scrollColorObj, scrollProgress)
      materialRef.current.color = currentColor
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        ref={materialRef}
        color={baseColor}
        distort={0.4}
        speed={1.5}
        roughness={0.2}
        metalness={0.1}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function BackgroundColor() {
  const { scene } = useThree()
  const baseColor = useMemo(() => new THREE.Color('#1a1816'), [])
  const scrollColor = useMemo(() => new THREE.Color('#141210'), [])

  useFrame(() => {
    const currentColor = baseColor.clone().lerp(scrollColor, scrollProgress)
    scene.background = currentColor
  })

  return null
}

function Scene() {
  const orbs = useMemo(() => [
    { position: [-3, 2, -5] as [number, number, number], baseColor: '#d4a574', scrollColor: '#b8956a', scale: 2.5, speed: 0.2 },
    { position: [4, -1, -8] as [number, number, number], baseColor: '#e8d5c4', scrollColor: '#d4c4b4', scale: 3, speed: 0.15 },
    { position: [0, 3, -10] as [number, number, number], baseColor: '#c49a6c', scrollColor: '#a88860', scale: 2, speed: 0.25 },
    { position: [-5, -2, -12] as [number, number, number], baseColor: '#f5f2ed', scrollColor: '#e8e4de', scale: 1.8, speed: 0.18 },
  ], [])

  return (
    <>
      <BackgroundColor />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#d4a574" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#f5f2ed" />

      {orbs.map((orb, i) => (
        <GradientOrb key={i} {...orb} />
      ))}

      <Sparkles
        count={80}
        scale={[20, 20, 20]}
        size={2}
        speed={0.3}
        opacity={0.4}
        color="#d4a574"
      />

      <EffectComposer>
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
        <Noise opacity={0.03} />
      </EffectComposer>
    </>
  )
}

export function HomeCanvas() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress = scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 z-[-10]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
