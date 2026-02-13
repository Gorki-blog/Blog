import { Heart, GraduationCap, BookOpen, MapPin, ArrowRight } from 'lucide-react';
import { navigateTo, type PageType } from '@/App';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const iconMap: Record<string, React.ElementType> = {
  Heart,
  GraduationCap,
  BookOpen,
  MapPin,
};

const pageMap: Record<string, PageType> = {
  'mihrimah-annelik': 'mihrimah-annelik',
  'akademik-yolculuk': 'akademik-yolculuk',
  'kitaplik': 'kitaplik',
  'geziler': 'geziler',
};

const colorMap: Record<string, string> = {
  powder: 'bg-powder/20 text-text-dark hover:bg-powder/40',
  sage: 'bg-sage/20 text-text-dark hover:bg-sage/40',
  beige: 'bg-beige/30 text-text-dark hover:bg-beige/50',
};

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Heart;
  const colorClass = colorMap[category.color] || colorMap.powder;
  const page = pageMap[category.slug] || 'home';

  return (
    <button
      onClick={() => navigateTo(page)}
      className="group block w-full text-left bg-white rounded-2xl p-6 lg:p-8 border border-border shadow-soft 
                 transition-all duration-300 hover:-translate-y-1 hover:shadow-large"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 
                    transition-colors duration-300 ${colorClass}`}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl text-text-dark font-semibold mb-2">
        {category.name}
      </h3>
      <p className="text-text text-sm leading-relaxed mb-4 line-clamp-2">
        {category.description}
      </p>

      {/* Link */}
      <span className="inline-flex items-center gap-2 text-sm font-medium text-text-dark 
                       group-hover:text-powder-dark transition-colors">
        Keşfet
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
}
