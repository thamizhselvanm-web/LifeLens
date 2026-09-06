import { useEffect, useRef, useState } from 'react'

const DOT_COUNT = 12

const GALAXY_PALETTE = [
  '#5EEAD4', // Bio Cyan
  '#38BDF8', // Cosmic Sky Blue
  '#818CF8', // Deep Indigo
  '#C084FC', // Nebula Violet
  '#E879F9', // Quantum Magenta
  '#F472B6', // Galactic Pink
  '#F0B86E', // Stellar Gold
  '#38BDF8', // Cosmic Cyan
  '#A855F7', // Deep Violet
  '#EC4899', // Nebula Pink
  '#22D3EE', // Cyan Glow
  '#5EEAD4'  // Bio Cyan
]

export default function FluidCursor() {
  const dotsRef = useRef([])
  const mouse = useRef({ x: -100, y: -100 })
  const positions = useRef(
    Array.from({ length: DOT_COUNT }, () => ({ x: -100, y: -100 }))
  )
  const [cursorState, setCursorState] = useState('default')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const move = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      
      const target = e.target
      if (target && target.closest) {
        if (target.closest('[data-cursor="planet"]')) {
          setCursorState('planet')
        } else if (target.closest('button, a, input, [role="button"], canvas')) {
          setCursorState('clickable')
        } else {
          setCursorState('default')
        }
      }
    }

    window.addEventListener('mousemove', move)

    let frame
    const tick = () => {
      let x = mouse.current.x
      let y = mouse.current.y
      positions.current.forEach((p, i) => {
        const ease = 0.35 - i * 0.02
        p.x += (x - p.x) * Math.max(ease, 0.08)
        p.y += (y - p.y) * Math.max(ease, 0.08)
        x = p.x
        y = p.y
        if (dotsRef.current[i]) {
          const scaleMultiplier = cursorState === 'clickable' ? 1.5 : cursorState === 'planet' ? 2.0 : 1.0
          dotsRef.current[i].style.transform = `translate(${p.x}px, ${p.y}px) scale(${
            (1 - i * 0.05) * scaleMultiplier
          })`
        }
      })
      frame = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(frame)
    }
  }, [cursorState])

  if (isTouchDevice) return null

  return (
    <svg className="fixed inset-0 pointer-events-none z-[999] w-full h-full">
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
        />
      </filter>
      <g filter="url(#goo)">
        {Array.from({ length: DOT_COUNT }).map((_, i) => (
          <circle
            key={i}
            ref={(el) => (dotsRef.current[i] = el)}
            r={i === 0 ? 8 : 5}
            fill={GALAXY_PALETTE[i % GALAXY_PALETTE.length]}
            opacity={1 - i * 0.05}
          />
        ))}
      </g>
    </svg>
  )
}
