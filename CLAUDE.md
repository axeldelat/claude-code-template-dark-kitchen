# Dark Kitchen Template — Claude Code

Template reutilizable de sitio web para restaurantes clientes de Markerante.
Restaurante de referencia: **Dark Kitchen Burger**, Cancún, México.

## Stack

- Next.js 14+ App Router
- TypeScript (strict)
- Tailwind CSS
- pnpm
- Deploy: Vercel

## Comandos

```bash
pnpm dev          # desarrollo local
pnpm run build    # build de producción — correr después de cada FASE
pnpm run lint     # ESLint
```

## Regla #1 — Contenido desde JSON, siempre

**Cero texto hardcodeado en componentes.** Todo string visible viene de `content/`:

```
content/shared.json       → datos globales del restaurante
content/home.json
content/menu.json
content/nosotros.json
content/galeria.json
content/contacto.json
content/colonias.json     → zonas de entrega (SEO programático)
```

Importar así: `import content from '@/content/home.json'`

## Regla #2 — Color de acento nunca hardcodeado

Usar siempre `var(--brand-accent)` — nunca `#E63946` directo en componentes.
El valor viene de `shared.json → brand.color_acento` inyectado en `layout.tsx`.

## Regla #3 — next/image siempre

Nunca `<img>`. Siempre `next/image` con `alt` del JSON y `sizes` apropiado.

## Regla #4 — Sin precios en ningún componente

Ni en menú, ni en hero, ni en ningún JSON visible al usuario.

## Regla #5 — generateMetadata en cada page.tsx

```ts
export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: `${shared.seo.canonical_base}/[ruta]` },
}
```

## Regla #6 — SchemaScript con JSON-LD en cada página

```tsx
import { SchemaScript } from '@/components/SchemaScript'
// En el return: <SchemaScript schema={schema} />
```

## Estructura de archivos

```
app/
  layout.tsx              → Navbar + Footer + WhatsAppButton + brand CSS vars
  page.tsx                → /
  menu/page.tsx
  nosotros/page.tsx
  galeria/page.tsx
  contacto/page.tsx
  [colonia]/page.tsx      → SSG con generateStaticParams()
  sitemap.ts
  robots.ts
  llms.txt/route.ts       → AEO para LLMs

components/
  Navbar.tsx
  Footer.tsx
  WhatsAppButton.tsx      → flotante fijo, verde WhatsApp
  CTAStrip.tsx            → franja antes del footer, fondo var(--brand-accent)
  MenuCard.tsx            → sin precio nunca
  GalleryGrid.tsx
  SchemaScript.tsx

content/                  → todos los JSONs del restaurante
public/images/            → fotos del restaurante
```

## Paleta

```css
--color-bg:        #0A0A0A   /* fondo principal */
--color-surface:   #141414   /* cards, navbar, footer */
--color-border:    #2A2A2A   /* separadores — no usar <hr> */
--color-text:      #F5F5F5   /* texto principal */
--color-text-muted:#9A9A9A   /* texto secundario */
--brand-accent:    var desde shared.json  /* rojo #E63946 para Dark Kitchen */
```

## Tipografía

- `font-sans` (DM Sans) → headings, navbar, CTAs, labels
- `font-body` (Open Sans) → párrafos, descripciones

## Páginas de colonia — SSG

`app/[colonia]/page.tsx` usa `generateStaticParams()` con el array de `content/colonias.json`.
Son SSG — nunca SSR.

## Links de WhatsApp

Siempre: `https://wa.me/${whatsapp}?text=${encodeURIComponent(mensaje)}`
Con `target="_blank" rel="noopener noreferrer"`.

## Verificación al terminar cada FASE

```bash
pnpm run build
```

No avanzar a la siguiente FASE si hay errores TypeScript o de compilación.
