import type { MetadataRoute } from 'next'
import shared from '@/content/shared.json'

const BASE = shared.seo.canonical_base

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
