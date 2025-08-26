import { createClient } from '@supabase/supabase-js'

// Supabase configuration - handle both Astro and Jest environments
let supabaseUrl: string
let supabaseAnonKey: string

try {
  // Try Astro environment first
  supabaseUrl = import.meta.env.SUPABASE_URL || ''
  supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || ''
} catch {
  // Fallback to Node/Jest environment  
  supabaseUrl = process.env.SUPABASE_URL || 'http://localhost:54321'
  supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'mock-key-for-testing'
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface NewsArticle {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  category_id: number
  category?: Category
  tags?: Tag[]
  meta_title?: string
  meta_description?: string
  featured_image_id?: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Event {
  id: number
  title: string
  slug: string
  description?: string
  content?: string
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  location?: string
  is_all_day: boolean
  is_recurring: boolean
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  category_id: number
  category?: Category
  tags?: Tag[]
  featured_image_id?: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  type: 'news' | 'event' | 'both'
  color?: string
  is_active: boolean
  count?: number
  created_at: string
  updated_at: string
}

export interface Tag {
  id: number
  name: string
  slug: string
  description?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Error handling utilities (kept simple)

// Data transformation utilities
const transformNewsArticle = (article: any): NewsArticle => ({
  ...article,
  tags: article.tags?.map((t: any) => t.tag).filter(Boolean) || []
})

const transformEvent = (event: any): Event => ({
  ...event,
  tags: event.tags?.map((t: any) => t.tag).filter(Boolean) || []
})

// Cache for runtime queries (future Server Islands)
const runtimeCache = new Map<string, { data: any; timestamp: number; ttl: number }>()

function getCachedData<T>(key: string, fetchFn: () => Promise<T>, ttl: number = 300000): Promise<T> {
  const cached = runtimeCache.get(key)
  const now = Date.now()
  
  if (cached && (now - cached.timestamp) < cached.ttl) {
    return Promise.resolve(cached.data)
  }
  
  return fetchFn().then(data => {
    runtimeCache.set(key, { data, timestamp: now, ttl })
    return data
  })
}

// ==============================================
// BUILD-TIME QUERIES (Static Site Generation)
// ==============================================

export async function getFeaturedNews(limit: number = 5): Promise<NewsArticle[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return (data || []).map(transformNewsArticle)
  } catch (error) {
    console.error('Error fetching featured news:', error)
    return []
  }
}

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  try {
    const today = new Date().toISOString().split('T')[0]
    
    let query = supabase
      .from('events')
      .select(`
        *,
        category:categories(*),
        tags:event_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .gte('start_date', today)
      .order('start_date', { ascending: true })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    if (error) throw error
    return (data || []).map(transformEvent)
  } catch (error) {
    console.error('Error fetching upcoming events:', error)
    return []
  }
}

export async function getActiveCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (error) throw error
    return (data || []).map(category => ({
      ...category,
      count: 0
    }))
  } catch (error) {
    console.error('Error fetching active categories:', error)
    return []
  }
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data ? transformNewsArticle(data) : null
  } catch (error) {
    console.error(`Error fetching article with slug "${slug}":`, error)
    return null
  }
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        category:categories(*),
        tags:event_tags(tag:tags(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error
    return data ? transformEvent(data) : null
  } catch (error) {
    console.error(`Error fetching event with slug "${slug}":`, error)
    return null
  }
}

export async function getRelatedArticles(currentSlug: string, categoryId?: string, limit: number = 3): Promise<NewsArticle[]> {
  try {
    let query = supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .neq('slug', currentSlug)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query
    if (error) throw error
    return (data || []).map(transformNewsArticle)
  } catch (error) {
    console.error('Error fetching related articles:', error)
    return []
  }
}

export async function getRelatedEvents(currentSlug: string, categoryId?: string, limit: number = 3): Promise<Event[]> {
  try {
    let query = supabase
      .from('events')
      .select(`
        *,
        category:categories(*),
        tags:event_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .neq('slug', currentSlug)
      .order('start_date', { ascending: true })
      .limit(limit)

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query
    if (error) throw error
    return (data || []).map(transformEvent)
  } catch (error) {
    console.error('Error fetching related events:', error)
    return []
  }
}

// ==============================================
// STATIC PATHS GENERATION (Build-time only)
// ==============================================

export async function getAllNewsArticleSlugs(): Promise<{ params: { slug: string } }[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('slug')
      .eq('status', 'published')
    
    if (error) throw error
    return (data || []).map(article => ({
      params: { slug: article.slug }
    }))
  } catch (error) {
    console.error(`BUILD FAILED: Query 'getAllNewsArticleSlugs' failed:`, error)
    throw error
  }
}

export async function getAllEventSlugs(): Promise<{ params: { slug: string } }[]> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('slug')
      .eq('status', 'published')
    
    if (error) throw error
    return (data || []).map(event => ({
      params: { slug: event.slug }
    }))
  } catch (error) {
    console.error(`BUILD FAILED: Query 'getAllEventSlugs' failed:`, error)
    throw error
  }
}

export async function getAllCategorySlugs(): Promise<{ params: { slug: string } }[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('slug')
      .eq('is_active', true)
    
    if (error) throw error
    return (data || []).map(category => ({
      params: { slug: category.slug }
    }))
  } catch (error) {
    console.error(`BUILD FAILED: Query 'getAllCategorySlugs' failed:`, error)
    throw error
  }
}

export async function getAllTagSlugs(): Promise<{ params: { slug: string } }[]> {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('slug')
      .eq('is_active', true)
    
    if (error) throw error
    return (data || []).map(tag => ({
      params: { slug: tag.slug }
    }))
  } catch (error) {
    console.error(`BUILD FAILED: Query 'getAllTagSlugs' failed:`, error)
    throw error
  }
}

export async function getAllDateArchivePaths(): Promise<{ params: { year: string; month: string } }[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('published_at')
      .eq('status', 'published')
      .not('published_at', 'is', null)

    if (error) {
      console.error('Database error in getAllDateArchivePaths:', error)
      return []
    }

    if (!data || data.length === 0) {
      return []
    }

    const paths = new Set<string>()
    
    data.forEach(item => {
      if (item && item.published_at) {
        try {
          const date = new Date(item.published_at)
          if (!isNaN(date.getTime())) {
            const year = date.getFullYear().toString()
            const month = (date.getMonth() + 1).toString().padStart(2, '0')
            paths.add(`${year}/${month}`)
          }
        } catch (dateError) {
          console.warn('Invalid date format:', item.published_at)
        }
      }
    })

    const result = Array.from(paths).map(path => {
      const [year, month] = path.split('/')
      return { params: { year, month } }
    })

    return result
  } catch (error) {
    console.error('Error in getAllDateArchivePaths:', error)
    return []
  }
}

// ==============================================
// CONTENT QUERIES BY FILTERS
// ==============================================

export async function getNewsByCategory(categorySlug: string, page: number = 1, limit: number = 10): Promise<{ articles: NewsArticle[]; total: number; hasMore: boolean }> {
  try {
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `, { count: 'exact' })
      .eq('status', 'published')
      .eq('categories.slug', categorySlug)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    
    const articles = (data || []).map(transformNewsArticle)
    const total = count || 0
    const hasMore = total > offset + articles.length

    return { articles, total, hasMore }
  } catch (error) {
    console.error(`Error fetching news by category "${categorySlug}":`, error)
    return { articles: [], total: 0, hasMore: false }
  }
}

export async function getNewsByTag(tagSlug: string, page: number = 1, limit: number = 10): Promise<{ articles: NewsArticle[]; total: number; hasMore: boolean }> {
  try {
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `, { count: 'exact' })
      .eq('status', 'published')
      .eq('news_tags.tags.slug', tagSlug)
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    
    const articles = (data || []).map(transformNewsArticle)
    const total = count || 0
    const hasMore = total > offset + articles.length

    return { articles, total, hasMore }
  } catch (error) {
    console.error(`Error fetching news by tag "${tagSlug}":`, error)
    return { articles: [], total: 0, hasMore: false }
  }
}

export async function getNewsByDateArchive(year: string, month: string): Promise<NewsArticle[]> {
  try {
    const startDate = `${year}-${month.padStart(2, '0')}-01`
    const endDate = `${year}-${month.padStart(2, '0')}-31`

    const { data, error } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `)
      .eq('status', 'published')
      .gte('published_at', startDate)
      .lt('published_at', endDate)
      .order('published_at', { ascending: false })

    if (error) throw error
    return (data || []).map(transformNewsArticle)
  } catch (error) {
    console.error(`Error fetching news archive for ${year}-${month}:`, error)
    return []
  }
}

export async function getNewsArchive(page: number = 1, limit: number = 10): Promise<{ articles: NewsArticle[]; total: number; hasMore: boolean }> {
  try {
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('news')
      .select(`
        *,
        category:categories(*),
        tags:news_tags(tag:tags(*))
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error
    
    const articles = (data || []).map(transformNewsArticle)
    const total = count || 0
    const hasMore = total > offset + articles.length

    return { articles, total, hasMore }
  } catch (error) {
    console.error('Error fetching news archive:', error)
    return { articles: [], total: 0, hasMore: false }
  }
}

// ==============================================
// UTILITY FUNCTIONS
// ==============================================

export async function getAllDynamicUrls(): Promise<string[]> {
  try {
    const [newsUrls, eventUrls, categoryUrls, tagUrls, dateUrls] = await Promise.allSettled([
      supabase.from('news').select('slug').eq('status', 'published').then(({ data }) => 
        (data || []).map(item => `/news/${item.slug}`)
      ),
      supabase.from('events').select('slug').eq('status', 'published').then(({ data }) => 
        (data || []).map(item => `/events/${item.slug}`)
      ),
      supabase.from('categories').select('slug').eq('is_active', true).then(({ data }) => 
        (data || []).map(item => `/news/category/${item.slug}`)
      ),
      supabase.from('tags').select('slug').eq('is_active', true).then(({ data }) => 
        (data || []).map(item => `/news/tag/${item.slug}`)
      ),
      getAllDateArchivePaths().then(paths =>
        paths.map(path => `/news/${path.params.year}/${path.params.month}`)
      )
    ])

    const allUrls = [
      ...(newsUrls.status === 'fulfilled' ? newsUrls.value : []),
      ...(eventUrls.status === 'fulfilled' ? eventUrls.value : []),
      ...(categoryUrls.status === 'fulfilled' ? categoryUrls.value : []),
      ...(tagUrls.status === 'fulfilled' ? tagUrls.value : []),
      ...(dateUrls.status === 'fulfilled' ? dateUrls.value : [])
    ]

    return [...allUrls, '/news/archive']
  } catch (error) {
    console.error('Error generating dynamic URLs:', error)
    return []
  }
}

export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('categories')
      .select('id')
      .limit(1)
    return !error
  } catch {
    return false
  }
}

export async function getContentCounts(): Promise<{ news: number; events: number; categories: number }> {
  try {
    const [newsResult, eventsResult, categoriesResult] = await Promise.allSettled([
      supabase.from('news').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('events').select('*', { count: 'exact', head: true }).eq('status', 'published'),
      supabase.from('categories').select('*', { count: 'exact', head: true }).eq('is_active', true)
    ])

    return {
      news: newsResult.status === 'fulfilled' ? (newsResult.value.count || 0) : 0,
      events: eventsResult.status === 'fulfilled' ? (eventsResult.value.count || 0) : 0,
      categories: categoriesResult.status === 'fulfilled' ? (categoriesResult.value.count || 0) : 0
    }
  } catch (error) {
    console.error('Error fetching content counts:', error)
    return { news: 0, events: 0, categories: 0 }
  }
}

// ==============================================
// RUNTIME QUERIES (Future Server Islands)
// ==============================================

export const runtime = {
  async getFeaturedNews(limit: number = 5): Promise<NewsArticle[]> {
    return getCachedData(
      `featured-news-${limit}`,
      () => getFeaturedNews(limit),
      300000 // 5 minutes cache
    )
  },

  async getUpcomingEvents(limit?: number): Promise<Event[]> {
    return getCachedData(
      `upcoming-events-${limit || 'all'}`,
      () => getUpcomingEvents(limit),
      600000 // 10 minutes cache
    )
  },

  async getActiveCategories(): Promise<Category[]> {
    return getCachedData(
      'active-categories',
      () => getActiveCategories(),
      3600000 // 1 hour cache
    )
  }
}