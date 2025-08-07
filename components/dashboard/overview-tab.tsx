"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  Users,
  Store,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface OverviewTabProps {
  stats: {
    totalUsers: number;
    activeSellers: number;
    productsListed: number;
    ordersTracked: number;
    monthlyRevenue: number;
    totalRevenue: number;
  };
  flaggedProducts: {
    id: number;
    name: string;
    seller: string;
    reason: string;
    severity: string;
    date: string;
  }[];
}

export function OverviewTab({ stats, flaggedProducts }: OverviewTabProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safe number formatting that works consistently on server and client
  const formatNumber = (num: number) => {
    if (!mounted) {
      return num.toString(); // Return simple string on server
    }
    return num.toLocaleString(); // Use locale formatting only on client
  };

  const formatCurrency = (num: number) => {
    if (!mounted) {
      return `$${num}`; // Return simple format on server
    }
    return `$${num.toLocaleString()}`; // Use locale formatting only on client
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
              Selamat Datang di Dashboard Admin 🚀
            </h1>
            <p className="text-sm sm:text-base lg:text-lg opacity-90">
              Kelola pengguna, penjual, produk, dan kesehatan platform secara
              efisien.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <Button className="w-full md:w-auto bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-4 sm:px-6 shadow-lg">
              <Download className="w-4 h-4 mr-2" />
              Ekspor Laporan
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Total Pengguna
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-gray-100 truncate">
                  {formatNumber(stats.totalUsers)}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-xs sm:text-sm">
                +12% bulan ini
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Penjual Aktif
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-gray-100 truncate">
                  {formatNumber(stats.activeSellers)}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <Store className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-xs sm:text-sm">
                +8% bulan ini
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Produk Terdaftar
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-gray-100 truncate">
                  {formatNumber(stats.productsListed)}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-xs sm:text-sm">
                +25% bulan ini
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  Pendapatan Bulanan
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-gray-100 truncate">
                  {formatCurrency(stats.monthlyRevenue)}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-xs sm:text-sm">
                +18% bulan ini
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-xl sm:rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <CardHeader className="pb-4">
          <CardTitle className="text-base sm:text-lg text-[#740938] dark:text-gray-100 flex items-center">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Peringatan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            {flaggedProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-[#CC2B52]/10 dark:bg-red-950/20 rounded-lg border border-[#CC2B52]/30 dark:border-red-900/30 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base text-[#740938] dark:text-gray-100 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {product.seller} • {product.reason}
                  </p>
                </div>
                <Badge
                  className={`${
                    product.severity === "tinggi"
                      ? "bg-[#CC2B52]"
                      : "bg-[#AF1740]"
                  } text-white text-xs flex-shrink-0`}
                >
                  {product.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
