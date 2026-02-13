import { Clock, Eye, Heart } from 'lucide-react';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  index?: number;
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-soft card-hover"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="block">
        {/* Cover Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 bg-powder text-text-dark text-xs font-medium rounded-full">
              {post.category.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg text-text-dark font-semibold line-clamp-2 mb-2 group-hover:text-text transition-colors">
            {post.title}
          </h3>
          <p className="text-text text-sm line-clamp-3 mb-4 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-text-light text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} dk
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {post.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {post.likes}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
