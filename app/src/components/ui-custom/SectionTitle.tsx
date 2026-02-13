import { ArrowRight } from 'lucide-react';
import { navigateTo, type PageType } from '@/App';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  link?: {
    text: string;
    page: PageType;
  };
  centered?: boolean;
}

export default function SectionTitle({
  title,
  subtitle,
  link,
  centered = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-8 lg:mb-12 ${centered ? 'text-center' : ''}`}>
      <div className={`flex items-center ${centered ? 'justify-center' : 'justify-between'} mb-3`}>
        <h2 className="font-serif text-2xl lg:text-3xl text-text-dark font-semibold">
          {title}
        </h2>
        {link && !centered && (
          <button
            onClick={() => navigateTo(link.page)}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-text 
                     hover:text-text-dark transition-colors group"
          >
            {link.text}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        )}
      </div>
      {subtitle && (
        <p className={`text-text leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
      {link && centered && (
        <button
          onClick={() => navigateTo(link.page)}
          className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-text 
                   hover:text-text-dark transition-colors group"
        >
          {link.text}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      )}
    </div>
  );
}
