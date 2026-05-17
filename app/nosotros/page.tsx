import type { Metadata } from 'next'
import Image from 'next/image'
import shared from '@/content/shared.json'
import content from '@/content/nosotros.json'
import { CTAStrip } from '@/components/CTAStrip'
import { SchemaScript } from '@/components/SchemaScript'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: { images: [content.meta.og_image] },
  alternates: { canonical: `${shared.seo.canonical_base}/nosotros` },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: `Nosotros — ${shared.restaurante.nombre}`,
  url: `${shared.seo.canonical_base}/nosotros`,
  description: content.meta.description,
  mainEntity: {
    '@type': 'Restaurant',
    '@id': `${shared.seo.canonical_base}/#restaurant`,
    name: shared.restaurante.nombre,
    foundingDate: '2022',
    foundingLocation: {
      '@type': 'Place',
      name: `${shared.restaurante.ciudad}, ${shared.restaurante.estado}, ${shared.restaurante.pais}`,
    },
  },
}

export default function NosotrosPage() {
  return (
    <>
      <SchemaScript schema={schema} />

      <section className="py-24 lg:py-32 bg-[#0A0A0A] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans font-bold text-5xl lg:text-6xl text-[#F5F5F5] mb-4 tracking-tight leading-tight">
            {content.hero.titulo}
          </h1>
          <p className="font-body text-xl text-[var(--brand-accent)] font-semibold">
            {content.hero.subtitulo}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={content.historia.imagen}
                alt={content.historia.imagen_alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-body text-lg text-[#9A9A9A] leading-relaxed">
                {content.historia.parrafo_1}
              </p>
              <p className="font-body text-lg text-[#9A9A9A] leading-relaxed">
                {content.historia.parrafo_2}
              </p>
              <p className="font-body text-lg text-[#9A9A9A] leading-relaxed">
                {content.historia.parrafo_3}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.valores.map((v, i) => (
              <div
                key={i}
                className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg p-6 hover:border-[var(--brand-accent)] transition-colors duration-200"
              >
                <span className="text-3xl mb-4 block">{v.icono}</span>
                <h3 className="font-sans font-semibold text-base text-[#F5F5F5] mb-2">
                  {v.titulo}
                </h3>
                <p className="font-body text-sm text-[#9A9A9A] leading-relaxed">
                  {v.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {content.equipo.mostrar && (
        <section className="py-20 bg-[#0A0A0A]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-sans font-bold text-3xl text-[#F5F5F5] mb-3">
                {content.equipo.titulo}
              </h2>
              <p className="font-body text-lg text-[#9A9A9A]">
                {content.equipo.descripcion}
              </p>
            </div>
            <div className="relative aspect-[16/7] rounded-lg overflow-hidden">
              <Image
                src={content.equipo.imagen}
                alt={content.equipo.imagen_alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
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
