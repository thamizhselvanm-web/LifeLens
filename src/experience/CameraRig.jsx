import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useLifeStore } from '../store/useLifeStore'
import { PLANETS } from '../data/planets'

export default function CameraRig() {
  const { camera } = useThree()
  const selected = useLifeStore((s) => s.selectedPlanet)
  const targetPos = useRef({ x: 0, y: 3, z: 14 })
  const targetLookAt = useRef({ x: 0, y: 0, z: 0 })

  useEffect(() => {
    let destPos = { x: 0, y: 3, z: 14 }
    let destLook = { x: 0, y: 0, z: 0 }

    if (selected) {
      const p = PLANETS.find((item) => item.id === selected)
      if (p) {
        // Position camera nicely offset from the target planet radius
        destPos = {
          x: p.radius * 0.75 + 1.8,
          y: 1.2,
          z: p.radius * 0.75 + 2.5
        }
        destLook = { x: p.radius * 0.5, y: 0, z: p.radius * 0.5 }
      }
    }

    // Smooth cinematic tween with GSAP power3.inOut easing
    gsap.to(targetPos.current, {
      ...destPos,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.position.set(targetPos.current.x, targetPos.current.y, targetPos.current.z)
      }
    })

    gsap.to(targetLookAt.current, {
      ...destLook,
      duration: 1.8,
      ease: 'power3.inOut',
      onUpdate: () => {
        camera.lookAt(targetLookAt.current.x, targetLookAt.current.y, targetLookAt.current.z)
      }
    })
  }, [selected, camera])

  return null
}
