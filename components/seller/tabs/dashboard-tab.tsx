"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  DollarSign,
  Star,
  Heart,
  TrendingUp,
  CheckCircle,
  BarChart3,
  Activity,
  Plus,
} from "lucide-react";
import { useState } from "react";
import AddProductModal from "../modals/add-product-modal";

// Format number consistently for both SSR and CSR
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

const sellerStats = {
  activeListings: 12,
  soldToday: 8,
  totalRating: 4.8,
  itemsRescued: 120,
  monthlyRevenue: 1247000,
  totalOrders: 89,
};

export default function DashboardTab() {
  const [showAddProduct, setShowAddProduct] = useState(false);

  return (
    <>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-xl dark:shadow-2xl">
          <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
            <div className="space-y-2">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                Selamat datang kembali, Toko Roti Emas! 🍞
              </h1>
              <p className="text-[#DE7C7D] text-sm sm:text-base lg:text-lg leading-relaxed">
                Anda telah menyelamatkan{" "}
                <span className="font-bold text-white">
                  {formatNumber(sellerStats.itemsRescued)} item
                </span>{" "}
                bulan ini dan meraih{" "}
                <span className="font-bold text-white">
                  Rp{formatNumber(sellerStats.monthlyRevenue)}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto lg:w-auto">
              <Button
                onClick={() => setShowAddProduct(true)}
                className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-4 sm:px-6 shadow-lg hover:shadow-xl transition-all text-sm sm:text-base flex-1 sm:flex-none"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Produk
              </Button>
            </div>
          </div>
        </div>

        {/* Key Performance Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[
            {
              title: "Listing Aktif",
              value: sellerStats.activeListings,
              icon: Package,
              gradient: "from-[#AF1740] to-[#CC2B52]",
              trend: "+3 minggu ini",
            },
            {
              title: "Terjual Hari Ini",
              value: sellerStats.soldToday,
              icon: DollarSign,
              gradient: "from-[#740938] to-[#AF1740]",
              trend: "+15% dari kemarin",
            },
            {
              title: "Rating Pelanggan",
              value: sellerStats.totalRating,
              icon: Star,
              gradient: "from-[#CC2B52] to-[#DE7C7D]",
              trend: "Berdasarkan 47 ulasan",
              isRating: true,
            },
            {
              title: "Item Diselamatkan",
              value: sellerStats.itemsRescued,
              icon: Heart,
              gradient: "from-[#AF1740] to-[#740938]",
              trend: "Bulan ini",
            },
          ].map((metric, index) => (
            <Card
              key={index}
              className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-700"
            >
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">
                      {metric.title}
                    </p>
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
                      {metric.isRating
                        ? metric.value
                        : formatNumber(metric.value)}
                    </p>
                  </div>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br ${metric.gradient} rounded-full flex items-center justify-center shrink-0 ml-2`}
                  >
                    <metric.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  {metric.isRating ? (
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 mr-1 fill-current" />
                  ) : (
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  )}
                  <span
                    className={`text-xs sm:text-sm ${
                      metric.isRating
                        ? "text-gray-600 dark:text-gray-300"
                        : "text-green-500"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-700">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {[
                {
                  title: "Roti Sourdough terjual",
                  description: "2 jam lalu • Rp39,900",
                  icon: CheckCircle,
                  bg: "bg-green-50 dark:bg-green-900/20",
                  border: "border-green-200 dark:border-green-800",
                  iconBg: "bg-green-500",
                },
                {
                  title: "Produk baru ditambahkan",
                  description: "5 jam lalu • Bagel Segar",
                  icon: Plus,
                  bg: "bg-[#DE7C7D]/20 dark:bg-[#DE7C7D]/10",
                  border: "border-[#DE7C7D]/30 dark:border-[#DE7C7D]/20",
                  iconBg: "bg-[#AF1740]",
                },
                {
                  title: "Ulasan bintang 5 baru",
                  description: '1 hari lalu • "Kualitas luar biasa!"',
                  icon: Star,
                  bg: "bg-yellow-50 dark:bg-yellow-900/20",
                  border: "border-yellow-200 dark:border-yellow-800",
                  iconBg: "bg-yellow-500",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 sm:p-4 ${activity.bg} rounded-xl ${activity.border}`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${activity.iconBg} rounded-full flex items-center justify-center shrink-0`}
                  >
                    <activity.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#740938] dark:text-white text-sm sm:text-base">
                      {activity.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-gray-700">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
                Ringkasan Performa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 sm:h-48 lg:h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#CC2B52]/20 dark:from-[#DE7C7D]/10 dark:to-[#CC2B52]/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#740938] dark:text-white mx-auto mb-4" />
                  <p className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base">
                    Grafik Penjualan
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    Tren penjualan mingguan
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onProductAdded={(productData) => {
          setShowAddProduct(false);
        }}
      />
    </>
  );
}
