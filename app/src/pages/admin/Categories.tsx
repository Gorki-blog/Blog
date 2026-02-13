import { useState, useEffect } from 'react';
import { navigateTo } from '@/App';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  Plus,
  Edit,
  Trash2,
  Folder,
  Save,
  X,
} from 'lucide-react';

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdmin();
  const { isAuthenticated, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;
  const [editForm, setEditForm] = useState({ name: '', description: '', slug: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({ name: '', description: '' });

  const handleEdit = (category: typeof categories[0]) => {
    setIsEditing(category.id);
    setEditForm({
      name: category.name,
      description: category.description,
      slug: category.slug,
    });
  };

  const handleSave = () => {
    if (isEditing) {
      updateCategory(isEditing, {
        name: editForm.name,
        description: editForm.description,
        slug: editForm.slug,
      });
      setIsEditing(null);
    }
  };

  const handleAdd = () => {
    if (newForm.name && newForm.description) {
      addCategory({
        name: newForm.name,
        description: newForm.description,
        slug: newForm.name.toLowerCase().replace(/\s+/g, '-'),
        icon: 'Folder',
        color: 'powder',
        subcategories: [],
      });
      setNewForm({ name: '', description: '' });
      setIsAdding(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
      deleteCategory(id);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl text-text-dark font-semibold mb-1">Kategoriler</h1>
          <p className="text-text">{categories.length} kategori</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Kategori
        </button>
      </div>

      {/* Add New Category */}
      {isAdding && (
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
          <h3 className="font-medium text-text-dark mb-4">Yeni Kategori Ekle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Kategori adı"
              value={newForm.name}
              onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
              className="px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
            <input
              type="text"
              placeholder="Açıklama"
              value={newForm.description}
              onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
              className="px-4 py-3 rounded-xl border border-border bg-cream text-text-dark placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-powder"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={handleAdd} className="px-4 py-2 bg-sage text-text-dark rounded-xl hover:bg-sage-dark transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Kaydet
            </button>
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 border border-border text-text rounded-xl hover:bg-cream transition-colors flex items-center gap-2">
              <X className="w-4 h-4" />
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Kategori</th>
              <th className="text-left px-6 py-4 text-sm font-medium text-text-dark">Slug</th>
              <th className="text-right px-6 py-4 text-sm font-medium text-text-dark">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-cream/30 transition-colors">
                <td className="px-6 py-4">
                  {isEditing === category.id ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-cream text-sm"
                      />
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-cream text-sm"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-powder/30 flex items-center justify-center">
                        <Folder className="w-5 h-5 text-text-dark" />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-dark">{category.name}</h3>
                        <p className="text-sm text-text-light">{category.description}</p>
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  {isEditing === category.id ? (
                    <input
                      type="text"
                      value={editForm.slug}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="px-3 py-2 rounded-lg border border-border bg-cream text-sm"
                    />
                  ) : (
                    <span className="text-sm text-text font-mono">/{category.slug}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    {isEditing === category.id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="p-2 rounded-lg bg-sage/30 hover:bg-sage/50 transition-colors"
                        >
                          <Save className="w-4 h-4 text-text-dark" />
                        </button>
                        <button
                          onClick={() => setIsEditing(null)}
                          className="p-2 rounded-lg hover:bg-cream transition-colors"
                        >
                          <X className="w-4 h-4 text-text" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(category)}
                          className="p-2 rounded-lg hover:bg-powder-light transition-colors"
                        >
                          <Edit className="w-4 h-4 text-text" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
