import { useState, useEffect } from 'react';
import { Menu, X, Heart, BookOpen, GraduationCap, MapPin, Home, User, Mail, Lock } from 'lucide-react';
import { navigateTo, useNavigation, type PageType } from '@/App';

interface NavItem {
  name: string;
  page: PageType;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { name: 'Ana Sayfa', page: 'home', icon: Home },
  { name: 'Mihrimah & Annelik', page: 'mihrimah-annelik', icon: Heart },
  { name: 'Akademik Yolculuk', page: 'akademik-yolculuk', icon: GraduationCap },
  { name: 'Kitaplık', page: 'kitaplik', icon: BookOpen },
  { name: 'Geziler', page: 'geziler', icon: MapPin },
  { name: 'Hakkımda', page: 'hakkimda', icon: User },
  { name: 'İletişim', page: 'iletisim', icon: Mail },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { page: currentPage } = useNavigation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageType) => {
    navigateTo(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group"
            >
              <img
                src="/images/orkide-logo.png"
                alt="Beyaz Orkide"
                className="w-8 h-8 lg:w-10 lg:h-10 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="font-serif text-lg lg:text-xl text-text-dark font-semibold">
                Görki'nin Dünyası
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.page)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-powder text-text-dark'
                        : 'text-text hover:bg-powder-light hover:text-text-dark'
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
              {/* Admin Login Button */}
              <button
                onClick={() => handleNavClick('admin-login')}
                className="ml-2 px-4 py-2 rounded-xl text-sm font-medium bg-sage/30 text-text-dark hover:bg-sage/50 transition-all duration-300 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Admin
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-powder-light transition-colors"
              aria-label="Menü"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-text-dark" />
              ) : (
                <Menu className="w-6 h-6 text-text-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-cream/98 backdrop-blur-md shadow-medium transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <nav className="section-container py-4">
          <div className="section-inner flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 text-left ${
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
            {/* Admin Login Button - Mobile */}
            <button
              onClick={() => handleNavClick('admin-login')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-left text-text-dark bg-sage/30 hover:bg-sage/50 transition-all duration-300 mt-2"
            >
              <Lock className="w-5 h-5" />
              🔐 Admin Girişi
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
