import Link from 'next/link'
import shared from '@/content/shared.json'
import colonias from '@/content/colonias.json'

const navLinks = [
  { label: 'Menú', href: '/menu' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Contacto', href: '/contacto' },
]

export function Footer() {
  const { nombre, slogan, email, telefono, whatsapp, whatsapp_mensaje, redes_sociales, horarios } = shared.restaurante
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#141414] border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          <div>
            <p className="font-sans font-bold text-xl text-[#F5F5F5] mb-2">{nombre}</p>
            <p className="font-body text-sm text-[#9A9A9A] mb-6">{slogan}</p>
            <div className="flex gap-4">
              {redes_sociales.instagram && (
                <a href={redes_sociales.instagram} target="_blank" rel="noopener noreferrer"
                  className="text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors text-sm font-sans">
                  Instagram
                </a>
              )}
              {redes_sociales.facebook && (
                <a href={redes_sociales.facebook} target="_blank" rel="noopener noreferrer"
                  className="text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors text-sm font-sans">
                  Facebook
                </a>
              )}
              {redes_sociales.tiktok && (
                <a href={redes_sociales.tiktok} target="_blank" rel="noopener noreferrer"
                  className="text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors text-sm font-sans">
                  TikTok
                </a>
              )}
            </div>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide text-[#9A9A9A] mb-4">
              Secciones
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="font-body text-sm text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide text-[#9A9A9A] mb-3">
              Horarios
            </p>
            <ul className="flex flex-col gap-1">
              {horarios.map((h, i) => (
                <li key={i} className="font-body text-sm text-[#9A9A9A]">
                  {h.dias}: {h.horas}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans font-semibold text-sm uppercase tracking-wide text-[#9A9A9A] mb-4">
              Contacto
            </p>
            <div className="flex flex-col gap-2">
              <a href={`tel:${telefono}`}
                className="font-body text-sm text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
                {telefono}
              </a>
              <a href={`mailto:${email}`}
                className="font-body text-sm text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
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

        <div className="border-t border-[#2A2A2A] pt-8 mb-8">
          <p className="font-sans text-xs uppercase tracking-wide text-[#9A9A9A] mb-3">
            Entregamos en:
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {colonias.colonias.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}
                className="font-body text-xs text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
                {c.nombre}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-[#9A9A9A]">
            © {year} {nombre} · Todos los derechos reservados
          </p>
          <p className="font-body text-xs text-[#9A9A9A]">
            Sitio web por{' '}
            <a href="https://markerante.com" target="_blank" rel="noopener noreferrer"
              className="hover:text-[#F5F5F5] transition-colors">
              Markerante
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
