import shared from '@/content/shared.json'
import colonias from '@/content/colonias.json'

export async function GET() {
  const { restaurante, seo } = shared
  const BASE = seo.canonical_base

  const ctaLineas: string[] = []
  if (restaurante.whatsapp) {
    ctaLineas.push(
      `- Pedir por WhatsApp: https://wa.me/${restaurante.whatsapp}?text=${encodeURIComponent(restaurante.whatsapp_mensaje)}`
    )
  }
  if (restaurante.menu_completo_url) {
    ctaLineas.push(`- Pedir en línea: ${restaurante.menu_completo_url}`)
  }

  const menuCompletoLinea = restaurante.menu_completo_url
    ? `- [Ver menú con precios](${restaurante.menu_completo_url}): plataforma de pedidos en línea con precios actualizados.`
    : ''

  const zonasLineas = colonias.colonias
    .map((c) => `- [${c.nombre}](${BASE}/${c.slug})`)
    .join('\n')

  const horariosLineas = restaurante.horarios
    .map((h) => `- ${h.dias}: ${h.horas}`)
    .join('\n')

  const content = `# ${restaurante.nombre}

> ${restaurante.descripcion_corta}

${restaurante.nombre} es un restaurante de ${restaurante.tipo_cocina} ubicado en ${restaurante.ciudad}, ${restaurante.estado}, México.

## Hacer un pedido

${ctaLineas.join('\n')}

## Menú

- [Menú](${BASE}/menu): catálogo de platillos estrella.
${menuCompletoLinea}

## Páginas principales

- [Inicio](${BASE}/): presentación del restaurante y platillos estrella
- [Menú](${BASE}/menu): catálogo de platillos
- [Nosotros](${BASE}/nosotros): historia y valores del restaurante
- [Galería](${BASE}/galeria): fotos del lugar y platillos
- [Contacto](${BASE}/contacto): dirección, horarios y preguntas frecuentes

## Zonas de entrega en ${restaurante.ciudad}

${zonasLineas}

## Horarios

${horariosLineas}

## Contacto

- Dirección: ${restaurante.direccion.calle}, ${restaurante.direccion.colonia}, ${restaurante.ciudad}
- Teléfono: ${restaurante.telefono}
- WhatsApp: https://wa.me/${restaurante.whatsapp}
- Email: ${restaurante.email}
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
