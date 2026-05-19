import { EffectComposer, Bloom, Vignette, ChromaticAberration, Noise, Glitch } from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'
import { useStore } from '../../store/useStore'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export function Effects() {
  const tier = useStore((s) => s.deviceTier)
  const effectsIntensity = useStore((s) => s.effectsIntensity)
  const triggerGlitch = useStore((s) => s.triggerGlitch)

  const glitchRef = useRef<any>(null)

  useEffect(() => {
    if (triggerGlitch && glitchRef.current && tier !== 'low') {
      glitchRef.current.strength = 0.8
      setTimeout(() => {
        if (glitchRef.current) glitchRef.current.strength = 0.2
      }, 150)
    }
  }, [triggerGlitch, tier])

  return (
    <EffectComposer multisampling={tier === 'high' ? 4 : 0}>
      <Bloom
        intensity={0.6 * effectsIntensity}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
      />

      {tier !== 'low'
        ? <Glitch
            ref={glitchRef}
            delay={new THREE.Vector2(1.5, 3.5)}
            duration={new THREE.Vector2(0.1, 0.3)}
            strength={new THREE.Vector2(0.1, 0.3)}
            mode={GlitchMode.SPORADIC}
            active
            ratio={0.85}
          />
        : <></>}

      {tier !== 'low'
        ? <ChromaticAberration
            offset={[0.0015, 0.0005]}
            radialModulation
            modulationOffset={0.5}
          />
        : <></>}

      {tier === 'high'
        ? <Noise opacity={0.03} />
        : <></>}

      <Vignette offset={0.3} darkness={0.7} eskil={false} />
    </EffectComposer>
  )
}
