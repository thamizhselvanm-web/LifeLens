import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { useLifeStore } from '../store/useLifeStore'
import { PLANETS } from '../data/planets'
import { generateInsights } from '../utils/generateInsights'

export default function InsightLines() {
  const activeLens = useLifeStore((s) => s.activeLens)
  const metrics = useLifeStore((s) => s.metrics)
  
  if (!activeLens) return null

  const insights = generateInsights(metrics)

  return (
    <group>
      {insights.map((insight, idx) => {
        if (!insight.planets || insight.planets.length < 2) return null
        
        const p1 = PLANETS.find((p) => p.id === insight.planets[0])
        const p2 = PLANETS.find((p) => p.id === insight.planets[1])
        
        if (!p1 || !p2) return null

        // Calculate approximate orbit ring positions for p1 and p2
        const pos1 = [p1.radius * 0.707, 0, p1.radius * 0.707]
        const pos2 = [p2.radius * -0.707, 0.5, p2.radius * 0.707]

        const lineColor = insight.severity === 'warning' ? '#fb7185' : insight.severity === 'critical' ? '#ef4444' : '#22d3ee'

        return (
          <Line
            key={idx}
            points={[pos1, pos2]}
            color={lineColor}
            lineWidth={2}
            dashed
            dashScale={10}
            dashSize={0.5}
            dashGap={0.3}
            transparent
            opacity={0.8}
          />
        )
      })}
    </group>
  )
}
