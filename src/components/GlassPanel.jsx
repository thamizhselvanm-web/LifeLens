export default function GlassPanel({ children, className = '', hoverable = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`backdrop-blur-xl bg-void-card/85 border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
        hoverable ? 'hover:bg-void-card hover:border-core/30 hover:shadow-glow-core cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
