import { useState } from 'react'
import { Menu, X, Sparkles, SlidersHorizontal, Home, Orbit as OrbitIcon } from 'lucide-react'
import { useLifeStore } from '../store/useLifeStore'

const chapters = [
  { id: 0, label: 'Signal' },
  { id: 1, label: 'Calibration' },
  { id: 2, label: '3D Universe' },
  { id: 3, label: 'Signal Log' },
  { id: 4, label: 'Atlas' },
  { id: 5, label: 'Digest' },
]

export default function Navigation() {
  const currentChapter = useLifeStore((s) => s.currentChapter)
  const setChapter = useLifeStore((s) => s.setChapter)
  const activeLens = useLifeStore((s) => s.activeLens)
  const setLensActive = useLifeStore((s) => s.setLensActive)
  const selectPlanet = useLifeStore((s) => s.selectPlanet)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleChapterClick = (chapterId) => {
    if (chapterId === 2) selectPlanet(null)
    setChapter(chapterId)
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-abyss/90 border-b border-line/50 backdrop-blur-xl pointer-events-auto">
      <div className="px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand logo & title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleChapterClick(2)}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-panel border border-line flex items-center justify-center group-hover:border-bio-teal/50 transition-colors">
              <span className="text-bio-teal text-xs">◉</span>
            </div>
            <div>
              <p className="font-display text-text-warm text-sm sm:text-base leading-none">LifeLens</p>
              <p className="text-text-warm/40 text-[10px] sm:text-[11px] font-body mt-0.5">Bioluminescent Observatory</p>
            </div>
          </button>
        </div>

        {/* Desktop Chapter Navigation Tabs */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 overflow-x-auto">
          {chapters.map((c) => (
            <button
              key={c.id}
              onClick={() => handleChapterClick(c.id)}
              className={`font-body text-xs lg:text-sm pb-1 border-b-2 transition-colors whitespace-nowrap ${
                currentChapter === c.id
                  ? 'text-text-warm border-bio-teal font-medium'
                  : 'text-text-warm/40 border-transparent hover:text-text-warm/70'
              }`}
            >
              Ch {c.id}: {c.label}
            </button>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setLensActive(!activeLens)}
            className={`rounded-full border px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-body transition-colors ${
              activeLens
                ? 'border-bio-teal text-bio-teal bg-bio-teal/10'
                : 'border-line text-text-warm/70 hover:border-bio-teal/50'
            }`}
          >
            LENS {activeLens ? 'On' : 'Off'}
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-panel border border-line text-text-warm/80 hover:text-text-warm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Chapter Sub-Bar */}
      <div className="md:hidden flex items-center gap-2 px-4 py-2 border-t border-line/30 overflow-x-auto no-scrollbar bg-panel/50">
        {chapters.map((c) => (
          <button
            key={c.id}
            onClick={() => handleChapterClick(c.id)}
            className={`px-3 py-1 rounded-full text-xs font-body whitespace-nowrap transition-all ${
              currentChapter === c.id
                ? 'bg-bio-teal text-abyss font-semibold'
                : 'text-text-warm/60 bg-abyss/60 border border-line/50'
            }`}
          >
            Ch {c.id}: {c.label}
          </button>
        ))}
      </div>

      {/* Mobile Fullscreen Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[105px] bottom-0 bg-abyss/95 backdrop-blur-2xl border-t border-line p-6 flex flex-col justify-between z-50">
          <div className="space-y-3">
            <p className="text-xs font-body uppercase text-bio-teal tracking-widest mb-4">Select Story Chapter</p>
            {chapters.map((c) => (
              <button
                key={c.id}
                onClick={() => handleChapterClick(c.id)}
                className={`w-full text-left p-3.5 rounded-xl border font-body text-sm flex items-center justify-between transition-all ${
                  currentChapter === c.id
                    ? 'bg-bio-teal/15 border-bio-teal text-text-warm font-semibold'
                    : 'bg-panel/40 border-line text-text-warm/70'
                }`}
              >
                <span>Chapter {c.id} — {c.label}</span>
                {currentChapter === c.id && <span className="w-2 h-2 rounded-full bg-bio-teal animate-pulse" />}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-line text-xs text-text-warm/40 text-center">
            LifeLens Mobile Observatory • Touch & Gesture Optimized
          </div>
        </div>
      )}
    </nav>
  )
}
