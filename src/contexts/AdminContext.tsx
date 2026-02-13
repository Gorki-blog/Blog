import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Post, Book, Trip, Category, Comment } from '@/types';
import { posts as initialPosts, books as initialBooks, trips as initialTrips, categories as initialCategories } from '@/data/mockData';

interface AdminContextType {
  posts: Post[];
  books: Book[];
  trips: Trip[];
  categories: Category[];
  comments: Comment[];

  // Post operations
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;

  // Book operations
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;

  // Trip operations
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (id: string, trip: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;

  // Category operations
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;

  // Comment operations
  approveComment: (id: string) => void;
  rejectComment: (id: string) => void;
  deleteComment: (id: string) => void;

  // Stats
  getStats: () => {
    totalPosts: number;
    publishedThisMonth: number;
    totalComments: number;
    totalViews: number;
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [comments, setComments] = useState<Comment[]>([]);

  // Post operations
  const addPost = useCallback((post: Omit<Post, 'id'>) => {
    const newPost: Post = { ...post, id: Date.now().toString() };
    setPosts(prev => [newPost, ...prev]);
  }, []);

  const updatePost = useCallback((id: string, postData: Partial<Post>) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, ...postData, updatedAt: new Date() } : p
    ));
  }, []);

  const deletePost = useCallback((id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  }, []);

  // Book operations
  const addBook = useCallback((book: Omit<Book, 'id'>) => {
    const newBook: Book = { ...book, id: Date.now().toString() };
    setBooks(prev => [newBook, ...prev]);
  }, []);

  const updateBook = useCallback((id: string, bookData: Partial<Book>) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...bookData } : b));
  }, []);

  const deleteBook = useCallback((id: string) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  }, []);

  // Trip operations
  const addTrip = useCallback((trip: Omit<Trip, 'id'>) => {
    const newTrip: Trip = { ...trip, id: Date.now().toString() };
    setTrips(prev => [newTrip, ...prev]);
  }, []);

  const updateTrip = useCallback((id: string, tripData: Partial<Trip>) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...tripData } : t));
  }, []);

  const deleteTrip = useCallback((id: string) => {
    setTrips(prev => prev.filter(t => t.id !== id));
  }, []);

  // Category operations
  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = { ...category, id: Date.now().toString() };
    setCategories(prev => [...prev, newCategory]);
  }, []);

  const updateCategory = useCallback((id: string, categoryData: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...categoryData } : c));
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  }, []);

  // Comment operations
  const approveComment = useCallback((id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, approved: true } : c));
  }, []);

  const rejectComment = useCallback((id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, approved: false } : c));
  }, []);

  const deleteComment = useCallback((id: string) => {
    setComments(prev => prev.filter(c => c.id !== id));
  }, []);

  // Stats — reactive to post and comment changes
  const getStats = useCallback(() => {
    const now = new Date();
    const thisMonth = posts.filter(p => {
      const d = new Date(p.publishedAt);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    return {
      totalPosts: posts.length,
      publishedThisMonth: thisMonth.length,
      totalComments: comments.length,
      totalViews: posts.reduce((acc, p) => acc + p.views, 0),
    };
  }, [posts, comments]);

  return (
    <AdminContext.Provider value={{
      posts, books, trips, categories, comments,
      addPost, updatePost, deletePost,
      addBook, updateBook, deleteBook,
      addTrip, updateTrip, deleteTrip,
      addCategory, updateCategory, deleteCategory,
      approveComment, rejectComment, deleteComment,
      getStats,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
