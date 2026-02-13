import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { navigateTo } from '@/App';
import AdminLayout from '@/components/layout/AdminLayout';
import {
  User,
  Mail,
  Lock,
  Save,
  Globe,
  Bell,
  Shield,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

export default function Settings() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'general'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Görkem',
    email: user?.email || '',
    bio: 'Felsefe yüksek lisans öğrencisi, anne, okuma aşığı ve gezgin.',
  });

  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [securityError, setSecurityError] = useState('');

  const [generalSettings, setGeneralSettings] = useState({
    emailNotifications: true,
    autoApproveComments: false,
    maintenanceMode: false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigateTo('admin-login');
    }
  }, [isAuthenticated, isLoading]);

  const showSaveSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showSaveSuccess();
    }, 500);
  };

  const handleSaveSecurity = async () => {
    setSecurityError('');
    if (!securityForm.currentPassword) {
      setSecurityError('Mevcut şifrenizi girin.');
      return;
    }
    if (securityForm.newPassword.length < 8) {
      setSecurityError('Yeni şifre en az 8 karakter olmalıdır.');
      return;
    }
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      setSecurityError('Yeni şifreler eşleşmiyor.');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSecurityForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showSaveSuccess();
    }, 500);
  };

  const handleSaveGeneral = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showSaveSuccess();
    }, 500);
  };

  const tabs = [
    { id: 'profile' as const, name: 'Profil', icon: User },
    { id: 'security' as const, name: 'Güvenlik', icon: Shield },
    { id: 'general' as const, name: 'Genel', icon: Globe },
  ];

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-text-dark font-semibold mb-1">Ayarlar</h1>
        <p className="text-text">Hesap ve site ayarlarınızı yönetin</p>
      </div>

      {/* Success Banner */}
      {saveSuccess && (
        <div className="mb-6 p-4 bg-sage/20 border border-sage/40 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-sage-dark" />
          <p className="text-sm text-text-dark font-medium">Değişiklikler başarıyla kaydedildi.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-soft p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-powder text-text-dark'
                      : 'text-text hover:bg-cream'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="font-serif text-lg text-text-dark font-semibold mb-6">Profil Bilgileri</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    İsim
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Biyografi</label>
                  <textarea
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder resize-none"
                  />
                </div>
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="font-serif text-lg text-text-dark font-semibold mb-6">Şifre Değiştir</h2>
              {securityError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                  {securityError}
                </div>
              )}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Mevcut Şifre
                  </label>
                  <input
                    type="password"
                    value={securityForm.currentPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, currentPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Yeni Şifre</label>
                  <input
                    type="password"
                    value={securityForm.newPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, newPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-2">Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    value={securityForm.confirmPassword}
                    onChange={(e) => setSecurityForm({ ...securityForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-cream text-text-dark focus:outline-none focus:ring-2 focus:ring-powder"
                  />
                </div>
                <button
                  onClick={handleSaveSecurity}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'general' && (
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="font-serif text-lg text-text-dark font-semibold mb-6">Genel Ayarlar</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-text" />
                    <div>
                      <p className="font-medium text-text-dark">E-posta Bildirimleri</p>
                      <p className="text-sm text-text-light">Yeni yorumlar için bildirim al</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={generalSettings.emailNotifications}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, emailNotifications: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-text" />
                    <div>
                      <p className="font-medium text-text-dark">Yorumlar</p>
                      <p className="text-sm text-text-light">Yorumları otomatik onayla</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={generalSettings.autoApproveComments}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, autoApproveComments: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sage"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-cream rounded-xl">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-text" />
                    <div>
                      <p className="font-medium text-text-dark">Site Durumu</p>
                      <p className="text-sm text-text-light">Siteyi bakım moduna al</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={generalSettings.maintenanceMode}
                      onChange={(e) => setGeneralSettings({ ...generalSettings, maintenanceMode: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-powder"></div>
                  </label>
                </div>

                <button
                  onClick={handleSaveGeneral}
                  disabled={isSaving}
                  className="btn-primary flex items-center gap-2 mt-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
