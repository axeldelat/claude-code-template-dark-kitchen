'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FooterLogoProps {
  nombre: string
}

export function FooterLogo({ nombre }: FooterLogoProps) {
  const [logoError, setLogoError] = useState(false)

  if (logoError) {
    return (
      <span className="font-sans font-bold text-xl text-[#F5F5F5] tracking-tight">
        {nombre}
      </span>
    )
  }

  return (
    <Image
      src="/brand/logo.svg"
      alt={nombre}
      width={130}
      height={40}
      className="h-10 w-auto"
      onError={() => setLogoError(true)}
    />
  )
}
