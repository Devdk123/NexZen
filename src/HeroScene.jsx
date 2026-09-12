/**
 * HeroScene.jsx — NexZen "Forge of Tomorrow" 3D Hero Scene
 *
 * Step 1 — Install dependencies (run once in your project folder):
 *   npm install three @react-three/fiber @react-three/drei @react-three/postprocessing
 *
 * Step 2 — Drop this file into your src/ folder
 *
 * Step 3 — Use in your hero section:
 *   import HeroScene from './HeroScene'
 *
 *   <section className="relative min-h-screen overflow-hidden">
 *     <HeroScene />
 *     <div className="relative z-20"> ...your text content... </div>
 *   </section>
 */

import { useRef, useMemo } from 'react'
import { Canvas, useFrame }       from '@react-three/fiber'
import { Stars, Environment }     from '@react-three/drei'
import * as THREE                 from 'three'

// ─────────────────────────────────────────────────
//  NEXZEN "N" LOGO
//  Chrome metallic body + cyan glow edge strips
// ─────────────────────────────────────────────────
function NexzenN() {
  const group = useRef()

  // Diagonal bar geometry:
  //   Left bar inner-right edge top  → (-0.475, +1.3)
  //   Right bar inner-left edge bottom → (+0.475, -1.3)
  const diagLen   = Math.hypot(0.95, 2.6)          // ≈ 2.77 units
  const diagAngle = -Math.atan2(2.6, 0.95)          // ≈ -70 degrees

  const chrome = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#b8cce4',
    metalness: 0.96,
    roughness: 0.04,
    envMapIntensity: 2.5,
  }), [])

  const cyanGlow = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00d4ff',
    emissive: '#00d4ff',
    emissiveIntensity: 5,
    toneMapped: false,
  }), [])

  const purpleGlow = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8866ff',
    emissive: '#8866ff',
    emissiveIntensity: 3,
    toneMapped: false,
  }), [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    group.current.rotation.y   = t * 0.13
    group.current.position.y   = Math.sin(t * 0.55) * 0.1
  })

  return (
    <group ref={group}>
      {/* ── Vertical bars ── */}
      <mesh position={[-0.65, 0, 0]} material={chrome}>
        <boxGeometry args={[0.36, 2.6, 0.36]} />
      </mesh>
      <mesh position={[0.65, 0, 0]} material={chrome}>
        <boxGeometry args={[0.36, 2.6, 0.36]} />
      </mesh>

      {/* ── Diagonal bar ── */}
      <mesh rotation={[0, 0, diagAngle]} material={chrome}>
        <boxGeometry args={[diagLen, 0.36, 0.36]} />
      </mesh>

      {/* ── Cyan glow strips on front edges ── */}
      <mesh position={[-0.65, 0, 0.186]} material={cyanGlow}>
        <boxGeometry args={[0.055, 2.6, 0.002]} />
      </mesh>
      <mesh position={[0.65, 0, 0.186]} material={cyanGlow}>
        <boxGeometry args={[0.055, 2.6, 0.002]} />
      </mesh>

      {/* ── Purple glow strips on back edges ── */}
      <mesh position={[-0.65, 0, -0.186]} material={purpleGlow}>
        <boxGeometry args={[0.055, 2.6, 0.002]} />
      </mesh>
      <mesh position={[0.65, 0, -0.186]} material={purpleGlow}>
        <boxGeometry args={[0.055, 2.6, 0.002]} />
      </mesh>

      {/* ── Core glow lights ── */}
      <pointLight color="#00d4ff" intensity={5}   distance={6} decay={2} />
      <pointLight color="#7b5cff" intensity={3}   distance={4} decay={2} position={[0, 0, -1.2]} />
      <pointLight color="#ffffff" intensity={1.5} distance={3} decay={2} position={[0, 2, 1]} />
    </group>
  )
}

// ─────────────────────────────────────────────────
//  ORBITAL RING
//  Glowing torus orbiting the N
// ─────────────────────────────────────────────────
function Ring({ radius, tube = 0.016, rotation, speed, color }) {
  const ref = useRef()

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 2.5,
    transparent: true,
    opacity: 0.8,
    toneMapped: false,
  }), [color])

  useFrame((_, dt) => {
    ref.current.rotation.y += dt * speed
  })

  return (
    <mesh ref={ref} rotation={rotation} material={mat}>
      <torusGeometry args={[radius, tube, 8, 128]} />
    </mesh>
  )
}

// ─────────────────────────────────────────────────
//  PARTICLE VORTEX
//  ~2500 glowing dust particles in a slow spiral
// ─────────────────────────────────────────────────
function Particles({ count = 2500 }) {
  const ref = useRef()

  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Bias particles toward inner zone for a dense vortex feel
      const r     = 2.5 + Math.pow(Math.random(), 0.55) * 9
      const theta = Math.random() * Math.PI * 2
      const phi   = (Math.random() - 0.5) * 0.88       // slightly flat disk
      pos[i * 3]     = r * Math.cos(theta) * Math.cos(phi)
      pos[i * 3 + 1] = r * Math.sin(phi) * 1.3
      pos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])

  const mat = useMemo(() => new THREE.PointsMaterial({
    size: 0.04,
    color: '#40dfff',
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    depthWrite: false,
  }), [])

  useFrame((_, dt) => {
    ref.current.rotation.y -= dt * 0.034
    ref.current.rotation.x += dt * 0.006
  })

  return <points ref={ref} geometry={geo} material={mat} />
}

// ─────────────────────────────────────────────────
//  LIGHTNING ARC
//  Random electric bolt from N edges
//  Fires every 2–5 seconds, visible for ~100ms
// ─────────────────────────────────────────────────
function Lightning() {
  const timer    = useRef(0)
  const nextFire = useRef(1 + Math.random() * 2)
  const showing  = useRef(false)
  const hideAt   = useRef(0)

  const { line, geo } = useMemo(() => {
    const g   = new THREE.BufferGeometry()
    const mat = new THREE.LineBasicMaterial({
      color: '#aaeeff',
      transparent: true,
      opacity: 0.95,
    })
    // init with dummy points so geometry is valid before first bolt
    g.setFromPoints(Array.from({ length: 9 }, () => new THREE.Vector3()))
    const l = new THREE.Line(g, mat)
    l.visible = false
    return { line: l, geo: g }
  }, [])

  useFrame((_, dt) => {
    timer.current += dt

    // Fire a new bolt
    if (!showing.current && timer.current >= nextFire.current) {
      const pts = []
      const sx  = Math.random() > 0.5 ? -0.65 : 0.65   // left or right bar
      let cx    = sx
      let cy    = (Math.random() - 0.5) * 2.4
      for (let i = 0; i < 9; i++) {
        pts.push(new THREE.Vector3(cx, cy, 0.2))
        cx += (Math.random() - 0.5) * 0.65
        cy += (Math.random() - 0.5) * 0.45
      }
      geo.setFromPoints(pts)
      line.visible  = true
      showing.current = true
      hideAt.current  = timer.current + 0.08 + Math.random() * 0.09
      nextFire.current = timer.current + 2 + Math.random() * 3.5
    }

    // Hide bolt
    if (showing.current && timer.current >= hideAt.current) {
      line.visible    = false
      showing.current = false
    }
  })

  return <primitive object={line} />
}

// ─────────────────────────────────────────────────
//  MAIN SCENE
// ─────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Scene-wide background + depth fog */}
      <color attach="background" args={['#040c1a']} />
      <fog attach="fog" color="#040c1a" near={22} far={48} />

      {/* Lighting */}
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} />
      <pointLight position={[-8, 5, 3]}  color="#003dff" intensity={5} distance={22} decay={2} />
      <pointLight position={[8, -4,  2]} color="#00aaff" intensity={3} distance={16} decay={2} />

      {/* Removed HDRI Environment to prevent white screen issues, using standard lights instead */}

      {/* Star field */}
      <Stars
        radius={90} depth={60} count={4500}
        factor={3} saturation={0.3} fade speed={0.4}
      />

      {/* ── Core elements ── */}
      <NexzenN />

      {/* Two independent lightning arcs with different timings */}
      <Lightning />
      <Lightning />

      {/* Three orbital rings — different angles, speeds, colors */}
      <Ring
        radius={2.8}
        rotation={[0, 0, 0]}
        speed={0.28}
        color="#00d4ff"
      />
      <Ring
        radius={3.7}
        tube={0.013}
        rotation={[Math.PI / 3, 0, 0.4]}
        speed={-0.2}
        color="#7b5cff"
      />
      <Ring
        radius={4.6}
        tube={0.01}
        rotation={[0.2, 0, Math.PI / 4]}
        speed={0.13}
        color="#0055ff"
      />

      {/* Particle vortex */}
      <Particles count={2500} />

      {/* Perspective grid floor */}
      <gridHelper
        args={[40, 40, '#001e44', '#00112a']}
        position={[0, -3.8, 0]}
      />

      {/* Removed postprocessing due to WebGL context alpha crashes */}
    </>
  )
}

// ─────────────────────────────────────────────────
//  EXPORT — wrap in your hero <section>
//  Parent MUST have: position: relative + a height
// ─────────────────────────────────────────────────
import { Suspense, useState, useEffect } from 'react'

export default function HeroScene() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 0, 
        opacity: loaded ? 1 : 0, 
        transition: 'opacity 1.5s ease-in-out',
        backgroundColor: '#040c1a'
      }}
    >
      <Canvas
        camera={{ position: [0, -0.8, 5.8], fov: 58 }}
        dpr={[1, 1.5]}
        onCreated={() => setLoaded(true)}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
