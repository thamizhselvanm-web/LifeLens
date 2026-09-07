import { motion, AnimatePresence } from 'framer-motion'
import { useLifeStore } from '../store/useLifeStore'
import WaveLoader from './WaveLoader'

export default function ChapterTransition() {
  const transitioningChapter = useLifeStore((s) => s.transitioningChapter)

  if (!transitioningChapter) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 bg-abyss flex flex-col items-center justify-center p-6 text-center pointer-events-auto overflow-hidden"
      >
        {/* Fullscreen Canvas Bioluminescent Wave Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
          <WaveLoader variant="full" speed={1.4} height="100%" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 max-w-xl w-full border border-bio-teal/20 bg-abyss/80 p-8 rounded-3xl backdrop-blur-2xl shadow-[0_0_60px_rgba(94,234,212,0.12)]"
        >
          <span className="text-xs font-mono tracking-widest text-bio-teal/90 uppercase block mb-3 drop-shadow-[0_0_6px_rgba(94,234,212,0.4)]">
            CHAPTER {transitioningChapter.chapterIndex} OF 5
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif font-normal text-text-warm tracking-tight leading-tight mb-3">
            {transitioningChapter.title.replace(/^Chapter \d+ — /, '')}
          </h2>

          <p className="text-sm text-text-warm/70 font-sans font-light max-w-md mx-auto">
            {transitioningChapter.description}
          </p>

          <div className="mt-8 max-w-xs mx-auto">
            <WaveLoader variant="wave-bar" className="w-full shadow-[0_0_12px_rgba(94,234,212,0.5)]" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

