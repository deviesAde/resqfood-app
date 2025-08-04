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

// Dummy data for sales performance
const salesData = [
  { month: "Jan", revenue: 4500000, orders: 145, avgOrder: 31034 },
  { month: "Feb", revenue: 5200000, orders: 167, avgOrder: 31138 },
  { month: "Mar", revenue: 4800000, orders: 152, avgOrder: 31579 },
  { month: "Apr", revenue: 6100000, orders: 198, avgOrder: 30808 },
  { month: "May", revenue: 7300000, orders: 234, avgOrder: 31197 },
  { month: "Jun", revenue: 6800000, orders: 218, avgOrder: 31193 },
  { month: "Jul", revenue: 8200000, orders: 267, avgOrder: 30712 },
];

// Dummy data for environmental impact
const impactData = [
  { month: "Jan", foodSaved: 1200, co2Saved: 3600, waterSaved: 18000 },
  { month: "Feb", foodSaved: 1450, co2Saved: 4350, waterSaved: 21750 },
  { month: "Mar", foodSaved: 1320, co2Saved: 3960, waterSaved: 19800 },
  { month: "Apr", foodSaved: 1680, co2Saved: 5040, waterSaved: 25200 },
  { month: "May", foodSaved: 1950, co2Saved: 5850, waterSaved: 29250 },
  { month: "Jun", foodSaved: 1780, co2Saved: 5340, waterSaved: 26700 },
  { month: "Jul", foodSaved: 2100, co2Saved: 6300, waterSaved: 31500 },
];

// Product category data
const categoryData = [
  { name: "Roti & Pastry", value: 35, color: "#AF1740" },
  { name: "Kue & Dessert", value: 28, color: "#CC2B52" },
  { name: "Sandwich", value: 20, color: "#DE7C7D" },
  { name: "Minuman", value: 12, color: "#F4A6A7" },
  { name: "Lainnya", value: 5, color: "#740938" },
];

// Weekly performance data
const weeklyData = [
  { day: "Sen", orders: 32, revenue: 980000 },
  { day: "Sel", orders: 28, revenue: 850000 },
  { day: "Rab", orders: 35, revenue: 1050000 },
  { day: "Kam", orders: 42, revenue: 1260000 },
  { day: "Jum", orders: 48, revenue: 1440000 },
  { day: "Sab", orders: 65, revenue: 1950000 },
  { day: "Min", orders: 38, revenue: 1140000 },
];

// Key metrics
const keyMetrics = {
  totalRevenue: 42900000,
  totalOrders: 1381,
  avgOrderValue: 31067,
  customerGrowth: 23.5,
  foodWastePrevented: 11480,
  co2Reduction: 34440,
  waterSaved: 172200,
  customersServed: 892,
};

export default function AnalyticsTab() {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  // Export functions
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
            Lacak performa dan dampak Anda
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportToCSV(salesData, "sales-data")}
            className="text-xs"
          >
            <FileSpreadsheet className="w-4 h-4 mr-1" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              exportToJSON(
                [
                  { type: "sales", data: salesData },
                  { type: "impact", data: impactData }
                ],
                "analytics-data"
              )
            }
            className="text-xs"
          >
            <FileText className="w-4 h-4 mr-1" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-gradient-to-br from-white to-[#AF1740]/10 dark:from-gray-800 dark:to-[#AF1740]/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  Total Revenue
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatCurrency(keyMetrics.totalRevenue)}
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
                  Total Orders
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatNumber(keyMetrics.totalOrders)}
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
                  Food Saved
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatNumber(keyMetrics.foodWastePrevented)} kg
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
                  Customers
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                  {formatNumber(keyMetrics.customersServed)}
                </p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-1" />
                  <span className="text-xs text-green-500">
                    +{keyMetrics.customerGrowth}%
                  </span>
                </div>
              </div>
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#740938]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Sales Performance Chart */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
                Performa Penjualan
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
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
                    dataKey="month"
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
                      name === "revenue"
                        ? formatCurrency(value)
                        : formatNumber(value),
                      name === "revenue"
                        ? "Revenue"
                        : name === "orders"
                        ? "Orders"
                        : "Avg Order",
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
                    dataKey="revenue"
                    stroke="#AF1740"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                    name="Revenue"
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

        {/* Environmental Impact Chart */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20">
          <CardHeader className="dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
                Dampak Lingkungan
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
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
                    dataKey="month"
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
                        (name === "foodSaved"
                          ? " kg"
                          : name === "co2Saved"
                          ? " kg CO₂"
                          : " L"),
                      name === "foodSaved"
                        ? "Food Saved"
                        : name === "co2Saved"
                        ? "CO₂ Saved"
                        : "Water Saved",
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
                    dataKey="foodSaved"
                    stroke="#CC2B52"
                    strokeWidth={3}
                    dot={{ fill: "#CC2B52", strokeWidth: 2, r: 4 }}
                    name="Food Saved (kg)"
                  />
                  <Line
                    type="monotone"
                    dataKey="co2Saved"
                    stroke="#AF1740"
                    strokeWidth={3}
                    dot={{ fill: "#AF1740", strokeWidth: 2, r: 4 }}
                    name="CO₂ Saved (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Product Categories Pie Chart */}
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
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Percentage"]}
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

        {/* Weekly Performance */}
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
                    dataKey="day"
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
                      name === "revenue"
                        ? formatCurrency(value)
                        : formatNumber(value),
                      name === "revenue" ? "Revenue" : "Orders",
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
                    dataKey="orders"
                    fill="#740938"
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-2 border-green-200 dark:border-green-800 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4 sm:p-6">
            <div className="text-center">
              <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mx-auto mb-2" />
              <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-300">
                {formatNumber(keyMetrics.co2Reduction)} kg
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
                {formatNumber(keyMetrics.waterSaved)} L
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
                {formatCurrency(keyMetrics.avgOrderValue)}
              </h3>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Rata-rata Order
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
