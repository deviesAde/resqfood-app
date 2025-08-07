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

resqfood-app/
├── app/ # Routing dan halaman utama (Next.js App Router)
├── components/ # Komponen UI reusable
├── hooks/ # Custom hooks (jika ada)
├── lib/ # Utilitas / helper
├── public/ # Aset publik (gambar, ikon, dsb.)
├── styles/ # File Tailwind & style global
├── types/ # Tipe data TypeScript
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── package-lock.json / pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json

yaml
Copy
Edit

---

## ⚙️ Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/deviesAde/resqfood-app.git
   cd resqfood-app
Install dependencies
Jika menggunakan npm:

bash
Copy
Edit
npm install
Jika menggunakan pnpm:

bash
Copy
Edit
pnpm install
Jalankan aplikasi

bash
Copy
Edit
npm run dev
Buka browser dan akses:

arduino
Copy
Edit
http://localhost:3000

🧑‍💻 Cara Penggunaan
Jalankan aplikasi dengan npm run dev

Jelajahi halaman produk dan informasi makanan

Ini adalah versi frontend statis — belum memiliki sistem login, cart, atau transaksi

Ideal untuk prototipe dan pengujian UI/UX


📄 Lisensi
Lisensi proyek ini belum ditentukan. Akan diperbarui di masa mendatang.

🔗 Tautan Terkait
🔗 Repository GitHub: https://github.com/deviesAde/resqfood-app