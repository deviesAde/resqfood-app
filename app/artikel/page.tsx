"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ArtikelPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          asChild
          className="bg-white dark:bg-gray-800 text-[#740938] dark:text-[#DE7C7D] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full shadow-lg px-4"
        >
          <Link href="/">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Kembali ke Beranda
          </Link>
        </Button>
      </div>

      {/* Article Header */}
      <div className="relative h-64 sm:h-80 md:h-96">
        <Image
          src="/article/2.jpg"
          alt="Krisis Sampah Makanan di Indonesia"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/90 via-transparent to-transparent"></div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Krisis Sampah Makanan di Indonesia
          </h1>
          <p className="text-white/90 mt-2 max-w-2xl drop-shadow-md">
            Mengubah Masalah Menjadi Solusi Berkelanjutan
          </p>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <div className="prose dark:prose-invert prose-lg">
          <p className="lead">
            Indonesia membuang 14,73 juta ton makanan per tahun - setara dengan
            300 piring nasi per orang - sementara 20 juta penduduk masih
            mengalami kelaparan.
          </p>

          <h2>Fakta Mengkhawatirkan tentang Food Waste</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#740938]/5 p-4 rounded-lg border border-[#740938]/10">
              <h3 className="text-[#740938] dark:text-[#DE7C7D] font-semibold mb-2">
                Dampak Lingkungan
              </h3>
              <ul className="space-y-1">
                <li>Menyumbang 7,29% emisi GRK nasional</li>
                <li>Membuang 24.000 liter air/ton makanan terbuang</li>
                <li>Mengisi 65% tempat pembuangan akhir</li>
              </ul>
            </div>
            <div className="bg-[#DE7C7D]/5 p-4 rounded-lg border border-[#DE7C7D]/10">
              <h3 className="text-[#740938] dark:text-[#DE7C7D] font-semibold mb-2">
                Kerugian Ekonomi
              </h3>
              <ul className="space-y-1">
                <li>Rp213-551 triliun per tahun</li>
                <li>41,4% dari total sampah nasional</li>
                <li>Bisa memberi makan 125 juta orang</li>
              </ul>
            </div>
          </div>

          <Image
            src="/article/1.png"
            alt="Infografis Sampah Makanan Indonesia"
            width={800}
            height={450}
            className="rounded-lg my-8"
          />

          <h2>Solusi Inovatif: Peran resQfood</h2>
          <Image
            src="/article/presentation.jpeg"
            alt="Infografis Sampah Makanan Indonesia"
            width={1100}
            height={350}
            className="rounded-lg my-8"
          />
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 my-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-3 text-[#740938] dark:text-[#DE7C7D]">
              Menghubungkan Kelebihan dengan Kebutuhan
            </h3>
            <p>resQfood hadir sebagai platform yang menjembatani antara:</p>
            <ul className="space-y-2 my-4">
              <li className="flex items-start">
                <span className="text-[#740938] dark:text-[#DE7C7D] mr-2">
                  •
                </span>
                <span>
                  <strong>Penyedia makanan</strong> (restoran, supermarket,
                  produsen) dengan stok berlebih atau produk mendekati
                  kadaluarsa
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#740938] dark:text-[#DE7C7D] mr-2">
                  •
                </span>
                <span>
                  <strong>Konsumen cerdas</strong> yang ingin berkontribusi
                  mengurangi food waste sekaligus berbelanja dengan harga lebih
                  terjangkau
                </span>
              </li>
            </ul>
            <p>
              Dengan model bisnis berkelanjutan ini, resQfood menciptakan
              lingkaran ekonomi yang menguntungkan semua pihak sekaligus
              mengurangi dampak lingkungan.
            </p>
          </div>

          <h3>Mekanisme Dasar Platform</h3>
          <div className="space-y-4 my-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#740938] text-white dark:bg-[#DE7C7D] font-bold">
                  1
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p>
                  Mitra bisnis mengidentifikasi produk berlebih atau near-expiry
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#740938] text-white dark:bg-[#DE7C7D] font-bold">
                  2
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p>
                  Produk diverifikasi dan ditawarkan melalui platform dengan
                  harga diskon
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#740938] text-white dark:bg-[#DE7C7D] font-bold">
                  3
                </div>
              </div>
              <div className="flex-1 pt-1">
                <p>
                  Konsumen membeli melalui aplikasi dengan sistem pick-up atau
                  delivery
                </p>
              </div>
            </div>
          </div>

          <h2>Dampak Positif</h2>
          <div className="grid md:grid-cols-3 gap-4 my-6">
            <div className="bg-[#740938]/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Ekonomi</h4>
              <p className="text-sm">
                Mengubah potensi kerugian menjadi pendapatan tambahan bagi
                bisnis
              </p>
            </div>
            <div className="bg-[#740938]/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Sosial</h4>
              <p className="text-sm">
                Membuka akses pangan berkualitas dengan harga lebih terjangkau
              </p>
            </div>
            <div className="bg-[#740938]/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Lingkungan</h4>
              <p className="text-sm">
                Mengurangi emisi metana dari pembusukan makanan di TPA
              </p>
            </div>
          </div>

          <div className="bg-[#740938]/10 dark:bg-[#DE7C7D]/10 p-6 rounded-lg mt-8 border border-[#740938]/20 dark:border-[#DE7C7D]/20">
            <h3 className="text-xl font-semibold mb-3 text-[#740938] dark:text-[#DE7C7D]">
              Bergabunglah dengan Gerakan Ini
            </h3>
            <p className="mb-4">
              Dalam 1 tahun terakhir, resQfood telah menyelamatkan 1,2 juta
              porsi makanan dari pembuangan sia-sia.
            </p>
          </div>

          <p className="mt-8 text-center">
            <em>
              "Setiap porsi makanan yang terselamatkan adalah langkah kecil
              menuju perubahan besar untuk Indonesia yang lebih berkelanjutan."
            </em>
          </p>
        </div>
      </div>
    </div>
  );
}
