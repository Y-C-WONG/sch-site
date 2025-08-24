import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Category {
  id: number
  name: string
  slug: string
  description?: string
  type: 'news' | 'event' | 'both'
  color?: string
  is_active: boolean
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

export interface NewsArticle {
  id: number
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_id?: number
  category_id: number
  status: 'draft' | 'published' | 'archived'
  is_featured: boolean
  published_at?: string
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
  category?: Category
  tags?: Tag[]
}

export interface Event {
  id: number
  title: string
  slug: string
  description?: string
  content?: string
  featured_image_id?: number
  category_id: number
  start_date: string
  end_date?: string
  start_time?: string
  end_time?: string
  location?: string
  is_all_day: boolean
  is_recurring: boolean
  status: 'draft' | 'published' | 'cancelled' | 'completed'
  is_featured: boolean
  created_at: string
  updated_at: string
  category?: Category
  tags?: Tag[]
}

export interface MediaFile {
  id: number
  filename: string
  original_filename: string
  file_path: string
  file_size: number
  mime_type: string
  alt_text?: string
  caption?: string
  is_active: boolean
  created_at: string
  updated_at: string
}