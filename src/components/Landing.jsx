import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ButtonPrimary, ButtonSecondary } from './ui/Button'
import { useLifeStore } from '../store/useLifeStore'
import WaveLoader from './WaveLoader'

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
      {/* 1. BOOT SEQUENCE OVERLAY WITH BIOLUMINESCENT WAVE EFFECT */}
      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-abyss flex flex-col items-center justify-center p-6 font-body text-bio-teal overflow-hidden"
          >
            {/* Fullscreen Canvas Bioluminescent Wave Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
              <WaveLoader variant="full" speed={1.2} height="100%" />
            </div>

            <div className="relative z-10 max-w-xl w-full border border-bio-teal/20 bg-abyss/85 p-8 rounded-3xl backdrop-blur-2xl shadow-[0_0_50px_rgba(94,234,212,0.15)]">
              {/* Header with Liquid Wave Indicator replacing simple dots */}
              <div className="flex items-center gap-3 mb-6 border-b border-line/50 pb-4">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bio-teal opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-bio-teal"></span>
                  </span>
                  <span className="text-xs text-bio-teal/80 font-mono tracking-wider ml-1">WAVE FREQUENCY SYNCHRONIZED</span>
                </div>
                <span className="text-xs text-text-warm/40 font-body ml-auto">LifeLens System v2.5</span>
              </div>

              {/* Animated Wave Bar */}
              <div className="mb-6">
                <WaveLoader variant="wave-bar" className="w-full shadow-[0_0_12px_rgba(94,234,212,0.4)]" />
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
                    <span className="text-bio-teal/60 font-bold">&gt;</span>
                    <span className={idx === bootLines.length - 1 ? 'text-bio-teal font-medium drop-shadow-[0_0_8px_rgba(94,234,212,0.5)]' : 'text-text-warm/80'}>
                      {line}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between text-xs text-text-warm/50 pt-4 border-t border-line/30">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-bio-teal animate-pulse" />
                  Wave Calibration Active
                </span>
                <span>Bioluminescent Wave Mesh Ready</span>
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
