"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NotificationDropdown } from "@/components/notification-dropdown"
import {
  Heart,
  ArrowLeft,
  CreditCard,
  Shield,
  Lock,
  CheckCircle,
  Clock,
  MapPin,
  Truck,
  Leaf,
  Star,
  AlertCircle,
  Apple,
  Smartphone,
  Wallet,
  Plus,
  Edit,
  Trash2,
  ShoppingBag,
  X,
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
}

const cartItems: CartItem[] = [
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
    image: "/placeholder.svg?height=80&width=80",
    urgent: true,
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
    image: "/placeholder.svg?height=80&width=80",
    urgent: false,
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
    image: "/placeholder.svg?height=80&width=80",
    urgent: true,
  },
]

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Visa, Mastercard, American Express",
    popular: true,
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: <Apple className="w-6 h-6" />,
    description: "Pay with Touch ID or Face ID",
    popular: false,
  },
  {
    id: "google",
    name: "Google Pay",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Quick and secure payments",
    popular: false,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <Wallet className="w-6 h-6" />,
    description: "Pay with your PayPal account",
    popular: false,
  },
]

const savedCards = [
  {
    id: "1",
    type: "visa",
    last4: "4242",
    expiry: "12/26",
    name: "Sarah Johnson",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    last4: "8888",
    expiry: "09/25",
    name: "Sarah Johnson",
    isDefault: false,
  },
]

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card")
  const [selectedCard, setSelectedCard] = useState("1")
  const [showNewCardForm, setShowNewCardForm] = useState(false)
  const [deliveryOption, setDeliveryOption] = useState("pickup")
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [billingAddress, setBillingAddress] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
  })
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0)
  const originalTotal = cartItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const totalSavings = originalTotal - subtotal
  const promoDiscount = appliedPromo ? (subtotal * appliedPromo.discount) / 100 : 0
  const deliveryFee = deliveryOption === "delivery" ? (subtotal > 25 ? 0 : 2.99) : 0
  const processingFee = 0.99
  const total = subtotal - promoDiscount + deliveryFee + processingFee

  const urgentItems = cartItems.filter((item) => item.urgent)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const applyPromoCode = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="flex items-center space-x-2 group">
                <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] transition-colors" />
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] transition-colors">
                  resQfood
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">
                <Shield className="w-3 h-3 mr-1" />
                Secure Checkout
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationDropdown />
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold text-[#740938] mb-2">Secure Checkout</h1>
              <p className="text-gray-600">Complete your food rescue order</p>
            </div>

            {/* Urgent Items Alert */}
            {urgentItems.length > 0 && (
              <Card className="border-2 border-[#CC2B52]/50 rounded-2xl bg-gradient-to-r from-[#CC2B52]/10 to-white shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#CC2B52] rounded-full animate-pulse"></div>
                    <AlertCircle className="w-5 h-5 text-[#CC2B52]" />
                    <div>
                      <h3 className="font-bold text-[#CC2B52]">⚡ Urgent Items in Order!</h3>
                      <p className="text-sm text-gray-700">
                        {urgentItems.length} item{urgentItems.length > 1 ? "s" : ""} expire soon. Complete payment
                        quickly to secure your rescue!
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Delivery Options */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#740938] flex items-center">
                  <Truck className="w-5 h-5 mr-2" />
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setDeliveryOption("pickup")}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      deliveryOption === "pickup"
                        ? "border-[#AF1740] bg-[#AF1740]/10"
                        : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          deliveryOption === "pickup" ? "border-[#AF1740] bg-[#AF1740]" : "border-gray-300"
                        }`}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-[#740938]">Store Pickup</h3>
                        <p className="text-sm text-gray-600">Ready in 15-30 minutes</p>
                        <p className="text-sm font-medium text-green-600">FREE</p>
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => setDeliveryOption("delivery")}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      deliveryOption === "delivery"
                        ? "border-[#AF1740] bg-[#AF1740]/10"
                        : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          deliveryOption === "delivery" ? "border-[#AF1740] bg-[#AF1740]" : "border-gray-300"
                        }`}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-[#740938]">Home Delivery</h3>
                        <p className="text-sm text-gray-600">Within 1-2 hours</p>
                        <p className="text-sm font-medium text-[#AF1740]">{subtotal > 25 ? "FREE" : "$2.99"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#740938] flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Payment Method Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all relative ${
                        selectedPaymentMethod === method.id
                          ? "border-[#AF1740] bg-[#AF1740]/10"
                          : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50"
                      }`}
                    >
                      {method.popular && (
                        <Badge className="absolute -top-2 left-4 bg-[#CC2B52] text-white text-xs">Popular</Badge>
                      )}
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            selectedPaymentMethod === method.id ? "border-[#AF1740] bg-[#AF1740]" : "border-gray-300"
                          }`}
                        ></div>
                        <div className="text-[#740938]">{method.icon}</div>
                        <div>
                          <h3 className="font-semibold text-[#740938]">{method.name}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Payment Form */}
                {selectedPaymentMethod === "card" && (
                  <div className="space-y-6">
                    {/* Saved Cards */}
                    {savedCards.length > 0 && !showNewCardForm && (
                      <div>
                        <h4 className="font-semibold text-[#740938] mb-4">Saved Cards</h4>
                        <div className="space-y-3">
                          {savedCards.map((card) => (
                            <div
                              key={card.id}
                              onClick={() => setSelectedCard(card.id)}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                                selectedCard === card.id
                                  ? "border-[#AF1740] bg-[#AF1740]/10"
                                  : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 ${
                                      selectedCard === card.id ? "border-[#AF1740] bg-[#AF1740]" : "border-gray-300"
                                    }`}
                                  ></div>
                                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                                    <CreditCard className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-[#740938]">•••• •••• •••• {card.last4}</div>
                                    <div className="text-sm text-gray-600">
                                      {card.name} • Expires {card.expiry}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {card.isDefault && <Badge className="bg-green-500 text-white text-xs">Default</Badge>}
                                  <Button variant="ghost" size="sm" className="p-1">
                                    <Edit className="w-4 h-4 text-gray-400" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button
                          onClick={() => setShowNewCardForm(true)}
                          variant="outline"
                          className="w-full mt-4 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add New Card
                        </Button>
                      </div>
                    )}

                    {/* New Card Form */}
                    {(showNewCardForm || savedCards.length === 0) && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-[#740938]">
                            {savedCards.length > 0 ? "Add New Card" : "Card Information"}
                          </h4>
                          {savedCards.length > 0 && (
                            <Button
                              onClick={() => setShowNewCardForm(false)}
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Label htmlFor="cardNumber" className="text-[#740938] font-semibold">
                              Card Number
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={newCard.number}
                              onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiry" className="text-[#740938] font-semibold">
                              Expiry Date
                            </Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={newCard.expiry}
                              onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv" className="text-[#740938] font-semibold">
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={newCard.cvv}
                              onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="cardName" className="text-[#740938] font-semibold">
                              Cardholder Name
                            </Label>
                            <Input
                              id="cardName"
                              placeholder="Sarah Johnson"
                              value={newCard.name}
                              onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Alternative Payment Methods */}
                {selectedPaymentMethod !== "card" && (
                  <div className="p-6 bg-gradient-to-r from-[#DE7C7D]/10 to-white rounded-xl border border-[#DE7C7D]/30">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto mb-4">
                        {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.icon}
                      </div>
                      <h3 className="font-semibold text-[#740938] mb-2">
                        {paymentMethods.find((m) => m.id === selectedPaymentMethod)?.name}
                      </h3>
                      <p className="text-gray-600 text-sm">You'll be redirected to complete your payment securely</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#740938] flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-[#740938] font-semibold">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={billingAddress.firstName}
                      onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-[#740938] font-semibold">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={billingAddress.lastName}
                      onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#740938] font-semibold">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={billingAddress.email}
                      onChange={(e) => setBillingAddress({ ...billingAddress, email: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#740938] font-semibold">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={billingAddress.phone}
                      onChange={(e) => setBillingAddress({ ...billingAddress, phone: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-[#740938] font-semibold">
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={billingAddress.address}
                      onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city" className="text-[#740938] font-semibold">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-[#740938] font-semibold">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={billingAddress.state}
                      onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-[#740938] font-semibold">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={billingAddress.zipCode}
                      onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                    />
                  </div>
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
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover border border-[#DE7C7D]/30"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#740938] text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.seller}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                          {item.urgent && (
                            <Badge className="bg-[#CC2B52] text-white text-xs">
                              <Clock className="w-2 h-2 mr-1" />
                              {item.expiryHours}h
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#AF1740] text-sm">
                          ${(item.discountedPrice * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-gray-500 line-through">
                          ${(item.originalPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-[#DE7C7D]/30" />

                {/* Promo Code */}
                <div>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg text-sm"
                    />
                    <Button
                      onClick={applyPromoCode}
                      disabled={!promoCode}
                      size="sm"
                      className="bg-[#740938] hover:bg-[#AF1740] text-white rounded-lg px-3"
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
                <div className="space-y-3 text-sm">
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
                      {deliveryOption === "pickup" ? "Pickup" : "Delivery"}
                      {deliveryOption === "delivery" && subtotal > 25 && (
                        <span className="text-green-600 text-xs ml-1">(Free over $25)</span>
                      )}
                    </span>
                    <span className="font-medium">{deliveryFee === 0 ? "FREE" : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing fee</span>
                    <span className="font-medium">${processingFee.toFixed(2)}</span>
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

                {/* Complete Order Button */}
                <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all">
                  <Shield className="w-4 h-4 mr-2" />
                  Complete Secure Order
                </Button>

                {/* Security Info */}
                <div className="text-center text-sm text-gray-600 space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    <Lock className="w-4 h-4" />
                    <span>256-bit SSL encryption</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>PCI DSS compliant</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#740938] mb-3 text-center">Trusted & Secure</h3>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-6 h-6 text-green-500 mx-auto mb-1" />
                    <div className="text-xs font-medium">SSL Secure</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                    <div className="text-xs font-medium">Verified</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Heart className="w-6 h-6 text-[#AF1740] mx-auto mb-1" />
                    <div className="text-xs font-medium">2.8K+ Happy</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                    <div className="text-xs font-medium">4.9 Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52] text-white">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">Need Help?</h3>
                <p className="text-[#DE7C7D] text-sm mb-3">Our support team is here to help with your order</p>
                <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-4 py-2 text-sm font-semibold shadow-lg w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
