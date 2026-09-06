import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 2000 }) {
  const pointsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    
    const palette = [
      new THREE.Color('#7c9fff'),
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#facc15'),
      new THREE.Color('#ffffff')
    ]

    for (let i = 0; i < count; i++) {
      // Random position within a sphere of radius 35
      const radius = 5 + Math.random() * 30
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)

      const color = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }

    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02
      pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.01) * 0.01
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
