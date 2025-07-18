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
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-3xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Selamat Datang di Dasbor Admin 🚀
            </h1>
            <p className="text-lg">
              Kelola pengguna, penjual, produk, dan kesehatan platform secara
              efisien.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-6 shadow-lg">
              <Download className="w-4 h-4 mr-2" />
              Ekspor Laporan
            </Button>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Total Pengguna
                </p>
                <p className="text-3xl font-bold text-[#740938] dark:text-gray-100">
                  {stats.totalUsers.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">+12% bulan ini</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Penjual Aktif
                </p>
                <p className="text-3xl font-bold text-[#740938] dark:text-gray-100">
                  {stats.activeSellers}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">+8% bulan ini</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Produk Terdaftar
                </p>
                <p className="text-3xl font-bold text-[#740938] dark:text-gray-100">
                  {stats.productsListed.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">+25% bulan ini</span>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Pendapatan Bulanan
                </p>
                <p className="text-3xl font-bold text-[#740938] dark:text-gray-100">
                  ${stats.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 text-sm">+18% bulan ini</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Recent Alerts */}
      <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Peringatan Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedProducts.slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 bg-[#CC2B52]/10 dark:bg-red-950/20 rounded-lg border border-[#CC2B52]/30 dark:border-red-900/30"
              >
                <div>
                  <p className="font-semibold text-[#740938] dark:text-gray-100">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.seller} • {product.reason}
                  </p>
                </div>
                <Badge
                  className={`${
                    product.severity === "tinggi"
                      ? "bg-[#CC2B52]"
                      : "bg-[#AF1740]"
                  } text-white`}
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
