import type { APIRoute } from 'astro'
import { supabase } from '../lib/supabase'

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
  
  // Initialize arrays for dynamic content
  let newsArticles: string[] = []
  let events: string[] = []
  let archivePages: string[] = []

  try {
    // Fetch published news articles
    const { data: newsData, error: newsError } = await supabase
      .from('news')
      .select('slug')
      .eq('status', 'published')
    
    if (!newsError && newsData) {
      newsArticles = newsData.map(article => `/news/${article.slug}`)
    }

    // Fetch published events
    const { data: eventsData, error: eventsError } = await supabase
      .from('events')
      .select('slug')
      .eq('status', 'published')
    
    if (!eventsError && eventsData) {
      events = eventsData.map(event => `/events/${event.slug}`)
    }

    // Fetch active categories for archive pages
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('slug')
      .eq('is_active', true)
    
    if (!categoriesError && categoriesData) {
      const categoryPages = categoriesData.map(category => `/news/category/${category.slug}`)
      archivePages.push(...categoryPages)
    }

    // Fetch active tags for archive pages
    const { data: tagsData, error: tagsError } = await supabase
      .from('tags')
      .select('slug')
      .eq('is_active', true)
    
    if (!tagsError && tagsData) {
      const tagPages = tagsData.map(tag => `/news/tag/${tag.slug}`)
      archivePages.push(...tagPages)
    }

    // Generate date-based archive pages from actual news data
    if (!newsError && newsData) {
      const { data: newsWithDates, error: datesError } = await supabase
        .from('news')
        .select('published_at')
        .eq('status', 'published')
        .not('published_at', 'is', null)
      
      if (!datesError && newsWithDates) {
        const datePages = new Set<string>()
        
        newsWithDates.forEach(article => {
          if (article.published_at) {
            const date = new Date(article.published_at)
            const year = date.getFullYear()
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            datePages.add(`/news/${year}/${month}`)
          }
        })
        
        archivePages.push(...Array.from(datePages))
      }
    }

    // Add static archive pages
    archivePages.push('/news/archive')

  } catch (error) {
    console.error('Error fetching sitemap data:', error)
    // Continue with empty arrays if database queries fail
  }

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...newsArticles,
    ...events,
    ...archivePages
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