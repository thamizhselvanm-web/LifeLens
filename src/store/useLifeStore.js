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

  // Chapter 3: Signal Log Entries (Authentic Human Life Signals)
  signalLogs: [
    {
      id: 'log-1',
      date: 'Yesterday, 10:45 PM',
      category: 'Focus Engine',
      title: '3-Hour Deep Writing Session',
      summary: 'Completed 3 uninterrupted hours of creative writing with zero digital distractions or phone pickups.',
      impact: '+14% Cognitive Depth',
      tag: 'focus'
    },
    {
      id: 'log-2',
      date: '2 days ago',
      category: 'Digital Orbit',
      title: '90-Minute Screen Sunset',
      summary: 'Turned off all digital screens 90 minutes before sleep. Read physical paperback book instead.',
      impact: '-20% Screen Fatigue',
      tag: 'digital'
    },
    {
      id: 'log-3',
      date: '3 days ago',
      category: 'Knowledge Spark',
      title: 'Mental Model & Reading Synthesis',
      summary: 'Finished reading chapter on complex systems and synthesized 4 actionable life mental model notes.',
      impact: '+16% Retention Velocity',
      tag: 'learning'
    },
    {
      id: 'log-4',
      date: '4 days ago',
      category: 'Vitality Core',
      title: 'Morning Sunlight & Hydration',
      summary: 'Walked 25 minutes in early morning sunlight right after waking to anchor circadian rhythm.',
      impact: '+12% Sleep Recovery',
      tag: 'health'
    },
    {
      id: 'log-5',
      date: '5 days ago',
      category: 'Horizon Vector',
      title: 'Weekly Priority Alignment',
      summary: 'Reviewed quarterly life targets and completed top 3 strategic priorities ahead of deadline.',
      impact: '+15% Goal Execution',
      tag: 'goals'
    }
  ],

  // Chapter 4: Constellation Stars (Authentic Human Life Signals across 6 Domains)
  constellationStars: [
    // Focus Constellation (Cognitive Depth)
    { id: 'star-1', name: '3-Hour Deep Writing', category: 'Focus', val: 92, pos: [-4.2, 3.5, -1.8], date: 'Yesterday, 10:45 PM', summary: '3 uninterrupted hours of creative writing with zero digital distractions or phone pickups.', impact: '+14% Cognitive Depth' },
    { id: 'star-2', name: 'Uninterrupted Reading Sprint', category: 'Focus', val: 88, pos: [-2.8, 4.8, -0.6], date: 'Sep 05, 2026', summary: 'Focused 90-minute deep reading session with ambient instrumental focus music.', impact: '+15% Attention Resilience' },
    { id: 'star-3', name: 'Single-Task Flow State', category: 'Focus', val: 84, pos: [-1.2, 3.2, -2.4], date: 'Sep 03, 2026', summary: 'Zero context-switching during 2-hour strategic problem-solving session.', impact: '+10% Focus Efficiency' },
    
    // Digital Constellation (Information Orbit)
    { id: 'star-4', name: '90-Min Screen Sunset', category: 'Digital', val: 82, pos: [3.8, 3.2, -2.5], date: '2 days ago', summary: 'Turned off all digital screens 90 minutes before sleep. Read physical paperback book.', impact: '-20% Screen Fatigue' },
    { id: 'star-5', name: 'App Notification Fast', category: 'Digital', val: 78, pos: [4.6, 1.8, -1.2], date: 'Sep 04, 2026', summary: 'Silenced all non-essential phone notifications for 24 continuous hours.', impact: '-25% Attention Fragmentation' },
    { id: 'star-6', name: 'Weekend Digital Quiet', category: 'Digital', val: 86, pos: [2.5, 4.5, -3.1], date: 'Sep 02, 2026', summary: 'Replaced social media feed scrolling with outdoor park walking and reflection.', impact: '+18% Mental Quietude' },

    // Vitality Constellation (Biometric Health)
    { id: 'star-7', name: 'Morning Sunlight Walk', category: 'Vitality', val: 90, pos: [-1.5, -3.2, 2.5], date: '4 days ago', summary: 'Walked 25 minutes in early morning sunlight right after waking to anchor circadian rhythm.', impact: '+12% Sleep Recovery' },
    { id: 'star-8', name: '10k Fitness Step Streak', category: 'Vitality', val: 85, pos: [0.8, -4.6, 1.8], date: 'Sep 04, 2026', summary: 'Completed 10,500 daily steps including 30 minutes of zone-2 aerobic walking.', impact: '+16% Metabolic Vitality' },
    { id: 'star-9', name: '8-Hour Restful Sleep', category: 'Vitality', val: 94, pos: [-2.6, -4.1, 3.2], date: 'Sep 01, 2026', summary: 'Achieved 8 hours of uninterrupted deep restorative sleep with high HRV recovery.', impact: '+22% Recovery Index' },

    // Learning Constellation (Intellectual Expansion)
    { id: 'star-10', name: 'Mental Model Synthesis', category: 'Learning', val: 89, pos: [3.2, -2.4, -3.5], date: '3 days ago', summary: 'Finished reading chapter on complex systems and synthesized 4 actionable mental model notes.', impact: '+16% Retention Velocity' },
    { id: 'star-11', name: 'Language Vocab Sprint', category: 'Learning', val: 86, pos: [4.5, -3.8, -1.9], date: 'Sep 03, 2026', summary: 'Mastered 30 new conversational vocabulary phrases with 95% retention rate.', impact: '+14% Learning Compounding' },
    { id: 'star-12', name: 'Philosophy Book Notes', category: 'Learning', val: 80, pos: [1.8, -5.2, -2.8], date: 'Sep 02, 2026', summary: 'Wrote personal reflection notes on stoic philosophy and daily discipline.', impact: '+12% Perspective Depth' },

    // Goals Constellation (Strategic Horizon)
    { id: 'star-13', name: 'Weekly Target Execution', category: 'Goals', val: 91, pos: [-3.8, -1.8, 3.8], date: '5 days ago', summary: 'Reviewed quarterly life targets and completed top 3 strategic priorities ahead of deadline.', impact: '+15% Goal Execution' },
    { id: 'star-14', name: 'Life Planning Review', category: 'Goals', val: 83, pos: [-4.9, -3.1, 2.1], date: 'Sep 03, 2026', summary: 'Organized quarterly milestones and pruned low-priority commitments.', impact: '+20% Strategic Clarity' },

    // Harmony Constellation (Life Integration)
    { id: 'star-15', name: 'Sunset Nature Walk', category: 'Balance', val: 87, pos: [0.2, 2.1, 4.2], date: 'Yesterday', summary: 'Spent 90 minutes outdoors in nature observing the sunset without phone interruptions.', impact: '+18% Grounding & Peace' },
    { id: 'star-16', name: 'Family & Friend Dinner', category: 'Balance', val: 85, pos: [1.9, 0.8, 3.6], date: 'Sep 04, 2026', summary: 'Enjoyed meaningful screen-free dinner conversation with close friends.', impact: '+15% Emotional Connection' }
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
