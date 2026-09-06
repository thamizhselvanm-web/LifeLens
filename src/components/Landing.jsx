import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ButtonPrimary, ButtonSecondary } from './ui/Button'
import { useLifeStore } from '../store/useLifeStore'

const bootLines = [
  'Initializing human signal sensors...',
  'Analyzing digital metabolism & focus blocks...',
  'Synthesizing vitality & goal horizons...',
  'Bioluminescent observer online ▍'
]

export default function Landing() {
  const [bootIndex, setBootIndex] = useState(0)
  const [bootComplete, setBootComplete] = useState(false)
  const setChapter = useLifeStore((s) => s.setChapter)

  useEffect(() => {
    if (bootIndex < bootLines.length) {
      const timer = setTimeout(() => {
        setBootIndex((prev) => prev + 1)
      }, 900)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setBootComplete(true)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [bootIndex])

  const handleStartExperience = () => {
    setChapter(2)
  }

  const handleOpenOnboarding = () => {
    setChapter(1)
  }

  return (
    <div className="relative min-h-screen bg-abyss text-text-warm overflow-hidden selection:bg-bio-teal/30">
      {/* 1. BOOT SEQUENCE OVERLAY */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-abyss flex flex-col items-center justify-center p-6 font-body text-bio-teal"
          >
            <div className="max-w-xl w-full border border-line bg-panel p-8 rounded-3xl backdrop-blur-xl shadow-glow-teal">
              <div className="flex items-center gap-3 mb-6 border-b border-line/50 pb-4">
                <div className="w-3 h-3 rounded-full bg-coral/80 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-bio-amber/80" />
                <div className="w-3 h-3 rounded-full bg-bio-teal/80" />
                <span className="text-xs text-text-warm/40 font-body ml-auto">LifeLens System v2.5</span>
              </div>

              <div className="min-h-[140px] flex flex-col justify-center">
                {bootLines.slice(0, bootIndex + 1).map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm tracking-wide leading-relaxed py-1.5 flex items-center gap-2"
                  >
                    <span className="text-bio-teal/40 font-bold">&gt;</span>
                    <span className={idx === bootLines.length - 1 ? 'text-bio-teal font-medium' : 'text-text-warm/80'}>
                      {line}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between text-xs text-text-warm/40 pt-4 border-t border-line/30">
                <span>Status: Calibrating</span>
                <span>Bioluminescent Mesh Ready</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. FIXED HERO CONTENT */}
      {bootComplete && (
        <section className="relative z-10 max-w-5xl px-8 pt-24 pb-20 mx-auto">
          {/* Eyebrow pill removed entirely — headline stands alone */}

          <h1 className="font-display text-text-warm text-6xl sm:text-7xl md:text-8xl tracking-tight">
            Observe your life as a{' '}
            <span className="relative inline-block text-white">
              living, reacting
              {/* Clustered accent: stroke underline under "living, reacting" */}
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                <path d="M0,3 Q50,0 100,3" stroke="#5EEAD4" strokeWidth="2" fill="none" opacity="0.7" />
              </svg>
            </span>{' '}
            universe.
          </h1>

          <p className="mt-8 max-w-xl text-lg text-text-warm/70 font-body leading-relaxed text-left">
            Map focus blocks, digital screen consumption, health vitality, and goal
            horizons into a dynamic 3D <span className="text-bio-teal font-medium">bioluminescent mesh</span> that
            pulses with your behavior.
          </p>

          <div className="mt-10 flex items-center gap-4">
            {/* Primary CTA: sharp corners, filled — signals "this is the one action that matters" */}
            <ButtonPrimary onClick={handleStartExperience} data-cursor="clickable">
              Enter 3D Universe
            </ButtonPrimary>

            {/* Secondary: soft rounded, outlined — visually subordinate, no arrow */}
            <ButtonSecondary onClick={handleOpenOnboarding} data-cursor="clickable">
              Calibrate Signals
            </ButtonSecondary>
          </div>

          {/* Asymmetric Panel Layout */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            <div className="glass-panel p-6 rounded-2xl hover:border-bio-teal/40 transition-colors md:col-span-2 text-left">
              <span className="text-xs font-body text-bio-teal uppercase tracking-wider block mb-1">
                Bioluminescent Simulation
              </span>
              <h3 className="text-2xl font-display text-text-warm mb-2">Living WebGL Shader Mesh</h3>
              <p className="text-sm text-text-warm/70 leading-relaxed font-body">
                Your 3D core changes geometry, wireframe state, rotation velocity, and optical emission based on your calculated system stability.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl hover:border-bio-amber/40 transition-colors text-left">
              <span className="text-xs font-body text-bio-amber uppercase tracking-wider block mb-1">
                LENS Intelligence
              </span>
              <h3 className="text-2xl font-display text-text-warm mb-2">Cross-Domain Lines</h3>
              <p className="text-sm text-text-warm/70 leading-relaxed font-body">
                Detects correlations between screen screen consumption and cognitive focus blocks in real-time.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
