import type { Metadata } from 'next'
import shared from '@/content/shared.json'
import content from '@/content/contacto.json'
import { CTAStrip } from '@/components/CTAStrip'
import { SchemaScript } from '@/components/SchemaScript'
import { FAQAccordion } from '@/components/FAQAccordion'

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  openGraph: { images: [content.meta.og_image] },
  alternates: { canonical: `${shared.seo.canonical_base}/contacto` },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Restaurant',
      '@id': `${shared.seo.canonical_base}/#restaurant`,
      name: shared.restaurante.nombre,
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
      telephone: shared.restaurante.telefono,
      hasMap: shared.restaurante.google_maps_url,
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '12:00', closes: '23:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '01:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '13:00', closes: '22:00' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: content.faq.map((item) => ({
        '@type': 'Question',
        name: item.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: item.respuesta },
      })),
    },
  ],
}

export default function ContactoPage() {
  const { telefono, email, whatsapp, whatsapp_mensaje, direccion, horarios, google_maps_embed } = shared.restaurante
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsapp_mensaje)}`

  return (
    <>
      <SchemaScript schema={schema} />

      <section className="py-24 lg:py-32 bg-[#0A0A0A] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans font-bold text-5xl lg:text-6xl text-[#F5F5F5] mb-4 tracking-tight">
            {content.hero.titulo}
          </h1>
          <p className="font-body text-xl text-[#9A9A9A]">
            {content.hero.subtitulo}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#141414]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <p className="font-sans text-xs uppercase tracking-widest text-[#9A9A9A] mb-3">
                  Dirección
                </p>
                <p className="font-body text-base text-[#F5F5F5]">
                  {direccion.calle}
                </p>
                <p className="font-body text-base text-[#9A9A9A]">
                  {direccion.colonia}, {direccion.ciudad}, {direccion.estado}
                </p>
              </div>

              <div className="mb-8 flex flex-col gap-2">
                <a href={`tel:${telefono}`}
                  className="font-body text-base text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
                  {telefono}
                </a>
                <a href={`mailto:${email}`}
                  className="font-body text-base text-[#9A9A9A] hover:text-[#F5F5F5] transition-colors">
                  {email}
                </a>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="font-body text-base font-semibold hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--brand-accent)' }}>
                  Escribir por WhatsApp →
                </a>
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-[#9A9A9A] mb-3">
                  Horarios
                </p>
                <div className="flex flex-col gap-1">
                  {horarios.map((h, i) => (
                    <div key={i} className="flex justify-between font-body text-sm">
                      <span className="text-[#9A9A9A]">{h.dias}</span>
                      <span className="text-[#F5F5F5]">{h.horas}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#2A2A2A] h-80 lg:h-auto">
              <iframe
                src={google_maps_embed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Ubicación de ${shared.restaurante.nombre}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans font-bold text-3xl text-[#F5F5F5] mb-10 text-center">
            Preguntas frecuentes
          </h2>
          <FAQAccordion items={content.faq} />
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
