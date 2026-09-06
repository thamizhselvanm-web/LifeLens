export default function Orbit({ radius, color }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.03, radius + 0.03, 128]} />
      <meshBasicMaterial
        color={color || '#7c9fff'}
        transparent
        opacity={0.15}
        side={2} // DoubleSide
      />
    </mesh>
  )
}
