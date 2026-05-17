import type { MetadataRoute } from 'next'
import shared from '@/content/shared.json'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${shared.seo.canonical_base}/sitemap.xml`,
  }
}
