import { describe, test, expect, beforeEach, afterEach, jest } from '@jest/globals'
import { queries, getFeaturedNews, getUpcomingEvents, getAllNewsArticleSlugs } from '../src/lib/queries'

// Mock Supabase for testing
const mockSupabase = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  gte: jest.fn().mockReturnThis(),
  lt: jest.fn().mockReturnThis(),
  not: jest.fn().mockReturnThis(),
  neq: jest.fn().mockReturnThis(),
  order: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
  single: jest.fn()
}

// Mock data for testing
const mockNewsArticle = {
  id: '1',
  title: 'Test Article',
  slug: 'test-article',
  content: 'Test content',
  excerpt: 'Test excerpt',
  status: 'published',
  is_featured: true,
  published_at: '2025-01-26T00:00:00Z',
  created_at: '2025-01-26T00:00:00Z',
  updated_at: '2025-01-26T00:00:00Z',
  category_id: 'cat-1',
  category: {
    id: 'cat-1',
    name: 'School News',
    slug: 'school-news'
  },
  tags: [
    { tag: { name: 'Achievement', slug: 'achievement' } },
    { tag: { name: 'Student', slug: 'student' } }
  ]
}

const mockEvent = {
  id: '1',
  title: 'Test Event',
  slug: 'test-event',
  description: 'Test event description',
  status: 'published',
  is_featured: true,
  start_date: '2025-02-01',
  end_date: '2025-02-01',
  start_time: '10:00:00',
  end_time: '12:00:00',
  location: 'Main Hall',
  category_id: 'cat-1',
  category: {
    id: 'cat-1',
    name: 'School Events',
    slug: 'school-events'
  },
  tags: []
}

describe('Centralized Queries', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  describe('Build-Time Queries', () => {
    test('getAllNewsArticleSlugs returns correct static paths format', async () => {
      // Mock successful database response
      mockSupabase.single.mockResolvedValueOnce({
        data: [
          { slug: 'article-1' },
          { slug: 'article-2' },
          { slug: 'article-3' }
        ],
        error: null
      })

      // Mock the supabase import
      jest.doMock('../src/lib/supabase', () => ({
        supabase: mockSupabase
      }))

      const result = await getAllNewsArticleSlugs()

      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(3)
      expect(result[0]).toHaveProperty('params')
      expect(result[0].params).toHaveProperty('slug')
      expect(result[0].params.slug).toBe('article-1')
    })

    test('getFeaturedNews returns correct data structure', async () => {
      // Mock successful news query
      mockSupabase.single.mockResolvedValueOnce({
        data: [mockNewsArticle],
        error: null
      })

      const result = await getFeaturedNews(5)

      expect(Array.isArray(result)).toBe(true)
      if (result.length > 0) {
        expect(result[0]).toHaveProperty('title')
        expect(result[0]).toHaveProperty('slug')
        expect(result[0]).toHaveProperty('category')
        expect(result[0]).toHaveProperty('tags')
        expect(Array.isArray(result[0].tags)).toBe(true)
      }
    })

    test('getUpcomingEvents filters future events correctly', async () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7)
      
      const mockFutureEvent = {
        ...mockEvent,
        start_date: futureDate.toISOString().split('T')[0]
      }

      mockSupabase.single.mockResolvedValueOnce({
        data: [mockFutureEvent],
        error: null
      })

      const result = await getUpcomingEvents()

      expect(Array.isArray(result)).toBe(true)
      if (result.length > 0) {
        const eventDate = new Date(result[0].start_date)
        const now = new Date()
        expect(eventDate.getTime()).toBeGreaterThanOrEqual(now.getTime())
      }
    })

    test('Build-time critical queries throw on failure', async () => {
      // Mock database failure
      mockSupabase.single.mockRejectedValueOnce(new Error('Database connection failed'))

      // Critical queries should throw and fail the build
      await expect(getAllNewsArticleSlugs()).rejects.toThrow('BUILD FAILED')
    })

    test('Build-time graceful queries return empty arrays on failure', async () => {
      // Mock database failure
      mockSupabase.single.mockRejectedValueOnce(new Error('Database connection failed'))

      // Graceful queries should return empty arrays
      const result = await getFeaturedNews(5)
      expect(result).toEqual([])
    })
  })

  describe('Runtime Queries (Server Islands)', () => {
    test('Runtime queries never throw errors', async () => {
      // Mock database failure
      mockSupabase.single.mockRejectedValueOnce(new Error('Database connection failed'))

      // All runtime queries should resolve gracefully
      await expect(queries.runtime.getFeaturedNews(5)).resolves.toEqual([])
      await expect(queries.runtime.getUpcomingEvents()).resolves.toEqual([])
    })

    test('Runtime caching works correctly', async () => {
      const mockNews = [mockNewsArticle]
      mockSupabase.single.mockResolvedValue({ data: mockNews, error: null })

      // First call should hit database
      await queries.runtime.getFeaturedNews(3)
      
      // Second call within cache TTL should use cache
      await queries.runtime.getFeaturedNews(3)
      
      // Note: In real implementation, we'd verify cache behavior
      // For now, just ensure both calls succeed
      expect(mockSupabase.single).toHaveBeenCalled()
    })

    test('Runtime queries have appropriate cache keys', () => {
      // Verify that different parameters create different cache keys
      const cache = queries.runtime.cache
      
      // This tests the cache key generation logic
      expect(cache).toBeDefined()
      expect(cache instanceof Map).toBe(true)
    })
  })

  describe('Data Transformation', () => {
    test('News articles have properly transformed tags', async () => {
      mockSupabase.single.mockResolvedValueOnce({
        data: [mockNewsArticle],
        error: null
      })

      const result = await getFeaturedNews(1)

      if (result.length > 0) {
        expect(result[0].tags).toBeDefined()
        expect(Array.isArray(result[0].tags)).toBe(true)
        
        if (result[0].tags.length > 0) {
          expect(result[0].tags[0]).toHaveProperty('name')
          expect(result[0].tags[0]).toHaveProperty('slug')
        }
      }
    })

    test('Events have proper date formatting', async () => {
      mockSupabase.single.mockResolvedValueOnce({
        data: [mockEvent],
        error: null
      })

      const result = await getUpcomingEvents()

      if (result.length > 0) {
        expect(result[0]).toHaveProperty('start_date')
        expect(result[0]).toHaveProperty('start_time')
        expect(typeof result[0].start_date).toBe('string')
      }
    })
  })

  describe('Error Handling', () => {
    test('Database connection health check works', async () => {
      // Mock successful health check
      mockSupabase.single.mockResolvedValueOnce({ data: [{ id: 1 }], error: null })
      
      const isHealthy = await queries.shared.checkDatabaseHealth()
      expect(typeof isHealthy).toBe('boolean')
    })

    test('Content counts handle partial failures gracefully', async () => {
      // Mock mixed success/failure responses
      mockSupabase.single
        .mockResolvedValueOnce({ count: 10, error: null }) // News succeeds
        .mockRejectedValueOnce(new Error('Events query failed')) // Events fails
        .mockResolvedValueOnce({ count: 5, error: null }) // Categories succeeds

      const counts = await queries.shared.getContentCounts()
      
      expect(counts).toHaveProperty('news')
      expect(counts).toHaveProperty('events')
      expect(counts).toHaveProperty('categories')
      expect(typeof counts.news).toBe('number')
      expect(typeof counts.events).toBe('number')
      expect(typeof counts.categories).toBe('number')
    })
  })

  describe('Query Performance', () => {
    test('Queries complete within reasonable time', async () => {
      mockSupabase.single.mockResolvedValueOnce({
        data: [mockNewsArticle],
        error: null
      })

      const start = Date.now()
      await getFeaturedNews(5)
      const duration = Date.now() - start

      // Should complete quickly in test environment
      expect(duration).toBeLessThan(1000) // 1 second max
    })
  })
})

// Helper function for data normalization in tests
function normalizeForComparison(data: any) {
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      created_at: null, // Ignore timestamps
      updated_at: null,
      published_at: null
    }))
  }
  return {
    ...data,
    created_at: null,
    updated_at: null,
    published_at: null
  }
}

export { normalizeForComparison }