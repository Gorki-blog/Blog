import { useState, useEffect } from 'react';
import { navigateTo } from '@/App';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Save,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
  Tag,
  Calendar,
  FolderTree,
} from 'lucide-react';

interface PostEditorProps {
  mode: 'new' | 'edit';
  postId?: string;
}

export default function PostEditor({ mode, postId }: PostEditorProps) {
  const { categories, addPost, updatePost, posts } = useAdmin();
  const { isAuthenticated, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    categoryId: categories[0]?.id || '',
    tags: '',
    status: 'draft' as 'draft' | 'published',
    coverImage: '',
  });

  // Düzenleme modunda mevcut postu yükle
  useEffect(() => {
    if (mode === 'edit' && postId) {
      const existingPost = posts.find(p => p.id === postId);
      if (existingPost) {
        setFormData({
          title: existingPost.title,
          excerpt: existingPost.excerpt,
          content: existingPost.content,
          categoryId: existingPost.category.id,
          tags: existingPost.tags.join(', '),
          status: existingPost.status === 'scheduled' ? 'published' : existingPost.status,
          coverImage: existingPost.coverImage || '',
        });
      }
    }
  }, [mode, postId, posts]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  const handleSubmit = async (e: React.MouseEvent, publish = false) => {
    e.preventDefault();
    setIsSaving(true);

    const category = categories.find(c => c.id === formData.categoryId);
    if (!category) {
      setIsSaving(false);
      return;
    }

    const finalStatus = publish ? 'published' as const : formData.status;

    if (mode === 'edit' && postId) {
      updatePost(postId, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        coverImage: formData.coverImage || undefined,
        status: finalStatus,
        readTime: Math.ceil(formData.content.split(' ').length / 200) || 1,
      });
    } else {
      addPost({
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        category,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        coverImage: formData.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
        publishedAt: new Date(),
        status: finalStatus,
        readTime: Math.ceil(formData.content.split(' ').length / 200) || 1,
        views: 0,
        likes: 0,
        comments: [],
      });
    }

    setTimeout(() => {
      setIsSaving(false);
      navigateTo('admin-posts');
    }, 400);
  };

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  const isEdit = mode === 'edit';

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigateTo('admin-posts')}
            className="p-2 rounded-xl hover:bg-powder-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-text-dark" />
          </button>
          <div>
            <h1 className="font-serif text-2xl text-text-dark font-semibold">
              {isEdit ? 'Yazıyı Düzenle' : 'Yeni Yazı'}
            </h1>
            <p className="text-text">
              {isEdit ? 'Mevcut yazınızı güncelleyin' : 'Yeni bir blog yazısı oluşturun'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSaving || !formData.title}
            className="px-4 py-2 rounded-xl border border-border text-text-dark hover:bg-cream transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Taslak Kaydet
          </button>
          <button
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSaving || !formData.title}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            <Eye className="w-4 h-4" />
            {isEdit ? 'Güncelle & Yayınla' : 'Yayınla'}
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="block text-sm font-medium text-text-dark mb-2">Başlık *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Yazı başlığını girin..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="block text-sm font-medium text-text-dark mb-2">Özet</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Yazının kısa bir özeti..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder resize-none"
            />
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="block text-sm font-medium text-text-dark mb-2">İçerik</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Yazınızın içeriğini buraya yazın..."
              rows={15}
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder resize-none font-mono text-sm"
            />
            <p className="text-xs text-text-light mt-2">
              Yaklaşık okuma süresi: {Math.ceil(formData.content.split(' ').filter(Boolean).length / 200) || 0} dakika
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
              <FolderTree className="w-4 h-4" />
              Kategori
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
              <Tag className="w-4 h-4" />
              Etiketler
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="etiket1, etiket2, etiket3"
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
            <p className="text-xs text-text-light mt-2">Virgülle ayırarak birden fazla etiket ekleyebilirsiniz.</p>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
              <ImageIcon className="w-4 h-4" />
              Kapak Görseli
            </label>
            <input
              type="text"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="Görsel URL'si"
              className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
            <div className="mt-4 aspect-video bg-cream rounded-xl flex items-center justify-center border-2 border-dashed border-border overflow-hidden">
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-8 h-8 text-text-light mx-auto mb-2" />
                  <p className="text-sm text-text-light">Görsel önizlemesi</p>
                </div>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-2xl shadow-soft p-6">
            <label className="flex items-center gap-2 text-sm font-medium text-text-dark mb-2">
              <Calendar className="w-4 h-4" />
              Yayın Durumu
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'draft' })}
                className={`flex-1 py-3 px-4 rounded-xl border transition-colors ${
                  formData.status === 'draft'
                    ? 'border-powder bg-powder/20 text-text-dark'
                    : 'border-border text-text hover:bg-cream'
                }`}
              >
                Taslak
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, status: 'published' })}
                className={`flex-1 py-3 px-4 rounded-xl border transition-colors ${
                  formData.status === 'published'
                    ? 'border-sage bg-sage/20 text-text-dark'
                    : 'border-border text-text hover:bg-cream'
                }`}
              >
                Yayınla
              </button>
            </div>
          </div>

          {/* Save State Indicator */}
          {isSaving && (
            <div className="bg-powder/20 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-4 h-4 border-2 border-text-dark/30 border-t-text-dark rounded-full animate-spin" />
              <span className="text-sm text-text-dark">Kaydediliyor...</span>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
