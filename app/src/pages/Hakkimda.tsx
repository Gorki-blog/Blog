import { BookOpen, GraduationCap, Heart, MapPin, Quote } from 'lucide-react';
import { user } from '@/data/mockData';

const stats = [
  { label: 'Yazı', value: '24+' },
  { label: 'Kitap', value: '50+' },
  { label: 'Gezi', value: '15+' },
  { label: 'Kahve', value: '∞' },
];

const interests = [
  { icon: BookOpen, label: 'Okumak', description: 'Felsefe, edebiyat ve psikoloji' },
  { icon: GraduationCap, label: 'Öğrenmek', description: 'Felsefe yüksek lisans' },
  { icon: Heart, label: 'Annelik', description: 'Mihrimah ile büyümek' },
  { icon: MapPin, label: 'Gezmek', description: 'Yeni yerler keşfetmek' },
];

export default function Hakkimda() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-container pt-24 lg:pt-32 pb-12">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover rounded-3xl shadow-medium"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-powder/30 rounded-3xl -z-10" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sage/30 rounded-3xl -z-10 hidden lg:block" />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-6">
              <h1 className="font-serif text-3xl lg:text-4xl text-text-dark font-semibold">
                Merhaba, Ben Görkem
              </h1>
              <p className="text-text leading-relaxed text-lg">
                {user.bio}
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-powder/30 rounded-full text-sm text-text-dark">
                  #anne
                </span>
                <span className="px-4 py-2 bg-sage/30 rounded-full text-sm text-text-dark">
                  #felsefe
                </span>
                <span className="px-4 py-2 bg-beige rounded-full text-sm text-text-dark">
                  #kitapkurdu
                </span>
                <span className="px-4 py-2 bg-powder/30 rounded-full text-sm text-text-dark">
                  #gezgin
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-container py-12 lg:py-16 bg-beige/30">
        <div className="section-inner">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-white rounded-2xl shadow-soft">
                <div className="text-3xl lg:text-4xl font-serif text-text-dark font-semibold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-container py-16 lg:py-24">
        <div className="section-inner max-w-3xl">
          <h2 className="font-serif text-2xl lg:text-3xl text-text-dark font-semibold mb-8 text-center">
            Hikayem
          </h2>
          <div className="space-y-6 text-text leading-relaxed">
            <p>
              Her şey, kızım Mihrimah'ın hayatıma girmesiyle başladı. Annelik, 
              hayatımdaki en dönüştürücü deneyim oldu. Aynı zamanda felsefe 
              yüksek lisans sürecimde ilerlerken, bu iki dünyayı bir arada 
              dengelemeye çalışıyorum.
            </p>
            <p>
              Bu blog, düşüncelerimi, deneyimlerimi ve keşiflerimi paylaştığım 
              bir alan. Annelik üzerine derinlemesine düşünceler, akademik 
              yolculuğumdan notlar, okuduğum kitapların değerlendirmeleri ve 
              gezdiğim yerlerin hikayeleri burada buluşuyor.
            </p>
            <p>
              Annem bana hep "Beyaz Orkide" derdi. Bu isim, bu blogun da 
              sembolü oldu. Zarif, sade ama güçlü bir çiçek gibi...
            </p>
          </div>

          {/* Quote */}
          <div className="mt-12 p-8 bg-sage/20 rounded-2xl">
            <Quote className="w-8 h-8 text-sage-dark mb-4" />
            <blockquote className="font-serif text-xl text-text-dark italic mb-4">
              "Düşünmek, yaşamaktır. Yaşamak, düşünmektir."
            </blockquote>
            <cite className="text-text-light not-italic">— Simone de Beauvoir</cite>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="section-container py-16 lg:py-24 bg-beige/30">
        <div className="section-inner">
          <h2 className="font-serif text-2xl lg:text-3xl text-text-dark font-semibold mb-12 text-center">
            İlgi Alanlarım
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest) => {
              const Icon = interest.icon;
              return (
                <div
                  key={interest.label}
                  className="p-6 bg-white rounded-2xl shadow-soft text-center card-hover"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-powder/30 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-text-dark" />
                  </div>
                  <h3 className="font-serif text-lg text-text-dark font-semibold mb-2">
                    {interest.label}
                  </h3>
                  <p className="text-text text-sm">{interest.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
