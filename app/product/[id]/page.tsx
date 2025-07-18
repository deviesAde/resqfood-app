"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Package,
  Zap,
  AlertTriangle,
  CheckCircle,
  Timer,
  Star,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image"; // Import Image component

const productDetails = {
  1: {
    id: 1,
    name: "Roti Gandum Artisan",
    originalPrice: 89900,
    discountedPrice: 39900,
    discount: 56,
    expiryDays: 1,
    bestBy: "19 Juli 2025",
    category: "Roti & Kue",
    rating: 4.8,
    reviewsCount: 24,
    seller: "Toko Roti Emas",
    location: "Jakarta Pusat",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: true,
    sold: 45,
    status: "available",
    description:
      "Roti sourdough buatan tangan dengan tepung organik dan metode fermentasi tradisional. Sempurna untuk sandwich atau roti panggang. Roti artisan ini memiliki kulit renyah dan bagian dalam yang lembut, berongga dengan rasa kompleks yang dikembangkan selama 24 jam fermentasi.",
    ingredients: [
      "Tepung gandum organik",
      "Air",
      "Ragi sourdough",
      "Garam laut",
    ],
    nutritionFacts: {
      calories: 250,
      protein: "8g",
      carbs: "48g",
      fat: "2g",
      fiber: "3g",
    },
    allergens: ["Gluten", "Mungkin mengandung jejak kacang"],
    pickupTimes: ["Hari Ini 14:00 - 18:00", "Besok 09:00 - 13:00"],
    sellerInfo: {
      name: "Toko Roti Emas",
      rating: 4.9,
      totalReviews: 156,
      yearsInBusiness: 8,
      specialties: ["Roti Artisan", "Kue-kue", "Panggang Organik"],
      phone: "+62 812-3456-7890",
      email: "info@tokorotiemas.com",
      address: "Jl. Roti No. 123, Jakarta Pusat",
    },
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment:
          "Roti yang luar biasa! Segar dan lezat. Nilai yang bagus untuk uang.",
        date: "2024-01-10",
        verified: true,
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        comment: "Roti berkualitas baik, sempurna untuk roti panggang pagi.",
        date: "2024-01-08",
        verified: true,
      },
    ],
  },
  2: {
    id: 2,
    name: "Yogurt Yunani Organik",
    originalPrice: 65000,
    discountedPrice: 29900,
    discount: 54,
    expiryDays: -3,
    bestBy: "15 Juli 2025",
    category: "Produk Susu",
    rating: 4.9,
    reviewsCount: 18,
    seller: "Peternakan Lembah Segar",
    location: "Bandung",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: false,
    sold: 32,
    status: "expired",
    description:
      "Yogurt Yunani organik kental yang terbuat dari susu sapi yang diberi makan rumput. Kaya protein dan probiotik. Sempurna untuk sarapan, smoothie, atau sebagai camilan sehat.",
    ingredients: ["Susu organik", "Kultur aktif hidup"],
    nutritionFacts: {
      calories: 130,
      protein: "15g",
      carbs: "6g",
      fat: "7g",
      fiber: "0g",
    },
    allergens: ["Susu"],
    pickupTimes: ["Kedaluwarsa - Tidak lagi tersedia"],
    sellerInfo: {
      name: "Peternakan Lembah Segar",
      rating: 4.8,
      totalReviews: 89,
      yearsInBusiness: 12,
      specialties: ["Produk Susu Organik", "Produk Segar Peternakan"],
      phone: "+62 812-9876-5432",
      email: "kontak@lembahsegar.com",
      address: "Jl. Peternakan No. 456, Bandung",
    },
    reviews: [],
  },
  3: {
    id: 3,
    name: "Biji Kopi Premium",
    originalPrice: 249900,
    discountedPrice: 129900,
    discount: 48,
    expiryDays: 7,
    bestBy: "25 Juli 2025",
    category: "Minuman",
    rating: 4.7,
    reviewsCount: 56,
    seller: "Master Roaster Kopi",
    location: "Surabaya",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: false,
    sold: 78,
    status: "available",
    description:
      "Biji kopi Arabika berkualitas tinggi, bersumber secara etis dan baru dipanggang. Nikmati secangkir kopi yang kaya dan aromatik setiap pagi. Biji kopi ini sempurna untuk espresso, drip, atau French press, menawarkan aroma cokelat dan karamel.",
    ingredients: ["100% biji kopi Arabika"],
    nutritionFacts: {
      calories: 5,
      protein: "0.3g",
      carbs: "1g",
      fat: "0g",
      fiber: "0g",
    },
    allergens: [],
    pickupTimes: ["Kapan saja selama jam kerja"],
    sellerInfo: {
      name: "Master Roaster Kopi",
      rating: 4.7,
      totalReviews: 210,
      yearsInBusiness: 10,
      specialties: ["Panggang Kopi", "Campuran Espresso", "Single Origin"],
      phone: "+62 812-7890-1234",
      email: "penjualan@masterroaster.com",
      address: "Jl. Kopi No. 789, Surabaya",
    },
    reviews: [
      {
        id: 3,
        user: "David L.",
        rating: 5,
        comment: "Kopi yang fantastis! Aromanya luar biasa dan rasanya lembut.",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: 4,
        user: "Emily C.",
        rating: 4,
        comment:
          "Nilai yang bagus untuk biji premium. Agak kuat untuk selera saya, tapi tetap enak.",
        date: "2024-01-12",
        verified: false,
      },
    ],
  },
  4: {
    id: 4,
    name: "Kroisan Cokelat Gourmet",
    originalPrice: 129900,
    discountedPrice: 59900,
    discount: 54,
    expiryDays: 1,
    bestBy: "19 Juli 2025",
    category: "Roti & Kue",
    rating: 4.6,
    reviewsCount: 31,
    seller: "Patisserie Indah",
    location: "Jakarta Selatan",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: true,
    sold: 23,
    status: "available",
    description:
      "Kroisan renyah, bermentega, diisi dengan cokelat hitam kaya. Camilan sempurna untuk sarapan atau hidangan penutup. Dipanggang segar setiap hari dengan bahan-bahan premium.",
    ingredients: [
      "Tepung terigu",
      "Mentega",
      "Cokelat",
      "Gula",
      "Ragi",
      "Garam",
    ],
    nutritionFacts: {
      calories: 350,
      protein: "6g",
      carbs: "40g",
      fat: "20g",
      fiber: "2g",
    },
    allergens: ["Gluten", "Susu", "Kedelai"],
    pickupTimes: ["Hari Ini 15:00 - 19:00"],
    sellerInfo: {
      name: "Patisserie Indah",
      rating: 4.7,
      totalReviews: 95,
      yearsInBusiness: 6,
      specialties: ["Kue Pastry Prancis", "Kue Pesanan"],
      phone: "+62 812-2345-6789",
      email: "kontak@patisserieindah.com",
      address: "Jl. Manis No. 456, Jakarta Selatan",
    },
    reviews: [
      {
        id: 5,
        user: "Olivia P.",
        rating: 5,
        comment:
          "Kroisan ini luar biasa! Sangat segar dan cokelatnya menakjubkan.",
        date: "2024-01-18",
        verified: true,
      },
    ],
  },
  5: {
    id: 5,
    name: "Mozzarella Segar",
    originalPrice: 99900,
    discountedPrice: 49900,
    discount: 50,
    expiryDays: 3,
    bestBy: "21 Juli 2025",
    category: "Produk Susu",
    rating: 4.8,
    reviewsCount: 42,
    seller: "Artisan Keju",
    location: "Yogyakarta",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: false,
    sold: 67,
    status: "available",
    description:
      "Mozzarella segar, lembut, terbuat dari susu sapi lokal. Sempurna untuk salad Caprese, pizza, atau dinikmati begitu saja. Ditarik tangan untuk tekstur yang lembut.",
    ingredients: ["Susu sapi pasteurisasi", "Rennet", "Garam"],
    nutritionFacts: {
      calories: 80,
      protein: "7g",
      carbs: "1g",
      fat: "6g",
      fiber: "0g",
    },
    allergens: ["Susu"],
    pickupTimes: ["Senin - Jumat 10:00 - 17:00"],
    sellerInfo: {
      name: "Artisan Keju",
      rating: 4.8,
      totalReviews: 120,
      yearsInBusiness: 9,
      specialties: ["Keju Artisan", "Produk Susu Lokal"],
      phone: "+62 812-3456-7890",
      email: "info@artisankeju.com",
      address: "Jl. Susu No. 789, Yogyakarta",
    },
    reviews: [
      {
        id: 6,
        user: "James K.",
        rating: 5,
        comment: "Mozzarella terbaik yang pernah saya makan. Sangat segar!",
        date: "2024-01-20",
        verified: true,
      },
    ],
  },
  6: {
    id: 6,
    name: "Bar Energi Lokal",
    originalPrice: 159900,
    discountedPrice: 79900,
    discount: 50,
    expiryDays: 5,
    bestBy: "23 Juli 2025",
    category: "Camilan",
    rating: 4.5,
    reviewsCount: 29,
    seller: "PT. Gigitan Sehat",
    location: "Denpasar",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: false,
    sold: 54,
    status: "available",
    description:
      "Bar energi buatan tangan yang dikemas dengan kacang-kacangan, biji-bijian, dan buah-buahan kering. Camilan sehat dan lezat untuk bepergian. Tersedia pilihan bebas gluten dan vegan.",
    ingredients: [
      "Oat",
      "Almond",
      "Kurma",
      "Biji chia",
      "Madu",
      "Minyak kelapa",
    ],
    nutritionFacts: {
      calories: 180,
      protein: "5g",
      carbs: "25g",
      fat: "8g",
      fiber: "4g",
    },
    allergens: ["Kacang-kacangan", "Mungkin mengandung jejak kacang tanah"],
    pickupTimes: ["Setiap Hari 09:00 - 18:00"],
    sellerInfo: {
      name: "PT. Gigitan Sehat",
      rating: 4.6,
      totalReviews: 70,
      yearsInBusiness: 4,
      specialties: ["Camilan Sehat", "Pilihan Vegan"],
      phone: "+62 812-4567-8901",
      email: "halo@gigitansehat.com",
      address: "Jl. Kesehatan No. 101, Denpasar",
    },
    reviews: [
      {
        id: 7,
        user: "Anna B.",
        rating: 4,
        comment: "Enak dan mengenyangkan. Bagus untuk dorongan energi cepat.",
        date: "2024-01-22",
        verified: true,
      },
    ],
  },
  7: {
    id: 7,
    name: "Salad Organik Kedaluwarsa",
    originalPrice: 49900,
    discountedPrice: 19900,
    discount: 60,
    expiryDays: -5,
    bestBy: "13 Juli 2025",
    category: "Sayuran",
    rating: 4.2,
    reviewsCount: 15,
    seller: "Kebun Hijau",
    location: "Semarang",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: false,
    sold: 12,
    status: "expired",
    description:
      "Campuran sayuran organik segar, termasuk romaine, bayam, dan kale. (Catatan: Produk ini sudah kedaluwarsa dan tidak aman untuk dikonsumsi.)",
    ingredients: ["Selada romaine", "Bayam", "Kale"],
    nutritionFacts: {
      calories: 20,
      protein: "1g",
      carbs: "3g",
      fat: "0g",
      fiber: "2g",
    },
    allergens: [],
    pickupTimes: ["Kedaluwarsa - Tidak lagi tersedia"],
    sellerInfo: {
      name: "Kebun Hijau",
      rating: 4.0,
      totalReviews: 50,
      yearsInBusiness: 7,
      specialties: ["Produk Organik", "Sayuran Segar"],
      phone: "+62 812-5678-9012",
      email: "dukungan@kebunhijau.com",
      address: "Jl. Pertanian No. 222, Semarang",
    },
    reviews: [],
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product =
    productDetails[Number(productId) as keyof typeof productDetails];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showAllReviews, setShowAllReviews] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
            Produk Tidak Ditemukan
          </h1>
          <Link href="/marketplace">
            <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full">
              Kembali ke Marketplace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isExpired = product.status === "expired";
  const isUrgent = product.expiryDays <= 1 && !isExpired;
  const daysPastExpiry = Math.abs(product.expiryDays);
  const isRecentlyExpired =
    isExpired && daysPastExpiry > 0 && daysPastExpiry <= 7;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/marketplace"
                className="flex items-center space-x-2 group"
              >
                <ArrowLeft className="w-5 h-5 text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors" />
                <Image
                  src="/public/logo/logo.png" // Use your logo image
                  alt="resQfood Logo"
                  width={32}
                  height={32}
                  className="rounded-lg group-hover:scale-105 transition-transform"
                />
                <span className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors">
                  resQfood
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[#DE7C7D]/20"
              >
                <Share2 className="w-4 h-4 text-[#740938] dark:text-[#DE7C7D]" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[#DE7C7D]/20"
              >
                <Heart className="w-4 h-4 text-[#740938] dark:text-[#DE7C7D]" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              {isExpired && (
                <div className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                    <h3 className="text-2xl font-bold mb-2">KEDALUWARSA</h3>
                    <p className="text-red-200">
                      Produk ini tidak lagi tersedia
                    </p>
                  </div>
                </div>
              )}
              {isUrgent && !isExpired && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#CC2B52] text-white animate-pulse text-lg px-4 py-2">
                    <Zap className="w-4 h-4 mr-2" />
                    URGENT - Kedaluwarsa Hari Ini!
                  </Badge>
                </div>
              )}
              <Badge className="absolute top-4 right-4 bg-[#AF1740] text-white text-xl font-bold px-4 py-2">
                {product.discount}% DISKON
              </Badge>
              <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="text-white text-xs">
                  {product.sold} terjual
                </span>
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-[#AF1740] scale-105"
                        : "border-gray-200 dark:border-gray-600 hover:border-[#DE7C7D]"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Badge
                  variant="outline"
                  className="text-[#740938] dark:text-[#DE7C7D] border-[#740938] dark:border-[#DE7C7D]"
                >
                  {product.category}
                </Badge>
                {isRecentlyExpired ? (
                  <Badge className="bg-orange-500 text-white">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Kedaluwarsa {daysPastExpiry} hari yang lalu
                  </Badge>
                ) : isExpired ? (
                  <Badge className="bg-red-500 text-white">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    KEDALUWARSA
                  </Badge>
                ) : isUrgent ? (
                  <Badge className="bg-[#CC2B52] text-white animate-pulse">
                    <Timer className="w-3 h-3 mr-1" />
                    Kedaluwarsa Hari Ini
                  </Badge>
                ) : (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Tersedia
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({product.reviews.length} ulasan)
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {product.sold} terjual
                  </span>
                </div>
              </div>
            </div>
            {/* Pricing */}
            <div className="bg-gradient-to-r from-[#DE7C7D]/20 to-[#AF1740]/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-[#AF1740] dark:text-[#CC2B52]">
                  Rp{product.discountedPrice.toLocaleString("id-ID")}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  Rp{product.originalPrice.toLocaleString("id-ID")}
                </span>
                <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                  Hemat Rp
                  {(
                    product.originalPrice - product.discountedPrice
                  ).toLocaleString("id-ID")}
                </Badge>
              </div>
              {isRecentlyExpired ? (
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">
                    Kedaluwarsa {daysPastExpiry} hari yang lalu
                  </span>
                </div>
              ) : !isExpired ? (
                <div className="flex items-center space-x-2 text-[#740938] dark:text-[#DE7C7D]">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">
                    {product.expiryDays === 0
                      ? "Kedaluwarsa hari ini"
                      : `${product.expiryDays} hari tersisa`}
                  </span>
                </div>
              ) : null}
            </div>
            {/* Quantity and Actions */}
            {isRecentlyExpired ? (
              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-orange-700 dark:text-orange-400 mb-2">
                  Produk Baru Saja Kedaluwarsa
                </h3>
                <p className="text-orange-600 dark:text-orange-300 mb-4">
                  Produk ini kedaluwarsa {daysPastExpiry} hari yang lalu. Tidak
                  lagi tersedia untuk dibeli.
                </p>
                <Link href="/marketplace">
                  <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
                    Jelajahi Produk Lain
                  </Button>
                </Link>
              </div>
            ) : isExpired ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
                  Produk Kedaluwarsa
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-4">
                  Produk ini tidak lagi tersedia untuk dibeli.
                </p>
                <Link href="/marketplace">
                  <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
                    Jelajahi Produk Lain
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-[#740938] dark:text-[#DE7C7D]">
                    Jumlah:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link href="/cart" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Tambah ke Keranjang - Rp
                      {(product.discountedPrice * quantity).toLocaleString(
                        "id-ID"
                      )}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white h-14 px-6 bg-transparent"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}
            {/* Pickup Info */}
            {!isExpired && (
              <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-lg mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Informasi Pengambilan
                  </h3>
                  <div className="space-y-3">
                    {product.pickupTimes.map((time, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-[#AF1740]" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {time}
                        </span>
                      </div>
                    ))}
                    {product.bestBy && (
                      <div className="flex items-center space-x-3">
                        <Clock className="w-4 h-4 text-[#AF1740]" />
                        <span className="text-gray-700 dark:text-gray-300">
                          Terbaik sebelum: {product.bestBy}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#DE7C7D]/30 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#AF1740]" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {product.sellerInfo.address}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        {/* Product Details Tabs */}
        <div className="mt-16 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <Card className="lg:col-span-2 border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-2xl mb-6">
                  Deskripsi Produk
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-3">
                      Bahan-bahan
                    </h4>
                    <ul className="space-y-1">
                      {product.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="text-gray-600 dark:text-gray-400 flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-3">
                      Fakta Nutrisi
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(product.nutritionFacts).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key}:
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
                {isExpired && (
                  <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                    <h4 className="font-semibold text-red-800 dark:text-red-400 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Peringatan Kedaluwarsa
                    </h4>
                    <p className="text-red-700 dark:text-red-300">
                      Produk ini kedaluwarsa pada{" "}
                      <span className="font-bold">{product.bestBy}</span> (
                      {daysPastExpiry === 0
                        ? "hari ini"
                        : `${daysPastExpiry} hari yang lalu`}
                      ). Tidak lagi aman untuk dikonsumsi.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Seller Info */}
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-xl mb-6">
                  Informasi Penjual
                </h3>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-lg">
                    {product.sellerInfo.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">
                      {product.sellerInfo.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({product.sellerInfo.totalReviews} ulasan)
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Pengalaman:
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {product.sellerInfo.yearsInBusiness} tahun
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400 block mb-2">
                      Spesialisasi:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sellerInfo.specialties.map(
                        (specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-[#740938] dark:text-[#DE7C7D] border-[#740938] dark:border-[#DE7C7D]"
                          >
                            {specialty}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#DE7C7D]/30 dark:border-gray-600 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-[#AF1740]" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {product.sellerInfo.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-[#AF1740]" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {product.sellerInfo.email}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Hubungi Penjual
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-2xl">
                    Ulasan Pelanggan
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-lg">{product.rating}</span>
                  </div>
                </div>
                <div className="space-y-6">
                  {product.reviews
                    .slice(0, showAllReviews ? undefined : 2)
                    .map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-[#DE7C7D]/30 dark:border-gray-600 pb-6 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {review.user[0]}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-[#740938] dark:text-[#DE7C7D]">
                                  {review.user}
                                </span>
                                {review.verified && (
                                  <Badge className="bg-green-500 text-white text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Terverifikasi
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                </div>
                {product.reviews.length > 2 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white"
                    >
                      {showAllReviews
                        ? "Tampilkan Lebih Sedikit"
                        : `Tampilkan Semua ${product.reviews.length} Ulasan`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-8">
            Anda Mungkin Juga Menyukai
          </h3>
          <div className="text-center py-12 bg-gradient-to-r from-[#DE7C7D]/20 to-[#AF1740]/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
            <Package className="w-16 h-16 text-[#740938] dark:text-[#DE7C7D] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Produk terkait segera hadir!
            </p>
            <Link href="/marketplace">
              <Button className="mt-4 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full">
                Jelajahi Semua Produk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
