'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import shared from '@/content/shared.json'

const navLinks = [
  { label: 'Menú', href: '/menu' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { nombre, whatsapp, whatsapp_mensaje } = shared.restaurante
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo — SVG inline para que currentColor herede text-text */}
          <Link href="/" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="36"
              viewBox="0 0 120 36"
              className="text-text"
              aria-label={nombre}
            >
              <text x="0" y="26" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="currentColor" letterSpacing="-0.5">
                {nombre}
              </text>
            </svg>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-text'
                    : 'text-muted hover:text-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block font-sans font-bold text-sm px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--brand-accent)' }}
          >
            Pedir ahora
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            <span
              className={`block w-5 h-0.5 bg-text transition-transform duration-200 ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-text transition-opacity duration-200 ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-text transition-transform duration-200 ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <nav className="md:hidden border-t border-border py-6">
            <div className="flex flex-col gap-1 mb-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-sans text-base font-medium py-3 transition-colors ${
                    pathname === link.href
                      ? 'text-text'
                      : 'text-muted hover:text-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block text-center font-sans font-bold text-base px-5 py-3 rounded-full text-white"
              style={{ backgroundColor: 'var(--brand-accent)' }}
            >
              Pedir por WhatsApp
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
