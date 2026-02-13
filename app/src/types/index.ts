export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  subcategory?: string;
  tags: string[];
  coverImage?: string;
  images?: string[];
  videos?: string[];
  publishedAt: Date;
  updatedAt?: Date;
  status: 'draft' | 'published' | 'scheduled';
  readTime: number;
  views: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  email: string;
  content: string;
  createdAt: Date;
  approved: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  subcategories?: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  summary: string;
  review: string;
  quotes: string[];
  rating: number;
  tags: string[];
  genre: string;
  year: number;
  readDate: Date;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  date: Date;
  category: 'city' | 'family' | 'photo';
  description: string;
  images: string[];
  videos?: string[];
  mapUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio: string;
  role: 'admin' | 'user';
}

export interface Stats {
  totalPosts: number;
  publishedThisMonth: number;
  totalComments: number;
  totalViews: number;
}
