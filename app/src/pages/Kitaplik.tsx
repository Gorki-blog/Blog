import { useState } from 'react';
import { Star, Quote, Calendar, User } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

export default function Kitaplik() {
  const { books } = useAdmin();
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = ['all', ...new Set(books.map((b) => b.genre))];
  const filteredBooks = selectedGenre === 'all' 
    ? books 
    : books.filter((b) => b.genre === selectedGenre);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-container pt-24 lg:pt-32 pb-12">
        <div className="section-inner text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-text-dark font-semibold mb-4">
            Kitaplık
          </h1>
          <p className="text-text max-w-xl mx-auto">
            Okuduğum kitapların değerlendirmeleri, alıntılar ve düşünceler
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section-container pb-8">
        <div className="section-inner">
          <div className="flex flex-wrap justify-center gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-powder text-text-dark'
                    : 'bg-white border border-border text-text hover:bg-powder-light'
                }`}
              >
                {genre === 'all' ? 'Tümü' : genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="section-container py-12 lg:py-16 bg-beige/30">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredBooks.map((book) => (
              <article
                key={book.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft card-hover"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Cover */}
                  <div className="sm:w-40 lg:w-48 flex-shrink-0">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-48 sm:h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 lg:p-6">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-serif text-lg text-text-dark font-semibold line-clamp-2">
                        {book.title}
                      </h3>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Star className="w-4 h-4 text-powder-dark fill-powder-dark" />
                        <span className="text-sm font-medium text-text-dark">
                          {book.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-text-light mb-3">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {book.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {book.year}
                      </span>
                    </div>

                    <p className="text-text text-sm line-clamp-3 mb-4 leading-relaxed">
                      {book.review}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {book.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-beige/50 rounded-full text-xs text-text"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Quote */}
                    {book.quotes.length > 0 && (
                      <div className="flex items-start gap-2 p-3 bg-sage/10 rounded-xl">
                        <Quote className="w-4 h-4 text-sage-dark flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-text italic line-clamp-2">
                          {book.quotes[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-container py-12 lg:py-16">
        <div className="section-inner">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="text-3xl lg:text-4xl font-serif text-text-dark font-semibold mb-1">
                {books.length}
              </div>
              <div className="text-sm text-text">Okunan Kitap</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="text-3xl lg:text-4xl font-serif text-text-dark font-semibold mb-1">
                {new Set(books.map((b) => b.genre)).size}
              </div>
              <div className="text-sm text-text">Farklı Tür</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="text-3xl lg:text-4xl font-serif text-text-dark font-semibold mb-1">
                {new Set(books.map((b) => b.author)).size}
              </div>
              <div className="text-sm text-text">Farklı Yazar</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-soft">
              <div className="text-3xl lg:text-4xl font-serif text-text-dark font-semibold mb-1">
                {books.length > 0 ? (books.reduce((acc, b) => acc + b.rating, 0) / books.length).toFixed(1) : '0'}
              </div>
              <div className="text-sm text-text">Ortalama Puan</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
