import { motion, AnimatePresence } from 'framer-motion'
import { useLifeStore } from '../store/useLifeStore'

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
        className="fixed inset-0 z-50 bg-abyss flex flex-col items-center justify-center p-6 text-center pointer-events-auto"
      >
        {/* Soft bioluminescent glow behind chapter title */}
        <div className="absolute w-[500px] h-[500px] bg-bio-cyan/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-10 max-w-xl"
        >
          <span className="text-xs font-sans tracking-widest text-bio-cyan/80 uppercase block mb-4">
            CHAPTER {transitioningChapter.chapterIndex} OF 5
          </span>

          <h2 className="text-4xl sm:text-6xl font-serif font-normal text-mist tracking-tight leading-tight">
            {transitioningChapter.title.replace(/^Chapter \d+ — /, '')}
          </h2>

          <p className="mt-4 text-sm text-mist/60 font-sans font-light">
            {transitioningChapter.description}
          </p>

          <div className="mt-8 flex justify-center">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-bio-cyan to-transparent animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
