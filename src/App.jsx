import { motion, AnimatePresence } from 'framer-motion'
import { useLifeStore } from './store/useLifeStore'
import FluidCursor from './components/FluidCursor'
import ChapterTransition from './components/ChapterTransition'
import Navigation from './components/Navigation'
import Landing from './components/Landing'
import Onboarding from './components/Onboarding'
import Universe from './experience/Universe'
import PlanetDetail from './components/PlanetDetail'
import LensModal from './components/LensModal'
import SignalLog from './components/SignalLog'
import ConstellationAtlas from './components/ConstellationAtlas'
import UniverseDigest from './components/UniverseDigest'

export default function App() {
  const stage = useLifeStore((s) => s.stage)

  return (
    <div className="relative min-h-screen bg-abyss text-text-warm overflow-hidden font-body selection:bg-bio-teal/30 selection:text-white">
      {/* 3% SVG Turbulence Noise Overlay */}
      <div className="grain-overlay" />

      {/* Gooey Bioluminescent Fluid Cursor */}
      <FluidCursor />

      {/* Chapter Title Overlay Banner */}
      <ChapterTransition />

      {/* Top Header Navigation */}
      <Navigation />

      {/* Smooth Page-to-Page Animated Chapter Switcher */}
      <AnimatePresence mode="wait">
        <motion.main
          key={stage}
          initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
          transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full min-h-screen"
        >
          {stage === 'landing' && <Landing />}

          {stage === 'onboarding' && <Onboarding />}

          {(stage === 'universe' || stage === 'detail') && (
            <div className="relative w-full h-screen overflow-hidden">
              <Universe />
              <PlanetDetail />
              <LensModal />
            </div>
          )}

          {stage === 'signallog' && <SignalLog />}

          {stage === 'atlas' && <ConstellationAtlas />}

          {stage === 'digest' && <UniverseDigest />}
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
