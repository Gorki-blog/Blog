import { useState } from 'react';
import { MapPin, Calendar, Camera, Users, Building2 } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const categories = [
  { id: 'all', name: 'Tümü', icon: MapPin },
  { id: 'city', name: 'Şehir Notları', icon: Building2 },
  { id: 'family', name: 'Anne & Çocuk', icon: Users },
  { id: 'photo', name: 'Foto Günlüğü', icon: Camera },
];

const categoryLabels: Record<string, string> = {
  city: 'Şehir Notları',
  family: 'Anne & Çocuk Gezileri',
  photo: 'Foto Günlüğü',
};

export default function Geziler() {
  const { trips } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTrips = selectedCategory === 'all'
    ? trips
    : trips.filter((t) => t.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-container pt-24 lg:pt-32 pb-12">
        <div className="section-inner text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-text-dark font-semibold mb-4">
            Geziler
          </h1>
          <p className="text-text max-w-xl mx-auto">
            Seyahat notları, keşifler ve unutulmaz anlar
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="section-container pb-8">
        <div className="section-inner">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'bg-powder text-text-dark'
                      : 'bg-white border border-border text-text hover:bg-powder-light'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trips Grid */}
      <section className="section-container py-12 lg:py-16 bg-beige/30">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTrips.map((trip) => (
              <article
                key={trip.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft card-hover"
              >
                {/* Image Gallery */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={trip.images[0]}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {trip.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/50 rounded-lg text-white text-xs">
                      +{trip.images.length - 1}
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-text-dark text-xs font-medium rounded-full">
                      {categoryLabels[trip.category]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-text-light text-sm mb-2">
                    <MapPin className="w-4 h-4" />
                    {trip.location}
                  </div>
                  <h3 className="font-serif text-lg text-text-dark font-semibold mb-2 group-hover:text-text transition-colors">
                    {trip.title}
                  </h3>
                  <p className="text-text text-sm line-clamp-2 mb-3 leading-relaxed">
                    {trip.description}
                  </p>
                  <div className="flex items-center gap-2 text-text-light text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(trip.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="section-container py-12 lg:py-16">
        <div className="section-inner">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl text-text-dark font-semibold mb-2">Gezi Haritam</h2>
            <p className="text-text">Gezdiğim yerlerin harita üzerindeki konumları</p>
          </div>
          <div className="aspect-[21/9] bg-beige rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-powder-dark mx-auto mb-4" />
              <p className="text-text-light">Harita entegrasyonu yakında eklenecek</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
