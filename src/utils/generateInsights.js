export function generateInsights(metrics) {
  const insights = []

  // Condition 1: Digital vs Focus friction
  if (metrics.digital > 55 && metrics.focus < 65) {
    insights.push({
      id: 'digital-focus-friction',
      title: 'Digital Signal Interference',
      severity: 'warning',
      text: `Elevated screen consumption (${metrics.digital}%) is producing attention fragmentation, suppressing focus velocity below optimal threshold.`,
      planets: ['digital', 'focus'],
      action: 'Set a 90-minute digital quiet window during morning focus hours.'
    })
  }

  // Condition 2: Learning & Focus resonance
  if (metrics.learning > 65 && metrics.focus > 60) {
    insights.push({
      id: 'learning-focus-resonance',
      title: 'Cognitive Flow Resonance',
      severity: 'positive',
      text: `Strong focus depth (${metrics.focus}%) is directly amplifying knowledge synthesis rate (${metrics.learning}%). Mental compounding is active.`,
      planets: ['learning', 'focus'],
      action: 'Capitalize on this flow window to Tackle hard technical architecture problems.'
    })
  }

  // Condition 3: Vitality & Goal friction
  if (metrics.goals > 65 && metrics.health < 65) {
    insights.push({
      id: 'goals-health-drain',
      title: 'Execution Over-Extension',
      severity: 'warning',
      text: `High strategic goal push (${metrics.goals}%) is straining biometric recovery (${metrics.health}%). Sustained sprint will lead to burnout.`,
      planets: ['goals', 'health'],
      action: 'Insert a mandatory 24-hour restorative recovery block before next sprint.'
    })
  }

  // Condition 4: Harmony & Health synergy
  if (metrics.health >= 65 && metrics.balance >= 65) {
    insights.push({
      id: 'health-balance-synergy',
      title: 'Circadian Equilibrium',
      severity: 'positive',
      text: `High physical vitality (${metrics.health}%) combined with life balance (${metrics.balance}%) is keeping system stability above peak thresholds.`,
      planets: ['health', 'balance'],
      action: 'Maintain current sleep timing and restorative habits.'
    })
  }

  // Condition 5: Low Focus & Low Goals fallback
  if (metrics.focus < 50 && metrics.goals < 55) {
    insights.push({
      id: 'focus-goals-lag',
      title: 'Strategic Velocity Lag',
      severity: 'critical',
      text: `Attention dispersion (${metrics.focus}%) is slowing progress on key goal milestones (${metrics.goals}%).`,
      planets: ['focus', 'goals'],
      action: 'Select 1 single priority goal and eliminate secondary commitments for 48 hrs.'
    })
  }

  // Default baseline insight if no trigger hit
  if (insights.length === 0) {
    insights.push({
      id: 'system-equilibrium',
      title: 'Steady State Operating Baseline',
      severity: 'info',
      text: 'Human signals are balanced across key life domains. No critical entropy spikes detected in system mesh.',
      planets: ['focus', 'health', 'balance'],
      action: 'Keep monitoring live metrics to detect emergent patterns.'
    })
  }

  return insights
}
