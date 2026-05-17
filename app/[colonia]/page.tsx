import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import shared from '@/content/shared.json'
import colonias from '@/content/colonias.json'
import menu from '@/content/menu.json'
import { MenuCard } from '@/components/MenuCard'
import { CTAStrip } from '@/components/CTAStrip'
import { SchemaScript } from '@/components/SchemaScript'

export async function generateStaticParams() {
  return colonias.colonias.map((c) => ({ colonia: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { colonia: string }
}): Promise<Metadata> {
  const colonia = colonias.colonias.find((c) => c.slug === params.colonia)
  if (!colonia) return {}

  return {
    title: `${colonia.h1} · ${shared.restaurante.nombre}`,
    description: colonia.descripcion,
    alternates: {
      canonical: `${shared.seo.canonical_base}/${colonia.slug}`,
    },
  }
}

export default function ColoniaPage({ params }: { params: { colonia: string } }) {
  const colonia = colonias.colonias.find((c) => c.slug === params.colonia)
  if (!colonia) notFound()

  const { whatsapp, nombre: restauranteNombre, tipo_cocina, ciudad } = shared.restaurante
  const mensajeColonia = `Hola, tengo un pedido para entregar en ${colonia.nombre}, ${ciudad}`
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensajeColonia)}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': `${shared.seo.canonical_base}/#restaurant`,
        name: restauranteNombre,
        servesCuisine: tipo_cocina,
        address: {
          '@type': 'PostalAddress',
          streetAddress: shared.restaurante.direccion.calle,
          addressLocality: shared.restaurante.direccion.ciudad,
          addressRegion: shared.restaurante.direccion.estado,
          postalCode: shared.restaurante.direccion.cp,
          addressCountry: 'MX',
        },
        telephone: shared.restaurante.telefono,
        areaServed: {
          '@type': 'Place',
          name: `${colonia.nombre}, ${ciudad}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Inicio',
            item: shared.seo.canonical_base,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: colonia.nombre,
            item: `${shared.seo.canonical_base}/${colonia.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <SchemaScript schema={schema} />

      <section className="py-24 lg:py-32 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-sans font-bold text-4xl lg:text-6xl text-[#F5F5F5] mb-6 tracking-tight leading-tight">
            {colonia.h1}
          </h1>
          <p className="font-body text-lg text-[#9A9A9A] mb-10 max-w-2xl mx-auto leading-relaxed">
            {colonia.descripcion}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-bold text-lg px-10 py-4 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: 'var(--brand-accent)' }}
          >
            Pedir a {colonia.nombre}
          </a>
        </div>
      </section>

      <section className="py-8 bg-[#141414] border-y border-[#2A2A2A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center gap-8 text-center">
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#9A9A9A] mb-1">
                Costo de envío
              </p>
              <p className="font-sans font-bold text-2xl text-[#F5F5F5]">
                {colonia.costo_envio}
              </p>
            </div>
            <div className="hidden sm:block w-px bg-[#2A2A2A]" />
            <div>
              <p className="font-sans text-xs uppercase tracking-widest text-[#9A9A9A] mb-1">
                Tiempo estimado
              </p>
              <p className="font-sans font-bold text-2xl text-[#F5F5F5]">
                {colonia.tiempo_entrega}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans font-bold text-3xl text-[#F5F5F5] mb-10 text-center">
            Lo que llevamos a {colonia.nombre}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
        </div>
      </section>

      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans font-bold text-3xl text-[#F5F5F5] mb-12 text-center">
            Cómo pedir a domicilio en {colonia.nombre}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { num: '01', titulo: 'Elige tu burger', desc: 'Revisa el menú y decide qué quieres.' },
              { num: '02', titulo: 'Escríbenos por WhatsApp', desc: `Mándanos tu pedido y tu dirección en ${colonia.nombre}.` },
              { num: '03', titulo: 'Recíbela en la puerta', desc: `La preparamos y te la llevamos en ${colonia.tiempo_entrega}.` },
            ].map((paso) => (
              <div key={paso.num} className="text-center">
                <p
                  className="font-sans font-black text-5xl mb-4"
                  style={{ color: 'var(--brand-accent)' }}
                >
                  {paso.num}
                </p>
                <h3 className="font-sans font-semibold text-lg text-[#F5F5F5] mb-2">
                  {paso.titulo}
                </h3>
                <p className="font-body text-sm text-[#9A9A9A] leading-relaxed">
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTAStrip
        titulo={`¿Estás en ${colonia.nombre}? Te llevamos tu burger.`}
        ctaTexto="Pedir ahora por WhatsApp"
      />
    </>
  )
}
