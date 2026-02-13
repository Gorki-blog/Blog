import { Heart, GraduationCap, BookOpen, MapPin } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import PostCard from '@/components/ui-custom/PostCard';
import SectionTitle from '@/components/ui-custom/SectionTitle';

const iconMap: Record<string, React.ElementType> = {
  Heart,
  GraduationCap,
  BookOpen,
  MapPin,
};

interface CategoryPageProps {
  slug?: string;
}

export default function CategoryPage({ slug }: CategoryPageProps) {
  const { posts, categories } = useAdmin();
  
  const category = slug 
    ? categories.find((c) => c.slug === slug)
    : categories[0];
  
  const categoryPosts = category 
    ? posts.filter((p) => p.category.slug === category.slug)
    : [];

  if (!category) {
    return (
      <div className="section-container py-24">
        <div className="section-inner text-center">
          <h1 className="font-serif text-3xl text-text-dark mb-4">
            Kategori Bulunamadı
          </h1>
          <p className="text-text">
            Aradığınız kategori mevcut değil.
          </p>
        </div>
      </div>
    );
  }

  const Icon = iconMap[category.icon] || Heart;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-container pt-24 lg:pt-32 pb-12">
        <div className="section-inner text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-powder/30 mb-6">
            <Icon className="w-10 h-10 text-text-dark" />
          </div>
          <h1 className="font-serif text-3xl lg:text-4xl text-text-dark font-semibold mb-4">
            {category.name}
          </h1>
          <p className="text-text max-w-xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Subcategories */}
      {category.subcategories && category.subcategories.length > 0 && (
        <section className="section-container pb-12">
          <div className="section-inner">
            <div className="flex flex-wrap justify-center gap-3">
              {category.subcategories.map((sub) => (
                <button
                  key={sub}
                  className="px-4 py-2 rounded-full bg-white border border-border text-sm text-text
                           hover:bg-powder-light hover:border-powder transition-colors"
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="section-container py-12 lg:py-16 bg-beige/30">
        <div className="section-inner">
          <SectionTitle
            title={`${category.name} Yazıları`}
            subtitle={`${categoryPosts.length} yazı bulundu`}
          />
          {categoryPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {categoryPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-light">
                Bu kategoride henüz yazı bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
