# Görki'nin Dünyası — Blog & Admin Paneli

Görkem'in kişisel blogu: annelik, akademik yolculuk, kitaplar ve geziler.  
React + TypeScript + Vite + Tailwind CSS ile geliştirilmiştir.

---

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

---

## 🔐 Admin Paneli

Admin paneline `/admin-login` (uygulamada "Admin" butonuyla) erişebilirsiniz.

### Güvenli Kimlik Bilgileri Kurulumu

1. `.env.example` dosyasını kopyalayın:
   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasını düzenleyin:
   ```
   VITE_ADMIN_EMAIL=admin@yourdomain.com
   VITE_ADMIN_PASSWORD_HASH=YourStrongPassword123!
   VITE_ADMIN_NAME=Görkem
   ```

3. `.env` dosyasını **asla git'e commit etmeyin**. `.gitignore` zaten bunu engelliyor.

> ⚠️ Ortam değişkeni ayarlanmazsa varsayılan değerler kullanılır. **Production'da mutlaka `.env` ayarlayın.**

---

## 🛠️ Admin Paneli Özellikleri

| Sayfa | Özellik |
|-------|---------|
| **Dashboard** | İstatistikler, son yazılar, silme/düzenleme |
| **Yazılar** | Listeleme, arama, filtre, düzenleme, silme |
| **Yeni / Düzenle Yazı** | Tam form, taslak & yayın, kapak görseli önizleme |
| **Medya** | Grid/liste görünüm, URL kopyalama, silme |
| **Kategoriler** | CRUD işlemleri, inline düzenleme |
| **Yorumlar** | Onaylama, reddetme, silme |
| **Ayarlar** | Profil, güvenlik (şifre validasyonu), genel ayarlar |

---

## 📁 Proje Yapısı

```
src/
├── App.tsx                    # Router + global navigasyon
├── contexts/
│   └── AdminContext.tsx       # Tüm içerik state'i (posts, books, trips…)
├── hooks/
│   └── useAuth.ts             # Auth + .env'den kimlik bilgileri
├── pages/
│   ├── admin/                 # Dashboard, Posts, PostEditor, Settings…
│   └── Home, Kitaplik…        # Site sayfaları
├── components/
│   └── layout/AdminLayout.tsx # Aktif sayfa highlight'lı sidebar
└── data/
    └── mockData.ts            # Örnek içerik
```

---

## 🔄 Admin → Site Güncellemesi

`AdminContext` tüm uygulamayı kapsar. Admin panelinde yapılan her değişiklik (yazı ekleme, silme, güncelleme) anında site sayfalarına (`Home`, `CategoryPage`, `Kitaplik`, `Geziler`) yansır.

---

## 🌐 GitHub Pages ile Deploy

```bash
# Build
npm run build

# dist/ klasörünü GitHub Pages'e yükle
# vite.config.ts'de base: '/repo-adı/' ayarlayın
```

---

## ⚙️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 7**
- **Tailwind CSS 3**
- **Lucide React** (ikonlar)
- **shadcn/ui** (UI bileşenleri)
