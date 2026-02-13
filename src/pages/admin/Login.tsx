import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { navigateTo } from '@/App';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const success = await login(formData.email, formData.password);
    
    setIsLoading(false);
    
    if (success) {
      navigateTo('admin-dashboard');
    } else {
      setError('E-posta veya şifre hatalı. Lütfen tekrar deneyin.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream relative overflow-hidden">
      {/* Watermark Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <img
          src="/images/orkide-watermark.png"
          alt=""
          className="w-[800px] h-[800px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-large p-8 lg:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src="/images/orkide-logo.png"
              alt="Beyaz Orkide"
              className="w-16 h-16 mx-auto mb-4 opacity-80"
            />
            <h1 className="font-serif text-2xl text-text-dark font-semibold mb-2">
              Admin Girişi
            </h1>
            <p className="text-text text-sm">
              Görki'nin Dünyası Yönetim Paneli
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                E-posta
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-cream
                           text-text-dark placeholder:text-text-light
                           focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                           transition-all"
                  placeholder="E-posta adresiniz"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-dark mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-cream
                           text-text-dark placeholder:text-text-light
                           focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                           transition-all"
                  placeholder="Şifreniz"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-light hover:text-text transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border text-powder focus:ring-powder"
                />
                <span className="text-sm text-text">Beni hatırla</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-text-dark/30 border-t-text-dark rounded-full animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>

          {/* Back to Site */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigateTo('home')}
              className="text-sm text-text hover:text-text-dark transition-colors"
            >
              ← Siteye Dön
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
