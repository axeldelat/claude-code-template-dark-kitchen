import type { Metadata } from 'next'
import shared from '@/content/shared.json'
import content from '@/content/menu.json'
import { MenuCard } from '@/components/MenuCard'
import { CTAStrip } from '@/components/CTAStrip'
import { SchemaScript } from '@/components/SchemaScript'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: { images: [content.meta.og_image] },
  alternates: { canonical: `${shared.seo.canonical_base}/menu` },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `Menú ${shared.restaurante.nombre}`,
  url: `${shared.seo.canonical_base}/menu`,
  inLanguage: 'es-MX',
  hasMenuSection: {
    '@type': 'MenuSection',
    name: 'Platillos estrella',
    hasMenuItem: content.platillos.map((p) => ({
      '@type': 'MenuItem',
      name: p.nombre,
      description: p.descripcion,
      image: `${shared.seo.canonical_base}${p.imagen}`,
    })),
  },
}

export default function MenuPage() {
  const { menu_completo_url } = shared.restaurante

  return (
    <>
      <SchemaScript schema={schema} />

      <section className="py-24 lg:py-32 bg-bg text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans font-bold text-5xl lg:text-7xl text-text mb-4 tracking-tight">
            {content.hero.titulo}
          </h1>
          <p className="font-body text-lg text-muted">
            {content.hero.subtitulo}
          </p>
        </div>
      </section>

      <section className="py-16 bg-surface-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.platillos.map((p) => (
              <MenuCard
                key={p.id}
                nombre={p.nombre}
                descripcion={p.descripcion}
                imagen={p.imagen}
                imagen_alt={p.imagen_alt}
              />
            ))}
          </div>
        </div>
      </section>

      {content.menu_completo.mostrar && menu_completo_url && (
        <section className="py-16 bg-bg text-center">
          <div className="max-w-xl mx-auto px-4">
            <p className="font-body text-lg text-muted mb-6">
              {content.menu_completo.texto}
            </p>
            <a
              href={menu_completo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-sans font-bold text-base px-8 py-3 rounded-full border-2 border-text text-text hover:bg-text hover:text-white transition-colors"
            >
              {content.menu_completo.cta_texto} ↗
            </a>
          </div>
        </section>
      )}

      <CTAStrip
        titulo={content.cta_final.titulo}
        subtitulo={content.cta_final.subtitulo}
        ctaTexto={content.cta_final.cta_texto}
      />
    </>
  )
}
