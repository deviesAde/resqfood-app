"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import AdminChat from "@/components/admin-chat";
import {
  RevenueChart,
  UserGrowthChart,
  CategoryDistributionChart,
  ActivityChart,
  PerformanceMetrics,
} from "@/components/admin-charts";
import {
  Users,
  Store,
  Package,
  TrendingUp,
  AlertTriangle,
  Eye,
  Ban,
  CheckCircle,
  Download,
  Heart,
  BarChart3,
  PieChart,
  Search,
  Filter,
  Settings,
  Bell,
  Menu,
  ChevronLeft,
  ChevronRight,
  Home,
  UserCheck,
  DollarSign,
  User,
  MessageSquare,
  Shield,
  Database,
  Globe,
  RefreshCw,
  Save,
} from "lucide-react";
import Link from "next/link";

const stats = {
  totalUsers: 2847,
  activeSellers: 52,
  productsListed: 1234,
  ordersTracked: 8956,
  monthlyRevenue: 45678,
  totalRevenue: 234567,
};

const recentUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    status: "active",
    joinDate: "2024-01-15",
    avatar: "S",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@email.com",
    status: "active",
    joinDate: "2024-01-14",
    avatar: "M",
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    email: "lisa@email.com",
    status: "blocked",
    joinDate: "2024-01-13",
    avatar: "L",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@email.com",
    status: "active",
    joinDate: "2024-01-12",
    avatar: "D",
  },
];

const recentSellers = [
  {
    id: 1,
    name: "Golden Crust Bakery",
    email: "info@goldencrust.com",
    status: "verified",
    performance: "excellent",
    revenue: 2340,
  },
  {
    id: 2,
    name: "Fresh Valley Farm",
    email: "contact@freshvalley.com",
    status: "verified",
    performance: "good",
    revenue: 1890,
  },
  {
    id: 3,
    name: "Roast Masters",
    email: "hello@roastmasters.com",
    status: "pending",
    performance: "new",
    revenue: 0,
  },
  {
    id: 4,
    name: "Patisserie Belle",
    email: "info@patisseriebelle.com",
    status: "verified",
    performance: "excellent",
    revenue: 3120,
  },
];

const flaggedProducts = [
  {
    id: 1,
    name: "Expired Milk",
    seller: "Quick Mart",
    reason: "Past expiry date",
    severity: "high",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Moldy Bread",
    seller: "Corner Bakery",
    reason: "Quality issue",
    severity: "high",
    date: "2024-01-14",
  },
  {
    id: 3,
    name: "Unclear Expiry",
    seller: "Food Hub",
    reason: "Missing expiry info",
    severity: "medium",
    date: "2024-01-13",
  },
];

const sidebarItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "users", label: "Users", icon: Users },
  { id: "sellers", label: "Sellers", icon: Store },
  { id: "products", label: "Products", icon: Package },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: PieChart },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
      {/* Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-[#DE7C7D]/30 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="text-[#740938] hover:bg-[#DE7C7D]/20 p-2"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938]">
                  resQfood
                </span>
                <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">
                  Admin
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64 rounded-full border-[#DE7C7D]/30 focus:border-[#AF1740] bg-[#DE7C7D]/10"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
              </Button>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Link href="/">
                <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Collapsible Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-20" : "w-80"
          } bg-white border-r border-[#DE7C7D]/30 transition-all duration-300 ease-in-out shadow-lg relative min-h-screen`}
        >
          {/* Collapse Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 top-6 bg-white border border-[#DE7C7D]/30 rounded-full p-1 shadow-md hover:shadow-lg transition-all z-10"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-[#740938]" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-[#740938]" />
            )}
          </Button>

          {/* Admin Info */}
          <div
            className={`p-6 border-b border-[#DE7C7D]/30 ${
              sidebarCollapsed ? "px-3" : ""
            }`}
          >
            {!sidebarCollapsed ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h3 className="font-semibold text-[#740938]">Admin Panel</h3>
                  <p className="text-sm text-gray-600">Super Administrator</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className={`p-6 ${sidebarCollapsed ? "px-3" : ""}`}>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? "justify-center px-3" : "space-x-3 px-4"
                  } py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg scale-105"
                      : "text-gray-700 hover:bg-[#DE7C7D]/20 hover:text-[#740938] hover:scale-102"
                  }`}
                  title={sidebarCollapsed ? item.label : ""}
                >
                  <item.icon className="w-5 h-5" />
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats */}
          {!sidebarCollapsed && (
            <div className="p-6 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 m-6 rounded-2xl">
              <h4 className="font-semibold text-[#740938] mb-3">
                Platform Health
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users:</span>
                  <span className="font-semibold text-[#AF1740]">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-semibold text-[#CC2B52]">$45.6K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">Healthy</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-3xl p-8 text-white shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        Welcome to Admin Dashboard 🚀
                      </h1>
                      <p className="text-lg">
                        Manage users, sellers, products, and platform health
                        efficiently.
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                      <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-6 shadow-lg">
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Total Users</p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {stats.totalUsers.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          +12% this month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">
                            Active Sellers
                          </p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {stats.activeSellers}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                          <Store className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          +8% this month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">
                            Products Listed
                          </p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {stats.productsListed.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          +25% this month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">
                            Monthly Revenue
                          </p>
                          <p className="text-3xl font-bold text-[#740938]">
                            ${stats.monthlyRevenue.toLocaleString()}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          +18% this month
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <RevenueChart />
                  <UserGrowthChart />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <CategoryDistributionChart />
                  <ActivityChart />
                  <PerformanceMetrics />
                </div>

                {/* Recent Alerts */}
                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-[#740938] flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Recent Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {flaggedProducts.slice(0, 3).map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-[#CC2B52]/10 rounded-lg border border-[#CC2B52]/30"
                        >
                          <div>
                            <p className="font-semibold text-[#740938]">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              {product.seller} • {product.reason}
                            </p>
                          </div>
                          <Badge
                            className={`${
                              product.severity === "high"
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
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">
                      User Management
                    </h1>
                    <p className="text-gray-600">
                      Manage platform users and their activities
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64 rounded-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740]"
                      />
                    </div>
                    <Button
                      variant="outline"
                      className="rounded-full bg-transparent border-[#DE7C7D]/30"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#DE7C7D]/30">
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              User
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Email
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Status
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Join Date
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((user) => (
                            <tr
                              key={user.id}
                              className="border-b border-[#DE7C7D]/20 hover:bg-[#DE7C7D]/10 transition-colors"
                            >
                              <td className="py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                      {user.avatar}
                                    </span>
                                  </div>
                                  <span className="font-semibold text-[#740938]">
                                    {user.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 text-gray-600">
                                {user.email}
                              </td>
                              <td className="py-4">
                                <Badge
                                  className={`${
                                    user.status === "active"
                                      ? "bg-green-500"
                                      : "bg-[#CC2B52]"
                                  } text-white`}
                                >
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="py-4 text-gray-600">
                                {user.joinDate}
                              </td>
                              <td className="py-4">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent"
                                  >
                                    <Ban className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Sellers Tab */}
            {activeTab === "sellers" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">
                      Seller Management
                    </h1>
                    <p className="text-gray-600">
                      Manage sellers and their performance
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
                      <UserCheck className="w-4 h-4 mr-2" />
                      Approve Pending
                    </Button>
                  </div>
                </div>
                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#DE7C7D]/30">
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Business
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Email
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Status
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Performance
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Revenue
                            </th>
                            <th className="text-left py-3 text-[#740938] font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentSellers.map((seller) => (
                            <tr
                              key={seller.id}
                              className="border-b border-[#DE7C7D]/20 hover:bg-[#DE7C7D]/10 transition-colors"
                            >
                              <td className="py-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                                    <Store className="w-5 h-5 text-white" />
                                  </div>
                                  <span className="font-semibold text-[#740938]">
                                    {seller.name}
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 text-gray-600">
                                {seller.email}
                              </td>
                              <td className="py-4">
                                <Badge
                                  className={`${
                                    seller.status === "verified"
                                      ? "bg-green-500"
                                      : seller.status === "pending"
                                      ? "bg-[#AF1740]"
                                      : "bg-[#CC2B52]"
                                  } text-white`}
                                >
                                  {seller.status}
                                </Badge>
                              </td>
                              <td className="py-4">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    seller.performance === "excellent"
                                      ? "border-green-500 text-green-500"
                                      : seller.performance === "good"
                                      ? "border-[#AF1740] text-[#AF1740]"
                                      : "border-gray-500 text-gray-500"
                                  }`}
                                >
                                  {seller.performance}
                                </Badge>
                              </td>
                              <td className="py-4 font-semibold text-[#AF1740]">
                                ${seller.revenue.toLocaleString()}
                              </td>
                              <td className="py-4">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent"
                                  >
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">
                      Product Monitoring
                    </h1>
                    <p className="text-gray-600">
                      Monitor and moderate product listings
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white rounded-full bg-transparent"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Review Flagged ({flaggedProducts.length})
                    </Button>
                  </div>
                </div>
                <Card className="border-2 border-[#CC2B52]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/5">
                  <CardHeader>
                    <CardTitle className="text-[#740938] flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Flagged Products
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {flaggedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#CC2B52]/30 shadow-sm"
                        >
                          <div>
                            <p className="font-semibold text-[#740938]">
                              {product.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Seller: {product.seller}
                            </p>
                            <p className="text-sm text-[#CC2B52]">
                              Reason: {product.reason}
                            </p>
                            <p className="text-xs text-gray-500">
                              Reported: {product.date}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              className={`${
                                product.severity === "high"
                                  ? "bg-[#CC2B52]"
                                  : "bg-[#AF1740]"
                              } text-white`}
                            >
                              {product.severity}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                className="bg-[#AF1740] hover:bg-[#740938] text-white"
                              >
                                Review
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Comprehensive platform analytics and insights
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <RevenueChart />
                  <UserGrowthChart />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <CategoryDistributionChart />
                  <ActivityChart />
                  <PerformanceMetrics />
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === "reports" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Reports & Insights
                  </h1>
                  <p className="text-gray-600">
                    Generate and download comprehensive reports
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-[#AF1740] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#740938] mb-2">
                          Revenue Report
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Monthly revenue breakdown and trends
                        </p>
                        <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Users className="w-12 h-12 text-[#CC2B52] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#740938] mb-2">
                          User Analytics
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          User growth and engagement metrics
                        </p>
                        <Button className="bg-[#CC2B52] hover:bg-[#AF1740] text-white rounded-full w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Store className="w-12 h-12 text-[#740938] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[#740938] mb-2">
                          Seller Performance
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          Seller metrics and performance data
                        </p>
                        <Button className="bg-[#740938] hover:bg-[#AF1740] text-white rounded-full w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Admin Support Center
                  </h1>
                  <p className="text-gray-600">
                    Manage customer support and seller communications
                  </p>
                </div>
                <div className="flex justify-center">
                  <AdminChat />
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Platform Settings
                  </h1>
                  <p className="text-gray-600">
                    Configure platform-wide settings and preferences
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Settings Navigation */}
                  <div className="lg:col-span-1">
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                      <CardContent className="p-6">
                        <nav className="space-y-2">
                          {[
                            { id: "general", label: "General", icon: Settings },
                            { id: "platform", label: "Platform", icon: Globe },
                            {
                              id: "notifications",
                              label: "Notifications",
                              icon: Bell,
                            },
                            { id: "security", label: "Security", icon: Shield },
                            {
                              id: "integrations",
                              label: "Integrations",
                              icon: Database,
                            },
                            {
                              id: "maintenance",
                              label: "Maintenance",
                              icon: RefreshCw,
                            },
                          ].map((item) => (
                            <button
                              key={item.id}
                              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 hover:bg-[#DE7C7D]/20 hover:text-[#740938]"
                            >
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium">{item.label}</span>
                            </button>
                          ))}
                        </nav>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Settings Content */}
                  <div className="lg:col-span-3">
                    <div className="space-y-8">
                      {/* General Settings */}
                      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#740938] flex items-center">
                            <Settings className="w-5 h-5 mr-2" />
                            General Platform Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Platform Name
                                </Label>
                                <Input
                                  defaultValue="resQfood"
                                  className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                                />
                              </div>
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Support Email
                                </Label>
                                <Input
                                  defaultValue="support@resqfood.com"
                                  className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                                />
                              </div>
                            </div>
                            <div>
                              <Label className="text-[#740938] font-semibold">
                                Platform Description
                              </Label>
                              <Textarea
                                defaultValue="Connecting food sellers with conscious consumers to reduce food waste and save money."
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                                rows={3}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Commission Rate (%)
                                </Label>
                                <Input
                                  type="number"
                                  defaultValue="5"
                                  className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                                />
                              </div>
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Currency
                                </Label>
                                <select className="w-full mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg p-3 bg-white">
                                  <option>USD ($)</option>
                                  <option>EUR (€)</option>
                                  <option>GBP (£)</option>
                                </select>
                              </div>
                            </div>
                          </form>
                        </CardContent>
                      </Card>

                      {/* Notification Settings */}
                      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#740938] flex items-center">
                            <Bell className="w-5 h-5 mr-2" />
                            Notification Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {[
                              {
                                id: "new-users",
                                label: "New User Registrations",
                                description:
                                  "Get notified when new users join the platform",
                              },
                              {
                                id: "seller-applications",
                                label: "Seller Applications",
                                description:
                                  "Notifications for new seller verification requests",
                              },
                              {
                                id: "flagged-content",
                                label: "Flagged Content",
                                description:
                                  "Alerts for reported products or users",
                              },
                              {
                                id: "system-alerts",
                                label: "System Alerts",
                                description:
                                  "Critical system notifications and errors",
                              },
                              {
                                id: "revenue-reports",
                                label: "Revenue Reports",
                                description:
                                  "Daily and weekly revenue summaries",
                              },
                            ].map((notification) => (
                              <div
                                key={notification.id}
                                className="flex items-center justify-between p-4 bg-[#DE7C7D]/10 rounded-xl"
                              >
                                <div>
                                  <h4 className="font-semibold text-[#740938]">
                                    {notification.label}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {notification.description}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      defaultChecked
                                      className="rounded border-[#DE7C7D]/30"
                                    />
                                    <span className="text-sm text-gray-600">
                                      Email
                                    </span>
                                  </label>
                                  <label className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      defaultChecked
                                      className="rounded border-[#DE7C7D]/30"
                                    />
                                    <span className="text-sm text-gray-600">
                                      SMS
                                    </span>
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Security Settings */}
                      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#740938] flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Security & Access Control
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Session Timeout (minutes)
                                </Label>
                                <Input
                                  type="number"
                                  defaultValue="30"
                                  className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                                />
                              </div>
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Max Login Attempts
                                </Label>
                                <Input
                                  type="number"
                                  defaultValue="5"
                                  className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                                <div>
                                  <h4 className="font-semibold text-green-800">
                                    Two-Factor Authentication
                                  </h4>
                                  <p className="text-sm text-green-600">
                                    Enhanced security for admin accounts
                                  </p>
                                </div>
                                <Badge className="bg-green-500 text-white">
                                  Enabled
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                                <div>
                                  <h4 className="font-semibold text-blue-800">
                                    SSL Certificate
                                  </h4>
                                  <p className="text-sm text-blue-600">
                                    Secure connection encryption
                                  </p>
                                </div>
                                <Badge className="bg-blue-500 text-white">
                                  Active
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Save Settings */}
                      <div className="flex justify-end space-x-4">
                        <Button
                          variant="outline"
                          className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg bg-transparent"
                        >
                          Reset to Defaults
                        </Button>
                        <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all">
                          <Save className="w-4 h-4 mr-2" />
                          Save All Settings
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
