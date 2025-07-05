"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Heart,
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Share2,
  ShoppingCart,
  Truck,
  Users,
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Package,
  Zap,
  AlertTriangle,
  CheckCircle,
  Timer,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const productDetails = {
  1: {
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
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    urgent: true,
    sold: 45,
    status: "available",
    description:
      "Handcrafted sourdough bread made with organic flour and traditional fermentation methods. Perfect for sandwiches or toast. This artisan bread features a crispy crust and soft, airy interior with complex flavors developed over 24 hours of fermentation.",
    ingredients: ["Organic wheat flour", "Water", "Sourdough starter", "Sea salt"],
    nutritionFacts: {
      calories: 250,
      protein: "8g",
      carbs: "48g",
      fat: "2g",
      fiber: "3g",
    },
    allergens: ["Gluten", "May contain traces of nuts"],
    pickupTimes: ["Today 2:00 PM - 6:00 PM", "Tomorrow 9:00 AM - 1:00 PM"],
    sellerInfo: {
      name: "Golden Crust Bakery",
      rating: 4.9,
      totalReviews: 156,
      yearsInBusiness: 8,
      specialties: ["Artisan Breads", "Pastries", "Organic Baking"],
      phone: "+1 (555) 123-4567",
      email: "info@goldencrust.com",
      address: "123 Baker Street, Downtown",
    },
    reviews: [
      {
        id: 1,
        user: "Sarah M.",
        rating: 5,
        comment: "Amazing bread! Fresh and delicious. Great value for money.",
        date: "2024-01-10",
        verified: true,
      },
      {
        id: 2,
        user: "Mike R.",
        rating: 4,
        comment: "Good quality bread, perfect for morning toast.",
        date: "2024-01-08",
        verified: true,
      },
    ],
  },
  2: {
    id: 2,
    name: "Organic Greek Yogurt",
    originalPrice: 6.5,
    discountedPrice: 2.99,
    discount: 54,
    expiryDays: 0,
    category: "Dairy",
    rating: 4.9,
    reviews: 18,
    seller: "Fresh Valley Farm",
    location: "Midtown",
    images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
    urgent: false,
    sold: 32,
    status: "expired",
    description:
      "Creamy organic Greek yogurt made from grass-fed cow milk. Rich in protein and probiotics. Perfect for breakfast, smoothies, or as a healthy snack.",
    ingredients: ["Organic milk", "Live active cultures"],
    nutritionFacts: {
      calories: 130,
      protein: "15g",
      carbs: "6g",
      fat: "7g",
      fiber: "0g",
    },
    allergens: ["Dairy"],
    pickupTimes: ["Expired - No longer available"],
    sellerInfo: {
      name: "Fresh Valley Farm",
      rating: 4.8,
      totalReviews: 89,
      yearsInBusiness: 12,
      specialties: ["Organic Dairy", "Farm Fresh Products"],
      phone: "+1 (555) 987-6543",
      email: "contact@freshvalley.com",
      address: "456 Farm Road, Midtown",
    },
    reviews: [],
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = productDetails[Number(productId) as keyof typeof productDetails]

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showAllReviews, setShowAllReviews] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">Product Not Found</h1>
          <Link href="/marketplace">
            <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full">
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const isExpired = product.status === "expired"
  const isUrgent = product.expiryDays <= 1 && !isExpired

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Top Navigation */}
      <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/marketplace"
                className="flex items-center space-x-2 group"
              >
                <ArrowLeft className="w-5 h-5 text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors" />
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors">
                  resQfood
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[#DE7C7D]/20"
              >
                <Share2 className="w-4 h-4 text-[#740938] dark:text-[#DE7C7D]" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-[#DE7C7D]/20"
              >
                <Heart className="w-4 h-4 text-[#740938] dark:text-[#DE7C7D]" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              {isExpired && (
                <div className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                    <h3 className="text-2xl font-bold mb-2">EXPIRED</h3>
                    <p className="text-red-200">
                      This product is no longer available
                    </p>
                  </div>
                </div>
              )}
              {isUrgent && !isExpired && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#CC2B52] text-white animate-pulse text-lg px-4 py-2">
                    <Zap className="w-4 h-4 mr-2" />
                    URGENT - Expires Today!
                  </Badge>
                </div>
              )}
              <Badge className="absolute top-4 right-4 bg-[#AF1740] text-white text-xl font-bold px-4 py-2">
                {product.discount}% OFF
              </Badge>
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-[#AF1740] scale-105"
                        : "border-gray-200 dark:border-gray-600 hover:border-[#DE7C7D]"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <Badge
                  variant="outline"
                  className="text-[#740938] dark:text-[#DE7C7D] border-[#740938] dark:border-[#DE7C7D]"
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
                    <Timer className="w-3 h-3 mr-1" />
                    Expires Today
                  </Badge>
                ) : (
                  <Badge className="bg-green-500 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Available
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {product.rating}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    ({product.reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {product.sold} sold
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-[#DE7C7D]/20 to-[#AF1740]/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-[#AF1740] dark:text-[#CC2B52]">
                  ${product.discountedPrice}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
                <Badge className="bg-green-500 text-white text-lg px-3 py-1">
                  Save $
                  {(product.originalPrice - product.discountedPrice).toFixed(2)}
                </Badge>
              </div>
              {!isExpired && (
                <div className="flex items-center space-x-2 text-[#740938] dark:text-[#DE7C7D]">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">
                    {product.expiryDays === 0
                      ? "Expires today"
                      : `${product.expiryDays} days left`}
                  </span>
                </div>
              )}
            </div>

            {/* Quantity and Actions */}
            {!isExpired && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-semibold text-[#740938] dark:text-[#DE7C7D]">
                    Quantity:
                  </span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Link href="/cart" className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart - $
                      {(product.discountedPrice * quantity).toFixed(2)}
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white h-14 px-6 bg-transparent"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {isExpired && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">
                  Product Expired
                </h3>
                <p className="text-red-600 dark:text-red-300 mb-4">
                  This product is no longer available for purchase.
                </p>
                <Link href="/marketplace">
                  <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
                    Browse Other Products
                  </Button>
                </Link>
              </div>
            )}

            {/* Pickup Info */}
            {!isExpired && (
              <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-lg mb-4 flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Pickup Information
                  </h3>
                  <div className="space-y-3">
                    {product.pickupTimes.map((time, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Calendar className="w-4 h-4 text-[#AF1740]" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#DE7C7D]/30 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-[#AF1740]" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {product.sellerInfo.address}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <Card className="lg:col-span-2 border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-2xl mb-6">
                  Product Description
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-3">
                      Ingredients
                    </h4>
                    <ul className="space-y-1">
                      {product.ingredients.map((ingredient, index) => (
                        <li
                          key={index}
                          className="text-gray-600 dark:text-gray-400 flex items-center"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-3">
                      Nutrition Facts
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(product.nutritionFacts).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400 capitalize">
                              {key}:
                            </span>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {product.allergens.length > 0 && (
                  <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Allergen Information
                    </h4>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      {product.allergens.join(", ")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
              <CardContent className="p-8">
                <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-xl mb-6">
                  Seller Information
                </h3>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-lg">
                    {product.sellerInfo.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">
                      {product.sellerInfo.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({product.sellerInfo.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Experience:
                    </span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {product.sellerInfo.yearsInBusiness} years
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-600 dark:text-gray-400 block mb-2">
                      Specialties:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sellerInfo.specialties.map(
                        (specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-[#740938] dark:text-[#DE7C7D] border-[#740938] dark:border-[#DE7C7D]"
                          >
                            {specialty}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#DE7C7D]/30 dark:border-gray-600 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-[#AF1740]" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {product.sellerInfo.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-[#AF1740]" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {product.sellerInfo.email}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Seller
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-2xl">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-bold text-lg">{product.rating}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {product.reviews
                    .slice(0, showAllReviews ? undefined : 2)
                    .map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-[#DE7C7D]/30 dark:border-gray-600 pb-6 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold">
                                {review.user[0]}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-[#740938] dark:text-[#DE7C7D]">
                                  {review.user}
                                </span>
                                {review.verified && (
                                  <Badge className="bg-green-500 text-white text-xs">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                </div>

                {product.reviews.length > 2 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white"
                    >
                      {showAllReviews
                        ? "Show Less"
                        : `Show All ${product.reviews.length} Reviews`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-8">
            You Might Also Like
          </h3>
          <div className="text-center py-12 bg-gradient-to-r from-[#DE7C7D]/20 to-[#AF1740]/20 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
            <Package className="w-16 h-16 text-[#740938] dark:text-[#DE7C7D] mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              Related products coming soon!
            </p>
            <Link href="/marketplace">
              <Button className="mt-4 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full">
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
