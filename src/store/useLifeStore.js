import { create } from 'zustand'

const calculateStability = (metrics) => {
  const positiveSum = metrics.focus + metrics.health + metrics.learning + metrics.goals + metrics.balance
  const penalty = Math.max(0, (metrics.digital - 50) * 0.6)
  const base = positiveSum / 5 - penalty
  return Math.min(99, Math.max(15, Math.round(base)))
}

const CHAPTER_CONFIG = [
  { id: 'landing', chapterIndex: 0, title: 'Chapter 0 — The Signal', description: 'Initial signal detection & boot sequence' },
  { id: 'onboarding', chapterIndex: 1, title: 'Chapter 1 — Your Universe Forms', description: 'Signal calibration & core alignment' },
  { id: 'universe', chapterIndex: 2, title: 'Chapter 2 — Explore', description: 'The living 3D planetary mesh' },
  { id: 'signallog', chapterIndex: 3, title: 'Chapter 3 — Look Back', description: 'Chronological signal memory journal' },
  { id: 'atlas', chapterIndex: 4, title: 'Chapter 4 — See the Whole Picture', description: 'Full-screen 3D constellation atlas' },
  { id: 'digest', chapterIndex: 5, title: 'Chapter 5 — This Week', description: 'Shareable weekly recap digest' }
]

export const useLifeStore = create((set, get) => ({
  stage: 'landing', // 'landing' | 'onboarding' | 'universe' | 'signallog' | 'atlas' | 'digest'
  currentChapter: 0,
  userName: 'Explorer',
  selectedPlanet: null,
  hoveredPlanet: null,
  activeLens: false,
  metrics: {
    focus: 62,
    learning: 78,
    digital: 41,
    health: 70,
    goals: 55,
    balance: 68,
  },
  stability: 74,
  
  // Chapter Transition Banner
  transitioningChapter: null, // Holds chapter object during transition

  // Chapter 3: Signal Log Entries
  signalLogs: [
    {
      id: 'log-1',
      date: 'Yesterday, 10:45 PM',
      category: 'Focus Engine',
      title: 'Deep Architecture Block',
      summary: 'Completed 3 uninterrupted hours of WebGL shader optimizations with zero context switching.',
      impact: '+12% Focus Depth',
      tag: 'focus'
    },
    {
      id: 'log-2',
      date: '2 days ago',
      category: 'Digital Orbit',
      title: 'Screen Quiet Window',
      summary: 'Maintained 90 minutes of digital sunset prior to sleep cycle. HRV recovery peaked.',
      impact: '-18% Digital Noise',
      tag: 'digital'
    },
    {
      id: 'log-3',
      date: '3 days ago',
      category: 'Knowledge Spark',
      title: 'Quantum Mental Model Synthesis',
      summary: 'Synthesized non-linear dynamics into 4 personal mental model notes.',
      impact: '+15% Learning Compounding',
      tag: 'learning'
    },
    {
      id: 'log-4',
      date: '4 days ago',
      category: 'Vitality Core',
      title: 'Circadian Sunlight Exposure',
      summary: 'Morning 20-minute sunlight walk stabilized circadian rhythm baseline.',
      impact: '+10% Vitality Equilibrium',
      tag: 'health'
    },
    {
      id: 'log-5',
      date: '5 days ago',
      category: 'Horizon Vector',
      title: 'OKR Milestone Sprint',
      summary: 'Pushed quarterly engineering deliverable to 80% completion status.',
      impact: '+14% Strategic Velocity',
      tag: 'goals'
    }
  ],

  // Chapter 4: Constellation Stars
  constellationStars: [
    { id: 'star-1', name: 'Deep Focus Alpha', category: 'Focus', val: 88, pos: [-4, 3, -2], date: 'Sep 02' },
    { id: 'star-2', name: 'Shader Sprint', category: 'Focus', val: 75, pos: [-2, 5, -1], date: 'Sep 03' },
    { id: 'star-3', name: 'Digital Sunset I', category: 'Digital', val: 40, pos: [4, 2, -3], date: 'Sep 01' },
    { id: 'star-4', name: 'Screen Cap', category: 'Digital', val: 50, pos: [5, 4, -1], date: 'Sep 04' },
    { id: 'star-5', name: 'Zone-2 Run', category: 'Vitality', val: 82, pos: [-1, -3, 3], date: 'Sep 02' },
    { id: 'star-6', name: 'HRV Peak', category: 'Vitality', val: 90, pos: [1, -4, 2], date: 'Sep 05' },
    { id: 'star-7', name: 'Three.js Masterclass', category: 'Learning', val: 85, pos: [3, -2, -4], date: 'Sep 03' },
    { id: 'star-8', name: 'Paper Synthesis', category: 'Learning', val: 78, pos: [2, -5, -2], date: 'Sep 04' },
    { id: 'star-9', name: 'Vite Upgrade', category: 'Goals', val: 70, pos: [-3, -2, 4], date: 'Sep 01' },
    { id: 'star-10', name: 'Launch Blueprint', category: 'Goals', val: 88, pos: [-5, -1, 2], date: 'Sep 05' }
  ],

  // Actions
  setChapter: (chapterIndex) => {
    const config = CHAPTER_CONFIG.find((c) => c.chapterIndex === chapterIndex) || CHAPTER_CONFIG[2]
    
    set({ transitioningChapter: config })
    
    setTimeout(() => {
      set({
        stage: config.id,
        currentChapter: config.chapterIndex,
        transitioningChapter: null,
        selectedPlanet: config.id === 'universe' ? get().selectedPlanet : null
      })
    }, 1100)
  },

  setStage: (stage) => {
    const config = CHAPTER_CONFIG.find((c) => c.id === stage) || CHAPTER_CONFIG[2]
    get().setChapter(config.chapterIndex)
  },

  setUserName: (userName) => set({ userName }),
  
  setMetric: (key, value) => {
    const nextMetrics = { ...get().metrics, [key]: Number(value) }
    const nextStability = calculateStability(nextMetrics)
    set({ metrics: nextMetrics, stability: nextStability })
  },
  
  selectPlanet: (id) => {
    if (id === null) {
      set({ selectedPlanet: null })
    } else {
      set({ selectedPlanet: id })
    }
  },
  
  setHoveredPlanet: (id) => set({ hoveredPlanet: id }),
  setLensActive: (active) => set({ activeLens: active }),
  
  updateMetrics: (newMetrics) => {
    const merged = { ...get().metrics, ...newMetrics }
    set({ metrics: merged, stability: calculateStability(merged) })
  },
  
  addSignalLog: (entry) => {
    set((s) => ({ signalLogs: [entry, ...s.signalLogs] }))
  },

  resetMetrics: () => {
    const defaults = { focus: 62, learning: 78, digital: 41, health: 70, goals: 55, balance: 68 }
    set({ metrics: defaults, stability: calculateStability(defaults), selectedPlanet: null })
  }
}))
