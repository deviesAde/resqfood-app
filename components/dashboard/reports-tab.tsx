import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, Users, Store } from 'lucide-react';

export function ReportsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100">
          Laporan & Wawasan
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hasilkan dan unduh laporan komprehensif
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-[#AF1740] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#740938] dark:text-gray-100 mb-2">
                Laporan Pendapatan
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Rincian pendapatan bulanan dan tren
              </p>
              <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full w-full">
                <Download className="w-4 h-4 mr-2" />
                Hasilkan Laporan
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="w-12 h-12 text-[#CC2B52] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#740938] dark:text-gray-100 mb-2">
                Analitik Pengguna
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Pertumbuhan pengguna dan metrik keterlibatan
              </p>
              <Button className="bg-[#CC2B52] hover:bg-[#AF1740] text-white rounded-full w-full">
                <Download className="w-4 h-4 mr-2" />
                Hasilkan Laporan
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-900">
          <CardContent className="p-6">
            <div className="text-center">
              <Store className="w-12 h-12 text-[#740938] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#740938] dark:text-gray-100 mb-2">
                Kinerja Penjual
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Metrik penjual dan data kinerja
              </p>
              <Button className="bg-[#740938] hover:bg-[#AF1740] text-white rounded-full w-full">
                <Download className="w-4 h-4 mr-2" />
                Hasilkan Laporan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
;
