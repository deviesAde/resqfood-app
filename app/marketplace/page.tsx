"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import { UserMenu } from "@/components/user-menu";
import { NotificationDropdown } from "@/components/notification-dropdown";
import {
  Heart,
  Search,
  Clock,
  Star,
  ArrowLeft,
  MapPin,
  Zap,
  Users,
  TrendingDown,
  Timer,
  SlidersHorizontal,
  Grid3X3,
  List,
  AlertTriangle,
  Eye,
  EyeOff,
  ShoppingCart,
  Info,
  Utensils,
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Artisan Sourdough Bread",
    originalPrice: 8.99,
    discountedPrice: 3.99,
    discount: 56,
    expiryDays: 1,
    freshnessDays: 3,
    category: "Baked Goods",
    rating: 4.8,
    reviews: 24,
    seller: "Golden Crust Bakery",
    location: "Downtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: true,
    sold: 45,
    status: "available",
    bestBy: "Today",
    goodFor: "3 days if stored properly",
  },
  {
    id: 2,
    name: "Organic Greek Yogurt",
    originalPrice: 6.5,
    discountedPrice: 2.99,
    discount: 54,
    expiryDays: 0,
    freshnessDays: 0,
    category: "Dairy",
    rating: 4.9,
    reviews: 18,
    seller: "Fresh Valley Farm",
    location: "Midtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 32,
    status: "expired",
    bestBy: "Yesterday",
    goodFor: "Not recommended",
  },
  {
    id: 3,
    name: "Premium Coffee Beans",
    originalPrice: 24.99,
    discountedPrice: 12.99,
    discount: 48,
    expiryDays: 7,
    freshnessDays: 14,
    category: "Beverages",
    rating: 4.7,
    reviews: 56,
    seller: "Roast Masters",
    location: "Uptown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 78,
    status: "available",
    bestBy: "Next week",
    goodFor: "2 weeks for optimal flavor",
  },
  {
    id: 4,
    name: "Gourmet Chocolate Croissants",
    originalPrice: 12.99,
    discountedPrice: 5.99,
    discount: 54,
    expiryDays: 1,
    freshnessDays: 2,
    category: "Baked Goods",
    rating: 4.6,
    reviews: 31,
    seller: "Patisserie Belle",
    location: "Downtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: true,
    sold: 23,
    status: "available",
    bestBy: "Today",
    goodFor: "2 days if refrigerated",
  },
  {
    id: 5,
    name: "Fresh Mozzarella",
    originalPrice: 9.99,
    discountedPrice: 4.99,
    discount: 50,
    expiryDays: 3,
    freshnessDays: 5,
    category: "Dairy",
    rating: 4.8,
    reviews: 42,
    seller: "Cheese Artisans",
    location: "Westside",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 67,
    status: "available",
    bestBy: "In 3 days",
    goodFor: "5 days when refrigerated",
  },
  {
    id: 6,
    name: "Craft Energy Bars",
    originalPrice: 15.99,
    discountedPrice: 7.99,
    discount: 50,
    expiryDays: 5,
    freshnessDays: 30,
    category: "Snacks",
    rating: 4.5,
    reviews: 29,
    seller: "Healthy Bites Co.",
    location: "Eastside",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 54,
    status: "available",
    bestBy: "In 5 days",
    goodFor: "1 month shelf life",
  },
  {
    id: 7,
    name: "Expired Organic Salad Mix",
    originalPrice: 4.99,
    discountedPrice: 1.99,
    discount: 60,
    expiryDays: -1,
    freshnessDays: 0,
    category: "Vegetables",
    rating: 4.2,
    reviews: 15,
    seller: "Green Garden Co.",
    location: "Downtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 12,
    status: "expired",
    bestBy: "Yesterday",
    goodFor: "Not safe to consume",
  },
];

const categories = [
  "All",
  "Baked Goods",
  "Dairy",
  "Beverages",
  "Snacks",
  "Fruits",
  "Vegetables",
];
const sortOptions = [
  "Expiry (Urgent First)",
  "Price (Low to High)",
  "Price (High to Low)",
  "Rating",
  "Discount",
  "Most Popular",
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Expiry (Urgent First)");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [showFilters, setShowFilters] = useState(false);
  const [showExpired, setShowExpired] = useState(false);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesExpiredFilter = showExpired || product.status !== "expired";
      return matchesSearch && matchesCategory && matchesExpiredFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Expiry (Urgent First)":
          // Expired items go to the end
          if (a.status === "expired" && b.status !== "expired") return 1;
          if (b.status === "expired" && a.status !== "expired") return -1;
          return a.expiryDays - b.expiryDays;
        case "Price (Low to High)":
          return a.discountedPrice - b.discountedPrice;
        case "Price (High to Low)":
          return b.discountedPrice - a.discountedPrice;
        case "Rating":
          return b.rating - a.rating;
        case "Discount":
          return b.discount - a.discount;
        case "Most Popular":
          return b.sold - a.sold;
        default:
          return 0;
      }
    });

  const urgentProducts = filteredProducts.filter(
    (p) => p.expiryDays <= 1 && p.status === "available"
  );
  const expiredProducts = products.filter((p) => p.status === "expired");
  const availableProducts = filteredProducts.filter(
    (p) => p.status === "available"
  );

  const ProductCard = ({ product }: { product: (typeof products)[0] }) => {
    const isExpired = product.status === "expired";
    const isUrgent = product.expiryDays <= 1 && !isExpired;

    return (
      <Card
        className={`group hover:shadow-2xl transition-all duration-500 border-2 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 ${
          isExpired
            ? "border-red-300 dark:border-red-700 opacity-75"
            : isUrgent
            ? "border-[#CC2B52]/50 hover:border-[#CC2B52] bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20"
            : "border-[#DE7C7D]/30 hover:border-[#AF1740] dark:border-gray-600"
        }`}
      >
        <CardContent className="p-0">
          <div className="relative">
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className={`w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
                  isExpired ? "grayscale" : ""
                }`}
              />
            </Link>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

            {isExpired && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center text-white">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <span className="font-bold text-sm">EXPIRED</span>
                </div>
              </div>
            )}

            {isUrgent && !isExpired && (
              <Badge className="absolute top-3 right-3 bg-[#CC2B52] text-white animate-pulse font-bold">
                <Clock className="w-3 h-3 mr-1" />
                TODAY ONLY
              </Badge>
            )}

            {!isExpired && (
              <Badge className="absolute top-3 left-3 bg-[#AF1740] text-white text-lg font-bold">
                {product.discount}% OFF
              </Badge>
            )}

            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <span className="text-white text-xs">{product.sold} sold</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant="outline"
                className={`${
                  isExpired
                    ? "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                    : "text-[#740938] border-[#740938] dark:text-[#DE7C7D] dark:border-[#DE7C7D]"
                } bg-white/80 dark:bg-gray-800/80`}
              >
                {product.category}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {product.rating}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({product.reviews})
                </span>
              </div>
            </div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-lg mb-2 line-clamp-2 hover:text-[#AF1740] transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.seller} • {product.location}
              </span>
            </div>

            {/* Freshness Information */}
            <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <Utensils className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Freshness Info
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    Best by:
                  </span>
                  <span
                    className={`font-medium ${
                      isExpired
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {product.bestBy}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    Good for:
                  </span>
                  <span
                    className={`font-medium ${
                      isExpired
                        ? "text-red-600 dark:text-red-400"
                        : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {product.goodFor}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-4">
              <span
                className={`text-2xl font-bold ${
                  isExpired
                    ? "text-red-500"
                    : "text-[#AF1740] dark:text-[#CC2B52]"
                }`}
              >
                ${product.discountedPrice}
              </span>
              <span className="text-gray-500 line-through text-lg">
                ${product.originalPrice}
              </span>
            </div>

            {/* Action Buttons */}
            {isExpired ? (
              <Button
                disabled
                className="w-full bg-gray-400 text-gray-600 rounded-2xl h-12 font-semibold cursor-not-allowed mb-2"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Expired
              </Button>
            ) : (
              <div className="space-y-2">
                {/* Primary Actions Row */}
                <div className="flex space-x-2">
                  <Button
                    className={`flex-1 rounded-xl h-10 font-semibold shadow-lg hover:shadow-xl transition-all ${
                      isUrgent
                        ? "bg-gradient-to-r from-[#CC2B52] to-[#AF1740] hover:from-[#AF1740] hover:to-[#740938] text-white"
                        : "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button
                    className={`flex-1 rounded-xl h-10 font-semibold shadow-lg hover:shadow-xl transition-all ${
                      isUrgent
                        ? "bg-gradient-to-r from-[#740938] to-[#AF1740] hover:from-[#CC2B52] hover:to-[#AF1740] text-white"
                        : "bg-gradient-to-r from-[#740938] to-[#AF1740] hover:from-[#AF1740] hover:to-[#CC2B52] text-white"
                    }`}
                  >
                    <Zap className="w-4 h-4 mr-1" />
                    Buy Now
                  </Button>
                </div>
                {/* View Details Button */}
                <Link href={`/product/${product.id}`} className="block">
                  <Button
                    variant="outline"
                    className="w-full border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-xl h-10 font-medium bg-transparent dark:border-[#DE7C7D] dark:text-[#DE7C7D] dark:hover:bg-[#DE7C7D] dark:hover:text-gray-900"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <ArrowLeft className="w-5 h-5 text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors" />
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors">
                  resQfood
                </span>
              </Link>
            </div>
            {/* Center Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for rescued food..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 h-12 rounded-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-800/50 text-lg shadow-sm"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 h-8">
                  Search
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
            
              <NotificationDropdown />
              <UserMenu cartItemCount={3} notificationCount={5} />
              <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg">
                <Link href="/auth/register">Become Seller</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation - Categories */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-[#DE7C7D]/30 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6">
              {categories.slice(0, 6).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 hover:text-[#740938] dark:hover:text-[#DE7C7D]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowExpired(!showExpired)}
                className={`border-[#DE7C7D]/30 dark:border-gray-600 transition-all ${
                  showExpired
                    ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700"
                    : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20"
                }`}
              >
                {showExpired ? (
                  <EyeOff className="w-4 h-4 mr-2" />
                ) : (
                  <Eye className="w-4 h-4 mr-2" />
                )}
                {showExpired ? "Hide" : "Show"} Expired (
                {expiredProducts.length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#DE7C7D]/30 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex border border-[#DE7C7D]/30 dark:border-gray-600 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-[#AF1740] text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-[#AF1740] text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        {showFilters && (
          <div className="mb-8">
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300"
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                      Price Range
                    </label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Min"
                        className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:bg-gray-800"
                      />
                      <Input
                        placeholder="Max"
                        className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:bg-gray-800"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                      Location
                    </label>
                    <select className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300">
                      <option>All Locations</option>
                      <option>Downtown</option>
                      <option>Midtown</option>
                      <option>Uptown</option>
                      <option>Westside</option>
                      <option>Eastside</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                      Rating
                    </label>
                    <select className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300">
                      <option>All Ratings</option>
                      <option>4.5+ Stars</option>
                      <option>4.0+ Stars</option>
                      <option>3.5+ Stars</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Hero Stats Banner */}
        <div className="mb-8">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  🌍 Rescue Food Marketplace
                </h1>
                <p className="text-[#DE7C7D] text-lg mb-6">
                  Join thousands of food heroes saving the planet one meal at a
                  time
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">
                      {availableProducts.length}
                    </div>
                    <div className="text-[#DE7C7D] text-sm">
                      Items Available
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingDown className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">52%</div>
                    <div className="text-[#DE7C7D] text-sm">Avg. Discount</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Timer className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">
                      {urgentProducts.length}
                    </div>
                    <div className="text-[#DE7C7D] text-sm">Urgent Items</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">2.8K</div>
                    <div className="text-[#DE7C7D] text-sm">
                      Happy Customers
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Urgent Items Section */}
        {urgentProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-[#CC2B52] rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D]">
                  ⚡ Urgent - Expires Today!
                </h2>
                <Badge className="bg-[#CC2B52] text-white animate-bounce">
                  <Clock className="w-3 h-3 mr-1" />
                  {urgentProducts.length} items
                </Badge>
              </div>
              <Button
                variant="outline"
                className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent dark:border-[#CC2B52] dark:text-[#CC2B52]"
              >
                View All Urgent
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {urgentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Main Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D]">
              All Rescued Food
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => {
              const isExpired = product.status === "expired";
              const isUrgent = product.expiryDays <= 1 && !isExpired;

              return (
                <Card
                  key={product.id}
                  className={`hover:shadow-lg transition-all duration-300 border-2 rounded-2xl overflow-hidden ${
                    isExpired
                      ? "border-red-300 dark:border-red-700 opacity-75 bg-white dark:bg-gray-800"
                      : "border-[#DE7C7D]/30 hover:border-[#AF1740] dark:border-gray-600 bg-white dark:bg-gray-800"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Link href={`/product/${product.id}`}>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className={`w-32 h-32 object-cover rounded-xl ${
                              isExpired ? "grayscale" : ""
                            }`}
                          />
                        </Link>
                        {isExpired && (
                          <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                          </div>
                        )}
                        <Badge
                          className={`absolute top-2 right-2 text-sm font-bold ${
                            isExpired
                              ? "bg-red-500 text-white"
                              : "bg-[#CC2B52] text-white"
                          }`}
                        >
                          {product.discount}% OFF
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge
                            variant="outline"
                            className={`${
                              isExpired
                                ? "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                                : "text-[#740938] border-[#740938] dark:text-[#DE7C7D] dark:border-[#DE7C7D]"
                            }`}
                          >
                            {product.category}
                          </Badge>
                          {isExpired ? (
                            <Badge className="bg-red-500 text-white">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              EXPIRED
                            </Badge>
                          ) : isUrgent ? (
                            <Badge className="bg-[#CC2B52] text-white animate-pulse">
                              <Clock className="w-3 h-3 mr-1" />
                              Urgent
                            </Badge>
                          ) : null}
                        </div>
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-xl mb-2 hover:text-[#AF1740] transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">
                              {product.rating}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({product.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product.seller} • {product.location}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {product.sold} sold
                          </span>
                        </div>

                        {/* Freshness Info in List View */}
                        <div className="mb-3 p-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 dark:text-gray-400">
                              Best by: {product.bestBy}
                            </span>
                            <span
                              className={`font-medium ${
                                isExpired
                                  ? "text-red-600 dark:text-red-400"
                                  : "text-blue-600 dark:text-blue-400"
                              }`}
                            >
                              {product.goodFor}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`text-3xl font-bold ${
                                isExpired
                                  ? "text-red-500"
                                  : "text-[#AF1740] dark:text-[#CC2B52]"
                              }`}
                            >
                              ${product.discountedPrice}
                            </span>
                            <span className="text-gray-500 line-through text-xl">
                              ${product.originalPrice}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {isExpired
                                  ? "Expired"
                                  : `${product.expiryDays} days left`}
                              </span>
                            </div>
                          </div>
                          {isExpired ? (
                            <Button
                              disabled
                              className="bg-gray-400 text-gray-600 rounded-2xl px-8 h-12 font-semibold cursor-not-allowed"
                            >
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Expired
                            </Button>
                          ) : (
                            <div className="flex space-x-2">
                              <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl px-4 h-10 font-semibold">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Cart
                              </Button>
                              <Button className="bg-gradient-to-r from-[#740938] to-[#AF1740] hover:from-[#CC2B52] hover:to-[#AF1740] text-white rounded-xl px-4 h-10 font-semibold">
                                <Zap className="w-4 h-4 mr-1" />
                                Buy
                              </Button>
                              <Link href={`/product/${product.id}`}>
                                <Button
                                  variant="outline"
                                  className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-xl px-4 h-10 font-medium bg-transparent"
                                >
                                  <Info className="w-4 h-4 mr-1" />
                                  Details
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-[#DE7C7D]/30 to-[#CC2B52]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-[#740938] dark:text-[#DE7C7D]" />
            </div>
            <h3 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Try adjusting your search or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-8"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-3xl p-8 text-white text-center shadow-xl">
          <div className="max-w-2xl mx-auto">
            <Heart className="w-16 h-16 mx-auto mb-4 text-[#DE7C7D]" />
            <h3 className="text-2xl font-bold mb-4">
              Join the Food Rescue Movement
            </h3>
            <p className="text-[#DE7C7D] mb-6 text-lg">
              Every purchase helps reduce food waste and supports local
              businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-8 font-semibold shadow-lg">
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-8 font-semibold bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
