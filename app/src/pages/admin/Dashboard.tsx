import { useState, useEffect } from 'react';
import { navigateTo } from '@/App';
import { useAuth } from '@/hooks/useAuth';
import { useAdmin } from '@/contexts/AdminContext';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  FileText,
  MessageSquare,
  Eye,
  Calendar,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  ArrowRight,
} from 'lucide-react';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { posts, deletePost, getStats } = useAdmin();
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedThisMonth: 0,
    totalComments: 0,
    totalViews: 0,
  });

  useEffect(() => {
    if (isAuthenticated) {
      setStats(getStats());
    }
  }, [isAuthenticated, getStats, posts]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-powder border-t-text-dark rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const statCards = [
    { name: 'Toplam Yazı', value: stats.totalPosts, icon: FileText, color: 'bg-powder/30', trend: '+12%' },
    { name: 'Bu Ay Yayınlanan', value: stats.publishedThisMonth, icon: Calendar, color: 'bg-sage/30', trend: '+3' },
    { name: 'Toplam Yorum', value: stats.totalComments, icon: MessageSquare, color: 'bg-beige', trend: '+8%' },
    { name: 'Toplam Görüntülenme', value: stats.totalViews.toLocaleString('tr-TR'), icon: Eye, color: 'bg-powder/30', trend: '+24%' },
  ];

  const handleDelete = (id: string) => {
    if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      deletePost(id);
    }
  };

  return (
    <AdminLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-text-dark font-semibold mb-2">
          Hoş Geldin, {user?.name}! 👋
        </h1>
        <p className="text-text">
          Blogunuzun genel durumu ve istatistiklerini aşağıda görebilirsiniz.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-text-dark" />
                </div>
                <span className="text-xs font-medium text-sage-dark bg-sage/20 px-2 py-1 rounded-full flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-serif text-text-dark font-semibold mb-1">{stat.value}</div>
              <div className="text-sm text-text">{stat.name}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-8">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-serif text-lg text-text-dark font-semibold">Son Yazılar</h2>
          <button
            onClick={() => navigateTo('admin-posts')}
            className="text-sm text-text hover:text-text-dark transition-colors flex items-center gap-1"
          >
            Tümünü Gör
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {posts.slice(0, 5).map((post) => (
            <div key={post.id} className="p-4 flex items-center justify-between hover:bg-cream/50 transition-colors">
              <div className="flex items-center gap-4">
                {post.coverImage ? (
                  <img src={post.coverImage} alt={post.title} className="w-12 h-12 rounded-lg object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-powder/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-text-light" />
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-text-dark line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-text-light">
                    {post.category.name} • {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('admin-edit-post', { postId: post.id })}
                  className="p-2 rounded-lg hover:bg-powder-light transition-colors"
                  title="Düzenle"
                >
                  <Edit className="w-4 h-4 text-text" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="p-8 text-center text-text-light text-sm">
              Henüz yazı bulunmuyor.
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          onClick={() => navigateTo('admin-new-post')}
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-powder/30 flex items-center justify-center">
            <Plus className="w-6 h-6 text-text-dark" />
          </div>
          <div>
            <div className="font-medium text-text-dark">Yeni Yazı</div>
            <div className="text-sm text-text-light">Yeni bir blog yazısı oluştur</div>
          </div>
        </button>

        <button
          onClick={() => navigateTo('admin-media')}
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-sage/30 flex items-center justify-center">
            <FileText className="w-6 h-6 text-text-dark" />
          </div>
          <div>
            <div className="font-medium text-text-dark">Medya Kütüphanesi</div>
            <div className="text-sm text-text-light">Görselleri yönet</div>
          </div>
        </button>

        <button
          onClick={() => navigateTo('admin-comments')}
          className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow text-left"
        >
          <div className="w-12 h-12 rounded-xl bg-beige flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-text-dark" />
          </div>
          <div>
            <div className="font-medium text-text-dark">Yorumlar</div>
            <div className="text-sm text-text-light">Yorumları moderasyon yap</div>
          </div>
        </button>
      </div>
    </AdminLayout>
  );
}
