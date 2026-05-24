import type { Metadata } from 'next'
import shared from '@/content/shared.json'
import content from '@/content/galeria.json'
import { GalleryGrid } from '@/components/GalleryGrid'
import { CTAStrip } from '@/components/CTAStrip'
import { SchemaScript } from '@/components/SchemaScript'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: { images: [content.meta.og_image] },
  alternates: { canonical: `${shared.seo.canonical_base}/galeria` },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: `Galería ${shared.restaurante.nombre}`,
  url: `${shared.seo.canonical_base}/galeria`,
  description: content.meta.description,
  image: content.fotos.map((f) => `${shared.seo.canonical_base}${f.src}`),
}

export default function GaleriaPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      <section className="py-24 lg:py-32 bg-bg text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans font-bold text-5xl lg:text-6xl text-text mb-4 tracking-tight">
            {content.hero.titulo}
          </h1>
          <p className="font-body text-lg text-muted">
            {content.hero.subtitulo}
          </p>
        </div>
      </section>

      <section className="py-8 pb-16 bg-bg">
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <GalleryGrid fotos={content.fotos} />
        </div>
      </section>

      <CTAStrip
        titulo={content.cta_final.titulo}
        subtitulo={content.cta_final.subtitulo}
        ctaTexto={content.cta_final.cta_texto}
      />
    </>
  )
}
