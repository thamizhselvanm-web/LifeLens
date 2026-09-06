import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Plus, Calendar, Sparkles, Filter, CheckCircle2 } from 'lucide-react'
import { useLifeStore } from '../store/useLifeStore'

export default function SignalLog() {
  const signalLogs = useLifeStore((s) => s.signalLogs)
  const addSignalLog = useLifeStore((s) => s.addSignalLog)
  const setChapter = useLifeStore((s) => s.setChapter)

  const [activeFilter, setActiveFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Focus Engine')
  const [newSummary, setNewSummary] = useState('')

  const filteredLogs = activeFilter === 'all'
    ? signalLogs
    : signalLogs.filter((log) => log.tag === activeFilter)

  const handleCreateEntry = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newLog = {
      id: `log-${Date.now()}`,
      date: 'Just now',
      category: newCategory,
      title: newTitle,
      summary: newSummary || 'Logged reflection entry.',
      impact: '+12% Signal Harmony',
      tag: newCategory.toLowerCase().includes('focus') ? 'focus' : 'learning'
    }

    addSignalLog(newLog)
    setNewTitle('')
    setNewSummary('')
    setShowAddModal(false)
  }

  return (
    <div className="relative min-h-screen bg-abyss text-mist px-4 sm:px-8 py-24 max-w-5xl mx-auto overflow-y-auto">
      {/* Background ambient bioluminescent blur */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-bio-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Chapter Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
        <div>
          <span className="text-xs font-sans tracking-widest text-bio-cyan/80 uppercase">
            CHAPTER 3 OF 5
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal text-white mt-1">
            The Signal Log
          </h1>
          <p className="mt-3 text-base text-mist/70 font-light max-w-xl">
            A chronological memory journal tracking your focus blocks, recovery windows, and intellectual breakthroughs.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-bio-cyan/20 to-bio-amber/20 hover:from-bio-cyan/30 hover:to-bio-amber/30 border border-bio-cyan/30 text-white text-xs tracking-wider uppercase font-medium flex items-center gap-2 backdrop-blur-xl transition-all shadow-glow-cyan"
          >
            <Plus className="w-4 h-4 text-bio-cyan" />
            <span>Log Human Signal</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2 items-center">
        <span className="text-xs text-mist/50 mr-2 flex items-center gap-1 font-sans">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>
        {[
          { label: 'All Signals', tag: 'all' },
          { label: 'Focus', tag: 'focus' },
          { label: 'Digital Orbit', tag: 'digital' },
          { label: 'Learning', tag: 'learning' },
          { label: 'Vitality', tag: 'health' },
          { label: 'Goals', tag: 'goals' }
        ].map((f) => (
          <button
            key={f.tag}
            onClick={() => setActiveFilter(f.tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
              activeFilter === f.tag
                ? 'bg-bio-cyan text-abyss font-semibold'
                : 'bg-kelp/60 border border-white/5 text-mist/70 hover:text-white hover:border-white/20'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Parallax Signal Log Cards */}
      <div className="mt-10 space-y-6">
        {filteredLogs.map((log, index) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-bio-cyan/30 transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-sans px-2.5 py-1 rounded-lg bg-kelp border border-white/10 text-bio-cyan">
                  {log.category}
                </span>
                <span className="text-xs font-sans text-mist/50 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {log.date}
                </span>
              </div>
              <span className="text-xs font-sans text-bio-amber font-semibold">
                {log.impact}
              </span>
            </div>

            <h3 className="text-xl font-serif text-white mt-4 group-hover:text-bio-cyan transition-colors">
              {log.title}
            </h3>

            <p className="mt-2 text-sm text-mist/80 font-light leading-relaxed">
              {log.summary}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Navigation CTA */}
      <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
        <button
          onClick={() => setChapter(2)}
          className="text-xs font-sans text-mist/60 hover:text-white transition-colors"
        >
          &larr; Back to Chapter 2: Explore Universe
        </button>

        <button
          onClick={() => setChapter(4)}
          className="px-6 py-3 rounded-xl bg-kelp hover:bg-kelp-light border border-white/10 text-white text-xs tracking-wider uppercase font-medium flex items-center gap-2 transition-all"
        >
          <span>Continue to Chapter 4: Constellation Atlas</span>
          &rarr;
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-abyss/80 backdrop-blur-xl">
          <div className="glass-panel p-6 rounded-2xl border border-bio-cyan/30 w-full max-w-md">
            <h3 className="text-xl font-serif text-white mb-4">Log Human Signal Reflection</h3>
            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-mist/60 mb-1">Signal Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-abyss border border-white/10 text-white text-sm focus:outline-none focus:border-bio-cyan"
                  placeholder="e.g. 90-Minute Deep Flow"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-mist/60 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-abyss border border-white/10 text-white text-sm focus:outline-none focus:border-bio-cyan"
                >
                  <option>Focus Engine</option>
                  <option>Digital Orbit</option>
                  <option>Knowledge Spark</option>
                  <option>Vitality Core</option>
                  <option>Horizon Vector</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-sans text-mist/60 mb-1">Reflection Summary</label>
                <textarea
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-abyss border border-white/10 text-white text-sm focus:outline-none focus:border-bio-cyan h-24"
                  placeholder="What patterns or insights emerged during this window?"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-mist hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-bio-cyan text-abyss font-semibold text-xs hover:opacity-90"
                >
                  Save Log Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
