import type { APIRoute } from 'astro'
import { getAllDynamicUrls } from '../lib/queries'

// Static pages that don't change
const staticPages = [
  '',
  '/about',
  '/academic-programs',
  '/academic-year', 
  '/campus-facilities',
  '/news',
  '/contact'
]

export const GET: APIRoute = async () => {
  const baseUrl = 'https://your-school-domain.com'
  
  // Fetch all dynamic URLs using centralized queries
  const dynamicUrls = await getAllDynamicUrls()

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...dynamicUrls
  ]

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => {
  // Determine change frequency and priority based on page type
  let changefreq = 'monthly'
  let priority = '0.6'
  
  if (page === '') {
    changefreq = 'daily'
    priority = '1.0'
  } else if (page.startsWith('/news/') && !page.includes('/category/') && !page.includes('/tag/') && !page.includes('/archive')) {
    // Individual news articles
    changefreq = 'weekly'
    priority = '0.8'
  } else if (page === '/news') {
    changefreq = 'daily'
    priority = '0.9'
  } else if (page.startsWith('/events/')) {
    changefreq = 'weekly'
    priority = '0.7'
  }
  
  return `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}