export function ButtonPrimary({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`rounded-md bg-bio-teal text-abyss font-body font-semibold px-6 py-3 hover:bg-bio-teal/90 transition-colors shadow-glow-teal ${className}`}
    >
      {children}
    </button>
  )
}

export function ButtonSecondary({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`rounded-full border border-line text-text-warm/80 font-body px-6 py-3 hover:border-bio-teal/50 hover:text-text-warm transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
