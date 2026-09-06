import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import LifeCore from './LifeCore'
import Planet from './Planet'
import Orbit from './Orbit'
import CameraRig from './CameraRig'
import ParticleField from './ParticleField'
import InsightLines from './InsightLines'
import { PLANETS } from '../data/planets'
import { useLifeStore } from '../store/useLifeStore'

export default function Universe() {
  const selectPlanet = useLifeStore((s) => s.selectPlanet)
  const selectedPlanet = useLifeStore((s) => s.selectedPlanet)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full bg-abyss">
      <Canvas
        camera={{
          position: isMobile ? [0, 5, 18] : [0, 3, 14],
          fov: isMobile ? 55 : 45
        }}
        onPointerMissed={() => {
          if (selectedPlanet) selectPlanet(null)
        }}
        gl={{ antialias: true, alpha: false }}
      >
        {/* Background cosmic color */}
        <color attach="background" args={['#090D14']} />
        <fog attach="fog" args={['#090D14', 18, 50]} />

        {/* Ambient & Point Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#5EEAD4" distance={16} />
        <pointLight position={[12, 10, 10]} intensity={1.2} color="#E8A669" />
        <pointLight position={[-12, -8, -10]} intensity={1.0} color="#5EEAD4" />

        {/* 3D Scene Components */}
        <LifeCore />

        {/* Dynamic Planetary System */}
        {PLANETS.map((planet) => (
          <group key={planet.id}>
            <Orbit radius={planet.radius} color={planet.color} />
            <Planet {...planet} />
          </group>
        ))}

        <InsightLines />
        <ParticleField count={isMobile ? 600 : 2000} />
        <CameraRig />

        {/* Touch & Gesture Damped Orbit Controls */}
        <OrbitControls
          enablePan={false}
          maxDistance={isMobile ? 28 : 22}
          minDistance={3.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 6}
          rotateSpeed={isMobile ? 0.8 : 0.6}
          zoomSpeed={0.8}
          touchAction="none"
        />

        {/* Postprocessing Bloom Pipeline */}
        <EffectComposer disableNormalPass>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur={!isMobile} // GPU optimization on mobile
          />
          <Vignette eskil={false} offset={0.1} darkness={0.65} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
