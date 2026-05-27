import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise, Glitch } from '@react-three/postprocessing'
import { GlitchEffect, GlitchMode } from 'postprocessing'
import { useStore } from '../../store/useStore'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Effects() {
  const tier = useStore((s) => s.deviceTier)
  const effectsIntensity = useStore((s) => s.effectsIntensity)
  const triggerGlitch = useStore((s) => s.triggerGlitch)

  const glitchRef = useRef<GlitchEffect | null>(null)

  useEffect(() => {
    if (triggerGlitch && glitchRef.current && tier !== 'low') {
      glitchRef.current.strength.set(0.12, 0.18)
      setTimeout(() => {
        if (glitchRef.current) glitchRef.current.strength.set(0.015, 0.05)
      }, 150)
    }
  }, [triggerGlitch, tier])

  return (
    <EffectComposer multisampling={tier === 'high' ? 4 : 0}>
      <Bloom
        intensity={0.2 * effectsIntensity}
        luminanceThreshold={0.62}
        luminanceSmoothing={0.45}
        mipmapBlur
      />

      {tier !== 'low'
        ? <Glitch
            ref={glitchRef}
            delay={new THREE.Vector2(3.8, 7.2)}
            duration={new THREE.Vector2(0.04, 0.1)}
            strength={new THREE.Vector2(0.008, 0.03)}
            mode={GlitchMode.SPORADIC}
            active
            ratio={0.95}
          />
        : <></>}

      {tier !== 'low'
        ? <ChromaticAberration
            offset={[0.00035, 0.00012]}
            radialModulation
            modulationOffset={0.5}
          />
        : <></>}

      {tier === 'high'
        ? <Noise opacity={0.007} />
        : <></>}

      <Vignette offset={0.05} darkness={0.18} eskil={false} />
    </EffectComposer>
  )
}
