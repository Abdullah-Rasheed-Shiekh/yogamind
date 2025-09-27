"use client"

import { useEffect, useRef } from "react"
import { Mesh, IcosahedronGeometry, OctahedronGeometry, TetrahedronGeometry, DodecahedronGeometry, MeshBasicMaterial, Object3DEventMap } from "three"

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    let scene: any,
      camera: any,
      renderer: any,
      particles: any[] = []

    const init = async () => {
      const THREE = await import("three")

      // Scene setup with enhanced visuals
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0x000000, 0)

      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      const particleCount = 200
      const positions = new Float32Array(particleCount * 3)
      const colors = new Float32Array(particleCount * 3)
      const sizes = new Float32Array(particleCount)

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 50
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50
        positions[i * 3 + 2] = (Math.random() - 0.5) * 50

        const color = new THREE.Color()
        color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.5 + Math.random() * 0.3)
        colors[i * 3] = color.r
        colors[i * 3 + 1] = color.g
        colors[i * 3 + 2] = color.b

        sizes[i] = Math.random() * 3 + 1
      }

      const particleGeometry = new THREE.BufferGeometry()
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
      particleGeometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

      const particleMaterial = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          
          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Add wave motion
            mvPosition.y += sin(time * 0.001 + position.x * 0.01) * 5.0;
            mvPosition.x += cos(time * 0.001 + position.z * 0.01) * 3.0;
            
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          
          void main() {
            float distance = length(gl_PointCoord - vec2(0.5));
            if (distance > 0.5) discard;
            
            float alpha = 1.0 - distance * 2.0;
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `,
        transparent: true,
        vertexColors: true,
      })

      const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
      scene.add(particleSystem)

      const morphingShapes: { mesh: Mesh<IcosahedronGeometry | OctahedronGeometry | TetrahedronGeometry | DodecahedronGeometry, MeshBasicMaterial, Object3DEventMap>; rotationSpeed: { x: number; y: number; z: number }; floatSpeed: number }[] = []
      for (let i = 0; i < 8; i++) {
        const geometries = [
          new THREE.IcosahedronGeometry(1, 1),
          new THREE.OctahedronGeometry(1.2),
          new THREE.TetrahedronGeometry(1.5),
          new THREE.DodecahedronGeometry(0.8),
        ]

        const geometry = geometries[Math.floor(Math.random() * geometries.length)]
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.7, 0.6),
          transparent: true,
          opacity: 0.3,
          wireframe: Math.random() > 0.5,
        })

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40)
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)

        morphingShapes.push({
          mesh,
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.02,
            y: (Math.random() - 0.5) * 0.02,
            z: (Math.random() - 0.5) * 0.02,
          },
          floatSpeed: Math.random() * 0.01 + 0.005,
        })
        scene.add(mesh)
      }

      camera.position.z = 30

      const animate = () => {
        requestAnimationFrame(animate)
        const time = Date.now()

        // Update particle system
        particleMaterial.uniforms.time.value = time

        // Animate morphing shapes
        morphingShapes.forEach((shape, index) => {
          shape.mesh.rotation.x += shape.rotationSpeed.x
          shape.mesh.rotation.y += shape.rotationSpeed.y
          shape.mesh.rotation.z += shape.rotationSpeed.z

          shape.mesh.position.y += Math.sin(time * shape.floatSpeed + index) * 0.01
          shape.mesh.position.x += Math.cos(time * shape.floatSpeed + index * 0.5) * 0.005

          // Pulsing scale effect
          const scale = 1 + Math.sin(time * 0.002 + index) * 0.2
          shape.mesh.scale.setScalar(scale)
        })

        // Rotate entire particle system
        particleSystem.rotation.y += 0.001
        particleSystem.rotation.x += 0.0005

        renderer.render(scene, camera)
      }

      animate()

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener("resize", handleResize)

      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }

    init()

    return () => {
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div ref={mountRef} className="fixed inset-0 -z-10 pointer-events-none" style={{ background: "transparent" }} />
  )
}
