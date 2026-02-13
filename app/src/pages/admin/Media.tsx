import { useState, useRef, useEffect } from 'react';
import { navigateTo } from '@/App';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  Search,
  Grid,
  List,
  CheckCircle,
} from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  name: string;
  size: string;
  date: string;
}

const defaultMedia: MediaItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80', name: 'anne-bebek.jpg', size: '2.4 MB', date: '2024-01-15' },
  { id: '2', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', name: 'felsefe-kitap.jpg', size: '1.8 MB', date: '2024-01-14' },
  { id: '3', url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80', name: 'kitap-kapak.jpg', size: '3.1 MB', date: '2024-01-13' },
  { id: '4', url: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?w=400&q=80', name: 'kapadokya.jpg', size: '4.2 MB', date: '2024-01-12' },
];

export default function Media() {
  const { isAuthenticated, isLoading } = useAuth();
  const [media, setMedia] = useState<MediaItem[]>(defaultMedia);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  const filteredMedia = media.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: MediaItem[] = Array.from(files).map((file, i) => ({
      id: `${Date.now()}-${i}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
    }));

    setMedia(prev => [...newItems, ...prev]);
    e.target.value = '';
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu dosyayı silmek istediğinize emin misiniz?')) {
      setMedia(prev => prev.filter(m => m.id !== id));
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl text-text-dark font-semibold mb-1">Medya Kütüphanesi</h1>
          <p className="text-text">{media.length} dosya</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />
          <button onClick={handleUpload} className="btn-primary flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Görsel Yükle
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-soft p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
            <input
              type="text"
              placeholder="Dosya ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-colors ${viewMode === 'grid' ? 'bg-powder text-text-dark' : 'bg-cream text-text'}`}
              title="Grid görünüm"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-colors ${viewMode === 'list' ? 'bg-powder text-text-dark' : 'bg-cream text-text'}`}
              title="Liste görünüm"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMedia.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-soft overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleCopyUrl(item.id, item.url)}
                    className="p-2 bg-white rounded-lg text-text-dark hover:bg-powder transition-colors"
                    title="URL Kopyala"
                  >
                    {copiedId === item.id ? (
                      <CheckCircle className="w-4 h-4 text-sage-dark" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-white rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    title="Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm text-text-dark truncate">{item.name}</p>
                <p className="text-xs text-text-light">{item.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-cream/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Dosya</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Boyut</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Tarih</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-text-dark">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMedia.map((item) => (
                <tr key={item.id} className="hover:bg-cream/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.url} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-sm text-text-dark">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text">{item.size}</td>
                  <td className="px-6 py-4 text-sm text-text">{item.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyUrl(item.id, item.url)}
                        className="p-2 rounded-lg hover:bg-powder-light transition-colors"
                        title="URL Kopyala"
                      >
                        {copiedId === item.id ? (
                          <CheckCircle className="w-4 h-4 text-sage-dark" />
                        ) : (
                          <Copy className="w-4 h-4 text-text" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
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
      )}

      {filteredMedia.length === 0 && (
        <div className="bg-white rounded-2xl shadow-soft p-12 text-center">
          <ImageIcon className="w-16 h-16 text-text-light mx-auto mb-4" />
          <p className="text-text-light">Medya dosyası bulunamadı.</p>
          <button onClick={handleUpload} className="mt-4 btn-primary flex items-center gap-2 mx-auto">
            <Upload className="w-4 h-4" />
            İlk Görseli Yükle
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
