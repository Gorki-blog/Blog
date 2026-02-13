import { useState } from 'react';
import { navigateTo, useNavigation } from '@/App';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Image,
  FolderTree,
  MessageSquare,
  Settings,
  LogOut,
  User,
  Menu,
  ChevronRight,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { name: 'Dashboard', page: 'admin-dashboard' as const, icon: LayoutDashboard },
  { name: 'Tüm Yazılar', page: 'admin-posts' as const, icon: FileText },
  { name: 'Yeni Yazı', page: 'admin-new-post' as const, icon: Plus },
  { name: 'Medya', page: 'admin-media' as const, icon: Image },
  { name: 'Kategoriler', page: 'admin-categories' as const, icon: FolderTree },
  { name: 'Yorumlar', page: 'admin-comments' as const, icon: MessageSquare },
  { name: 'Ayarlar', page: 'admin-settings' as const, icon: Settings },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { page: currentPage } = useNavigation();

  const handleLogout = () => {
    logout();
    navigateTo('home');
  };

  const handleNavClick = (page: typeof sidebarItems[0]['page']) => {
    navigateTo(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <button onClick={() => navigateTo('home')} className="flex items-center gap-3">
            <img src="/images/orkide-logo.png" alt="" className="w-8 h-8" />
            <span className="font-serif text-lg text-text-dark font-semibold">Admin Panel</span>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page || 
              (item.page === 'admin-posts' && currentPage === 'admin-edit-post');
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-powder text-text-dark'
                    : 'text-text hover:bg-powder-light hover:text-text-dark'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-cream/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white">
            <div className="w-10 h-10 rounded-full bg-powder/50 flex items-center justify-center">
              <User className="w-5 h-5 text-text-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-dark truncate">{user?.name}</div>
              <div className="text-xs text-text-light truncate">{user?.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-text-light hover:text-red-500 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-powder-light transition-colors"
            >
              <Menu className="w-6 h-6 text-text-dark" />
            </button>

            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={() => navigateTo('home')}
                className="flex items-center gap-2 text-sm text-text hover:text-text-dark transition-colors"
              >
                Siteyi Görüntüle
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
