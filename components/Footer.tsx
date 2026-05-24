import Link from 'next/link'
import shared from '@/content/shared.json'
import colonias from '@/content/colonias.json'
import { CurrentYear } from '@/components/CurrentYear'
import { FooterLogo } from '@/components/FooterLogo'

const navLinks = [
  { label: 'Menú', href: '/menu' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
]

function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
    </svg>
  )
}

export function Footer() {
  const { nombre, slogan, email, telefono, whatsapp, whatsapp_mensaje, redes_sociales, horarios } = shared.restaurante
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`

  return (
    <footer className="bg-surface-2 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <div className="mb-2">
              <FooterLogo nombre={nombre} />
            </div>
            <p className="font-body text-sm text-muted mb-6">{slogan}</p>
            <div className="flex items-center gap-5 mt-2">
              {redes_sociales.instagram && (
                <a
                  href={redes_sociales.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted hover:text-text transition-colors"
                >
                  <IconInstagram />
                </a>
              )}
              {redes_sociales.facebook && (
                <a
                  href={redes_sociales.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-muted hover:text-text transition-colors"
                >
                  <IconFacebook />
                </a>
              )}
              {redes_sociales.tiktok && (
                <a
                  href={redes_sociales.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-muted hover:text-text transition-colors"
                >
                  <IconTikTok />
                </a>
              )}
            </div>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide text-muted mb-4">
              Secciones
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="font-body text-sm text-muted hover:text-text transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide text-muted mb-3">
              Horarios
            </p>
            <ul className="flex flex-col gap-1">
              {horarios.map((h, i) => (
                <li key={i} className="font-body text-sm text-muted">
                  {h.dias}: {h.horas}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide text-muted mb-4">
              Contacto
            </p>
            <div className="flex flex-col gap-2">
              <a href={`tel:${telefono}`}
                className="font-body text-sm text-muted hover:text-text transition-colors">
                {telefono}
              </a>
              <a href={`mailto:${email}`}
                className="font-body text-sm text-muted hover:text-text transition-colors">
                {email}
              </a>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="font-body text-sm hover:opacity-80 transition-opacity"
                style={{ color: 'var(--brand-accent)' }}>
                Pedir por WhatsApp →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 mb-8">
          <p className="font-sans text-xs uppercase tracking-wide text-muted mb-3">
            Entregamos en:
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {colonias.colonias.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}
                className="font-body text-xs text-muted hover:text-text transition-colors">
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-muted">
            © <CurrentYear /> {nombre} · Todos los derechos reservados
          </p>
          <p className="font-body text-xs text-muted">
            Sitio web por{' '}
            <a href="https://markerante.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-text transition-colors">
              Markerante
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
