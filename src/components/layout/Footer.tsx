import { Instagram, Twitter, Mail, Heart } from 'lucide-react';
import { navigateTo, type PageType } from '@/App';

interface QuickLink {
  name: string;
  page: PageType;
}

const quickLinks: QuickLink[] = [
  { name: 'Ana Sayfa', page: 'home' },
  { name: 'Mihrimah & Annelik', page: 'mihrimah-annelik' },
  { name: 'Akademik Yolculuk', page: 'akademik-yolculuk' },
  { name: 'Kitaplık', page: 'kitaplik' },
  { name: 'Geziler', page: 'geziler' },
  { name: 'Hakkımda', page: 'hakkimda' },
  { name: 'İletişim', page: 'iletisim' },
];

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'E-posta', href: 'mailto:gorkem@example.com', icon: Mail },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-border">
      <div className="section-container py-12 lg:py-16">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Logo & Description */}
            <div className="space-y-4">
              <button 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-3 group"
              >
                <img
                  src="/images/orkide-logo.png"
                  alt="Beyaz Orkide"
                  className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-serif text-xl text-text-dark font-semibold">
                  Görki'nin Dünyası
                </span>
              </button>
              <p className="text-text leading-relaxed">
                Küçük bir kalp, derin düşünceler ve yolculuklar... Annelik, 
                akademik yolculuk, kitaplar ve geziler üzerine kişisel blog.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-text-dark font-semibold">
                Hızlı Linkler
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => navigateTo(link.page)}
                      className="text-text hover:text-text-dark hover:underline transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg text-text-dark font-semibold">
                İletişim
              </h3>
              <p className="text-text">
                Sorularınız veya işbirliği önerileriniz için bana ulaşabilirsiniz.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-powder flex items-center justify-center
                                 text-text-dark hover:bg-powder-dark transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-light flex items-center gap-2">
                © {currentYear} Görki'nin Dünyası. Tüm hakları saklıdır.
                <img
                  src="/images/orkide-logo.png"
                  alt=""
                  className="w-4 h-4 opacity-60"
                />
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigateTo('admin-login')}
                  className="text-sm text-text-light hover:text-text-dark transition-colors"
                >
                  🔐 Admin Girişi
                </button>
                <span className="text-text-light">•</span>
                <p className="text-sm text-text-light flex items-center gap-1">
                  <Heart className="w-4 h-4 text-powder-dark fill-powder-dark" />
                  ile yapıldı
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
