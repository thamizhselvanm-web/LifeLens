import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useLifeStore } from '../store/useLifeStore'

export default function LifeCore() {
  const meshRef = useRef()
  const outerRingRef = useRef()
  const stability = useLifeStore((s) => s.stability)
  const setStage = useLifeStore((s) => s.setStage)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    if (meshRef.current) {
      // Unstable state (<55) produces jitter, stable state produces smooth organic pulse
      const wobble = stability > 75 ? 0.02 : stability > 50 ? 0.05 : 0.12
      const pulseSpeed = stability > 75 ? 1.2 : stability > 50 ? 2.0 : 3.5
      
      const scale = 1.3 + Math.sin(t * pulseSpeed) * wobble
      meshRef.current.scale.setScalar(scale)
      meshRef.current.rotation.y = t * (stability > 75 ? 0.15 : 0.45)
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.2
      outerRingRef.current.rotation.x = Math.sin(t * 0.3) * 0.2
    }
  })

  // Color depending on stability level
  const getCoreColor = () => {
    if (stability >= 75) return '#7c9fff' // Core cyan-blue
    if (stability >= 50) return '#facc15' // Learning warning yellow
    return '#fb7185' // High entropy rose-red
  }

  const coreColor = getCoreColor()

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Life Core Geometry */}
      <mesh ref={meshRef} onClick={() => setStage('onboarding')}>
        <icosahedronGeometry args={[1.2, 4]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={stability > 50 ? 1.8 : 2.5}
          wireframe={stability < 50}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Orbiting Gyroscope Halo Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshBasicMaterial color={coreColor} transparent opacity={0.4} />
      </mesh>

      {/* Center Stability HUD Badge */}
      <Html position={[0, -2.2, 0]} center distanceFactor={12}>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-void-card border border-core/30 backdrop-blur-md shadow-glow-core">
            <div
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: coreColor }}
            />
            <span className="text-[11px] font-mono tracking-widest text-slate-200 uppercase">
              STABILITY {stability}%
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}
