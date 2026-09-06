import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Sparkles, X, Compass, Star } from 'lucide-react'
import { useLifeStore } from '../store/useLifeStore'

function StarNode({ id, name, category, val, pos, date, onSelect, isSelected }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  const getStarColor = () => {
    if (category === 'Focus') return '#5EEAD4'
    if (category === 'Learning') return '#F0B86E'
    if (category === 'Digital') return '#38BDF8'
    if (category === 'Vitality') return '#4ADE80'
    return '#F4776E'
  }

  const color = getStarColor()

  return (
    <group position={pos}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect({ id, name, category, val, pos, date })
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={isSelected || hovered ? 1.5 : 1.0}
      >
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected || hovered ? 2.5 : 1.2}
        />
      </mesh>

      <Html distanceFactor={15} position={[0, 0.6, 0]} center>
        <div
          className={`px-2.5 py-1 rounded-lg text-[10px] font-sans transition-all pointer-events-none ${
            isSelected
              ? 'bg-bio-cyan text-abyss font-bold shadow-glow-cyan scale-110'
              : hovered
              ? 'bg-kelp text-white border border-white/20'
              : 'bg-abyss/80 text-mist/70 border border-white/10'
          }`}
        >
          {name}
        </div>
      </Html>
    </group>
  )
}

function ConstellationScene({ stars, selectedStar, setSelectedStar }) {
  // Group stars by category to render constellation lines
  const categories = ['Focus', 'Digital', 'Vitality', 'Learning', 'Goals']
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#5EEAD4" />

      {/* Render Star Nodes */}
      {stars.map((star) => (
        <StarNode
          key={star.id}
          {...star}
          onSelect={setSelectedStar}
          isSelected={selectedStar?.id === star.id}
        />
      ))}

      {/* Render Constellation Lines connecting stars of the same category */}
      {categories.map((cat) => {
        const catStars = stars.filter((s) => s.category === cat)
        if (catStars.length < 2) return null
        
        const linePoints = catStars.map((s) => s.pos)
        const lineColor = cat === 'Focus' ? '#5EEAD4' : cat === 'Learning' ? '#F0B86E' : cat === 'Digital' ? '#38BDF8' : '#4ADE80'

        return (
          <Line
            key={cat}
            points={linePoints}
            color={lineColor}
            lineWidth={1.5}
            transparent
            opacity={0.4}
            dashed
            dashScale={8}
          />
        )
      })}

      <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.4} dampingFactor={0.05} />

      <EffectComposer disableNormalPass>
        <Bloom intensity={0.7} luminanceThreshold={0.2} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function ConstellationAtlas() {
  const stars = useLifeStore((s) => s.constellationStars)
  const setChapter = useLifeStore((s) => s.setChapter)
  const [selectedStar, setSelectedStar] = useState(null)

  return (
    <div className="relative w-full h-screen bg-abyss text-mist overflow-hidden">
      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
        <color attach="background" args={['#0B1220']} />
        <ConstellationScene stars={stars} selectedStar={selectedStar} setSelectedStar={setSelectedStar} />
      </Canvas>

      {/* Header Overlay */}
      <header className="absolute top-6 left-6 z-20 pointer-events-auto">
        <span className="text-xs font-sans tracking-widest text-bio-cyan/80 uppercase block">
          CHAPTER 4 OF 5
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif text-white mt-0.5">
          Constellation Atlas
        </h1>
        <p className="text-xs text-mist/60 font-sans mt-1 max-w-sm">
          A full-screen sky of your logged achievements, grouped into living constellations.
        </p>
      </header>

      {/* Selected Star Details Card */}
      {selectedStar && (
        <div className="absolute bottom-24 left-6 z-30 w-full max-w-sm glass-panel p-5 rounded-2xl border border-bio-cyan/30 shadow-glow-cyan pointer-events-auto">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-bio-amber" />
              <span className="text-xs font-sans text-bio-cyan uppercase">{selectedStar.category} Star</span>
            </div>
            <button onClick={() => setSelectedStar(null)} className="p-1 text-mist/50 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-serif text-white mt-3">{selectedStar.name}</h3>
          <p className="text-xs text-mist/70 mt-1">Logged on {selectedStar.date} with a signal index of <strong className="text-white">{selectedStar.val}%</strong>.</p>
        </div>
      )}

      {/* Chapter Navigation Footer */}
      <footer className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center pointer-events-auto">
        <button
          onClick={() => setChapter(3)}
          className="text-xs font-sans text-mist/60 hover:text-white transition-colors"
        >
          &larr; Back to Chapter 3: Signal Log
        </button>

        <button
          onClick={() => setChapter(5)}
          className="px-6 py-3 rounded-xl bg-bio-cyan text-abyss font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-glow-cyan hover:opacity-90 transition-all"
        >
          <span>Continue to Chapter 5: Universe Digest</span>
          &rarr;
        </button>
      </footer>
    </div>
  )
}
