import { motion, AnimatePresence } from 'framer-motion'
import { Sliders, X, Sparkles, Zap, Orbit } from 'lucide-react'
import { ButtonPrimary, ButtonSecondary } from './ui/Button'
import { useLifeStore } from '../store/useLifeStore'
import { PLANETS } from '../data/planets'

const PRESETS = [
  {
    name: 'High Focus Flow',
    description: 'High cognitive depth, low digital noise, balanced health.',
    metrics: { focus: 85, learning: 80, digital: 30, health: 75, goals: 70, balance: 75 }
  },
  {
    name: 'Digital Over-Orbit',
    description: 'Elevated screen time, fragmented attention, recovery drain.',
    metrics: { focus: 35, learning: 50, digital: 88, health: 45, goals: 40, balance: 35 }
  },
  {
    name: 'Strategic Goal Surge',
    description: 'Peak execution velocity, high learning, health warning.',
    metrics: { focus: 75, learning: 85, digital: 45, health: 50, goals: 92, balance: 55 }
  },
  {
    name: 'Circadian Peak',
    description: 'Optimal life integration across all 6 planetary vectors.',
    metrics: { focus: 80, learning: 85, digital: 35, health: 90, goals: 80, balance: 85 }
  }
]

export default function Onboarding() {
  const stage = useLifeStore((s) => s.stage)
  const setChapter = useLifeStore((s) => s.setChapter)
  const metrics = useLifeStore((s) => s.metrics)
  const setMetric = useLifeStore((s) => s.setMetric)
  const updateMetrics = useLifeStore((s) => s.updateMetrics)
  const userName = useLifeStore((s) => s.userName)
  const setUserName = useLifeStore((s) => s.setUserName)

  if (stage !== 'onboarding') return null

  return (
    <div className="relative min-h-screen bg-abyss text-text-warm px-4 sm:px-8 py-24 max-w-4xl mx-auto overflow-y-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-line shadow-2xl relative">
        {/* Title Header */}
        <div className="flex items-center justify-between border-b border-line/50 pb-6">
          <div>
            <span className="text-xs font-body tracking-widest text-bio-teal uppercase">
              CHAPTER 1 OF 5
            </span>
            <h2 className="text-3xl sm:text-5xl font-display text-text-warm mt-1">Signal Calibration</h2>
            <p className="text-sm text-text-warm/60 font-body mt-1">Configure your 3D human baseline signal metabolism.</p>
          </div>

          <button
            onClick={() => setChapter(2)}
            className="p-2 rounded-full bg-panel border border-line text-text-warm/60 hover:text-text-warm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Call-sign */}
        <div className="mt-8">
          <label className="block text-xs font-body text-text-warm/60 uppercase tracking-wider mb-2">
            Observer Identity Call-sign
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-abyss border border-line text-text-warm font-body focus:outline-none focus:border-bio-teal"
            placeholder="Enter call-sign..."
          />
        </div>

        {/* Presets */}
        <div className="mt-8">
          <label className="block text-xs font-body text-text-warm/60 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-bio-amber" />
            Quick Simulation Presets
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateMetrics(preset.metrics)}
                className="p-4 rounded-xl bg-panel hover:bg-panel/80 border border-line hover:border-bio-teal/50 text-left transition-all group"
              >
                <div className="font-semibold text-xs text-text-warm group-hover:text-bio-teal flex items-center justify-between">
                  <span>{preset.name}</span>
                  <Sparkles className="w-3.5 h-3.5 text-text-warm/40 group-hover:text-bio-teal" />
                </div>
                <p className="text-xs text-text-warm/60 mt-1 font-body">{preset.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="mt-8 space-y-4">
          <label className="block text-xs font-body text-text-warm/60 uppercase tracking-wider">
            Manual Domain Calibration
          </label>

          {PLANETS.map((planet) => (
            <div key={planet.id} className="p-4 rounded-xl bg-abyss border border-line">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: planet.color, boxShadow: `0 0 8px ${planet.color}` }}
                  />
                  <span className="text-sm font-semibold text-text-warm">{planet.name}</span>
                  <span className="text-xs text-text-warm/50 font-body">({planet.category})</span>
                </div>
                <span className="text-xs font-body font-bold text-bio-teal">
                  {metrics[planet.id]}%
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="99"
                value={metrics[planet.id]}
                onChange={(e) => setMetric(planet.id, e.target.value)}
                className="w-full h-1.5 bg-panel rounded-lg appearance-none cursor-pointer accent-bio-teal"
              />
            </div>
          ))}
        </div>

        {/* Complete CTA */}
        <div className="mt-10 pt-6 border-t border-line/50 flex justify-end gap-4">
          <ButtonSecondary onClick={() => setChapter(0)}>
            Back to Chapter 0
          </ButtonSecondary>

          <ButtonPrimary onClick={() => setChapter(2)}>
            Synthesize & Enter 3D Universe
          </ButtonPrimary>
        </div>
      </div>
    </div>
  )
}
