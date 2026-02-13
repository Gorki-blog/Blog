import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';
import Kitaplik from '@/pages/Kitaplik';
import Geziler from '@/pages/Geziler';
import Hakkimda from '@/pages/Hakkimda';
import Iletisim from '@/pages/Iletisim';
import Login from '@/pages/admin/Login';
import Dashboard from '@/pages/admin/Dashboard';
import Posts from '@/pages/admin/Posts';
import PostEditor from '@/pages/admin/PostEditor';
import Media from '@/pages/admin/Media';
import Categories from '@/pages/admin/Categories';
import Comments from '@/pages/admin/Comments';
import Settings from '@/pages/admin/Settings';
import { AdminProvider } from '@/contexts/AdminContext';

export type PageType = 
  | 'home' 
  | 'mihrimah-annelik' 
  | 'akademik-yolculuk' 
  | 'kitaplik' 
  | 'geziler' 
  | 'hakkimda' 
  | 'iletisim'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-posts'
  | 'admin-new-post'
  | 'admin-edit-post'
  | 'admin-media'
  | 'admin-categories'
  | 'admin-comments'
  | 'admin-settings';

// Global navigation state
let currentPage: PageType = 'home';
let currentEditPostId: string | null = null;
let listeners: ((page: PageType) => void)[] = [];

export function navigateTo(page: PageType, params?: { postId?: string }) {
  currentPage = page;
  if (params?.postId !== undefined) {
    currentEditPostId = params.postId;
  } else if (page !== 'admin-edit-post') {
    currentEditPostId = null;
  }
  listeners.forEach(listener => listener(page));
  window.scrollTo(0, 0);
}

export function useNavigation() {
  const [page, setPage] = useState<PageType>(currentPage);
  
  useEffect(() => {
    listeners.push(setPage);
    return () => {
      listeners = listeners.filter(l => l !== setPage);
    };
  }, []);
  
  return { page, navigateTo };
}

export function getCurrentPage() {
  return currentPage;
}

export function getEditPostId() {
  return currentEditPostId;
}

function App() {
  const { page } = useNavigation();

  useEffect(() => {
    const storedUser = localStorage.getItem('gorkem_blog_user');
    if (storedUser && page === 'admin-login') {
      navigateTo('admin-dashboard');
    }
  }, []);

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <Home />;
      case 'mihrimah-annelik':
        return <CategoryPage slug="mihrimah-annelik" />;
      case 'akademik-yolculuk':
        return <CategoryPage slug="akademik-yolculuk" />;
      case 'kitaplik':
        return <Kitaplik />;
      case 'geziler':
        return <Geziler />;
      case 'hakkimda':
        return <Hakkimda />;
      case 'iletisim':
        return <Iletisim />;
      case 'admin-login':
        return <Login />;
      case 'admin-dashboard':
        return <Dashboard />;
      case 'admin-posts':
        return <Posts />;
      case 'admin-new-post':
        return <PostEditor mode="new" />;
      case 'admin-edit-post':
        return <PostEditor mode="edit" postId={currentEditPostId || undefined} />;
      case 'admin-media':
        return <Media />;
      case 'admin-categories':
        return <Categories />;
      case 'admin-comments':
        return <Comments />;
      case 'admin-settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const isAdminPage = page.startsWith('admin-');

  if (isAdminPage) {
    return (
      <AdminProvider>
        {renderContent()}
      </AdminProvider>
    );
  }

  return (
    <AdminProvider>
      <Layout>
        {renderContent()}
      </Layout>
    </AdminProvider>
  );
}

export default App;
