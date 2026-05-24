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

## Regla #2 — Colores siempre via tokens semánticos

Nunca colores hex hardcodeados en componentes. Usar siempre las clases Tailwind semánticas:

| Clase Tailwind | Token CSS | Uso |
|----------------|-----------|-----|
| `bg-bg` | `--color-bg` | Fondo principal de página |
| `bg-surface` | `--color-surface` | Navbar, footer, cards |
| `bg-surface-2` | `--color-surface-2` | Secciones alternas |
| `border-border` / `divide-border` | `--color-border` | Bordes y divisores |
| `text-text` | `--color-text` | Texto principal |
| `text-muted` | `--color-text-muted` | Texto secundario |
| `text-gold` / `bg-gold` | `--color-gold` | Acento dorado |

Para cambiar el tema completo: editar solo `globals.css` (valores de `:root`).

El color de acento de marca sigue siendo excepción — viene de `shared.json → brand.color_acento`
inyectado en `layout.tsx` y se usa via `style={{ color: 'var(--brand-accent)' }}` o `text-accent`.

Excepciones válidas de color hardcodeado:
- `text-white` / `bg-white` sobre fondos de color (botones accent, overlay de hero)
- `bg-black/{opacity}` para overlays sobre imágenes

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

## Paleta (tema light)

```css
--color-bg:        #FAFAF8   /* fondo principal */
--color-surface:   #FFFFFF   /* navbar, footer, cards */
--color-surface-2: #F5F5F3   /* secciones alternas */
--color-border:    #E5E5E0   /* separadores — no usar <hr> */
--color-text:      #1A1A1A   /* texto principal */
--color-text-muted:#6B6B6B   /* texto secundario */
--color-gold:      #B8960C   /* dorado (con contraste en light) */
--brand-accent:    var desde shared.json  /* rojo #E63946 para Dark Kitchen */
```

Para cambiar a otro tema: reemplazar los valores de `:root` en `globals.css`. Los componentes no cambian.

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
