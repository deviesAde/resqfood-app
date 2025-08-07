"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Heart,
  TrendingUp,
  Users,
  ShoppingBag,
  Leaf,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Data dummy untuk performa penjualan
const salesData = [
  { bulan: "Jan", pendapatan: 4500000, pesanan: 145, rataPesanan: 31034 },
  { bulan: "Feb", pendapatan: 5200000, pesanan: 167, rataPesanan: 31138 },
  { bulan: "Mar", pendapatan: 4800000, pesanan: 152, rataPesanan: 31579 },
  { bulan: "Apr", pendapatan: 6100000, pesanan: 198, rataPesanan: 30808 },
  { bulan: "Mei", pendapatan: 7300000, pesanan: 234, rataPesanan: 31197 },
  { bulan: "Jun", pendapatan: 6800000, pesanan: 218, rataPesanan: 31193 },
  { bulan: "Jul", pendapatan: 8200000, pesanan: 267, rataPesanan: 30712 },
];

// Data dummy untuk dampak lingkungan
const impactData = [
  {
    bulan: "Jan",
    makananDiselamatkan: 1200,
    co2Dikurangi: 3600,
    airDihemat: 18000,
  },
  {
    bulan: "Feb",
    makananDiselamatkan: 1450,
    co2Dikurangi: 4350,
    airDihemat: 21750,
  },
  {
    bulan: "Mar",
    makananDiselamatkan: 1320,
    co2Dikurangi: 3960,
    airDihemat: 19800,
  },
  {
    bulan: "Apr",
    makananDiselamatkan: 1680,
    co2Dikurangi: 5040,
    airDihemat: 25200,
  },
  {
    bulan: "Mei",
    makananDiselamatkan: 1950,
    co2Dikurangi: 5850,
    airDihemat: 29250,
  },
  {
    bulan: "Jun",
    makananDiselamatkan: 1780,
    co2Dikurangi: 5340,
    airDihemat: 26700,
  },
  {
    bulan: "Jul",
    makananDiselamatkan: 2100,
    co2Dikurangi: 6300,
    airDihemat: 31500,
  },
];

// Data kategori produk
const categoryData = [
  { nama: "Roti & Pastry", nilai: 35, warna: "#AF1740" },
  { nama: "Kue & Dessert", nilai: 28, warna: "#CC2B52" },
  { nama: "Sandwich", nilai: 20, warna: "#DE7C7D" },
  { nama: "Minuman", nilai: 12, warna: "#F4A6A7" },
  { nama: "Lainnya", nilai: 5, warna: "#740938" },
];

// Data performa mingguan
const weeklyData = [
  { hari: "Sen", pesanan: 32, pendapatan: 980000 },
  { hari: "Sel", pesanan: 28, pendapatan: 850000 },
  { hari: "Rab", pesanan: 35, pendapatan: 1050000 },
  { hari: "Kam", pesanan: 42, pendapatan: 1260000 },
  { hari: "Jum", pesanan: 48, pendapatan: 1440000 },
  { hari: "Sab", pesanan: 65, pendapatan: 1950000 },
  { hari: "Min", pesanan: 38, pendapatan: 1140000 },
];

// Metrik utama
const keyMetrics = {
  totalPendapatan: 42900000,
  totalPesanan: 1381,
  rataNilaiPesanan: 31067,
  pertumbuhanPelanggan: 23.5,
  makananTerbuangDicegah: 11480,
  penguranganCO2: 34440,
  airDihemat: 172200,
  pelangganDilayani: 892,
};

export default function AnalyticsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Fungsi ekspor
  const exportToCSV = (data: any[], filename: string) => {
    const csvContent = [
      Object.keys(data[0]).join(","),
      ...data.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
            Dashboard Analitik
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Pantau performa dan dampak bisnis Anda
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(salesData, "data-penjualan")}
            className="text-xs"
          >
            <FileSpreadsheet className="w-4 h-4 mr-1" />
            Ekspor CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportToJSON(
                [
                  { jenis: "penjualan", data: salesData },
                  { jenis: "dampak", data: impactData },
                ],
                "data-analitik"
              )
            }
            className="text-xs"
          >
            <FileText className="w-4 h-4 mr-1" />
            Ekspor JSON
          </Button>
        </div>
      </div>

      {/* Kartu Metrik Utama */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-gradient-to-br from-white to-[#AF1740]/10 dark:from-gray-800 dark:to-[#AF1740]/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Total Pendapatan
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatCurrency(keyMetrics.totalPendapatan)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+12.5%</span>
                </div>
              </div>
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-[#AF1740]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Total Pesanan
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatNumber(keyMetrics.totalPesanan)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+8.3%</span>
                </div>
              </div>
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-[#CC2B52]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Makanan Diselamatkan
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatNumber(keyMetrics.makananTerbuangDicegah)} kg
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+15.7%</span>
                </div>
              </div>
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-[#DE7C7D]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-gradient-to-br from-white to-[#740938]/10 dark:from-gray-800 dark:to-[#740938]/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Pelanggan
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatNumber(keyMetrics.pelangganDilayani)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    +{keyMetrics.pertumbuhanPelanggan}%
                  </span>
                </div>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#740938]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid Grafik */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Grafik Performa Penjualan */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
                Performa Penjualan
              </CardTitle>
              <Badge variant="secondary" className="text-xs text-white">
                7 Bulan Terakhir
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="dark:bg-gray-800/50">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#DE7C7D"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="bulan"
                    stroke="#740938"
                    fontSize={12}
                    className="dark:stroke-white"
                  />
                  <YAxis
                    stroke="#740938"
                    fontSize={12}
                    className="dark:stroke-white"
                    tickFormatter={(value) =>
                      `${(value / 1000000).toFixed(1)}M`
                    }
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "pendapatan"
                        ? formatCurrency(value)
                        : formatNumber(value),
                      name === "pendapatan"
                        ? "Pendapatan"
                        : name === "pesanan"
                        ? "Pesanan"
                        : "Rata Pesanan",
                    ]}
                    labelStyle={{ color: "#740938" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #DE7C7D",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="pendapatan"
                    stroke="#AF1740"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                    name="Pendapatan"
                  />
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#AF1740" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#AF1740"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grafik Dampak Lingkungan */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
                Dampak Lingkungan
              </CardTitle>
              <Badge variant="secondary" className="text-xs text-white">
                Bulanan
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="dark:bg-gray-800/50">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#DE7C7D"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="bulan"
                    stroke="#740938"
                    fontSize={12}
                    className="dark:stroke-white"
                  />
                  <YAxis
                    stroke="#740938"
                    fontSize={12}
                    className="dark:stroke-white"
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      formatNumber(value) +
                        (name === "makananDiselamatkan"
                          ? " kg"
                          : name === "co2Dikurangi"
                          ? " kg CO₂"
                          : " L"),
                      name === "makananDiselamatkan"
                        ? "Makanan Diselamatkan"
                        : name === "co2Dikurangi"
                        ? "CO₂ Dikurangi"
                        : "Air Dihemat",
                    ]}
                    labelStyle={{ color: "#740938" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #DE7C7D",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="makananDiselamatkan"
                    stroke="#CC2B52"
                    strokeWidth={3}
                    dot={{ fill: "#CC2B52", strokeWidth: 2, r: 4 }}
                    name="Makanan Diselamatkan (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="co2Dikurangi"
                    stroke="#AF1740"
                    strokeWidth={3}
                    dot={{ fill: "#AF1740", strokeWidth: 2, r: 4 }}
                    name="CO₂ Dikurangi (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Grafik Pie Kategori Produk */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#AF1740]/10 dark:from-gray-800 dark:to-[#AF1740]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
              Kategori Produk
            </CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-gray-800/50">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ nama, percent }) =>
                      `${nama} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="nilai"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.warna} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Persentase"]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #DE7C7D",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performa Mingguan */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#740938]/10 dark:from-gray-800 dark:to-[#740938]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
              Performa Mingguan
            </CardTitle>
          </CardHeader>
          <CardContent className="dark:bg-gray-800/50">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#DE7C7D"
                    opacity={0.3}
                  />
                  <XAxis
                    dataKey="hari"
                    stroke="#740938"
                    fontSize={12}
                    className="dark:stroke-white"
                  />
                  <YAxis
                    stroke="#740938"
                    fontSize={12}
                    className="dark:stroke-white"
                  />
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      name === "pendapatan"
                        ? formatCurrency(value)
                        : formatNumber(value),
                      name === "pendapatan" ? "Pendapatan" : "Pesanan",
                    ]}
                    labelStyle={{ color: "#740938" }}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #DE7C7D",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="pesanan"
                    fill="#740938"
                    radius={[4, 4, 0, 0]}
                    name="Pesanan"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kartu Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-2 border-green-200 dark:border-green-800 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-300">
                {formatNumber(keyMetrics.penguranganCO2)} kg
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                CO₂ Dikurangi
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 dark:border-blue-800 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 mx-auto mb-2" />
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300">
                {formatNumber(keyMetrics.airDihemat)} L
              </h3>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Air Dihemat
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 dark:border-purple-800 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600 mx-auto mb-2" />
              <h3 className="text-lg sm:text-xl font-bold text-purple-800 dark:text-purple-300">
                {formatCurrency(keyMetrics.rataNilaiPesanan)}
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Rata-rata Pesanan
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
