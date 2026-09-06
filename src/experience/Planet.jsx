import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useLifeStore } from '../store/useLifeStore'

export default function Planet({ id, name, category, color, emissive, radius, size, speed }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const selectPlanet = useLifeStore((s) => s.selectPlanet)
  const setHoveredPlanet = useLifeStore((s) => s.setHoveredPlanet)
  const selectedPlanet = useLifeStore((s) => s.selectedPlanet)
  const metricValue = useLifeStore((s) => s.metrics[id] || 50)
  
  const isSelected = selectedPlanet === id

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    
    // Orbital movement around center
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(t) * radius
      groupRef.current.position.z = Math.sin(t) * radius
      // Slight vertical floating oscillation
      groupRef.current.position.y = Math.sin(t * 2) * 0.25
    }

    // Self-rotation of planet body
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015
    }
  })

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    setHoveredPlanet(id)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredPlanet(null)
    document.body.style.cursor = 'auto'
  }

  const handleClick = (e) => {
    e.stopPropagation()
    selectPlanet(id)
  }

  // Dynamic planet radius scaled slightly by user metric value
  const displaySize = size * (0.85 + (metricValue / 100) * 0.3)
  const targetScale = hovered || isSelected ? 1.35 : 1.0

  return (
    <group ref={groupRef}>
      <group
        scale={targetScale}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        {/* Planet Sphere Geometry */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[displaySize, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive || color}
            emissiveIntensity={hovered || isSelected ? 1.6 : 0.8}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Outer Atmosphere Glow Shell */}
        <mesh scale={1.2}>
          <sphereGeometry args={[displaySize, 16, 16]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={hovered || isSelected ? 0.35 : 0.12}
          />
        </mesh>

        {/* 3D HTML Label Badge */}
        <Html distanceFactor={11} position={[0, displaySize + 0.5, 0]} center>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 pointer-events-none select-none backdrop-blur-md border ${
              isSelected
                ? 'bg-core/30 border-core text-white shadow-glow-core scale-110'
                : hovered
                ? 'bg-void-card/90 border-white/40 text-white scale-105'
                : 'bg-void-card/70 border-white/10 text-slate-300'
            }`}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            />
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold tracking-wide leading-none">{name}</span>
              <span className="text-[9px] font-mono text-slate-400 mt-0.5">{metricValue}% Signal</span>
            </div>
          </div>
        </Html>
      </group>
    </group>
  )
}
