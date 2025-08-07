# 🥫 ResqFood

**ResqFood** adalah aplikasi frontend berbasis **Next.js** yang bertujuan untuk **mengurangi pemborosan makanan** dengan cara menjual makanan yang masih layak konsumsi namun mendekati tanggal kedaluwarsa dengan **harga yang lebih murah**.

Platform ini memungkinkan toko, restoran, dan produsen makanan untuk menjual produk dengan diskon besar — sekaligus memberikan kesempatan kepada pembeli untuk berhemat dan ikut serta menyelamatkan makanan dari pemborosan.

---

## 📑 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi](#-instalasi)
- [Cara Penggunaan](#-cara-penggunaan)
- [Tautan Terkait](#-tautan-terkait)

---

## ✨ Fitur

- Halaman pencarian dan daftar produk makanan diskon
- Tampilan detail produk makanan
- Navigasi sederhana dan responsif
- Data dummy berbasis array (tanpa backend/database)
- UI modern menggunakan Tailwind CSS

---

## 🛠 Teknologi yang Digunakan

- ⚡ [Next.js](https://nextjs.org/) – Framework React modern untuk frontend
- 🎨 [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- 🔡 TypeScript – Bahasa pemrograman statis untuk JavaScript
- 🧪 Tanpa backend – semua data bersifat statis / dummy array

---

## 📁 Struktur Proyek

```bash
resqfood-app/
├── app/                  # Routing dan halaman utama (Next.js App Router)
│   ├── (auth)/           # Halaman autentikasi
│   ├── (main)/           # Halaman utama yang dilindungi
│   ├── api/              # Endpoint API
│   ├── layout.tsx        # Layout utama
│   └── page.tsx          # Halaman beranda
├── components/           # Komponen UI reusable
│   ├── auth/             # Komponen autentikasi
│   ├── dashboard/        # Komponen dashboard
│   ├── products/         # Komponen produk
│   ├── ui/               # Komponen UI dasar (button, card, etc.)
│   └── ...               # Komponen lainnya
├── hooks/                # Custom hooks
│   ├── use-auth.ts       # Hook autentikasi
│   └── use-products.ts   # Hook produk
├── lib/                  # Utilitas dan helper
│   ├── constants.ts      # Konstanta aplikasi
│   ├── utils.ts          # Fungsi utilitas
│   └── api/              # Klien API
├── public/               # Aset publik
│   ├── images/           # Gambar aplikasi
│   └── icons/            # Ikon aplikasi
├── styles/               # File styling
│   ├── globals.css       # CSS global
│   └── tailwind.css      # Konfigurasi Tailwind
├── types/                # Tipe TypeScript
│   ├── auth.d.ts         # Tipe autentikasi
│   └── products.d.ts     # Tipe produk
├── .env.example          # Template environment variables
├── .gitignore            # Daftar file yang diignore Git
├── next.config.mjs       # Konfigurasi Next.js
├── package.json          # Dependensi proyek
├── postcss.config.mjs    # Konfigurasi PostCSS
├── tailwind.config.ts    # Konfigurasi Tailwind CSS
└── tsconfig.json         # Konfigurasi TypeScript

```











1. **Clone repository**
```bash
git clone https://github.com/deviesAde/resqfood-app.git
cd resqfood-app
```

2. **Install dependencies**

Jika menggunakan **npm**:
```bash
npm install
```

Jika menggunakan **pnpm**:
```bash
pnpm install
```

3. **Jalankan aplikasi**
```bash
npm run dev
```

4. **Akses di browser**
```
http://localhost:3000
```

## 🧑‍💻 Cara Penggunaan

- Jalankan aplikasi dengan `npm run dev`
- Jelajahi halaman produk dan informasi makanan
- Ini adalah versi frontend statis — **belum memiliki sistem login, cart, atau transaksi**
- Cocok untuk **prototipe** dan **pengujian UI/UX**

## 📄 Lisensi

Lisensi proyek ini **belum ditentukan**. Akan diperbarui di masa mendatang.

## 🔗 Tautan Terkait

- 🔗 Repository GitHub: [https://github.com/deviesAde/resqfood-app](https://github.com/deviesAde/resqfood-app)