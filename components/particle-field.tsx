"use client"

import { useEffect, useRef } from "react"

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "particle"
      particle.style.left = Math.random() * 100 + "%"
      particle.style.animationDelay = Math.random() * 20 + "s"
      particle.style.animationDuration = 15 + Math.random() * 10 + "s"

      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 25000)
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), i * 200)
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 800)

    return () => {
      clearInterval(interval)
      if (container) {
        container.innerHTML = ""
      }
    }
  }, [])

  return <div ref={containerRef} className="particle-field" />
}
