"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  Star,
  ShoppingBag,
  CreditCard,
  Truck,
  Gift,
  Tag,
  AlertCircle,
  CheckCircle,
  Timer,
  Leaf,
  User,
} from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  seller: string
  location: string
  originalPrice: number
  discountedPrice: number
  discount: number
  quantity: number
  expiryHours: number
  category: string
  image: string
  urgent: boolean
  maxQuantity: number
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Artisan Sourdough Bread",
    seller: "Golden Crust Bakery",
    location: "Downtown",
    originalPrice: 8.99,
    discountedPrice: 3.99,
    discount: 56,
    quantity: 2,
    expiryHours: 4,
    category: "Baked Goods",
    image: "/placeholder.svg?height=120&width=120",
    urgent: true,
    maxQuantity: 5,
  },
  {
    id: "2",
    name: "Organic Greek Yogurt",
    seller: "Fresh Valley Farm",
    location: "Midtown",
    originalPrice: 6.5,
    discountedPrice: 2.99,
    discount: 54,
    quantity: 1,
    expiryHours: 24,
    category: "Dairy",
    image: "/placeholder.svg?height=120&width=120",
    urgent: false,
    maxQuantity: 3,
  },
  {
    id: "3",
    name: "Gourmet Chocolate Croissants",
    seller: "Patisserie Belle",
    location: "Downtown",
    originalPrice: 12.99,
    discountedPrice: 5.99,
    discount: 54,
    quantity: 1,
    expiryHours: 6,
    category: "Baked Goods",
    image: "/placeholder.svg?height=120&width=120",
    urgent: true,
    maxQuantity: 4,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) } : item)),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    // Mock promo code validation
    const validCodes = {
      SAVE10: 10,
      RESCUE20: 20,
      HERO15: 15,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({ code: promoCode, discount: validCodes[promoCode as keyof typeof validCodes] })
      setPromoCode("")
    }
  }

  const removePromoCode = () => {
    setAppliedPromo(null)
  }

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const totalSavings = originalTotal - subtotal
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const deliveryFee = subtotal > 25 ? 0 : 2.99
  const total = subtotal - promoDiscount + deliveryFee

  const urgentItems = cartItems.filter((item) => item.urgent)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/marketplace" className="flex items-center space-x-2 group">
                <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] transition-colors" />
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] transition-colors">
                  resQfood
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">
                <ShoppingBag className="w-3 h-3 mr-1" />
                Cart ({totalItems})
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
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
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-[#DE7C7D]/30 to-[#CC2B52]/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-16 h-16 text-[#740938]" />
            </div>
            <h2 className="text-3xl font-bold text-[#740938] mb-4">Your cart is empty</h2>
            <p className="text-gray-600 text-lg mb-8">Start rescuing food and making a difference!</p>
            <Link href="/marketplace">
              <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all">
                Browse Rescued Food
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#740938]">Your Rescue Cart</h1>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{totalItems} items</p>
                  <p className="text-lg font-semibold text-[#AF1740]">
                    Saving ${totalSavings.toFixed(2)} ({Math.round((totalSavings / originalTotal) * 100)}% off)
                  </p>
                </div>
              </div>

              {/* Urgent Items Alert */}
              {urgentItems.length > 0 && (
                <Card className="border-2 border-[#CC2B52]/50 rounded-2xl bg-gradient-to-r from-[#CC2B52]/10 to-white shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-[#CC2B52] rounded-full animate-pulse"></div>
                      <AlertCircle className="w-5 h-5 text-[#CC2B52]" />
                      <div>
                        <h3 className="font-bold text-[#CC2B52]">⚡ Urgent Items in Cart!</h3>
                        <p className="text-sm text-gray-700">
                          {urgentItems.length} item{urgentItems.length > 1 ? "s" : ""} expire
                          {urgentItems.length === 1 ? "s" : ""} soon. Complete your order quickly!
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`border-2 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                      item.urgent
                        ? "border-[#CC2B52]/50 bg-gradient-to-r from-[#CC2B52]/5 to-white"
                        : "border-[#DE7C7D]/30 bg-white"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-xl border border-[#DE7C7D]/30"
                          />
                          {item.urgent && (
                            <Badge className="absolute -top-2 -right-2 bg-[#CC2B52] text-white text-xs animate-pulse">
                              <Timer className="w-3 h-3 mr-1" />
                              {item.expiryHours}h
                            </Badge>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-[#740938] text-lg mb-1">{item.name}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">
                                  {item.seller} • {item.location}
                                </span>
                                <Badge variant="outline" className="text-[#740938] border-[#740938] text-xs">
                                  {item.category}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm font-medium">4.8</span>
                                  <span className="text-xs text-gray-500">(24)</span>
                                </div>
                                {item.urgent ? (
                                  <Badge className="bg-[#CC2B52] text-white text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    Expires in {item.expiryHours}h
                                  </Badge>
                                ) : (
                                  <Badge className="bg-[#740938] text-white text-xs">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {Math.floor(item.expiryHours / 24)}d left
                                  </Badge>
                                )}
                              </div>
                            </div>

                            {/* Remove Button */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-[#CC2B52] hover:bg-[#CC2B52]/10 p-2"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div>
                                <span className="text-2xl font-bold text-[#AF1740]">
                                  ${item.discountedPrice.toFixed(2)}
                                </span>
                                <span className="text-gray-500 line-through text-lg ml-2">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              </div>
                              <Badge className="bg-[#CC2B52] text-white font-bold">{item.discount}% OFF</Badge>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center border border-[#DE7C7D]/30 rounded-full">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="rounded-full p-2 hover:bg-[#DE7C7D]/20"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="px-4 py-2 font-semibold text-[#740938]">{item.quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="rounded-full p-2 hover:bg-[#DE7C7D]/20"
                                  disabled={item.quantity >= item.maxQuantity}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-[#740938]">
                                  ${(item.discountedPrice * item.quantity).toFixed(2)}
                                </div>
                                <div className="text-xs text-gray-500">Max: {item.maxQuantity} available</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Suggested Items */}
              <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-[#740938] flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    You might also like
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">More rescued items from your favorite sellers</p>
                    <Link href="/marketplace">
                      <Button
                        variant="outline"
                        className="mt-4 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                      >
                        Browse More Items
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle className="text-[#740938] flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div>
                    <div className="flex space-x-2 mb-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        className="border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg"
                      />
                      <Button
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                        className="bg-[#740938] hover:bg-[#AF1740] text-white rounded-lg px-4"
                      >
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-700">
                            {appliedPromo.code} ({appliedPromo.discount}% off)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removePromoCode}
                          className="text-green-700 hover:text-green-800 p-1 h-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-[#DE7C7D]/30" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>You're saving</span>
                      <span className="font-bold">-${totalSavings.toFixed(2)}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-green-600">
                        <span>Promo discount ({appliedPromo.discount}%)</span>
                        <span className="font-bold">-${promoDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Delivery fee
                        {subtotal > 25 && <span className="text-green-600 text-xs ml-1">(Free over $25)</span>}
                      </span>
                      <span className="font-medium">{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                  </div>

                  <Separator className="bg-[#DE7C7D]/30" />

                  <div className="flex justify-between text-lg font-bold text-[#740938]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Environmental Impact */}
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">Your Impact</span>
                    </div>
                    <div className="text-sm text-green-600 space-y-1">
                      <div>🌍 {(totalItems * 0.8).toFixed(1)}kg waste prevented</div>
                      <div>💧 {(totalItems * 12).toFixed(0)}L water saved</div>
                      <div>🌱 {(totalItems * 0.3).toFixed(1)}kg CO2 reduced</div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/payment">
                    <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  {/* Delivery Info */}
                  <div className="text-center text-sm text-gray-600 space-y-1">
                    <div className="flex items-center justify-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>Free delivery over $25</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Secure checkout</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
