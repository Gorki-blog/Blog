import { useState, useEffect } from 'react';
import { navigateTo } from '@/App';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  CheckCircle,
  XCircle,
  Trash2,
  MessageSquare,
  Filter,
  User,
  Mail,
} from 'lucide-react';

// Mock comments — gerçek projede bunlar context veya API'den gelecek
const initialMockComments = [
  { id: '1', author: 'Ayşe Yılmaz', email: 'ayse@example.com', content: 'Harika bir yazı olmuş, teşekkürler!', post: 'Mihrimah İlk Adımlarını Attı', date: '2024-01-20', approved: true },
  { id: '2', author: 'Mehmet Kaya', email: 'mehmet@example.com', content: 'Felsefe konusunda daha fazla yazı bekliyoruz.', post: 'Varoluşçuluk Üzerine', date: '2024-01-19', approved: true },
  { id: '3', author: 'Zeynep Demir', email: 'zeynep@example.com', content: 'Kitap öneriniz için teşekkürler, hemen alacağım.', post: 'Kürk Mantolu Madonna', date: '2024-01-18', approved: false },
  { id: '4', author: 'Ali Şahin', email: 'ali@example.com', content: 'Kapadokya gezisi çok güzel görünüyor.', post: 'Kapadokya Macerası', date: '2024-01-17', approved: true },
];

export default function Comments() {
  const { isAuthenticated, isLoading } = useAuth();
  const [comments, setComments] = useState(initialMockComments);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  const filteredComments = comments.filter((c) => {
    if (filter === 'approved') return c.approved;
    if (filter === 'pending') return !c.approved;
    return true;
  });

  const handleApprove = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, approved: true } : c));
  };

  const handleReject = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, approved: false } : c));
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu yorumu silmek istediğinize emin misiniz?')) {
      setComments(prev => prev.filter(c => c.id !== id));
    }
  };

  const pendingCount = comments.filter(c => !c.approved).length;

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl text-text-dark font-semibold mb-1">Yorumlar</h1>
          <p className="text-text">
            {comments.length} yorum
            {pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-powder/50 rounded-full text-xs font-medium text-text-dark">
                {pendingCount} onay bekliyor
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-text-light" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-3 rounded-xl border border-border bg-white text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
          >
            <option value="all">Tümü</option>
            <option value="approved">Onaylanan</option>
            <option value="pending">Onay Bekleyen</option>
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <div
            key={comment.id}
            className={`bg-white rounded-2xl shadow-soft p-6 ${
              !comment.approved ? 'border-l-4 border-powder' : ''
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-powder/30 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-text-dark" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-dark">{comment.author}</h3>
                    <div className="flex items-center gap-2 text-sm text-text-light">
                      <Mail className="w-3 h-3" />
                      {comment.email}
                    </div>
                  </div>
                  {!comment.approved && (
                    <span className="px-3 py-1 bg-powder/30 rounded-full text-xs font-medium text-text-dark">
                      Onay Bekliyor
                    </span>
                  )}
                </div>

                <p className="text-text mb-3 ml-13">{comment.content}</p>

                <div className="flex items-center gap-4 text-sm text-text-light">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {comment.post}
                  </span>
                  <span>{comment.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!comment.approved ? (
                  <button
                    onClick={() => handleApprove(comment.id)}
                    className="p-2 rounded-lg bg-sage/30 hover:bg-sage/50 transition-colors"
                    title="Onayla"
                  >
                    <CheckCircle className="w-5 h-5 text-sage-dark" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleReject(comment.id)}
                    className="p-2 rounded-lg hover:bg-cream transition-colors"
                    title="Onayı Kaldır"
                  >
                    <XCircle className="w-5 h-5 text-text-light" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredComments.length === 0 && (
        <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
          <MessageSquare className="w-16 h-16 text-text-light mx-auto mb-4" />
          <p className="text-text-light">Yorum bulunamadı.</p>
        </div>
      )}
    </AdminLayout>
  );
}
