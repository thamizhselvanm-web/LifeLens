import { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Sparkles, X, Star, Filter, ArrowLeft, ArrowRight, Zap, Layers } from 'lucide-react'
import { useLifeStore } from '../store/useLifeStore'

const CATEGORY_COLORS = {
  Focus: { main: '#5EEAD4', glow: 'rgba(94, 234, 212, 0.6)', label: 'Cognitive Depth' },
  Digital: { main: '#38BDF8', glow: 'rgba(56, 189, 248, 0.6)', label: 'Information Orbit' },
  Vitality: { main: '#4ADE80', glow: 'rgba(74, 222, 128, 0.6)', label: 'Biometric Core' },
  Learning: { main: '#F0B86E', glow: 'rgba(240, 184, 110, 0.6)', label: 'Intellectual Spark' },
  Goals: { main: '#FB7185', glow: 'rgba(251, 113, 133, 0.6)', label: 'Horizon Vector' },
  Balance: { main: '#C084FC', glow: 'rgba(192, 132, 252, 0.6)', label: 'Life Harmony' }
}

function StarNode({ star, onSelect, isSelected, isFilteredOut }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.4
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    }
  })

  const catInfo = CATEGORY_COLORS[star.category] || CATEGORY_COLORS.Focus
  const color = catInfo.main

  const opacity = isFilteredOut ? 0.15 : 1.0
  const scale = isSelected ? 1.6 : hovered ? 1.4 : 1.0

  return (
    <group position={star.pos}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          if (!isFilteredOut) onSelect(star)
        }}
        onPointerOver={() => !isFilteredOut && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 3.0 : hovered ? 2.2 : 1.4}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* HTML Label on 3D Star Node */}
      {!isFilteredOut && (
        <Html distanceFactor={14} position={[0, 0.65, 0]} center zIndexRange={[100, 0]}>
          <div
            onClick={(e) => {
              e.stopPropagation()
              onSelect(star)
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer pointer-events-auto select-none ${
              isSelected
                ? 'bg-bio-teal text-abyss font-bold shadow-[0_0_15px_rgba(94,234,212,0.8)] scale-110'
                : hovered
                ? 'bg-panel/90 text-white border border-bio-teal/50 shadow-lg scale-105'
                : 'bg-abyss/80 text-text-warm/80 border border-white/10 backdrop-blur-md'
            }`}
          >
            {star.name}
          </div>
        </Html>
      )}
    </group>
  )
}

function ConstellationScene({ stars, selectedStar, setSelectedStar, activeCategory }) {
  const categories = Object.keys(CATEGORY_COLORS)

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#5EEAD4" />
      <pointLight position={[10, 10, 10]} intensity={1.0} color="#38BDF8" />

      {/* Background Deep Space Particles */}
      <Sparkles count={120} scale={20} size={2} speed={0.4} color="#5EEAD4" opacity={0.5} />

      {/* Render Star Nodes */}
      {stars.map((star) => {
        const isFilteredOut = activeCategory !== 'All' && star.category !== activeCategory
        return (
          <StarNode
            key={star.id}
            star={star}
            onSelect={setSelectedStar}
            isSelected={selectedStar?.id === star.id}
            isFilteredOut={isFilteredOut}
          />
        )
      })}

      {/* Render Constellation Lines between stars of the same category */}
      {categories.map((cat) => {
        const catStars = stars.filter((s) => s.category === cat)
        if (catStars.length < 2) return null

        const isFilteredOut = activeCategory !== 'All' && activeCategory !== cat
        if (isFilteredOut) return null

        // Connect points in spatial sequence
        const linePoints = catStars.map((s) => s.pos)
        const lineColor = CATEGORY_COLORS[cat]?.main || '#5EEAD4'

        return (
          <Line
            key={cat}
            points={linePoints}
            color={lineColor}
            lineWidth={1.8}
            transparent
            opacity={0.45}
            dashed
            dashScale={6}
          />
        )
      })}

      <OrbitControls
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        dampingFactor={0.05}
        minDistance={8}
        maxDistance={22}
      />

      <EffectComposer disableNormalPass>
        <Bloom intensity={0.8} luminanceThreshold={0.2} mipmapBlur />
      </EffectComposer>
    </>
  )
}

export default function ConstellationAtlas() {
  const stars = useLifeStore((s) => s.constellationStars)
  const setChapter = useLifeStore((s) => s.setChapter)
  const [selectedStar, setSelectedStar] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Focus', 'Digital', 'Vitality', 'Learning', 'Goals', 'Balance']

  const filteredStarsCount = useMemo(() => {
    if (activeCategory === 'All') return stars.length
    return stars.filter((s) => s.category === activeCategory).length
  }, [stars, activeCategory])

  return (
    <div className="relative w-full h-screen bg-abyss text-text-warm overflow-hidden selection:bg-bio-teal/30">
      {/* 3D WebGL Canvas */}
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <color attach="background" args={['#090D14']} />
        <ConstellationScene
          stars={stars}
          selectedStar={selectedStar}
          setSelectedStar={setSelectedStar}
          activeCategory={activeCategory}
        />
      </Canvas>

      {/* Header Overlay - Positioned safely below Navigation bar */}
      <header className="absolute top-20 sm:top-24 left-6 sm:left-10 z-20 pointer-events-auto max-w-lg">
        <span className="text-xs font-mono tracking-widest text-bio-teal/90 uppercase block mb-1 drop-shadow-[0_0_6px_rgba(94,234,212,0.4)]">
          CHAPTER 4 OF 5 — CONSTELLATION ATLAS
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-text-warm tracking-tight">
          Living Signal Sky
        </h1>
        <p className="text-xs text-text-warm/70 font-sans mt-1.5 leading-relaxed">
          Interactive celestial map linking your verified achievements into bioluminescent domain constellations.
        </p>

        {/* Category Filter Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            const catColor = CATEGORY_COLORS[cat]?.main || '#5EEAD4'
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-bio-teal text-abyss font-bold shadow-[0_0_12px_rgba(94,234,212,0.5)]'
                    : 'bg-panel/70 border border-line text-text-warm/60 hover:text-text-warm hover:border-bio-teal/40'
                }`}
                style={isActive && cat !== 'All' ? { backgroundColor: catColor, color: '#090D14' } : {}}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </header>

      {/* Selected Star Details Sidebar Panel - Positioned top right below nav */}
      {selectedStar && (
        <div className="absolute top-20 sm:top-24 right-6 sm:right-10 z-30 w-full max-w-sm glass-panel p-6 rounded-2xl border border-bio-teal/30 shadow-[0_0_40px_rgba(94,234,212,0.15)] pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-md"
                style={{ backgroundColor: CATEGORY_COLORS[selectedStar.category]?.main || '#5EEAD4' }}
              />
              <span className="text-xs font-mono text-bio-teal uppercase tracking-wider">
                {selectedStar.category} STAR
              </span>
            </div>
            <button
              onClick={() => setSelectedStar(null)}
              className="p-1 rounded-lg text-text-warm/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-xl font-serif text-text-warm leading-snug">{selectedStar.name}</h3>

          <div className="mt-2 text-xs text-text-warm/60 font-mono">
            Logged: <span className="text-text-warm/90">{selectedStar.date}</span>
          </div>

          {selectedStar.summary && (
            <p className="mt-3 text-xs text-text-warm/80 font-sans leading-relaxed border-t border-line/30 pt-3">
              {selectedStar.summary}
            </p>
          )}

          {/* Impact Metric Badge & Progress */}
          <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between">
            <span className="text-xs text-text-warm/60 font-sans">Signal Velocity:</span>
            <span className="text-xs font-mono font-bold text-bio-teal bg-bio-teal/10 px-2.5 py-1 rounded-md border border-bio-teal/30">
              {selectedStar.impact || `+${selectedStar.val}% Index`}
            </span>
          </div>

          <div className="mt-3 w-full bg-abyss/80 h-1.5 rounded-full overflow-hidden border border-line/30">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${selectedStar.val}%`,
                backgroundColor: CATEGORY_COLORS[selectedStar.category]?.main || '#5EEAD4'
              }}
            />
          </div>
        </div>
      )}

      {/* Chapter Navigation Footer - Positioned safely at bottom */}
      <footer className="absolute bottom-6 left-6 sm:left-10 right-6 sm:right-10 z-20 flex flex-wrap justify-between items-center pointer-events-auto gap-4">
        <button
          onClick={() => setChapter(3)}
          className="text-xs font-body text-text-warm/60 hover:text-bio-teal transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Chapter 3: Signal Log</span>
        </button>

        <div className="text-xs font-mono text-text-warm/40 hidden md:block">
          Showing {filteredStarsCount} of {stars.length} Constellation Nodes
        </div>

        <button
          onClick={() => setChapter(5)}
          className="px-5 py-2.5 rounded-xl bg-bio-teal text-abyss font-body font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(94,234,212,0.4)] hover:opacity-95 transition-all"
        >
          <span>Continue to Chapter 5: Universe Digest</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </footer>
    </div>
  )
}
