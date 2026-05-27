export function SceneSetup() {
  return (
    <>
      <color attach="background" args={['#f3f8ff']} />
      <ambientLight intensity={1.25} color="#eef7ff" />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 2, 2]} intensity={0.55} color="#ffd6c4" />
      <pointLight position={[2, 2.5, 2]} intensity={2.4} color="#78dfff" distance={18} />
      <pointLight position={[-3, -1, 1]} intensity={1.3} color="#ffb391" distance={14} />
      <fog attach="fog" args={['#f3f8ff', 9, 28]} />
    </>
  )
}
