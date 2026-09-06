export const PLANETS = [
  {
    id: 'focus',
    name: 'Focus Engine',
    category: 'Cognitive Depth',
    color: '#8b5cf6',
    emissive: '#a78bfa',
    radius: 3.4,
    size: 0.5,
    speed: 0.45,
    icon: 'BrainCircuit',
    tagline: 'Deep work velocity & attention preservation',
    description: 'Measures uninterrupted focus blocks, context-switching latency, and deep cognitive flow state capacity.',
    keyIndicators: [
      { label: 'Deep Work Hours / Day', value: '4.2 hrs', key: 'focus' },
      { label: 'Task Switching Frequency', value: 'Low', metricRef: 'focus' },
      { label: 'Attention Resilience', value: '88%' }
    ],
    recommendations: [
      'Implement 90-minute ultradian sprint cycles',
      'Block notifications during high-entropy windows',
      'Use single-threaded task queue execution'
    ],
    history: [
      { day: 'Mon', value: 55 },
      { day: 'Tue', value: 68 },
      { day: 'Wed', value: 72 },
      { day: 'Thu', value: 62 },
      { day: 'Fri', value: 80 },
      { day: 'Sat', value: 45 },
      { day: 'Sun', value: 62 }
    ]
  },
  {
    id: 'digital',
    name: 'Digital Orbit',
    category: 'Information Consumption',
    color: '#22d3ee',
    emissive: '#67e8f9',
    radius: 4.8,
    size: 0.45,
    speed: 0.35,
    icon: 'Smartphone',
    tagline: 'Screen time friction & cognitive noise ratio',
    description: 'Tracks screen consumption, algorithmic doomscrolling entropy, and digital fatigue indices.',
    keyIndicators: [
      { label: 'Screen On Time', value: '5.4 hrs', key: 'digital' },
      { label: 'Passive Consumption', value: '62%' },
      { label: 'Digital Quiet Hours', value: '2.1 hrs' }
    ],
    recommendations: [
      'Institute a digital sunset 90m before sleep',
      'Grayscale high-dopamine social applications',
      'Cap non-essential communication windows'
    ],
    history: [
      { day: 'Mon', value: 70 },
      { day: 'Tue', value: 65 },
      { day: 'Wed', value: 50 },
      { day: 'Thu', value: 41 },
      { day: 'Fri', value: 55 },
      { day: 'Sat', value: 82 },
      { day: 'Sun', value: 75 }
    ]
  },
  {
    id: 'health',
    name: 'Vitality Core',
    category: 'Biometric Equilibrium',
    color: '#4ade80',
    emissive: '#86efac',
    radius: 6.2,
    size: 0.55,
    speed: 0.28,
    icon: 'Activity',
    tagline: 'Circadian alignment, sleep quality & physical recovery',
    description: 'Evaluates HRV recovery patterns, sleep architecture depth, movement frequency, and metabolic endurance.',
    keyIndicators: [
      { label: 'Sleep Quality Index', value: '82%', key: 'health' },
      { label: 'Physical Activity', value: '8.4k steps' },
      { label: 'Resting HRV Balance', value: 'Optimal' }
    ],
    recommendations: [
      'Expose eyes to early morning sunlight within 30m of waking',
      'Maintain consistent bedtime +/- 30 minutes',
      'Add 20 minutes of zone-2 cardiovascular training'
    ],
    history: [
      { day: 'Mon', value: 75 },
      { day: 'Tue', value: 78 },
      { day: 'Wed', value: 70 },
      { day: 'Thu', value: 65 },
      { day: 'Fri', value: 72 },
      { day: 'Sat', value: 85 },
      { day: 'Sun', value: 70 }
    ]
  },
  {
    id: 'learning',
    name: 'Knowledge Spark',
    category: 'Intellectual Expansion',
    color: '#facc15',
    emissive: '#fef08a',
    radius: 7.8,
    size: 0.48,
    speed: 0.22,
    icon: 'Sparkles',
    tagline: 'Skill compounding & mental model synthesis',
    description: 'Monitors active skill acquisition rates, reading synthesis, problem-solving expansion, and curiosity velocity.',
    keyIndicators: [
      { label: 'Active Skill Sprints', value: '3 Active', key: 'learning' },
      { label: 'Synthesis Notes Created', value: '14 / wk' },
      { label: 'Curiosity Index', value: 'High' }
    ],
    recommendations: [
      'Publish or build 1 micro-project per week',
      'Use spaced-repetition for complex core concepts',
      'Cross-pollinate domain mental models'
    ],
    history: [
      { day: 'Mon', value: 60 },
      { day: 'Tue', value: 70 },
      { day: 'Wed', value: 85 },
      { day: 'Thu', value: 78 },
      { day: 'Fri', value: 82 },
      { day: 'Sat', value: 90 },
      { day: 'Sun', value: 78 }
    ]
  },
  {
    id: 'goals',
    name: 'Horizon Vector',
    category: 'Strategic Execution',
    color: '#fb7185',
    emissive: '#fda4af',
    radius: 9.2,
    size: 0.52,
    speed: 0.18,
    icon: 'Target',
    tagline: 'Milestone momentum & priority alignment',
    description: 'Quantifies long-term goal completion rate, strategic pivot agility, and weekly priority execution precision.',
    keyIndicators: [
      { label: 'Quarterly OKRs Completed', value: '64%', key: 'goals' },
      { label: 'Weekly Priority Hit-Rate', value: '80%' },
      { label: 'Goal Velocity', value: '+12% YoY' }
    ],
    recommendations: [
      'Conduct Sunday evening strategic alignment review',
      'Prune lowest 20% impact projects aggressively',
      'Break 90-day targets into micro-deliverables'
    ],
    history: [
      { day: 'Mon', value: 50 },
      { day: 'Tue', value: 55 },
      { day: 'Wed', value: 60 },
      { day: 'Thu', value: 58 },
      { day: 'Fri', value: 65 },
      { day: 'Sat', value: 40 },
      { day: 'Sun', value: 55 }
    ]
  },
  {
    id: 'balance',
    name: 'Harmony Sphere',
    category: 'Life Integration',
    color: '#a855f7',
    emissive: '#c084fc',
    radius: 10.8,
    size: 0.5,
    speed: 0.14,
    icon: 'Compass',
    tagline: 'Work-rest harmony & emotional grounding',
    description: 'Evaluates balance across social connection, leisure restorative value, and total human system equilibrium.',
    keyIndicators: [
      { label: 'Restorative Time', value: '3.5 hrs/day', key: 'balance' },
      { label: 'Social Vitality', value: 'High' },
      { label: 'Burnout Risk', value: '18% (Low)' }
    ],
    recommendations: [
      'Schedule non-negotiable social re-charge time',
      'Maintain clear boundary between work and rest zones',
      'Engage in non-screen creative hobbies'
    ],
    history: [
      { day: 'Mon', value: 65 },
      { day: 'Tue', value: 70 },
      { day: 'Wed', value: 62 },
      { day: 'Thu', value: 68 },
      { day: 'Fri', value: 75 },
      { day: 'Sat', value: 88 },
      { day: 'Sun', value: 85 }
    ]
  }
]
