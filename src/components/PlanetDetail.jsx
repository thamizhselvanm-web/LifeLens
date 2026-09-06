import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Sliders, TrendingUp, CheckCircle2, Zap, BrainCircuit, Smartphone, Activity, Target, Compass } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { useLifeStore } from '../store/useLifeStore'
import { PLANETS } from '../data/planets'

const iconMap = {
  BrainCircuit,
  Smartphone,
  Activity,
  Sparkles,
  Target,
  Compass
}

export default function PlanetDetail() {
  const selectedPlanetId = useLifeStore((s) => s.selectedPlanet)
  const selectPlanet = useLifeStore((s) => s.selectPlanet)
  const metrics = useLifeStore((s) => s.metrics)
  const setMetric = useLifeStore((s) => s.setMetric)

  if (!selectedPlanetId) return null

  const planet = PLANETS.find((p) => p.id === selectedPlanetId) || PLANETS[0]
  const metricValue = metrics[planet.id] || 50
  const IconComponent = iconMap[planet.icon] || Sparkles

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 sm:top-24 sm:right-6 sm:left-auto z-40 w-full sm:max-w-md max-h-[88vh] sm:max-h-[82vh] overflow-y-auto pointer-events-auto rounded-t-3xl sm:rounded-3xl glass-panel p-5 sm:p-6 shadow-2xl border border-line"
      >
        {/* Mobile Drag Handle Bar */}
        <div className="sm:hidden flex justify-center mb-3">
          <div className="w-12 h-1 rounded-full bg-text-warm/30" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-line/50 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 sm:p-3 rounded-2xl flex items-center justify-center border border-line"
              style={{ backgroundColor: `${planet.color}20`, borderColor: `${planet.color}40` }}
            >
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: planet.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-body text-text-warm/60">
                  {planet.category}
                </span>
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: planet.color, boxShadow: `0 0 8px ${planet.color}` }}
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-display text-text-warm mt-0.5">{planet.name}</h2>
            </div>
          </div>

          <button
            onClick={() => selectPlanet(null)}
            className="p-2 rounded-xl bg-panel border border-line text-text-warm/60 hover:text-text-warm transition-colors"
            aria-label="Close detail panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tagline */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-text-warm/80 font-body leading-relaxed">
          {planet.tagline}
        </p>

        {/* Live Metric Slider Control */}
        <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-abyss/80 border border-line">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-body text-text-warm/70 flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-bio-teal" />
              Signal Strength
            </span>
            <span className="text-sm font-body font-bold text-bio-teal">
              {metricValue}%
            </span>
          </div>

          <input
            type="range"
            min="10"
            max="99"
            value={metricValue}
            onChange={(e) => setMetric(planet.id, e.target.value)}
            className="w-full h-2 bg-panel rounded-lg appearance-none cursor-pointer accent-bio-teal"
          />

          <div className="flex justify-between text-[10px] font-body text-text-warm/50 mt-1">
            <span>Entropy (10%)</span>
            <span>Optimal (99%)</span>
          </div>
        </div>

        {/* Recharts Trajectory Chart */}
        <div className="mt-5">
          <span className="text-xs font-body text-text-warm/60 flex items-center gap-1.5 mb-2.5">
            <TrendingUp className="w-3.5 h-3.5 text-bio-teal" />
            7-Day Signal Trajectory
          </span>

          <div className="h-32 sm:h-36 w-full rounded-2xl bg-abyss/60 p-2 border border-line/50">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={planet.history}>
                <defs>
                  <linearGradient id={`color-${planet.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={planet.color} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={planet.color} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090D14',
                    borderColor: '#243040',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={planet.color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${planet.id})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Indicators */}
        <div className="mt-5">
          <h4 className="text-xs font-body text-text-warm/60 mb-2.5">
            Key Signal Indicators
          </h4>
          <div className="grid grid-cols-1 gap-2">
            {planet.keyIndicators.map((ind, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-panel/60 border border-line/40">
                <span className="text-xs text-text-warm/80 font-body">{ind.label}</span>
                <span className="text-xs font-body font-bold text-text-warm">{ind.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-5">
          <h4 className="text-xs font-body text-text-warm/60 mb-2.5 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-bio-amber" />
            LENS Directives
          </h4>
          <div className="space-y-2">
            {planet.recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-bio-teal/5 border border-bio-teal/10 text-xs text-text-warm/80 font-body">
                <CheckCircle2 className="w-4 h-4 text-bio-teal shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5 pt-3 border-t border-line/50">
          <button
            onClick={() => setMetric(planet.id, Math.min(99, metricValue + 15))}
            className="w-full py-3 px-4 rounded-xl bg-bio-teal text-abyss font-body font-bold text-xs uppercase shadow-glow-teal hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Simulate Signal Boost (+15%)
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
