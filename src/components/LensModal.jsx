import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X, AlertTriangle, CheckCircle2, Zap } from 'lucide-react'
import { useLifeStore } from '../store/useLifeStore'
import { generateInsights } from '../utils/generateInsights'

export default function LensModal() {
  const activeLens = useLifeStore((s) => s.activeLens)
  const setLensActive = useLifeStore((s) => s.setLensActive)
  const metrics = useLifeStore((s) => s.metrics)
  const selectPlanet = useLifeStore((s) => s.selectPlanet)

  if (!activeLens) return null

  const insights = generateInsights(metrics)

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-40 w-auto sm:w-full sm:max-w-lg pointer-events-auto"
      >
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-bio-teal/30 shadow-glow-teal relative overflow-hidden">
          {/* Top gradient highlight line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-bio-teal via-bio-amber to-coral" />

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 sm:p-2 rounded-lg bg-bio-teal/20 text-bio-teal border border-bio-teal/30">
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-display text-text-warm">LENS Intelligence</h3>
                <p className="text-[10px] font-body text-bio-teal uppercase tracking-wider">
                  {insights.length} Pattern{insights.length > 1 ? 's' : ''} Detected
                </p>
              </div>
            </div>

            <button
              onClick={() => setLensActive(false)}
              className="p-1.5 rounded-lg bg-panel hover:bg-panel/80 text-text-warm/50 hover:text-text-warm"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Insights List */}
          <div className="space-y-2.5 max-h-48 sm:max-h-60 overflow-y-auto pr-1">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-3 rounded-xl border transition-all ${
                  insight.severity === 'warning' || insight.severity === 'critical'
                    ? 'bg-coral/10 border-coral/30 text-coral'
                    : insight.severity === 'positive'
                    ? 'bg-bio-teal/10 border-bio-teal/30 text-bio-teal'
                    : 'bg-panel border-line text-text-warm/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs flex items-center gap-1.5">
                    {insight.severity === 'warning' || insight.severity === 'critical' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-coral" />
                    ) : (
                      <CheckCircle2 className="w-3.5 h-3.5 text-bio-teal" />
                    )}
                    {insight.title}
                  </span>
                  {insight.planets && (
                    <div className="flex gap-1">
                      {insight.planets.map((pid) => (
                        <button
                          key={pid}
                          onClick={() => selectPlanet(pid)}
                          className="px-2 py-0.5 rounded text-[9px] font-body bg-white/10 hover:bg-white/20 text-white uppercase"
                        >
                          {pid}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs mt-1 font-body font-light leading-relaxed text-text-warm/80">
                  {insight.text}
                </p>

                {insight.action && (
                  <div className="mt-1.5 text-[10px] font-body text-bio-teal flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {insight.action}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
