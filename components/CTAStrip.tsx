import shared from '@/content/shared.json'

interface CTAStripProps {
  titulo: string
  subtitulo?: string
  ctaTexto: string
}

export function CTAStrip({ titulo, subtitulo, ctaTexto }: CTAStripProps) {
  const { whatsapp, whatsapp_mensaje } = shared.restaurante
  const url = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`

  return (
    <section
      className="py-16 px-4"
      style={{ backgroundColor: 'var(--brand-accent)' }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-sans text-3xl lg:text-4xl font-bold text-white mb-3">
          {titulo}
        </h2>
        {subtitulo && (
          <p className="font-body text-lg text-white/80 mb-8">
            {subtitulo}
          </p>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans font-bold text-lg px-10 py-4 rounded-full bg-white transition-opacity duration-200 hover:opacity-90"
          style={{ color: 'var(--brand-accent)' }}
        >
          {ctaTexto}
        </a>
      </div>
    </section>
  )
}
