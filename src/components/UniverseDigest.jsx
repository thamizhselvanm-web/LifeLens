import { useState } from 'react'
import { motion } from 'framer-motion'
import { Share2, Sparkles, Check, TrendingUp, Award, RotateCcw, Home } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'
import { useLifeStore } from '../store/useLifeStore'
import { generateInsights } from '../utils/generateInsights'

const weeklyData = [
  { day: 'Mon', stability: 65 },
  { day: 'Tue', stability: 72 },
  { day: 'Wed', stability: 68 },
  { day: 'Thu', stability: 78 },
  { day: 'Fri', stability: 84 },
  { day: 'Sat', stability: 88 },
  { day: 'Sun', stability: 82 }
]

export default function UniverseDigest() {
  const stability = useLifeStore((s) => s.stability)
  const metrics = useLifeStore((s) => s.metrics)
  const userName = useLifeStore((s) => s.userName)
  const setChapter = useLifeStore((s) => s.setChapter)

  const [copied, setCopied] = useState(false)

  const insights = generateInsights(metrics)
  const topInsight = insights[0]

  const handleShare = () => {
    const text = `LifeLens Weekly Digest for ${userName}: Stability index at ${stability}% (Optimal Equilibrium). Top Insight: ${topInsight.title}.`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="relative min-h-screen bg-abyss text-mist px-4 sm:px-8 py-24 max-w-4xl mx-auto overflow-y-auto">
      {/* Ambient background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-bio-cyan/5 rounded-full blur-[180px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-sans tracking-widest text-bio-cyan uppercase">
          CHAPTER 5 OF 5 — FINAL SUMMARY
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif text-white mt-1">
          Weekly Universe Digest
        </h1>
        <p className="mt-3 text-sm text-mist/70 font-light">
          A shareable recap of your human signal trends, key insights, and constellation growth for {userName}.
        </p>
      </div>

      {/* Main Shareable Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-10 glass-panel p-8 rounded-3xl border border-bio-cyan/20 shadow-glow-cyan relative overflow-hidden"
      >
        {/* Top cyan gradient accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-bio-cyan via-bio-amber to-coral" />

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <span className="text-[10px] font-sans text-mist/50 uppercase tracking-widest">Observer Baseline</span>
            <h2 className="text-2xl font-serif text-white mt-0.5">{userName}'s Life Mesh</h2>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-kelp border border-white/10">
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-sans text-mist/50 uppercase">Stability Rating</span>
              <span className="text-lg font-sans font-bold text-bio-cyan">{stability}% Optimal</span>
            </div>
            <div className="w-3 h-3 rounded-full bg-bio-cyan animate-pulse" />
          </div>
        </div>

        {/* Weekly Stability Trend Curve */}
        <div className="mt-8">
          <span className="text-xs font-sans text-mist/60 uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <TrendingUp className="w-4 h-4 text-bio-cyan" />
            7-Day System Stability Curve
          </span>

          <div className="h-44 w-full rounded-2xl bg-abyss/60 p-3 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="digestGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5EEAD4" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#5EEAD4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B1220',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="stability"
                  stroke="#5EEAD4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#digestGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-abyss/40 border border-white/5">
            <span className="text-xs font-sans text-bio-amber font-semibold flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4" />
              Peak Signal Domain
            </span>
            <p className="text-sm font-serif text-white">Learning & Focus Resonance</p>
            <p className="text-xs text-mist/60 mt-1">Knowledge synthesis hit an all-time peak of 85% momentum.</p>
          </div>

          <div className="p-4 rounded-2xl bg-abyss/40 border border-white/5">
            <span className="text-xs font-sans text-bio-cyan font-semibold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4" />
              Top LENS Directive
            </span>
            <p className="text-sm font-serif text-white">{topInsight.title}</p>
            <p className="text-xs text-mist/60 mt-1">{topInsight.text}</p>
          </div>
        </div>

        {/* Share Button CTA */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-mist/50">Generated live by LifeLens Observatory</span>

          <button
            onClick={handleShare}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-bio-cyan to-bio-amber text-abyss font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-glow-cyan hover:opacity-95 transition-opacity"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Weekly Digest</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={() => setChapter(4)}
          className="text-xs font-sans text-mist/60 hover:text-white transition-colors"
        >
          &larr; Back to Chapter 4: Constellation Atlas
        </button>

        <button
          onClick={() => setChapter(2)}
          className="px-6 py-3 rounded-xl bg-kelp border border-white/10 text-white text-xs font-medium flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-bio-cyan" />
          <span>Return to Chapter 2 (3D Universe)</span>
        </button>
      </div>
    </div>
  )
}
