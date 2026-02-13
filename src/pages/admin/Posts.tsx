import { useState } from 'react';
import { navigateTo } from '@/App';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useEffect } from 'react';

export default function Posts() {
  const { posts, deletePost } = useAdmin();
  const { isAuthenticated, isLoading } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (id: string) => {
    if (confirm('Bu yazıyı silmek istediğinize emin misiniz?')) {
      deletePost(id);
    }
  };

  const handleEdit = (id: string) => {
    navigateTo('admin-edit-post', { postId: id });
  };

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl text-text-dark font-semibold mb-1">Tüm Yazılar</h1>
          <p className="text-text">{posts.length} yazı bulundu</p>
        </div>
        <button
          onClick={() => navigateTo('admin-new-post')}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Yazı
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-soft p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Yazı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-text-light" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
              className="px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
            >
              <option value="all">Tümü</option>
              <option value="published">Yayınlanan</option>
              <option value="draft">Taslak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Yazı</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Kategori</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Durum</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">İstatistikler</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-dark">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {post.coverImage ? (
                        <img src={post.coverImage} alt={post.title} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-powder/30 flex items-center justify-center">
                          <span className="text-xs text-text-light">—</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-text-dark line-clamp-1">{post.title}</h3>
                        <p className="text-xs text-text-light">
                          {new Date(post.publishedAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-powder/30 rounded-full text-sm text-text-dark">
                      {post.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {post.status === 'published' ? (
                      <span className="flex items-center gap-1 text-sm text-sage-dark">
                        <CheckCircle className="w-4 h-4" />
                        Yayında
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm text-text-light">
                        <XCircle className="w-4 h-4" />
                        Taslak
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-sm text-text">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} dk
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post.id)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPosts.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-text-light">Yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
