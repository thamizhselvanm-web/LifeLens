import { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Line, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { X, Star, ArrowLeft, ArrowRight, Filter, Sparkles as SparklesIcon } from 'lucide-react'
import { useLifeStore } from '../store/useLifeStore'

const CATEGORY_COLORS = {
  Focus: { main: '#5EEAD4', border: 'border-[#5EEAD4]', bg: 'bg-[#5EEAD4]/10', text: 'text-[#5EEAD4]', label: 'Cognitive Depth' },
  Digital: { main: '#38BDF8', border: 'border-[#38BDF8]', bg: 'bg-[#38BDF8]/10', text: 'text-[#38BDF8]', label: 'Information Orbit' },
  Vitality: { main: '#4ADE80', border: 'border-[#4ADE80]', bg: 'bg-[#4ADE80]/10', text: 'text-[#4ADE80]', label: 'Biometric Health' },
  Learning: { main: '#F0B86E', border: 'border-[#F0B86E]', bg: 'bg-[#F0B86E]/10', text: 'text-[#F0B86E]', label: 'Intellectual Growth' },
  Goals: { main: '#FB7185', border: 'border-[#FB7185]', bg: 'bg-[#FB7185]/10', text: 'text-[#FB7185]', label: 'Strategic Horizon' },
  Balance: { main: '#C084FC', border: 'border-[#C084FC]', bg: 'bg-[#C084FC]/10', text: 'text-[#C084FC]', label: 'Life Harmony' }
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
  const scale = isSelected ? 1.7 : hovered ? 1.45 : 1.1

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
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isSelected ? 3.5 : hovered ? 2.5 : 1.5}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* HTML Star Badge Tag on 3D Canvas Node */}
      {!isFilteredOut && (
        <Html distanceFactor={14} position={[0, 0.7, 0]} center zIndexRange={[100, 0]}>
          <div
            onClick={(e) => {
              e.stopPropagation()
              onSelect(star)
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-body whitespace-nowrap transition-all cursor-pointer pointer-events-auto select-none shadow-lg ${
              isSelected
                ? 'bg-bio-teal text-abyss font-bold border-2 border-white shadow-[0_0_20px_rgba(94,234,212,0.9)] scale-110'
                : hovered
                ? 'bg-panel text-white border border-bio-teal shadow-[0_0_12px_rgba(94,234,212,0.4)] scale-105'
                : 'bg-abyss/90 text-text-warm border border-line backdrop-blur-md hover:border-bio-teal/50'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
              <span className="font-medium tracking-wide">{star.name}</span>
            </div>
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
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#5EEAD4" />
      <pointLight position={[12, 12, 12]} intensity={1.2} color="#38BDF8" />

      {/* 3D Deep Space Sparkles */}
      <Sparkles count={140} scale={24} size={2.5} speed={0.4} color="#5EEAD4" opacity={0.6} />

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

        const linePoints = catStars.map((s) => s.pos)
        const lineColor = CATEGORY_COLORS[cat]?.main || '#5EEAD4'

        return (
          <Line
            key={cat}
            points={linePoints}
            color={lineColor}
            lineWidth={2.0}
            transparent
            opacity={0.5}
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
        <Bloom intensity={0.9} luminanceThreshold={0.2} mipmapBlur />
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
    <div className="relative min-h-screen w-full bg-abyss text-text-warm overflow-hidden flex flex-col font-body selection:bg-bio-teal/30">
      {/* 1. Header Container - Placed below top fixed navbar with pt-24 clearance */}
      <div className="relative z-20 pt-24 px-4 sm:px-8 max-w-7xl w-full mx-auto pointer-events-auto">
        <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-line/60 bg-abyss/85 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-bio-teal animate-ping" />
              <span className="text-xs font-body tracking-widest text-bio-teal uppercase font-semibold">
                CHAPTER 4 OF 5 — CONSTELLATION ATLAS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display text-text-warm mt-1">
              Personal Signal Sky
            </h1>
            <p className="text-xs text-text-warm/60 font-body mt-1 max-w-md">
              Living 3D map connecting your verified personal achievements into glowing domain constellations.
            </p>
          </div>

          {/* Domain Category Filter Pills with Vibrant Colors */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              const catInfo = CATEGORY_COLORS[cat]
              const catColor = catInfo?.main || '#5EEAD4'

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-body transition-all duration-300 ${
                    isActive
                      ? 'bg-bio-teal text-abyss font-bold shadow-[0_0_16px_rgba(94,234,212,0.6)] scale-105'
                      : 'bg-panel/80 border border-line text-text-warm/70 hover:text-text-warm hover:border-bio-teal/40'
                  }`}
                  style={isActive && cat !== 'All' ? { backgroundColor: catColor, color: '#090D14' } : {}}
                >
                  {cat === 'All' ? '✨ All Domain Stars' : cat}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. 3D WebGL Canvas Layer - Fills background below header */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <color attach="background" args={['#090D14']} />
          <ConstellationScene
            stars={stars}
            selectedStar={selectedStar}
            setSelectedStar={setSelectedStar}
            activeCategory={activeCategory}
          />
        </Canvas>
      </div>

      {/* 3. Selected Star Card Modal - Floating bottom-right */}
      {selectedStar && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-30 w-full max-w-sm glass-panel p-6 rounded-3xl border border-bio-teal/40 bg-abyss/90 backdrop-blur-2xl shadow-[0_0_50px_rgba(94,234,212,0.2)] pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shadow-md animate-pulse"
                style={{ backgroundColor: CATEGORY_COLORS[selectedStar.category]?.main || '#5EEAD4' }}
              />
              <span className="text-xs font-body font-semibold text-bio-teal uppercase tracking-wider">
                {CATEGORY_COLORS[selectedStar.category]?.label || selectedStar.category}
              </span>
            </div>
            <button
              onClick={() => setSelectedStar(null)}
              className="p-1 rounded-xl text-text-warm/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-xl font-display text-text-warm leading-snug">{selectedStar.name}</h3>

          <div className="mt-1.5 text-xs text-text-warm/60 font-body">
            Logged: <span className="text-text-warm/90 font-medium">{selectedStar.date}</span>
          </div>

          {selectedStar.summary && (
            <p className="mt-3 text-xs text-text-warm/80 font-body leading-relaxed border-t border-line/30 pt-3">
              {selectedStar.summary}
            </p>
          )}

          {/* Signal Impact Badge & Progress Bar */}
          <div className="mt-4 pt-3 border-t border-line/40 flex items-center justify-between">
            <span className="text-xs text-text-warm/60 font-body">Signal Impact:</span>
            <span className="text-xs font-mono font-bold text-bio-teal bg-bio-teal/15 px-3 py-1 rounded-lg border border-bio-teal/30">
              {selectedStar.impact || `+${selectedStar.val}% Index`}
            </span>
          </div>

          <div className="mt-3 w-full bg-abyss/80 h-2 rounded-full overflow-hidden border border-line/30">
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

      {/* 4. Bottom Navigation Footer Bar */}
      <footer className="fixed bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20 flex flex-wrap justify-between items-center pointer-events-auto gap-4">
        <button
          onClick={() => setChapter(3)}
          className="px-4 py-2.5 rounded-xl bg-panel border border-line/60 text-xs font-body text-text-warm/80 hover:text-white hover:border-bio-teal/50 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Chapter 3: Signal Log</span>
        </button>

        <div className="text-xs font-body text-text-warm/50 bg-panel/80 px-4 py-2 rounded-full border border-line/40 hidden md:block">
          Showing {filteredStarsCount} of {stars.length} Constellation Nodes • Click any star node to inspect details
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
