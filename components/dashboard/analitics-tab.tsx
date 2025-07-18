
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, Package } from 'lucide-react';

export function AnalyticsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100">
          Dasbor Analitik
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analitik dan wawasan platform yang komprehensif
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Ringkasan Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Total Pendapatan: <span className="font-bold text-[#AF1740]">$234,567</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Pendapatan Bulan Ini: <span className="font-bold text-[#CC2B52]">$45,678</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Data pendapatan disajikan di sini. (Grafik dihapus)
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Pertumbuhan Pengguna
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Pengguna Baru Bulan Ini: <span className="font-bold text-green-600">300</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Total Pengguna: <span className="font-bold text-[#740938]">2,847</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Data pertumbuhan pengguna disajikan di sini. (Grafik dihapus)
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Distribusi Kategori Produk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Makanan Segar: <span className="font-bold text-[#AF1740]">40%</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Makanan Olahan: <span className="font-bold text-[#CC2B52]">30%</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Minuman: <span className="font-bold text-[#740938]">20%</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Data distribusi kategori disajikan di sini. (Grafik dihapus)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
;

