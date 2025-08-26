import { describe, test, expect, beforeAll } from '@jest/globals'
import { getFeaturedNews, getUpcomingEvents, getActiveCategories, getAllDynamicUrls } from '../src/lib/queries'
import fs from 'fs'
import path from 'path'

// Store baseline data for comparison
let baselineData: {
  featuredNews: any[]
  upcomingEvents: any[]
  categories: any[]
  dynamicUrls: string[]
  timestamp: number
} | null = null

describe('Data Consistency Testing', () => {
  beforeAll(async () => {
    // Capture current data state as baseline
    try {
      const [news, events, categories, urls] = await Promise.allSettled([
        getFeaturedNews(5),
        getUpcomingEvents(),
        getActiveCategories(),
        getAllDynamicUrls()
      ])

      baselineData = {
        featuredNews: news.status === 'fulfilled' ? news.value : [],
        upcomingEvents: events.status === 'fulfilled' ? events.value : [],
        categories: categories.status === 'fulfilled' ? categories.value : [],
        dynamicUrls: urls.status === 'fulfilled' ? urls.value : [],
        timestamp: Date.now()
      }

      // Save baseline to file for debugging if needed
      const baselinePath = path.join(__dirname, 'baseline-snapshot.json')
      fs.writeFileSync(baselinePath, JSON.stringify(baselineData, null, 2))
      
    } catch (error) {
      console.warn('Could not capture baseline data:', error)
    }
  }, 30000) // 30 second timeout for baseline capture

  describe('Query Result Consistency', () => {
    test('Featured news returns consistent data structure', async () => {
      const currentNews = await getFeaturedNews(5)
      
      expect(Array.isArray(currentNews)).toBe(true)
      expect(currentNews.length).toBeLessThanOrEqual(5)

      if (currentNews.length > 0) {
        // Verify each article has required properties
        currentNews.forEach(article => {
          expect(article).toHaveProperty('id')
          expect(article).toHaveProperty('title')
          expect(article).toHaveProperty('slug')
          expect(article).toHaveProperty('content')
          expect(article).toHaveProperty('status')
          expect(article).toHaveProperty('published_at')
          expect(article).toHaveProperty('category_id')
          expect(article).toHaveProperty('tags')
          
          // Verify data types
          expect(typeof article.id).toBe('string')
          expect(typeof article.title).toBe('string')
          expect(typeof article.slug).toBe('string')
          expect(typeof article.status).toBe('string')
          expect(Array.isArray(article.tags)).toBe(true)

          // Verify slug format (should be URL-friendly)
          expect(article.slug).toMatch(/^[a-z0-9-]+$/)
          
          // Verify status is published
          expect(article.status).toBe('published')
        })
      }

      // Compare with baseline if available
      if (baselineData && baselineData.featuredNews.length > 0) {
        expect(currentNews.length).toBeGreaterThanOrEqual(0)
        
        // Structure should be identical (ignoring timestamps)
        if (currentNews.length > 0 && baselineData.featuredNews.length > 0) {
          const currentStructure = Object.keys(currentNews[0])
          const baselineStructure = Object.keys(baselineData.featuredNews[0])
          
          expect(currentStructure.sort()).toEqual(baselineStructure.sort())
        }
      }
    })

    test('Upcoming events returns consistent data structure', async () => {
      const currentEvents = await getUpcomingEvents()
      
      expect(Array.isArray(currentEvents)).toBe(true)

      if (currentEvents.length > 0) {
        currentEvents.forEach(event => {
          expect(event).toHaveProperty('id')
          expect(event).toHaveProperty('title')
          expect(event).toHaveProperty('slug')
          expect(event).toHaveProperty('start_date')
          expect(event).toHaveProperty('status')
          expect(event).toHaveProperty('tags')

          // Verify data types
          expect(typeof event.id).toBe('string')
          expect(typeof event.title).toBe('string')
          expect(typeof event.slug).toBe('string')
          expect(typeof event.start_date).toBe('string')
          expect(typeof event.status).toBe('string')
          expect(Array.isArray(event.tags)).toBe(true)

          // Verify event is published and in future
          expect(event.status).toBe('published')
          
          const eventDate = new Date(event.start_date)
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          
          expect(eventDate.getTime()).toBeGreaterThanOrEqual(today.getTime())
        })
      }
    })

    test('Active categories returns consistent data structure', async () => {
      const currentCategories = await getActiveCategories()
      
      expect(Array.isArray(currentCategories)).toBe(true)

      if (currentCategories.length > 0) {
        currentCategories.forEach(category => {
          expect(category).toHaveProperty('id')
          expect(category).toHaveProperty('name')
          expect(category).toHaveProperty('slug')
          expect(category).toHaveProperty('is_active')
          expect(category).toHaveProperty('count')

          // Verify data types
          expect(typeof category.id).toBe('string')
          expect(typeof category.name).toBe('string')
          expect(typeof category.slug).toBe('string')
          expect(typeof category.is_active).toBe('boolean')
          expect(typeof category.count).toBe('number')

          // Verify category is active
          expect(category.is_active).toBe(true)
          
          // Verify count is non-negative
          expect(category.count).toBeGreaterThanOrEqual(0)
        })
      }
    })

    test('Dynamic URLs are properly formatted', async () => {
      const urls = await getAllDynamicUrls()
      
      expect(Array.isArray(urls)).toBe(true)

      if (urls.length > 0) {
        urls.forEach(url => {
          // Should be strings
          expect(typeof url).toBe('string')
          
          // Should start with /
          expect(url.startsWith('/')).toBe(true)
          
          // Should not have double slashes
          expect(url).not.toMatch(/\/\//)
          
          // Should be valid URL path format
          expect(url).toMatch(/^\/[a-z0-9\-\/]*$/)
        })

        // Should have no duplicates
        const uniqueUrls = [...new Set(urls)]
        expect(uniqueUrls.length).toBe(urls.length)
      }
    })
  })

  describe('Data Relationship Integrity', () => {
    test('News articles have valid categories', async () => {
      const news = await getFeaturedNews(10)
      const categories = await getActiveCategories()

      if (news.length > 0 && categories.length > 0) {
        const categoryIds = categories.map(cat => cat.id)

        news.forEach(article => {
          if (article.category_id) {
            expect(categoryIds.includes(article.category_id)).toBe(true)
          }
        })
      }
    })

    test('Events have valid categories', async () => {
      const events = await getUpcomingEvents()
      const categories = await getActiveCategories()

      if (events.length > 0 && categories.length > 0) {
        const categoryIds = categories.map(cat => cat.id)

        events.forEach(event => {
          if (event.category_id) {
            expect(categoryIds.includes(event.category_id)).toBe(true)
          }
        })
      }
    })

    test('Tags are properly transformed', async () => {
      const news = await getFeaturedNews(5)

      news.forEach(article => {
        expect(Array.isArray(article.tags)).toBe(true)
        
        article.tags.forEach(tag => {
          expect(tag).toHaveProperty('name')
          expect(tag).toHaveProperty('slug')
          expect(typeof tag.name).toBe('string')
          expect(typeof tag.slug).toBe('string')
          expect(tag.name.length).toBeGreaterThan(0)
          expect(tag.slug.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Performance Consistency', () => {
    test('Queries complete within reasonable time consistently', async () => {
      const iterations = 3
      const durations: number[] = []

      for (let i = 0; i < iterations; i++) {
        const start = Date.now()
        await getFeaturedNews(5)
        const duration = Date.now() - start
        durations.push(duration)
        
        // Each query should complete quickly
        expect(duration).toBeLessThan(10000) // 10 seconds max
      }

      // Performance should be relatively consistent
      const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length
      const maxVariation = Math.max(...durations) - Math.min(...durations)
      
      // Variation shouldn't be excessive (within 5x of average)
      expect(maxVariation).toBeLessThan(avgDuration * 5)
    })
  })

  describe('Data Validation Rules', () => {
    test('Published content meets quality standards', async () => {
      const news = await getFeaturedNews(10)

      news.forEach(article => {
        // Title should be meaningful length
        expect(article.title.length).toBeGreaterThan(5)
        expect(article.title.length).toBeLessThan(200)
        
        // Content should exist
        expect(article.content.length).toBeGreaterThan(0)
        
        // Slug should be URL-safe
        expect(article.slug).toMatch(/^[a-z0-9-]+$/)
        
        // Published date should be valid
        if (article.published_at) {
          const publishDate = new Date(article.published_at)
          expect(publishDate.getTime()).toBeGreaterThan(0)
          
          // Shouldn't be too far in the future
          const oneYearFromNow = new Date()
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
          expect(publishDate.getTime()).toBeLessThan(oneYearFromNow.getTime())
        }
      })
    })

    test('Events have valid date ranges', async () => {
      const events = await getUpcomingEvents()

      events.forEach(event => {
        const startDate = new Date(event.start_date)
        
        // Start date should be valid
        expect(startDate.getTime()).toBeGreaterThan(0)
        
        // If end date exists, should be >= start date
        if (event.end_date) {
          const endDate = new Date(event.end_date)
          expect(endDate.getTime()).toBeGreaterThanOrEqual(startDate.getTime())
        }

        // Time fields should be valid if present
        if (event.start_time) {
          expect(event.start_time).toMatch(/^\d{2}:\d{2}:\d{2}$/)
        }
        
        if (event.end_time) {
          expect(event.end_time).toMatch(/^\d{2}:\d{2}:\d{2}$/)
        }
      })
    })
  })
})

// Helper function to normalize data for comparison (ignoring timestamps)
function normalizeForComparison(data: any) {
  if (Array.isArray(data)) {
    return data.map(item => normalizeForComparison(item))
  }
  
  if (data && typeof data === 'object') {
    const normalized: any = {}
    
    for (const [key, value] of Object.entries(data)) {
      // Skip timestamp fields that naturally change
      if (!['created_at', 'updated_at', 'published_at'].includes(key)) {
        normalized[key] = normalizeForComparison(value)
      }
    }
    
    return normalized
  }
  
  return data
}

export { normalizeForComparison }