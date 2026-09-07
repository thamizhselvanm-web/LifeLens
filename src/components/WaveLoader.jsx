import { useEffect, useRef } from 'react'

/**
 * WaveLoader - Interactive bioluminescent wave effect canvas component.
 * Features multi-layered animated sine waves with phase shifting,
 * glowing light particles rising from wave crests, and dynamic bioluminescent gradients.
 */
export default function WaveLoader({
  variant = 'full', // 'full' | 'compact' | 'wave-bar'
  speed = 1,
  height = '100%',
  className = ''
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = 0
    let heightPx = 0
    let step = 0

    // Setup canvas size with DPI scaling
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      heightPx = rect.height
      canvas.width = width * dpr
      canvas.height = heightPx * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Particle system rising from wave crests
    const particleCount = variant === 'compact' ? 18 : 36
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 400),
      y: Math.random() * (heightPx || 200),
      size: Math.random() * 2.5 + 0.8,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() > 0.5 ? '#5EEAD4' : '#38BDF8'
    }))

    // Wave parameters: 3 overlapping sine waves
    const waves = [
      {
        amplitude: variant === 'compact' ? 14 : 28,
        frequency: 0.008,
        phaseSpeed: 0.025 * speed,
        colorStart: 'rgba(94, 234, 212, 0.45)', // Bio Teal
        colorEnd: 'rgba(56, 189, 248, 0.05)',
        glow: 'rgba(94, 234, 212, 0.6)',
        offsetY: 0.55
      },
      {
        amplitude: variant === 'compact' ? 18 : 35,
        frequency: 0.005,
        phaseSpeed: -0.018 * speed,
        colorStart: 'rgba(56, 189, 248, 0.35)', // Cosmic Cyan
        colorEnd: 'rgba(129, 140, 248, 0.02)',
        glow: 'rgba(56, 189, 248, 0.5)',
        offsetY: 0.62
      },
      {
        amplitude: variant === 'compact' ? 10 : 22,
        frequency: 0.012,
        phaseSpeed: 0.032 * speed,
        colorStart: 'rgba(192, 132, 252, 0.25)', // Nebula Violet
        colorEnd: 'rgba(94, 234, 212, 0.01)',
        glow: 'rgba(192, 132, 252, 0.4)',
        offsetY: 0.48
      }
    ]

    const render = () => {
      step += 1
      ctx.clearRect(0, 0, width, heightPx)

      // 1. Draw glowing background aura
      const centerX = width / 2
      const centerY = heightPx * 0.55
      const radialGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        Math.max(width, heightPx) * 0.6
      )
      radialGrad.addColorStop(0, 'rgba(94, 234, 212, 0.12)')
      radialGrad.addColorStop(0.5, 'rgba(56, 189, 248, 0.05)')
      radialGrad.addColorStop(1, 'rgba(9, 13, 20, 0)')
      ctx.fillStyle = radialGrad
      ctx.fillRect(0, 0, width, heightPx)

      // 2. Render each bioluminescent sine wave layer
      waves.forEach((wave) => {
        const baseOffsetY = heightPx * wave.offsetY

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(0, heightPx)

        for (let x = 0; x <= width; x += 4) {
          const y =
            baseOffsetY +
            Math.sin(x * wave.frequency + step * wave.phaseSpeed) * wave.amplitude +
            Math.cos(x * (wave.frequency * 0.6) - step * (wave.phaseSpeed * 0.8)) * (wave.amplitude * 0.4)
          
          if (x === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.lineTo(width, heightPx)
        ctx.lineTo(0, heightPx)
        ctx.closePath()

        // Gradient fill below wave
        const grad = ctx.createLinearGradient(0, baseOffsetY - wave.amplitude, 0, heightPx)
        grad.addColorStop(0, wave.colorStart)
        grad.addColorStop(1, wave.colorEnd)

        ctx.fillStyle = grad
        ctx.shadowColor = wave.glow
        ctx.shadowBlur = variant === 'compact' ? 12 : 24
        ctx.fill()

        // Highlight stroke along wave surface line
        ctx.beginPath()
        for (let x = 0; x <= width; x += 4) {
          const y =
            baseOffsetY +
            Math.sin(x * wave.frequency + step * wave.phaseSpeed) * wave.amplitude +
            Math.cos(x * (wave.frequency * 0.6) - step * (wave.phaseSpeed * 0.8)) * (wave.amplitude * 0.4)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = wave.colorStart
        ctx.lineWidth = 1.8
        ctx.stroke()

        ctx.restore()
      })

      // 3. Render rising bioluminescent particles
      particles.forEach((p) => {
        p.y -= p.speedY
        p.x += p.speedX + Math.sin(step * 0.03 + p.y * 0.01) * 0.3

        // Reset particle when reaching top
        if (p.y < 0) {
          p.y = heightPx + 10
          p.x = Math.random() * width
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.hue
        ctx.globalAlpha = p.opacity * (1 - p.y / heightPx) // Fade near top
        ctx.shadowColor = p.hue
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant, speed])

  if (variant === 'wave-bar') {
    return <WaveProgressBar className={className} />
  }

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}

/**
 * WaveProgressBar - Animated liquid wave progress bar replacement for flat progress bars
 */
function WaveProgressBar({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let step = 0

    const render = () => {
      step += 1
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)

      ctx.clearRect(0, 0, w, h)

      // Draw background track
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.beginPath()
      if (ctx.roundRect) {
        ctx.roundRect(0, 0, w, h, h / 2)
      } else {
        ctx.rect(0, 0, w, h)
      }
      ctx.fill()

      // Wave path fill
      ctx.save()
      ctx.beginPath()
      if (ctx.roundRect) {
        ctx.roundRect(0, 0, w, h, h / 2)
      } else {
        ctx.rect(0, 0, w, h)
      }
      ctx.clip()

      const grad = ctx.createLinearGradient(0, 0, w, 0)
      grad.addColorStop(0, '#5EEAD4')
      grad.addColorStop(0.5, '#38BDF8')
      grad.addColorStop(1, '#818CF8')

      ctx.beginPath()
      const amplitude = 3.5
      const frequency = 0.04
      const centerY = h / 2

      ctx.moveTo(0, h)
      for (let x = 0; x <= w; x += 2) {
        const y = centerY + Math.sin(x * frequency + step * 0.08) * amplitude
        ctx.lineTo(x, y)
      }
      ctx.lineTo(w, h)
      ctx.lineTo(0, h)
      ctx.closePath()

      ctx.fillStyle = grad
      ctx.shadowColor = '#5EEAD4'
      ctx.shadowBlur = 10
      ctx.fill()

      ctx.restore()

      animId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div className={`relative w-full h-2 rounded-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  )
}
