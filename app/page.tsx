import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import shared from '@/content/shared.json'
import home from '@/content/home.json'
import menu from '@/content/menu.json'
import { MenuCard } from '@/components/MenuCard'
import { CTAStrip } from '@/components/CTAStrip'
import { SchemaScript } from '@/components/SchemaScript'

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  openGraph: { images: [home.meta.og_image] },
  alternates: { canonical: shared.seo.canonical_base },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Restaurant',
      '@id': `${shared.seo.canonical_base}/#restaurant`,
      name: shared.restaurante.nombre,
      description: shared.restaurante.descripcion_corta,
      url: shared.seo.canonical_base,
      telephone: shared.restaurante.telefono,
      email: shared.restaurante.email,
      servesCuisine: shared.restaurante.tipo_cocina,
      address: {
        '@type': 'PostalAddress',
        streetAddress: shared.restaurante.direccion.calle,
        addressLocality: shared.restaurante.direccion.ciudad,
        addressRegion: shared.restaurante.direccion.estado,
        postalCode: shared.restaurante.direccion.cp,
        addressCountry: 'MX',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: shared.restaurante.coordenadas.lat,
        longitude: shared.restaurante.coordenadas.lng,
      },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '12:00', closes: '23:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '01:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '13:00', closes: '22:00' },
      ],
      sameAs: Object.values(shared.restaurante.redes_sociales).filter(Boolean),
      priceRange: '$$',
      image: `${shared.seo.canonical_base}${home.meta.og_image}`,
    },
    {
      '@type': 'WebSite',
      '@id': `${shared.seo.canonical_base}/#website`,
      url: shared.seo.canonical_base,
      name: shared.restaurante.nombre,
      inLanguage: 'es-MX',
    },
  ],
}

export default function Home() {
  const { whatsapp, whatsapp_mensaje } = shared.restaurante
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`

  return (
    <>
      <SchemaScript schema={schema} />

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src={home.hero.imagen}
          alt={home.hero.imagen_alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-sans font-bold text-5xl lg:text-7xl text-white mb-6 leading-tight tracking-tight">
            {home.hero.h1}
          </h1>
          <p className="font-body text-lg lg:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed">
            {home.hero.subtitulo}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-bold text-lg px-10 py-4 rounded-full text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: 'var(--brand-accent)' }}
            >
              {home.hero.cta_principal_texto}
            </a>
            <Link
              href={home.hero.cta_secundario_url}
              className="font-sans font-bold text-lg px-10 py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              {home.hero.cta_secundario_texto}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#141414] py-8 border-b border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-[#9A9A9A] mb-4">
            {home.prueba_social.titulo}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {home.prueba_social.items.map((item, i) => (
              <span key={i} className="font-sans font-semibold text-base text-[#F5F5F5]">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-sans font-bold text-3xl lg:text-5xl text-[#F5F5F5] leading-tight">
            {home.impacto.texto}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-sans font-bold text-3xl lg:text-4xl text-[#F5F5F5] mb-3">
              {home.platillos_estrella.titulo}
            </h2>
            <p className="font-body text-lg text-[#9A9A9A]">
              {home.platillos_estrella.subtitulo}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {menu.platillos.map((p) => (
              <MenuCard
                key={p.id}
                nombre={p.nombre}
                descripcion={p.descripcion}
                imagen={p.imagen}
                imagen_alt={p.imagen_alt}
              />
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/menu"
              className="font-sans font-semibold text-base px-8 py-3 rounded-full border border-[#2A2A2A] text-[#F5F5F5] hover:border-[var(--brand-accent)] transition-colors"
            >
              {home.platillos_estrella.ver_menu_texto} →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={home.nosotros_preview.imagen}
                alt={home.nosotros_preview.imagen_alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div>
              <h2 className="font-sans font-bold text-3xl lg:text-4xl text-[#F5F5F5] mb-6 leading-tight">
                {home.nosotros_preview.titulo}
              </h2>
              <p className="font-body text-lg text-[#9A9A9A] leading-relaxed mb-8">
                {home.nosotros_preview.texto}
              </p>
              <Link
                href={home.nosotros_preview.cta_url}
                className="font-sans font-semibold text-base hover:opacity-80 transition-opacity"
                style={{ color: 'var(--brand-accent)' }}
              >
                {home.nosotros_preview.cta_texto} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTAStrip
        titulo={home.cta_final.titulo}
        subtitulo={home.cta_final.subtitulo}
        ctaTexto={home.cta_final.cta_texto}
      />
    </>
  )
}
