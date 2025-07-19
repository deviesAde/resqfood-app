"use client";

import { useState } from "react";
import { Header } from "@/components/marketplace/header";
import { CategoryNavigation } from "@/components/marketplace/category-navigation";
import { ProductFilters } from "@/components/marketplace/product-filters";
import { HeroStatsBanner } from "@/components/marketplace/hero-stats-banner";
import { UrgentProductsSection } from "@/components/marketplace/urgent-products-section";
import { AllProductsSection } from "@/components/marketplace/all-products-section";
import { NoProductsFound } from "@/components/marketplace/no-products-found";
import { CallToActionBanner } from "@/components/marketplace/call-to-action-banner";
import type { Product } from "@/types/product";

const products: Product[] = [
  {
    id: 1,
    name: "Roti Gandum ",
    originalPrice: 89900,
    discountedPrice: 39900,
    discount: 56,
    expiryDays: 1,
    freshnessDays: 3,
    category: "Roti & Kue",
    rating: 4.8,
    reviews: 24,
    seller: "Toko Roti Sehat",
    location: "Jakarta Pusat",
    image: "/products/1/roti.png",
    urgent: true,
    sold: 45,
    status: "available",
    bestBy: "Today",
    goodFor: "3 days if refrigerated",
  },
  {
    id: 2,
    name: "Sarden Kaleng Khas Muncar",
    originalPrice: 10000,
    discountedPrice: 4900,
    discount: 54,
    expiryDays: 0,
    freshnessDays: 0,
    category: "Canned Goods",
    rating: 4.9,
    reviews: 18,
    seller: "Muncar Seafood",
    location: "Banyuwangi",
    image: "/products/2/sarden.png",
    urgent: false,
    sold: 32,
    status: "expired",
    bestBy: "Kemarin",
    goodFor: "Tidak direkomendasikan",
  },
  {
    id: 3,
    name: "Biskuit Cokelat ",
    originalPrice: 20000,
    discountedPrice: 12900,
    discount: 48,
    expiryDays: 7,
    freshnessDays: 14,
    category: "Camilan",
    rating: 4.7,
    reviews: 56,
    seller: "Kedai Cokelat",
    location: "Surabaya",
    image: "/products/3/biskuit.png",
    urgent: false,
    sold: 78,
    status: "available",
    bestBy: "7 hari lagi",
    goodFor: "14 hari jika disimpan di tempat sejuk",
  },
  {
    id: 4,
    name: "Susu Kaleng ",
    originalPrice: 129900,
    discountedPrice: 59900,
    discount: 54,
    expiryDays: 1,
    freshnessDays: 2,
    category: "Produk Susu",
    rating: 4.6,
    reviews: 31,
    seller: "Beruang Susu",
    location: "Jakarta Selatan",
    image: "/products/4/susu1.png",
    urgent: true,
    sold: 23,
    status: "available",
    bestBy: "Hari Ini",
    goodFor: "2 hari jika didinginkan",
  },
  {
    id: 5,
    name: "Mozzarella ",
    originalPrice: 99900,
    discountedPrice: 49900,
    discount: 50,
    expiryDays: 3,
    freshnessDays: 5,
    category: "Produk Susu",
    rating: 4.8,
    reviews: 42,
    seller: "Artisan Keju",
    location: "Yogyakarta",
    image: "/products/5/moza1.png",
    urgent: false,
    sold: 67,
    status: "available",
    bestBy: "Dalam 3 hari",
    goodFor: "5 hari saat didinginkan",
  },
  {
    id: 6,
    name: "Bar Energi Lokal",
    originalPrice: 159900,
    discountedPrice: 79900,
    discount: 50,
    expiryDays: 5,
    freshnessDays: 30,
    category: "Camilan",
    rating: 4.5,
    reviews: 29,
    seller: "PT. Gigitan Sehat",
    location: "Denpasar",
    image: "/products/6/bar2.png",
    urgent: false,
    sold: 54,
    status: "available",
    bestBy: "Dalam 5 hari",
    goodFor: "1 bulan masa simpan",
  },
  {
    id: 7,
    name: "Salad Organik Kedaluwarsa",
    originalPrice: 49900,
    discountedPrice: 19900,
    discount: 60,
    expiryDays: -1,
    freshnessDays: 0,
    category: "Sayuran",
    rating: 4.2,
    reviews: 15,
    seller: "Kebun Hijau",
    location: "Semarang",
    image: "/products/6/image.png",
    urgent: false,
    sold: 12,
    status: "expired",
    bestBy: "Kemarin",
    goodFor: "Tidak aman untuk dikonsumsi",
  },
];

const categories = [
  "Semua", // All
  "Roti & Kue", // Baked Goods
  "Produk Susu", // Dairy
  "Minuman", // Beverages
  "Camilan", // Snacks
  "Buah-buahan", // Fruits
  "Sayuran", // Vegetables
];

const sortOptions = [
  "Expiry (Urgent First)",
  "Price (Low to High)",
  "Price (High to Low)",
  "Rating",
  "Discount",
  "Most Popular",
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("Expiry (Urgent First)");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || product.category === selectedCategory;
      const matchesExpiredFilter = showExpired || product.status !== "expired";
      return matchesSearch && matchesCategory && matchesExpiredFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Expiry (Urgent First)":
          if (a.status === "expired" && b.status !== "expired") return 1;
          if (b.status === "expired" && a.status !== "expired") return -1;
          return a.expiryDays - b.expiryDays;
        case "Price (Low to High)":
          return a.discountedPrice - b.discountedPrice;
        case "Price (High to Low)":
          return b.discountedPrice - a.discountedPrice;
        case "Rating":
          return b.rating - a.rating;
        case "Discount":
          return b.discount - a.discount;
        case "Most Popular":
          return b.sold - a.sold;
        default:
          return 0;
      }
    });

  const urgentProducts = filteredProducts.filter(
    (p) => p.expiryDays <= 1 && p.status === "available"
  );
  const expiredProducts = products.filter((p) => p.status === "expired");
  const availableProducts = filteredProducts.filter(
    (p) => p.status === "available"
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("Semua");
    setSortBy("Expiry (Urgent First)");
    setShowExpired(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CategoryNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        showExpired={showExpired}
        setShowExpired={setShowExpired}
        expiredProductsLength={expiredProducts.length}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        {showFilters && (
          <ProductFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
          />
        )}
        <HeroStatsBanner
          availableItemsCount={availableProducts.length}
          urgentItemsCount={urgentProducts.length}
        />
        <UrgentProductsSection urgentProducts={urgentProducts} />
        <AllProductsSection
          filteredProducts={filteredProducts}
          viewMode={viewMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={sortOptions}
        />
        {filteredProducts.length === 0 && (
          <NoProductsFound onClearFilters={handleClearFilters} />
        )}
        <CallToActionBanner />
      </div>
    </div>
  );
}
