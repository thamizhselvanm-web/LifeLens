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

  // Chapter 4: Constellation Stars (Legitimate Signal Dataset across 6 Life Domains)
  constellationStars: [
    // Focus Constellation (Teal / Cognitive Depth)
    { id: 'star-1', name: 'Deep Architecture Block', category: 'Focus', val: 92, pos: [-4.2, 3.5, -1.8], date: 'Yesterday, 10:45 PM', summary: '3 uninterrupted hours of WebGL shader optimizations with zero context switching.', impact: '+12% Focus Depth' },
    { id: 'star-2', name: 'Ultradian Sprint Alpha', category: 'Focus', val: 88, pos: [-2.8, 4.8, -0.6], date: 'Sep 05, 2026', summary: 'Executed 90m deep work block with noise-canceling bio-acoustics.', impact: '+15% Attention Resilience' },
    { id: 'star-3', name: 'Single-Thread Execution', category: 'Focus', val: 84, pos: [-1.2, 3.2, -2.4], date: 'Sep 03, 2026', summary: 'Zero tab-switching during core system state machine refactoring.', impact: '+8% Cognitive Flow' },
    
    // Digital Constellation (Cyan / Information Orbit)
    { id: 'star-4', name: 'Screen Quiet Window', category: 'Digital', val: 82, pos: [3.8, 3.2, -2.5], date: '2 days ago', summary: 'Maintained 90 minutes of digital sunset prior to sleep cycle.', impact: '-18% Digital Noise' },
    { id: 'star-5', name: 'Grayscale Focus Protocol', category: 'Digital', val: 78, pos: [4.6, 1.8, -1.2], date: 'Sep 04, 2026', summary: 'Limited mobile notifications to urgent biometric alerts only.', impact: '-22% Context Interruptions' },
    { id: 'star-6', name: 'Information Sunset', category: 'Digital', val: 86, pos: [2.5, 4.5, -3.1], date: 'Sep 02, 2026', summary: 'Replaced late-night feed scrolling with paper journal reflection.', impact: '+14% HRV Sleep Recovery' },

    // Vitality Constellation (Green / Biometric Equilibrium)
    { id: 'star-7', name: 'Circadian Sunlight Walk', category: 'Vitality', val: 90, pos: [-1.5, -3.2, 2.5], date: '4 days ago', summary: 'Morning 20-minute sunlight walk stabilized circadian rhythm baseline.', impact: '+10% Vitality Equilibrium' },
    { id: 'star-8', name: 'Zone-2 Aerobic Pulse', category: 'Vitality', val: 85, pos: [0.8, -4.6, 1.8], date: 'Sep 04, 2026', summary: 'Completed 45m steady-state cardio at 135 bpm target heart rate.', impact: '+16% Metabolic Stamina' },
    { id: 'star-9', name: 'Deep Sleep HRV Peak', category: 'Vitality', val: 94, pos: [-2.6, -4.1, 3.2], date: 'Sep 01, 2026', summary: 'Achieved 2.2 hrs REM sleep with 68ms average HRV recovery.', impact: '+20% Cell Recovery' },

    // Learning Constellation (Amber / Intellectual Expansion)
    { id: 'star-10', name: 'Quantum Mental Model Synthesis', category: 'Learning', val: 89, pos: [3.2, -2.4, -3.5], date: '3 days ago', summary: 'Synthesized non-linear dynamics into 4 personal mental model notes.', impact: '+15% Learning Compounding' },
    { id: 'star-11', name: 'Shader Masterclass Sprint', category: 'Learning', val: 86, pos: [4.5, -3.8, -1.9], date: 'Sep 03, 2026', summary: 'Mastered 3D raymarching shaders and noise distortion mathematics.', impact: '+18% Technical Skill' },
    { id: 'star-12', name: 'Spaced Repetition Review', category: 'Learning', val: 80, pos: [1.8, -5.2, -2.8], date: 'Sep 02, 2026', summary: 'Reviewed 45 architectural pattern flashcards with 95% retention.', impact: '+11% Knowledge Recall' },

    // Goals Constellation (Coral / Strategic Horizon)
    { id: 'star-13', name: 'OKR Milestone Sprint', category: 'Goals', val: 91, pos: [-3.8, -1.8, 3.8], date: '5 days ago', summary: 'Pushed quarterly engineering deliverable to 80% completion status.', impact: '+14% Strategic Velocity' },
    { id: 'star-14', name: 'Strategic Backlog Pruning', category: 'Goals', val: 83, pos: [-4.9, -3.1, 2.1], date: 'Sep 03, 2026', summary: 'Eliminated low-impact micro tasks to protect core roadmap velocity.', impact: '+25% Priority Clarity' },

    // Harmony Constellation (Purple / Life Integration)
    { id: 'star-15', name: 'Restorative Solitude Window', category: 'Balance', val: 87, pos: [0.2, 2.1, 4.2], date: 'Yesterday', summary: 'Spent 2 hours in screen-free nature immersion without device alerts.', impact: '+18% Grounding Score' },
    { id: 'star-16', name: 'Social Vitality Synergy', category: 'Balance', val: 85, pos: [1.9, 0.8, 3.6], date: 'Sep 04, 2026', summary: 'High-bandwidth evening conversation with close peer network.', impact: '+15% Emotional Equilibrium' }
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
    const categoryMap = {
      'Focus Engine': 'Focus',
      'Digital Orbit': 'Digital',
      'Knowledge Spark': 'Learning',
      'Vitality Core': 'Vitality',
      'Horizon Vector': 'Goals',
      'Harmony Sphere': 'Balance'
    }
    const cat = categoryMap[entry.category] || 'Focus'
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 2.5
    const newStar = {
      id: `star-${Date.now()}`,
      name: entry.title,
      category: cat,
      val: Math.floor(75 + Math.random() * 20),
      pos: [
        Number((Math.cos(angle) * radius).toFixed(1)),
        Number(((Math.random() - 0.5) * 6).toFixed(1)),
        Number((Math.sin(angle) * radius).toFixed(1))
      ],
      date: entry.date,
      summary: entry.summary,
      impact: entry.impact
    }
    set((s) => ({
      signalLogs: [entry, ...s.signalLogs],
      constellationStars: [newStar, ...s.constellationStars]
    }))
  },

  resetMetrics: () => {
    const defaults = { focus: 62, learning: 78, digital: 41, health: 70, goals: 55, balance: 68 }
    set({ metrics: defaults, stability: calculateStability(defaults), selectedPlanet: null })
  }
}))
