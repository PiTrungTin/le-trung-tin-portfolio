import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export function useDeviceTier() {
  const setDeviceTier = useStore((s) => s.setDeviceTier)
  const tier = useStore((s) => s.deviceTier)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')

    if (!gl) {
      setDeviceTier('low')
      return
    }

    const debugInfo = (gl as WebGL2RenderingContext).getExtension?.('WEBGL_debug_renderer_info')
    let renderer = 'unknown'
    if (debugInfo) {
      renderer = (gl as WebGL2RenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase()
    }

    const isMobile = /mobi|android|iphone|ipad/i.test(navigator.userAgent)
    const isIntegrated = /intel|hd graphics|uhd graphics|mali|adreno|powervr/i.test(renderer)

    if (isMobile || isIntegrated || tier === 'low') {
      setDeviceTier('low')
    } else if (/nvidia|amd|radeon|geforce|rtx/i.test(renderer)) {
      setDeviceTier('high')
    } else {
      setDeviceTier('medium')
    }
  }, [])

  return tier
}
