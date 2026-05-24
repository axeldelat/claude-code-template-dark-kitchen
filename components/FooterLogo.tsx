interface FooterLogoProps {
  nombre: string
}

export function FooterLogo({ nombre }: FooterLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="130"
      height="40"
      viewBox="0 0 130 40"
      className="text-text"
      aria-label={nombre}
    >
      <text x="0" y="28" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">
        {nombre}
      </text>
    </svg>
  )
}
