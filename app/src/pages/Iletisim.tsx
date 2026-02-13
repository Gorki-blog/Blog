import { useState } from 'react';
import { Mail, MapPin, Send, Instagram, Twitter } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'E-posta',
    value: 'gorkem@example.com',
    href: 'mailto:gorkem@example.com',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@gorkemin_dunyasi',
    href: '#',
  },
  {
    icon: Twitter,
    label: 'Twitter',
    value: '@gorkemdusunur',
    href: '#',
  },
  {
    icon: MapPin,
    label: 'Konum',
    value: 'İstanbul, Türkiye',
    href: null,
  },
];

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-container pt-24 lg:pt-32 pb-12">
        <div className="section-inner text-center">
          <h1 className="font-serif text-3xl lg:text-4xl text-text-dark font-semibold mb-4">
            İletişim
          </h1>
          <p className="text-text max-w-xl mx-auto">
            Sorularınız, önerileriniz veya işbirliği talepleriniz için bana ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-container py-12 lg:py-16 bg-beige/30">
        <div className="section-inner">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-text-dark font-semibold mb-4">
                  Benimle İletişime Geç
                </h2>
                <p className="text-text leading-relaxed">
                  Blog yazılarım hakkında yorumlarınızı, okumamı önerdiğiniz 
                  kitapları veya gezi önerilerinizi paylaşabilirsiniz. En kısa 
                  sürede size dönüş yapacağım.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-soft">
                      <div className="w-12 h-12 rounded-xl bg-powder/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-text-dark" />
                      </div>
                      <div>
                        <div className="text-sm text-text-light">{info.label}</div>
                        <div className="text-text-dark font-medium">{info.value}</div>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a
                      key={info.label}
                      href={info.href}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.label}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-soft p-6 lg:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sage/30 flex items-center justify-center">
                    <Send className="w-8 h-8 text-sage-dark" />
                  </div>
                  <h3 className="font-serif text-xl text-text-dark font-semibold mb-2">
                    Mesajınız Gönderildi!
                  </h3>
                  <p className="text-text">
                    En kısa sürede size dönüş yapacağım.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 btn-outline"
                  >
                    Yeni Mesaj Gönder
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                      İsim
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-cream
                               text-text-dark placeholder:text-text-light
                               focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                               transition-all"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-cream
                               text-text-dark placeholder:text-text-light
                               focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                               transition-all"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-dark mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-cream
                               text-text-dark placeholder:text-text-light
                               focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                               transition-all"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                      Mesaj
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-cream
                               text-text-dark placeholder:text-text-light
                               focus:outline-none focus:ring-2 focus:ring-powder focus:border-transparent
                               transition-all resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-text-dark/30 border-t-text-dark rounded-full animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Gönder
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
