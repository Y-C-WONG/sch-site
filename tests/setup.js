// Test setup file
// This runs before all tests

// Set test environment variables
process.env.NODE_ENV = 'test'
process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'http://localhost:54321'
process.env.SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'mock-key-for-testing'

// Mock import.meta for Jest
global.import = {
  meta: {
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
    }
  }
}

// Mock console methods to reduce noise during testing (optional)
const originalConsoleError = console.error
const originalConsoleWarn = console.warn

console.error = (...args) => {
  // Only show errors that aren't expected test scenarios
  if (!args[0]?.includes?.('BUILD FAILED') && !args[0]?.includes?.('[RUNTIME]')) {
    originalConsoleError(...args)
  }
}

console.warn = (...args) => {
  // Only show warnings that aren't expected test scenarios
  if (!args[0]?.includes?.('Could not capture baseline')) {
    originalConsoleWarn(...args)
  }
}

// Global test utilities
global.testUtils = {
  normalizeForComparison: (data) => {
    if (Array.isArray(data)) {
      return data.map(item => global.testUtils.normalizeForComparison(item))
    }
    
    if (data && typeof data === 'object') {
      const normalized = {}
      
      for (const [key, value] of Object.entries(data)) {
        // Skip timestamp fields that naturally change
        if (!['created_at', 'updated_at', 'published_at'].includes(key)) {
          normalized[key] = global.testUtils.normalizeForComparison(value)
        }
      }
      
      return normalized
    }
    
    return data
  }
}

// Test database connection timeout
const TEST_TIMEOUT = 30000
global.testTimeout = TEST_TIMEOUT