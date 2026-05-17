'use client'

import { useState } from 'react'
import Link from 'next/link'
import shared from '@/content/shared.json'

const navLinks = [
  { label: 'Menú', href: '/menu' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { nombre, whatsapp, whatsapp_mensaje } = shared.restaurante
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`

  return (
    <header className="sticky top-0 z-50 bg-[#141414] border-b border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-sans font-bold text-xl text-[#F5F5F5] tracking-tight hover:opacity-80 transition-opacity"
          >
            {nombre}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-medium text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block font-sans font-bold text-sm px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--brand-accent)' }}
          >
            Pedir por WhatsApp
          </a>

          <button
            className="md:hidden text-[#F5F5F5] p-2"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-[#2A2A2A] pt-4">
            <nav className="flex flex-col gap-4 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-base font-medium text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center font-sans font-bold text-base px-5 py-3 rounded-full text-white"
              style={{ backgroundColor: 'var(--brand-accent)' }}
            >
              Pedir por WhatsApp
            </a>
          </div>
        )}
      </div>
    </header>
  )
}
