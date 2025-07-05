"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
} from "lucide-react"
import Link from "next/link"

const stats = {
  totalUsers: 2847,
  activeSellers: 52,
  productsListed: 1234,
  ordersTracked: 8956,
  monthlyRevenue: 45678,
  totalRevenue: 234567,
}

const recentUsers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", status: "active", joinDate: "2024-01-15", avatar: "S" },
  { id: 2, name: "Mike Chen", email: "mike@email.com", status: "active", joinDate: "2024-01-14", avatar: "M" },
  { id: 3, name: "Lisa Rodriguez", email: "lisa@email.com", status: "blocked", joinDate: "2024-01-13", avatar: "L" },
  { id: 4, name: "David Kim", email: "david@email.com", status: "active", joinDate: "2024-01-12", avatar: "D" },
]

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
  { id: 3, name: "Roast Masters", email: "hello@roastmasters.com", status: "pending", performance: "new", revenue: 0 },
  {
    id: 4,
    name: "Patisserie Belle",
    email: "info@patisseriebelle.com",
    status: "verified",
    performance: "excellent",
    revenue: 3120,
  },
]

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
]

const sidebarItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "users", label: "Users", icon: Users },
  { id: "sellers", label: "Sellers", icon: Store },
  { id: "products", label: "Products", icon: Package },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: PieChart },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

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
                <span className="text-2xl font-bold text-[#740938]">resQfood</span>
                <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">Admin</Badge>
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
                <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">Back to Site</Button>
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
          <div className={`p-6 border-b border-[#DE7C7D]/30 ${sidebarCollapsed ? "px-3" : ""}`}>
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
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats */}
          {!sidebarCollapsed && (
            <div className="p-6 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 m-6 rounded-2xl">
              <h4 className="font-semibold text-[#740938] mb-3">Platform Health</h4>
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
                      <h1 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard 🚀</h1>
                      <p className="text-[#DE7C7D] text-lg">
                        Managing <span className="font-bold text-white">{stats.totalUsers.toLocaleString()}</span> users
                        and <span className="font-bold text-white">{stats.activeSellers}</span> active sellers
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
                          <p className="text-3xl font-bold text-[#740938]">{stats.totalUsers.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">+12% this month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Active Sellers</p>
                          <p className="text-3xl font-bold text-[#740938]">{stats.activeSellers}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                          <Store className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">+8% this month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Products Listed</p>
                          <p className="text-3xl font-bold text-[#740938]">{stats.productsListed.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">+25% this month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Monthly Revenue</p>
                          <p className="text-3xl font-bold text-[#740938]">${stats.monthlyRevenue.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">+18% this month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts and Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#740938] flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Platform Analytics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">Interactive Charts</p>
                          <p className="text-gray-600 text-sm">Revenue, user growth, and impact metrics</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

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
                              <p className="font-semibold text-[#740938]">{product.name}</p>
                              <p className="text-sm text-gray-600">
                                {product.seller} • {product.reason}
                              </p>
                            </div>
                            <Badge
                              className={`${product.severity === "high" ? "bg-[#CC2B52]" : "bg-[#AF1740]"} text-white`}
                            >
                              {product.severity}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">User Management</h1>
                    <p className="text-gray-600">Manage platform users and their activities</p>
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
                    <Button variant="outline" className="rounded-full bg-transparent border-[#DE7C7D]/30">
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
                            <th className="text-left py-3 text-[#740938] font-semibold">User</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Email</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Status</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Join Date</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Actions</th>
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
                                    <span className="text-white font-semibold">{user.avatar}</span>
                                  </div>
                                  <span className="font-semibold text-[#740938]">{user.name}</span>
                                </div>
                              </td>
                              <td className="py-4 text-gray-600">{user.email}</td>
                              <td className="py-4">
                                <Badge
                                  className={`${user.status === "active" ? "bg-green-500" : "bg-[#CC2B52]"} text-white`}
                                >
                                  {user.status}
                                </Badge>
                              </td>
                              <td className="py-4 text-gray-600">{user.joinDate}</td>
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
                    <h1 className="text-3xl font-bold text-[#740938]">Seller Management</h1>
                    <p className="text-gray-600">Manage sellers and their performance</p>
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
                            <th className="text-left py-3 text-[#740938] font-semibold">Business</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Email</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Status</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Performance</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Revenue</th>
                            <th className="text-left py-3 text-[#740938] font-semibold">Actions</th>
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
                                  <span className="font-semibold text-[#740938]">{seller.name}</span>
                                </div>
                              </td>
                              <td className="py-4 text-gray-600">{seller.email}</td>
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
                              <td className="py-4 font-semibold text-[#AF1740]">${seller.revenue.toLocaleString()}</td>
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
                    <h1 className="text-3xl font-bold text-[#740938]">Product Monitoring</h1>
                    <p className="text-gray-600">Monitor and moderate product listings</p>
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
                            <p className="font-semibold text-[#740938]">{product.name}</p>
                            <p className="text-sm text-gray-600">Seller: {product.seller}</p>
                            <p className="text-sm text-[#CC2B52]">Reason: {product.reason}</p>
                            <p className="text-xs text-gray-500">Reported: {product.date}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              className={`${product.severity === "high" ? "bg-[#CC2B52]" : "bg-[#AF1740]"} text-white`}
                            >
                              {product.severity}
                            </Badge>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-[#AF1740] hover:bg-[#740938] text-white">
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
                  <h1 className="text-3xl font-bold text-[#740938]">Analytics Dashboard</h1>
                  <p className="text-gray-600">Comprehensive platform analytics and insights</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">Revenue Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">Interactive Bar Chart</p>
                          <p className="text-gray-600 text-sm">Monthly revenue trends</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#CC2B52]/10 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Users className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">User Growth Chart</p>
                          <p className="text-gray-600 text-sm">Monthly user acquisition</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">Platform Settings</h1>
                  <p className="text-gray-600">Configure platform-wide settings and preferences</p>
                </div>

                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <Settings className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-[#740938] mb-2">System Configuration</h3>
                      <p className="text-gray-600">Platform settings, integrations, and system preferences</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
