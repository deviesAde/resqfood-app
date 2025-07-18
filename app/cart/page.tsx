"use client";

import { useState } from "react";
import { CartNavigation } from "@/components/cart/cart-navigation";
import { EmptyCartState } from "@/components/cart/empty-cart-state";
import { UrgentItemsAlert } from "@/components/cart/urgent-items-alert";
import { CartItemCard } from "@/components/cart/cart-item-card";
import { SuggestedItems } from "@/components/cart/suggested-items";
import { OrderSummary } from "@/components/cart/order-summary";
import { ShoppingCart } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  seller: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  expiryHours: number;
  category: string;
  image: string;
  urgent: boolean;
  maxQuantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Roti Gandum Artisan",
    seller: "Toko Roti Emas",
    location: "Jakarta Pusat",
    originalPrice: 89900,
    discountedPrice: 39900,
    discount: 56,
    quantity: 2,
    expiryHours: 4,
    category: "Roti & Kue",
    image: "/placeholder.svg?height=120&width=120",
    urgent: true,
    maxQuantity: 5,
  },
  {
    id: "2",
    name: "Yogurt Yunani Organik",
    seller: "Peternakan Lembah Segar",
    location: "Bandung",
    originalPrice: 65000,
    discountedPrice: 29900,
    discount: 54,
    quantity: 1,
    expiryHours: 24,
    category: "Produk Susu",
    image: "/placeholder.svg?height=120&width=120",
    urgent: false,
    maxQuantity: 3,
  },
  {
    id: "3",
    name: "Kroisan Cokelat Gourmet",
    seller: "Patisserie Indah",
    location: "Jakarta Selatan",
    originalPrice: 129900,
    discountedPrice: 59900,
    discount: 54,
    quantity: 1,
    expiryHours: 6,
    category: "Roti & Kue",
    image: "/placeholder.svg?height=120&width=120",
    urgent: true,
    maxQuantity: 4,
  },
  {
    id: "4",
    name: "Biji Kopi Premium",
    seller: "Master Roaster Kopi",
    location: "Surabaya",
    originalPrice: 249900,
    discountedPrice: 129900,
    discount: 48,
    quantity: 1,
    expiryHours: 168,
    category: "Minuman",
    image: "/placeholder.svg?height=120&width=120",
    urgent: false,
    maxQuantity: 10,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    const validCodes: { [key: string]: number } = {
      HEMAT10: 10,
      SELAMATKAN20: 20,
      PAHLAWAN15: 15,
    };
    if (validCodes[promoCode.toUpperCase()]) {
      setAppliedPromo({
        code: promoCode.toUpperCase(),
        discount: validCodes[promoCode.toUpperCase()],
      });
      setPromoCode("");
    } else {
      setAppliedPromo(null); // Clear if invalid
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSavings = originalTotal - subtotal;

  const promoDiscount = appliedPromo
    ? (subtotal * appliedPromo.discount) / 100
    : 0;
  const deliveryFee = subtotal > 250000 ? 0 : 15000; // Free delivery if subtotal > Rp250.000
  const total = subtotal - promoDiscount + deliveryFee;

  const urgentItems = cartItems.filter((item) => item.urgent);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <CartNavigation totalItems={totalItems} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h1 className="text-3xl font-bold text-[#740938] dark:text-[#FFC0CB] flex items-center">
                  <ShoppingCart className="w-8 h-8 mr-3" />
                  Keranjang Penyelamatan Anda
                </h1>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {totalItems} item
                  </p>
                  <p className="text-lg font-semibold text-[#AF1740] dark:text-[#FF4D6D]">
                    Hemat Rp{totalSavings.toLocaleString("id-ID")} (
                    {Math.round((totalSavings / originalTotal) * 100)}% diskon)
                  </p>
                </div>
              </div>
              {/* Urgent Items Alert */}
              {urgentItems.length > 0 && (
                <UrgentItemsAlert urgentItemsCount={urgentItems.length} />
              )}
              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                ))}
              </div>
              {/* Suggested Items */}
              <SuggestedItems />
            </div>
            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <OrderSummary
                subtotal={subtotal}
                originalTotal={originalTotal}
                totalSavings={totalSavings}
                promoCode={promoCode}
                setPromoCode={setPromoCode}
                applyPromoCode={applyPromoCode}
                appliedPromo={appliedPromo}
                removePromoCode={removePromoCode}
                deliveryFee={deliveryFee}
                total={total}
                totalItems={totalItems}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
