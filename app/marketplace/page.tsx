"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { NotificationDropdown } from "@/components/notification-dropdown"
import { UserMenu } from "@/components/user-menu"
import {
  Heart,
  Search,
  Clock,
  Star,
  ExternalLink,
  ArrowLeft,
  MapPin,
  Zap,
  Users,
  TrendingDown,
  Timer,
  SlidersHorizontal,
  Grid3X3,
  List,
} from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Artisan Sourdough Bread",
    originalPrice: 8.99,
    discountedPrice: 3.99,
    discount: 56,
    expiryDays: 1,
    category: "Baked Goods",
    rating: 4.8,
    reviews: 24,
    seller: "Golden Crust Bakery",
    location: "Downtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: true,
    sold: 45,
  },
  {
    id: 2,
    name: "Organic Greek Yogurt",
    originalPrice: 6.5,
    discountedPrice: 2.99,
    discount: 54,
    expiryDays: 2,
    category: "Dairy",
    rating: 4.9,
    reviews: 18,
    seller: "Fresh Valley Farm",
    location: "Midtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 32,
  },
  {
    id: 3,
    name: "Premium Coffee Beans",
    originalPrice: 24.99,
    discountedPrice: 12.99,
    discount: 48,
    expiryDays: 7,
    category: "Beverages",
    rating: 4.7,
    reviews: 56,
    seller: "Roast Masters",
    location: "Uptown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 78,
  },
  {
    id: 4,
    name: "Gourmet Chocolate Croissants",
    originalPrice: 12.99,
    discountedPrice: 5.99,
    discount: 54,
    expiryDays: 1,
    category: "Baked Goods",
    rating: 4.6,
    reviews: 31,
    seller: "Patisserie Belle",
    location: "Downtown",
    image: "/placeholder.svg?height=300&width=300",
    urgent: true,
    sold: 23,
  },
  {
    id: 5,
    name: "Fresh Mozzarella",
    originalPrice: 9.99,
    discountedPrice: 4.99,
    discount: 50,
    expiryDays: 3,
    category: "Dairy",
    rating: 4.8,
    reviews: 42,
    seller: "Cheese Artisans",
    location: "Westside",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 67,
  },
  {
    id: 6,
    name: "Craft Energy Bars",
    originalPrice: 15.99,
    discountedPrice: 7.99,
    discount: 50,
    expiryDays: 5,
    category: "Snacks",
    rating: 4.5,
    reviews: 29,
    seller: "Healthy Bites Co.",
    location: "Eastside",
    image: "/placeholder.svg?height=300&width=300",
    urgent: false,
    sold: 54,
  },
]

const categories = ["All", "Baked Goods", "Dairy", "Beverages", "Snacks", "Fruits", "Vegetables"]
const sortOptions = [
  "Expiry (Urgent First)",
  "Price (Low to High)",
  "Price (High to Low)",
  "Rating",
  "Discount",
  "Most Popular",
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("Expiry (Urgent First)")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Expiry (Urgent First)":
          return a.expiryDays - b.expiryDays
        case "Price (Low to High)":
          return a.discountedPrice - b.discountedPrice
        case "Price (High to Low)":
          return b.discountedPrice - a.discountedPrice
        case "Rating":
          return b.rating - a.rating
        case "Discount":
          return b.discount - a.discount
        case "Most Popular":
          return b.sold - a.sold
        default:
          return 0
      }
    })

  const urgentProducts = filteredProducts.filter((p) => p.expiryDays <= 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] transition-colors" />
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] transition-colors">
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
                  className="pl-12 pr-4 h-12 rounded-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-[#DE7C7D]/10 text-lg shadow-sm"
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
      <div className="bg-white border-b border-[#DE7C7D]/30 shadow-sm">
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
                      : "text-gray-700 hover:bg-[#DE7C7D]/20 hover:text-[#740938]"
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
                onClick={() => setShowFilters(!showFilters)}
                className="border-[#DE7C7D]/30 text-gray-700 hover:bg-[#DE7C7D]/20"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="flex border border-[#DE7C7D]/30 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#AF1740] text-white" : "text-gray-600"}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#AF1740] text-white" : "text-gray-600"}
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
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#740938] mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-white px-3 text-gray-700"
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#740938] mb-2">Price Range</label>
                    <div className="flex space-x-2">
                      <Input placeholder="Min" className="border-[#DE7C7D]/30 focus:border-[#AF1740]" />
                      <Input placeholder="Max" className="border-[#DE7C7D]/30 focus:border-[#AF1740]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#740938] mb-2">Location</label>
                    <select className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-white px-3 text-gray-700">
                      <option>All Locations</option>
                      <option>Downtown</option>
                      <option>Midtown</option>
                      <option>Uptown</option>
                      <option>Westside</option>
                      <option>Eastside</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#740938] mb-2">Rating</label>
                    <select className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-white px-3 text-gray-700">
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
          <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] text-white">
            <CardContent className="p-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">🌍 Rescue Food Marketplace</h1>
                <p className="text-[#DE7C7D] text-lg mb-6">
                  Join thousands of food heroes saving the planet one meal at a time
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">{filteredProducts.length}</div>
                    <div className="text-[#DE7C7D] text-sm">Items Available</div>
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
                    <div className="text-2xl font-bold">{urgentProducts.length}</div>
                    <div className="text-[#DE7C7D] text-sm">Urgent Items</div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold">2.8K</div>
                    <div className="text-[#DE7C7D] text-sm">Happy Customers</div>
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
                <h2 className="text-2xl font-bold text-[#740938]">⚡ Urgent - Expires Today!</h2>
                <Badge className="bg-[#CC2B52] text-white animate-bounce">
                  <Clock className="w-3 h-3 mr-1" />
                  {urgentProducts.length} items
                </Badge>
              </div>
              <Button
                variant="outline"
                className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent"
              >
                View All Urgent
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {urgentProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-2xl transition-all duration-500 border-2 border-[#CC2B52]/50 hover:border-[#CC2B52] rounded-2xl overflow-hidden bg-gradient-to-br from-white to-[#CC2B52]/10 hover:scale-105"
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      <Badge className="absolute top-3 right-3 bg-[#CC2B52] text-white animate-pulse font-bold">
                        <Clock className="w-3 h-3 mr-1" />
                        TODAY ONLY
                      </Badge>
                      <Badge className="absolute top-3 left-3 bg-[#AF1740] text-white text-lg font-bold">
                        {product.discount}% OFF
                      </Badge>
                      <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-white text-xs">{product.sold} sold</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[#740938] border-[#740938] bg-white/80">
                          {product.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-[#740938] text-lg mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {product.seller} • {product.location}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl font-bold text-[#CC2B52]">${product.discountedPrice}</span>
                        <span className="text-gray-500 line-through text-lg">${product.originalPrice}</span>
                      </div>
                      <Link href="/cart">
                        <Button className="w-full bg-gradient-to-r from-[#CC2B52] to-[#AF1740] hover:from-[#AF1740] hover:to-[#740938] text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all">
                          🚨 Rescue Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Products Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#740938]">All Rescued Food</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Showing {filteredProducts.length} products</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 rounded-lg border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-white px-3 text-gray-700"
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
              <Card
                key={product.id}
                className="group hover:shadow-2xl transition-all duration-500 border-2 border-[#DE7C7D]/30 hover:border-[#AF1740] rounded-2xl overflow-hidden bg-white hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <Badge className="absolute top-3 right-3 bg-[#CC2B52] text-white font-bold">
                      {product.discount}% OFF
                    </Badge>
                    <div className="absolute top-3 left-3">
                      {product.expiryDays <= 1 ? (
                        <Badge className="bg-[#CC2B52] text-white animate-pulse">
                          <Clock className="w-3 h-3 mr-1" />
                          Today
                        </Badge>
                      ) : (
                        <Badge className="bg-[#740938] text-white">
                          <Clock className="w-3 h-3 mr-1" />
                          {product.expiryDays} days
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-white text-xs">{product.sold} sold</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-[#740938] border-[#740938] bg-gray-50">
                        {product.category}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviews})</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-[#740938] text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {product.seller} • {product.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-bold text-[#AF1740]">${product.discountedPrice}</span>
                      <span className="text-gray-500 line-through text-lg">${product.originalPrice}</span>
                    </div>
                    <Link href="/cart">
                      <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all">
                        Buy Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-lg transition-all duration-300 border-2 border-[#DE7C7D]/30 hover:border-[#AF1740] rounded-2xl overflow-hidden bg-white"
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                      <Badge className="absolute top-2 right-2 bg-[#CC2B52] text-white text-sm font-bold">
                        {product.discount}% OFF
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-[#740938] border-[#740938]">
                          {product.category}
                        </Badge>
                        {product.expiryDays <= 1 && (
                          <Badge className="bg-[#CC2B52] text-white animate-pulse">
                            <Clock className="w-3 h-3 mr-1" />
                            Urgent
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-[#740938] text-xl mb-2">{product.name}</h3>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{product.rating}</span>
                          <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">
                            {product.seller} • {product.location}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">{product.sold} sold</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-[#AF1740]">${product.discountedPrice}</span>
                          <span className="text-gray-500 line-through text-xl">${product.originalPrice}</span>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{product.expiryDays} days left</span>
                          </div>
                        </div>
                        <Link href="/cart">
                          <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl px-8 h-12 font-semibold shadow-lg hover:shadow-xl transition-all">
                            Buy Now
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-[#DE7C7D]/30 to-[#CC2B52]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-16 h-16 text-[#740938]" />
            </div>
            <h3 className="text-2xl font-bold text-[#740938] mb-4">No products found</h3>
            <p className="text-gray-600 text-lg mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
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
            <h3 className="text-2xl font-bold mb-4">Join the Food Rescue Movement</h3>
            <p className="text-[#DE7C7D] mb-6 text-lg">
              Every purchase helps reduce food waste and supports local businesses
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
  )
}
