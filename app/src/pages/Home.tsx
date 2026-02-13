import { useEffect, useRef } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { navigateTo } from '@/App';
import { useAdmin } from '@/contexts/AdminContext';
import { user } from '@/data/mockData';
import CategoryCard from '@/components/ui-custom/CategoryCard';
import PostCard from '@/components/ui-custom/PostCard';
import SectionTitle from '@/components/ui-custom/SectionTitle';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { posts, categories } = useAdmin();

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      el.classList.add('animate-fade-in-up');
    });
  }, []);

  const scrollToContent = () => {
    const nextSection = heroRef.current?.nextElementSibling;
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const latestPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Watermark Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <img
            src="/images/orkide-watermark.png"
            alt=""
            className="w-[600px] h-[600px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="animate-fade-in-up">
            <img
              src="/images/orkide-logo.png"
              alt="Beyaz Orkide"
              className="w-20 h-20 lg:w-28 lg:h-28 mx-auto mb-6 opacity-80"
            />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-text-dark font-semibold mb-4 animate-fade-in-up animation-delay-200">
            Görki'nin Dünyası
          </h1>
          <p className="text-lg sm:text-xl text-text max-w-xl mx-auto animate-fade-in-up animation-delay-300">
            Küçük bir kalp, derin düşünceler ve yolculuklar...
          </p>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-light hover:text-text-dark transition-colors animate-bounce-soft"
          aria-label="Aşağı kaydır"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* Categories Section */}
      <section className="section-container py-16 lg:py-24">
        <div className="section-inner">
          <SectionTitle
            title="Kategoriler"
            subtitle="Annelik, akademik yolculuk, kitaplar ve geziler üzerine yazılarım"
            centered
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="section-container py-16 lg:py-24 bg-beige/30">
        <div className="section-inner">
          <SectionTitle
            title="Son Yazılar"
            subtitle="En son paylaştığım yazılara göz atın"
            link={{ text: 'Tümünü Gör', page: 'home' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {latestPosts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-container py-16 lg:py-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto lg:mx-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-3xl shadow-medium"
                />
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-powder/30 rounded-3xl -z-10 hidden lg:block" />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl lg:text-4xl text-text-dark font-semibold">
                Merhaba, Ben Görkem
              </h2>
              <p className="text-text leading-relaxed">
                {user.bio}
              </p>
              <p className="text-text leading-relaxed">
                Bu blogda annelik deneyimlerimi, felsefe yüksek lisans sürecimdeki 
                notlarımı, okuduğum kitapların değerlendirmelerini ve gezdiğim 
                yerlerin hikayelerini paylaşıyorum.
              </p>
              <button
                onClick={() => navigateTo('hakkimda')}
                className="btn-primary"
              >
                Daha Fazla Bilgi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-container py-16 lg:py-24 bg-sage/20">
        <div className="section-inner">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl text-text-dark font-semibold mb-4">
              Yazılarımdan Haberdar Ol
            </h2>
            <p className="text-text mb-8">
              Yeni yazılarımdan ilk sen haberdar olmak için e-posta adresini bırak.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-5 py-3 rounded-xl border border-border bg-white 
                         text-text-dark placeholder:text-text-light
                         focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                         transition-all"
              />
              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Abone Ol
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
