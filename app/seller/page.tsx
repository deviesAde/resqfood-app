"use client";
import type React from "react";
import { Eye } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import WhatsAppChat from "@/components/whatsapp-chat";
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
} from "lucide-react";
import Link from "next/link";

// Add these imports at the top
import {
  CalendarIcon,
  MapPin,
  CreditCard,
  Shield,
  Database,
  Key,
  HelpCircle,
  ChevronDown,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";

// Add state for orders filter
const orderFilter = "all";

const sellerStats = {
  activeListings: 12,
  soldToday: 8,
  totalRating: 4.8,
  itemsRescued: 120,
  monthlyRevenue: 1247,
  totalOrders: 89,
};

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
];

// Add this orders data after the products array
const orders = [
  {
    id: "ORD-2024-001",
    customerName: "Sarah Chen",
    customerAvatar: "SC",
    items: ["Artisan Sourdough Bread x2", "Chocolate Croissants x1"],
    totalAmount: 15.97,
    status: "completed",
    orderDate: "2024-01-15",
    pickupTime: "14:30",
    paymentMethod: "Credit Card",
    customerRating: 5,
    customerReview: "Amazing fresh bread! Will order again.",
    pickupLocation: "Golden Crust Bakery, 123 Main St",
  },
  {
    id: "ORD-2024-002",
    customerName: "Mike Johnson",
    customerAvatar: "MJ",
    items: ["Fresh Bagels x6"],
    totalAmount: 8.99,
    status: "ready",
    orderDate: "2024-01-16",
    pickupTime: "16:00",
    paymentMethod: "Digital Wallet",
    customerRating: null,
    customerReview: null,
    pickupLocation: "Golden Crust Bakery, 123 Main St",
  },
  {
    id: "ORD-2024-003",
    customerName: "Lisa Wong",
    customerAvatar: "LW",
    items: ["Sourdough Bread x1", "Bagels x3"],
    totalAmount: 12.48,
    status: "pending",
    orderDate: "2024-01-16",
    pickupTime: "18:00",
    paymentMethod: "Cash",
    customerRating: null,
    customerReview: null,
    pickupLocation: "Golden Crust Bakery, 123 Main St",
  },
  {
    id: "ORD-2024-004",
    customerName: "David Kim",
    customerAvatar: "DK",
    items: ["Chocolate Croissants x3", "Fresh Bagels x2"],
    totalAmount: 23.95,
    status: "cancelled",
    orderDate: "2024-01-14",
    pickupTime: "12:00",
    paymentMethod: "Credit Card",
    customerRating: null,
    customerReview: null,
    pickupLocation: "Golden Crust Bakery, 123 Main St",
  },
  {
    id: "ORD-2024-005",
    customerName: "Emma Rodriguez",
    customerAvatar: "ER",
    items: ["Artisan Sourdough Bread x1"],
    totalAmount: 3.99,
    status: "in-progress",
    orderDate: "2024-01-16",
    pickupTime: "15:30",
    paymentMethod: "Digital Wallet",
    customerRating: null,
    customerReview: null,
    pickupLocation: "Golden Crust Bakery, 123 Main St",
  },
];

// Add calendar events data
const calendarEvents = [
  {
    id: 1,
    title: "Fresh Bread Batch",
    date: "2024-01-16",
    time: "06:00",
    type: "production",
    description: "Prepare morning sourdough batch",
  },
  {
    id: 2,
    title: "Customer Pickup - Sarah",
    date: "2024-01-16",
    time: "14:30",
    type: "pickup",
    description: "Order #ORD-2024-001",
  },
  {
    id: 3,
    title: "Inventory Check",
    date: "2024-01-17",
    time: "09:00",
    type: "task",
    description: "Weekly inventory assessment",
  },
  {
    id: 4,
    title: "Customer Pickup - Mike",
    date: "2024-01-16",
    time: "16:00",
    type: "pickup",
    description: "Order #ORD-2024-002",
  },
];

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "products", label: "My Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "calendar", label: "Calendar", icon: CalendarIcon },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    category: "",
    description: "",
    purchaseLink: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product added:", formData);
    setShowAddProduct(false);
    setFormData({
      name: "",
      originalPrice: "",
      discountedPrice: "",
      expiryDate: "",
      category: "",
      description: "",
      purchaseLink: "",
    });
  };

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
                <span className="text-2xl font-bold text-[#740938]">
                  resQfood
                </span>
                <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">
                  Seller Center
                </Badge>
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
            className={`p-6 border-b border-[#DE7C7D]/30 bg-gradient-to-r from-[#DE7C7D]/10 to-rose-50 ${
              sidebarCollapsed ? "px-3" : ""
            }`}
          >
            {!sidebarCollapsed ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#740938]">
                      Golden Crust Bakery
                    </h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {sellerStats.totalRating} rating
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white rounded-lg p-2 text-center border border-[#DE7C7D]/20">
                    <div className="font-bold text-[#AF1740]">
                      {sellerStats.activeListings}
                    </div>
                    <div className="text-gray-600">Products</div>
                  </div>
                  <div className="bg-white rounded-lg p-2 text-center border border-[#DE7C7D]/20">
                    <div className="font-bold text-[#CC2B52]">
                      {sellerStats.totalOrders}
                    </div>
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
                  {!sidebarCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
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
                  <span className="font-semibold text-[#AF1740]">
                    {sellerStats.itemsRescued}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impact Score:</span>
                  <span className="font-semibold text-green-600">
                    Excellent
                  </span>
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
                      <h1 className="text-3xl font-bold mb-2">
                        Welcome back, Golden Crust! 🍞
                      </h1>
                      <p className="text-[#DE7C7D] text-lg">
                        {"You've rescued"}{" "}
                        <span className="font-bold text-white">
                          {sellerStats.itemsRescued} items
                        </span>{" "}
                        this month and earned{" "}
                        <span className="font-bold text-white">
                          ${sellerStats.monthlyRevenue}
                        </span>
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
                          <p className="text-gray-600 text-sm">
                            Active Listings
                          </p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {sellerStats.activeListings}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          +3 this week
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Sold Today</p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {sellerStats.soldToday}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          +15% from yesterday
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">
                            Customer Rating
                          </p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {sellerStats.totalRating}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center">
                          <Star className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                        <span className="text-gray-600 text-sm">
                          Based on 47 reviews
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Items Rescued</p>
                          <p className="text-3xl font-bold text-[#740938]">
                            {sellerStats.itemsRescued}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#740938] rounded-full flex items-center justify-center">
                          <Heart className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-500 text-sm">
                          This month
                        </span>
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
                            <p className="font-semibold text-[#740938]">
                              Sourdough Bread sold
                            </p>
                            <p className="text-sm text-gray-600">
                              2 hours ago • $3.99
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-[#DE7C7D]/20 rounded-xl border border-[#DE7C7D]/30">
                          <div className="w-10 h-10 bg-[#AF1740] rounded-full flex items-center justify-center">
                            <Plus className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#740938]">
                              New product added
                            </p>
                            <p className="text-sm text-gray-600">
                              5 hours ago • Fresh Bagels
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-[#740938]">
                              New 5-star review
                            </p>
                            <p className="text-sm text-gray-600">
                              1 day ago • "Amazing quality!"
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">
                        Performance Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#CC2B52]/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">
                            Sales Chart
                          </p>
                          <p className="text-gray-600 text-sm">
                            Weekly sales trends
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Messages Tab - WhatsApp Chat */}
            {activeTab === "messages" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Messages
                  </h1>
                  <p className="text-gray-600">
                    Chat with customers and get support from admin
                  </p>
                </div>
                <div className="flex justify-center">
                  <WhatsAppChat />
                </div>
              </div>
            )}

            {/* Products Tab - Enhanced */}
            {activeTab === "products" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">
                      My Products
                    </h1>
                    <p className="text-gray-600">
                      Manage your rescued food listings
                    </p>
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
                            <Label
                              htmlFor="name"
                              className="text-[#740938] font-semibold"
                            >
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
                            <Label
                              htmlFor="category"
                              className="text-[#740938] font-semibold"
                            >
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
                            <Label
                              htmlFor="originalPrice"
                              className="text-[#740938] font-semibold"
                            >
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
                            <Label
                              htmlFor="discountedPrice"
                              className="text-[#740938] font-semibold"
                            >
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
                            <Label
                              htmlFor="expiryDate"
                              className="text-[#740938] font-semibold"
                            >
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
                          <Label
                            htmlFor="description"
                            className="text-[#740938] font-semibold"
                          >
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
                          <Label
                            htmlFor="purchaseLink"
                            className="text-[#740938] font-semibold"
                          >
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
                          <Label className="text-[#740938] font-semibold">
                            Product Image
                          </Label>
                          <div className="mt-1 border-2 border-dashed border-[#DE7C7D]/50 rounded-lg p-8 text-center hover:border-[#AF1740] transition-colors bg-[#DE7C7D]/10">
                            <Upload className="w-12 h-12 text-[#740938] mx-auto mb-4" />
                            <p className="text-[#740938] font-semibold mb-2">
                              Upload product image
                            </p>
                            <p className="text-gray-600 text-sm">
                              PNG, JPG up to 5MB
                            </p>
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
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Product
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Price
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Expiry
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Status
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Performance
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Actions
                            </th>
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
                                    <p className="font-semibold text-[#740938]">
                                      {product.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {product.category}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-bold text-[#AF1740] text-lg">
                                    ${product.discountedPrice}
                                  </p>
                                  <p className="text-sm text-gray-500 line-through">
                                    ${product.originalPrice}
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4 text-[#CC2B52]" />
                                  <span className="text-sm text-gray-600">
                                    {product.expiryDate}
                                  </span>
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
                                    <span className="text-gray-600">
                                      {product.views} views
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ShoppingBag className="w-4 h-4 text-green-500" />
                                    <span className="text-green-600">
                                      {product.orders} orders
                                    </span>
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
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Analytics Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Track your performance and impact
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">
                        Sales Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">
                            Sales Chart
                          </p>
                          <p className="text-gray-600 text-sm">
                            Weekly sales trends
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
                    <CardHeader>
                      <CardTitle className="text-[#740938]">
                        Impact Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-[#CC2B52]/20 to-[#DE7C7D]/20 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Heart className="w-16 h-16 text-[#740938] mx-auto mb-4" />
                          <p className="text-[#740938] font-semibold">
                            Environmental Impact
                          </p>
                          <p className="text-gray-600 text-sm">
                            Food waste prevented
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {/* Profile Tab - Enhanced */}
            {activeTab === "orders" && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-[#740938]">
                      Orders Management
                    </h1>
                    <p className="text-gray-600">
                      Track and manage customer orders
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-full bg-transparent"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white rounded-full bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full shadow-lg hover:shadow-xl transition-all">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>

                {/* Order Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Completed</p>
                          <p className="text-3xl font-bold text-green-600">
                            {
                              orders.filter(
                                (order) => order.status === "completed"
                              ).length
                            }
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Ready</p>
                          <p className="text-3xl font-bold text-blue-600">
                            {
                              orders.filter((order) => order.status === "ready")
                                .length
                            }
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-yellow-50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Pending</p>
                          <p className="text-3xl font-bold text-yellow-600">
                            {
                              orders.filter(
                                (order) => order.status === "pending"
                              ).length
                            }
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">Total Revenue</p>
                          <p className="text-3xl font-bold text-[#740938]">
                            $
                            {orders
                              .filter((order) => order.status === "completed")
                              .reduce(
                                (sum, order) => sum + order.totalAmount,
                                0
                              )
                              .toFixed(2)}
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Orders Table */}
                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-[#740938] flex items-center">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Recent Orders
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#DE7C7D]/30 bg-[#DE7C7D]/10">
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Order ID
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Customer
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Items
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Amount
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Status
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Pickup
                            </th>
                            <th className="text-left py-4 px-4 text-[#740938] font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr
                              key={order.id}
                              className="border-b border-[#DE7C7D]/20 hover:bg-[#DE7C7D]/10 transition-colors"
                            >
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-semibold text-[#740938]">
                                    {order.id}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {order.orderDate}
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-3">
                                  <div className="w-10 h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {order.customerAvatar}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-[#740938]">
                                      {order.customerName}
                                    </p>
                                    {order.customerRating && (
                                      <div className="flex items-center space-x-1">
                                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                        <span className="text-xs text-gray-600">
                                          {order.customerRating}/5
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div className="space-y-1">
                                  {order.items.map((item, index) => (
                                    <p
                                      key={index}
                                      className="text-sm text-gray-700"
                                    >
                                      {item}
                                    </p>
                                  ))}
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <div>
                                  <p className="font-bold text-[#AF1740] text-lg">
                                    ${order.totalAmount}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {order.paymentMethod}
                                  </p>
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <Badge
                                  className={`${
                                    order.status === "completed"
                                      ? "bg-green-500"
                                      : order.status === "ready"
                                      ? "bg-blue-500"
                                      : order.status === "pending"
                                      ? "bg-yellow-500"
                                      : order.status === "in-progress"
                                      ? "bg-[#AF1740]"
                                      : "bg-gray-500"
                                  } text-white`}
                                >
                                  {order.status}
                                </Badge>
                              </td>
                              <td className="py-4 px-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4 text-[#CC2B52]" />
                                  <span className="text-sm text-gray-600">
                                    {order.pickupTime}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1 mt-1">
                                  <MapPin className="w-3 h-3 text-gray-500" />
                                  <span className="text-xs text-gray-500">
                                    Bakery
                                  </span>
                                </div>
                              </td>
                              <td className="py-4 px-4">
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
                                    className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent"
                                  >
                                    <MessageSquare className="w-4 h-4" />
                                  </Button>
                                  {order.status === "pending" && (
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                  )}
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

            {/* Calendar Tab */}
            {activeTab === "calendar" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Calendar & Schedule
                  </h1>
                  <p className="text-gray-600">
                    Manage your production schedule and customer pickups
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Calendar View */}
                  <div className="lg:col-span-2">
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                      <CardHeader>
                        <CardTitle className="text-[#740938] flex items-center">
                          <CalendarIcon className="w-5 h-5 mr-2" />
                          January 2024
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {[
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                          ].map((day) => (
                            <div
                              key={day}
                              className="text-center text-sm font-semibold text-gray-600 py-2"
                            >
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <div
                                key={day}
                                className={`aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-all hover:bg-[#DE7C7D]/20 ${
                                  day === 16
                                    ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white font-bold"
                                    : calendarEvents.some(
                                        (event) =>
                                          new Date(event.date).getDate() === day
                                      )
                                    ? "bg-[#DE7C7D]/30 text-[#740938] font-semibold"
                                    : "text-gray-700 hover:text-[#740938]"
                                }`}
                              >
                                {day}
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Today's Schedule */}
                  <div>
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
                      <CardHeader>
                        <CardTitle className="text-[#740938] flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          Today's Schedule
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {calendarEvents
                            .filter((event) => event.date === "2024-01-16")
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`p-4 rounded-xl border-l-4 ${
                                  event.type === "production"
                                    ? "bg-blue-50 border-blue-500"
                                    : event.type === "pickup"
                                    ? "bg-green-50 border-green-500"
                                    : "bg-yellow-50 border-yellow-500"
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-[#740938]">
                                    {event.title}
                                  </h4>
                                  <span className="text-sm text-gray-600">
                                    {event.time}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {event.description}
                                </p>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#AF1740]/10 mt-6">
                      <CardHeader>
                        <CardTitle className="text-[#740938]">
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Event
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white rounded-xl bg-transparent"
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            View Full Calendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab - Enhanced */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Business Profile
                  </h1>
                  <p className="text-gray-600">
                    Manage your business information and public profile
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Profile Overview */}
                  <div className="lg:col-span-1">
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
                      <CardContent className="p-8">
                        <div className="text-center">
                          <div className="relative inline-block mb-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto shadow-lg">
                              <span className="text-white font-bold text-2xl">
                                G
                              </span>
                            </div>
                            <Button
                              size="sm"
                              className="absolute -bottom-2 -right-2 bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full p-2 shadow-lg border border-[#DE7C7D]/30"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                          <h3 className="text-xl font-semibold text-[#740938] mb-2">
                            Golden Crust Bakery
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Artisan Bakery & Rescue Food Specialist
                          </p>
                          <div className="flex justify-center space-x-2 mb-6">
                            <Badge className="bg-green-500 text-white">
                              ✓ Verified
                            </Badge>
                            <Badge className="bg-[#AF1740] text-white">
                              ★ Premium
                            </Badge>
                            <Badge className="bg-blue-500 text-white">
                              🏆 Top Rated
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#AF1740]">
                                {sellerStats.totalRating}
                              </div>
                              <div className="text-sm text-gray-600">
                                Rating
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#CC2B52]">
                                {sellerStats.totalOrders}
                              </div>
                              <div className="text-sm text-gray-600">
                                Orders
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-[#740938]">
                                {sellerStats.itemsRescued}
                              </div>
                              <div className="text-sm text-gray-600">
                                Rescued
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Business Hours */}
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 mt-6">
                      <CardHeader>
                        <CardTitle className="text-[#740938] flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          Business Hours
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          {[
                            { day: "Monday", hours: "6:00 AM - 6:00 PM" },
                            { day: "Tuesday", hours: "6:00 AM - 6:00 PM" },
                            { day: "Wednesday", hours: "6:00 AM - 6:00 PM" },
                            { day: "Thursday", hours: "6:00 AM - 6:00 PM" },
                            { day: "Friday", hours: "6:00 AM - 8:00 PM" },
                            { day: "Saturday", hours: "7:00 AM - 8:00 PM" },
                            { day: "Sunday", hours: "8:00 AM - 4:00 PM" },
                          ].map((schedule) => (
                            <div
                              key={schedule.day}
                              className="flex justify-between"
                            >
                              <span className="text-gray-600">
                                {schedule.day}:
                              </span>
                              <span className="font-semibold text-[#740938]">
                                {schedule.hours}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Profile Details */}
                  <div className="lg:col-span-2">
                    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                      <CardHeader>
                        <CardTitle className="text-[#740938] flex items-center">
                          <User className="w-5 h-5 mr-2" />
                          Business Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label
                                htmlFor="businessName"
                                className="text-[#740938] font-semibold"
                              >
                                Business Name
                              </Label>
                              <Input
                                id="businessName"
                                defaultValue="Golden Crust Bakery"
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="ownerName"
                                className="text-[#740938] font-semibold"
                              >
                                Owner Name
                              </Label>
                              <Input
                                id="ownerName"
                                defaultValue="Giuseppe Martinez"
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              />
                            </div>
                          </div>

                          <div>
                            <Label
                              htmlFor="description"
                              className="text-[#740938] font-semibold"
                            >
                              Business Description
                            </Label>
                            <Textarea
                              id="description"
                              defaultValue="Family-owned artisan bakery specializing in traditional sourdough breads and pastries. Committed to reducing food waste through the resQfood platform."
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              rows={4}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label
                                htmlFor="phone"
                                className="text-[#740938] font-semibold"
                              >
                                Phone Number
                              </Label>
                              <Input
                                id="phone"
                                defaultValue="+1 (555) 123-4567"
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="email"
                                className="text-[#740938] font-semibold"
                              >
                                Email Address
                              </Label>
                              <Input
                                id="email"
                                type="email"
                                defaultValue="giuseppe@goldencrust.com"
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              />
                            </div>
                          </div>

                          <div>
                            <Label
                              htmlFor="address"
                              className="text-[#740938] font-semibold"
                            >
                              Business Address
                            </Label>
                            <Input
                              id="address"
                              defaultValue="123 Main Street, Downtown, City 12345"
                              className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label
                                htmlFor="website"
                                className="text-[#740938] font-semibold"
                              >
                                Website
                              </Label>
                              <Input
                                id="website"
                                defaultValue="www.goldencrust.com"
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="socialMedia"
                                className="text-[#740938] font-semibold"
                              >
                                Social Media
                              </Label>
                              <Input
                                id="socialMedia"
                                defaultValue="@goldencrust_bakery"
                                className="mt-1 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                              />
                            </div>
                          </div>

                          <div className="flex justify-end space-x-4">
                            <Button
                              type="button"
                              variant="outline"
                              className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg bg-transparent"
                            >
                              Cancel
                            </Button>
                            <Button
                              type="submit"
                              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab - Enhanced */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#740938]">
                    Account Settings
                  </h1>
                  <p className="text-gray-600">
                    Configure your account preferences and security settings
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Settings Navigation */}
                  

                  {/* Settings Content */}
                  <div className="lg:col-span-3">
                    <div className="space-y-8">
                      {/* General Settings */}
                      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#740938] flex items-center">
                            <Settings className="w-5 h-5 mr-2" />
                            General Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Language
                                </Label>
                                <div className="mt-1 relative">
                                  <select className="w-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg p-3 bg-white">
                                    <option>English (US)</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                  </select>
                                </div>
                              </div>
                              <div>
                                <Label className="text-[#740938] font-semibold">
                                  Timezone
                                </Label>
                                <div className="mt-1 relative">
                                  <select className="w-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg p-3 bg-white">
                                    <option>Pacific Time (PT)</option>
                                    <option>Eastern Time (ET)</option>
                                    <option>Central Time (CT)</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label className="text-[#740938] font-semibold">
                                Currency
                              </Label>
                              <div className="mt-1 relative">
                                <select className="w-full md:w-1/2 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg p-3 bg-white">
                                  <option>USD ($)</option>
                                  <option>EUR (€)</option>
                                  <option>GBP (£)</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notification Settings */}
                      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
                        <CardHeader>
                          <CardTitle className="text-[#740938] flex items-center">
                            <Bell className="w-5 h-5 mr-2" />
                            Notification Preferences
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {[
                              {
                                id: "orders",
                                label: "New Orders",
                                description:
                                  "Get notified when you receive new orders",
                              },
                              {
                                id: "messages",
                                label: "Customer Messages",
                                description:
                                  "Receive alerts for new customer messages",
                              },
                              {
                                id: "reviews",
                                label: "Reviews & Ratings",
                                description:
                                  "Notifications for new customer reviews",
                              },
                              {
                                id: "promotions",
                                label: "Promotions",
                                description:
                                  "Updates about platform promotions and features",
                              },
                              {
                                id: "reminders",
                                label: "Pickup Reminders",
                                description:
                                  "Reminders about upcoming customer pickups",
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
                                      Push
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
                            Security & Privacy
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                              <div className="flex items-center space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500" />
                                <div>
                                  <h4 className="font-semibold text-green-800">
                                    Account Verified
                                  </h4>
                                  <p className="text-sm text-green-600">
                                    Your account has been verified and is secure
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-4">
                              <Button
                                variant="outline"
                                className="w-full justify-between border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white rounded-lg bg-transparent"
                              >
                                <span className="flex items-center">
                                  <Key className="w-4 h-4 mr-2" />
                                  Change Password
                                </span>
                                <ChevronDown className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-between border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-lg bg-transparent"
                              >
                                <span className="flex items-center">
                                  <Shield className="w-4 h-4 mr-2" />
                                  Two-Factor Authentication
                                </span>
                                <Badge className="bg-green-500 text-white">
                                  Enabled
                                </Badge>
                              </Button>
                              <Button
                                variant="outline"
                                className="w-full justify-between border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white rounded-lg bg-transparent"
                              >
                                <span className="flex items-center">
                                  <Database className="w-4 h-4 mr-2" />
                                  Download My Data
                                </span>
                                <ChevronDown className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Danger Zone */}
                      <Card className="border-2 border-red-200 rounded-2xl shadow-lg bg-gradient-to-br from-white to-red-50">
                        <CardHeader>
                          <CardTitle className="text-red-600 flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            Danger Zone
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                              <h4 className="font-semibold text-red-800 mb-2">
                                Deactivate Account
                              </h4>
                              <p className="text-sm text-red-600 mb-4">
                                Temporarily disable your account. You can
                                reactivate it anytime.
                              </p>
                              <Button
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                              >
                                Deactivate Account
                              </Button>
                            </div>
                            <div className="p-4 bg-red-100 rounded-xl border border-red-300">
                              <h4 className="font-semibold text-red-800 mb-2">
                                Delete Account
                              </h4>
                              <p className="text-sm text-red-600 mb-4">
                                Permanently delete your account and all
                                associated data. This action cannot be undone.
                              </p>
                              <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
