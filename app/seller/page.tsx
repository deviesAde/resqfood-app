"use client"

import type React from "react"
import { Eye } from "lucide-react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Plus,
  Package,
  DollarSign,
  Star,
  Edit,
  Trash2,
  Upload,
  ExternalLink,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  User,
  Menu,
  Home,
  Activity,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  MessageSquare,
  ShoppingBag,
  Calendar,
} from "lucide-react"
import Link from "next/link"

const sellerStats = {
  activeListings: 12,
  soldToday: 8,
  totalRating: 4.8,
  itemsRescued: 120,
  monthlyRevenue: 1247,
  totalOrders: 89,
}

const products = [
  {
    id: 1,
    name: "Artisan Sourdough Bread",
    originalPrice: 8.99,
    discountedPrice: 3.99,
    expiryDate: "2024-01-16",
    category: "Baked Goods",
    status: "active",
    views: 45,
    orders: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Chocolate Croissants",
    originalPrice: 12.99,
    discountedPrice: 5.99,
    expiryDate: "2024-01-15",
    category: "Baked Goods",
    status: "sold",
    views: 32,
    orders: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Fresh Bagels",
    originalPrice: 6.99,
    discountedPrice: 2.99,
    expiryDate: "2024-01-17",
    category: "Baked Goods",
    status: "active",
    views: 28,
    orders: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
]

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "products", label: "My Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    category: "",
    description: "",
    purchaseLink: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Product added:", formData)
    setShowAddProduct(false)
    setFormData({
      name: "",
      originalPrice: "",
      discountedPrice: "",
      expiryDate: "",
      category: "",
      description: "",
      purchaseLink: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50">
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
                <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">Seller Center</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-64 rounded-full border-[#DE7C7D]/30 focus:border-[#AF1740] bg-[#DE7C7D]/10"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
              </Button>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#CC2B52] rounded-full"></span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5 text-gray-600" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                >
                  View Marketplace
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full shadow-lg">
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

          {/* Seller Profile Card */}
          <div
            className={`p-6 border-b border-[#DE7C7D]/30 bg-gradient-to-r from-[#DE7C7D]/10 to-rose-50 ${sidebarCollapsed ? "px-3" : ""}`}
          >
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#740938]">Golden Crust Bakery</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{sellerStats.totalRating} rating</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white rounded-lg p-2 text-center border border-[#DE7C7D]/20">
                    <div className="font-bold text-[#AF1740]">{sellerStats.activeListings}</div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-[#DE7C7D]/20">
                    <div className="font-bold text-[#CC2B52]">{sellerStats.totalOrders}</div>
                    <div className="text-gray-600">Orders</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Menu */}
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

          {/* Quick Actions */}
          {!sidebarCollapsed && (
            <div className="p-6 border-t border-[#DE7C7D]/30">
              <Button
                onClick={() => setShowAddProduct(true)}
                className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>
          )}

          {/* Performance Summary */}
          {!sidebarCollapsed && (
            <div className="p-6 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 m-6 rounded-2xl border border-[#DE7C7D]/30">
              <h4 className="font-semibold text-[#740938] mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                This Month
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items Rescued:</span>
                  <span className="font-semibold text-[#AF1740]">{sellerStats.itemsRescued}</span>
                </div>
              
                <div className="flex justify-between">
                  <span className="text-gray-600">Impact Score:</span>
                  <span className="font-semibold text-green-600">Excellent</span>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed Quick Action */}
          {sidebarCollapsed && (
            <div className="p-3">
              <Button
                onClick={() => setShowAddProduct(true)}
                size="sm"
                className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl p-2"
                title="Add New Product"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-3xl p-8 text-white shadow-xl">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">Welcome back, Golden Crust! 🍞</h1>
                      <p className="text-[#DE7C7D] text-lg">
                        {"You've rescued"}{" "}
                        <span className="font-bold text-white">{sellerStats.itemsRescued} items</span> this month and
                        earned <span className="font-bold text-white">${sellerStats.monthlyRevenue}</span>
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                      <Button
                        onClick={() => setShowAddProduct(true)}
                        className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-6 bg-transparent"
                      >
                        View Shop
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Key Performance Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Active Listings</p>
                          <p className="text-3xl font-bold text-[#740938]">{sellerStats.activeListings}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">+3 this week</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Sold Today</p>
                          <p className="text-3xl font-bold text-[#740938]">{sellerStats.soldToday}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">+15% from yesterday</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Customer Rating</p>
                          <p className="text-3xl font-bold text-[#740938]">{sellerStats.totalRating}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                        <span className="text-gray-600 text-sm">Based on 47 reviews</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Items Rescued</p>
                          <p className="text-3xl font-bold text-[#740938]">{sellerStats.itemsRescued}</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">This month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938] flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-200">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#740938]">Sourdough Bread sold</p>
                            <p className="text-sm text-gray-600">2 hours ago • $3.99</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-[#DE7C7D]/20 rounded-xl border border-[#DE7C7D]/30">
                          <div className="w-10 h-10 bg-[#AF1740] rounded-full flex items-center justify-center">
                            <Plus className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#740938]">New product added</p>
                            <p className="text-sm text-gray-600">5 hours ago • Fresh Bagels</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#740938]">New 5-star review</p>
                            <p className="text-sm text-gray-600">1 day ago • "Amazing quality!"</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">Performance Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#CC2B52]/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">Sales Chart</p>
                          <p className="text-gray-600 text-sm">Weekly sales trends</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Products Tab - Enhanced */}
            {activeTab === "products" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">My Products</h1>
                    <p className="text-gray-600">Manage your rescued food listings</p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-full bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Bulk Upload
                    </Button>
                    <Button
                      onClick={() => setShowAddProduct(true)}
                      className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>

                {/* Add Product Form */}
                {showAddProduct && (
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938] flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add New Product
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-[#740938] font-semibold">
                              Product Name
                            </Label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="e.g., Fresh Sourdough Bread"
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="category" className="text-[#740938] font-semibold">
                              Category
                            </Label>
                            <Input
                              id="category"
                              name="category"
                              value={formData.category}
                              onChange={handleInputChange}
                              placeholder="e.g., Baked Goods"
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <Label htmlFor="originalPrice" className="text-[#740938] font-semibold">
                              Original Price ($)
                            </Label>
                            <Input
                              id="originalPrice"
                              name="originalPrice"
                              type="number"
                              step="0.01"
                              value={formData.originalPrice}
                              onChange={handleInputChange}
                              placeholder="8.99"
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="discountedPrice" className="text-[#740938] font-semibold">
                              Discounted Price ($)
                            </Label>
                            <Input
                              id="discountedPrice"
                              name="discountedPrice"
                              type="number"
                              step="0.01"
                              value={formData.discountedPrice}
                              onChange={handleInputChange}
                              placeholder="3.99"
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiryDate" className="text-[#740938] font-semibold">
                              Expiry Date
                            </Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              type="date"
                              value={formData.expiryDate}
                              onChange={handleInputChange}
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="description" className="text-[#740938] font-semibold">
                            Description
                          </Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your product..."
                            className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                            rows={3}
                          />
                        </div>

                        <div>
                          <Label htmlFor="purchaseLink" className="text-[#740938] font-semibold">
                            External Purchase Link
                          </Label>
                          <Input
                            id="purchaseLink"
                            name="purchaseLink"
                            type="url"
                            value={formData.purchaseLink}
                            onChange={handleInputChange}
                            placeholder="https://shopee.com/your-product-link"
                            className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                            required
                          />
                        </div>

                        <div>
                          <Label className="text-[#740938] font-semibold">Product Image</Label>
                          <div className="mt-1 border-2 border-dashed border-[#DE7C7D]/50 rounded-lg p-8 text-center hover:border-[#AF1740] transition-colors bg-[#DE7C7D]/10">
                            <Upload className="w-12 h-12 text-[#740938] mx-auto mb-4" />
                            <p className="text-[#740938] font-semibold mb-2">Upload product image</p>
                            <p className="text-gray-600 text-sm">PNG, JPG up to 5MB</p>
                            <Button
                              type="button"
                              variant="outline"
                              className="mt-4 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent"
                            >
                              Choose File
                            </Button>
                          </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowAddProduct(false)}
                            className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all"
                          >
                            Add Product
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Products Table */}
                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#DE7C7D]/30 bg-[#DE7C7D]/10">
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">Product</th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">Price</th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">Expiry</th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">Status</th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">Performance</th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr
                              key={product.id}
                              className="border-b border-[#DE7C7D]/20 hover:bg-[#DE7C7D]/10 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="w-16 h-16 rounded-lg object-cover border border-[#DE7C7D]/30"
                                  />
                                  <div>
                                    <p className="font-semibold text-[#740938]">{product.name}</p>
                                    <p className="text-sm text-gray-600">{product.category}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-bold text-[#AF1740] text-lg">${product.discountedPrice}</p>
                                  <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4 text-[#CC2B52]" />
                                  <span className="text-sm text-gray-600">{product.expiryDate}</span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <Badge
                                  className={`${
                                    product.status === "active"
                                      ? "bg-green-500"
                                      : product.status === "sold"
                                        ? "bg-[#AF1740]"
                                        : "bg-gray-500"
                                  } text-white`}
                                >
                                  {product.status}
                                </Badge>
                              </td>
                              <td className="py-4 px-4">
                                <div className="text-sm">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Eye className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-600">{product.views} views</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ShoppingBag className="w-4 h-4 text-green-500" />
                                    <span className="text-green-600">{product.orders} orders</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent"
                                  >
                                    <ExternalLink className="w-4 h-4" />
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

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">Analytics Dashboard</h1>
                  <p className="text-gray-600">Track your performance and impact</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">Sales Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">Sales Chart</p>
                          <p className="text-gray-600 text-sm">Weekly sales trends</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">Impact Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#CC2B52]/20 to-[#DE7C7D]/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Heart className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">Environmental Impact</p>
                          <p className="text-gray-600 text-sm">Food waste prevented</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">Business Profile</h1>
                  <p className="text-gray-600">Manage your business information and settings</p>
                </div>

                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-2xl">G</span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#740938] mb-2">Golden Crust Bakery</h3>
                      <p className="text-gray-600 mb-4">Verified Seller since January 2024</p>
                      <div className="flex justify-center space-x-2 mb-4">
                        <Badge className="bg-green-500 text-white">Verified</Badge>
                        <Badge className="bg-[#AF1740] text-white">Premium Seller</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#AF1740]">{sellerStats.totalRating}</div>
                          <div className="text-sm text-gray-600">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#CC2B52]">{sellerStats.totalOrders}</div>
                          <div className="text-sm text-gray-600">Orders</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#740938]">{sellerStats.itemsRescued}</div>
                          <div className="text-sm text-gray-600">Items Rescued</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">Account Settings</h1>
                  <p className="text-gray-600">Configure your account preferences and notifications</p>
                </div>

                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                  <CardContent className="p-8">
                    <div className="text-center">
                      <Settings className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-[#740938] mb-2">Account Configuration</h3>
                      <p className="text-gray-600">Notification preferences, security settings, and business details</p>
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
