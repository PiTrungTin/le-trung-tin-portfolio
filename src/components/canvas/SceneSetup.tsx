export function SceneSetup() {
  return (
    <>
      <ambientLight intensity={0.15} color="#111133" />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
      <pointLight position={[0, 3, 2]} intensity={2} color="#00ffff" distance={20} />
      <pointLight position={[-4, -1, 3]} intensity={1.5} color="#ff00ff" distance={15} />
      <fog attach="fog" args={['#0a0a0f', 5, 50]} />
    </>
  )
}
