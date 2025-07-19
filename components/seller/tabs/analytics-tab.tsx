"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Heart } from "lucide-react";

export default function AnalyticsTab() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
          Dashboard Analitik
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Lacak performa dan dampak Anda
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
              Performa Penjualan
            </CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-gray-800/50">
            <div className="h-40 sm:h-48 lg:h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/20 dark:from-[#DE7C7D]/10 dark:to-[#AF1740]/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#740938] dark:text-[#DE7C7D] mx-auto mb-4" />
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

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
              Metrik Dampak
            </CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-gray-800/50">
            <div className="h-40 sm:h-48 lg:h-64 bg-gradient-to-br from-[#CC2B52]/20 to-[#DE7C7D]/20 dark:from-[#CC2B52]/10 dark:to-[#DE7C7D]/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-[#740938] dark:text-[#DE7C7D] mx-auto mb-4" />
                <p className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base">
                  Dampak Lingkungan
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  Limbah makanan yang dicegah
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
