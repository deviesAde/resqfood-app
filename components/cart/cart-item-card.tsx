"use client";
import { useState, useEffect } from "react"; // Import useState and useEffect
import Image from "next/image";
import { Clock, MapPin, Minus, Plus, Star, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

interface CartItemCardProps {
  item: CartItem;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}

export function CartItemCard({
  item,
  updateQuantity,
  removeItem,
}: CartItemCardProps) {
  const [isMounted, setIsMounted] = useState(false); // State to track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
  }, []);

  // Helper function for conditional formatting
  const formatRupiah = (amount: number) => {
    return isMounted ? `Rp${amount.toLocaleString("id-ID")}` : "Rp0"; // Render placeholder if not mounted
  };

  return (
    <Card
      className={`border-2 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
        item.urgent
          ? "border-[#CC2B52]/50 bg-gradient-to-r from-[#CC2B52]/5 to-white dark:border-[#FF4D6D]/50 dark:bg-gradient-to-r dark:from-[#FF4D6D]/10 dark:to-gray-800"
          : "border-[#DE7C7D]/30 bg-white dark:border-gray-700 dark:bg-gray-800"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Product Image */}
          <div className="relative flex-shrink-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={96}
              height={96}
              className="w-24 h-24 object-cover rounded-xl border border-[#DE7C7D]/30 dark:border-gray-700"
            />
            {item.urgent && (
              <Badge className="absolute -top-2 -right-2 bg-[#CC2B52] text-white text-xs animate-pulse dark:bg-[#FF4D6D]">
                <Clock className="w-3 h-3 mr-1" />
                {item.expiryHours}j
              </Badge>
            )}
          </div>
          {/* Product Details */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-[#740938] text-lg mb-1 dark:text-[#FFC0CB]">
                  {item.name}
                </h3>
                <div className="flex flex-wrap items-center space-x-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.seller} • {item.location}
                  </span>
                  <Badge
                    variant="outline"
                    className="text-[#740938] border-[#740938] text-xs dark:text-[#FFC0CB] dark:border-[#FFC0CB]"
                  >
                    {item.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      4.8
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      (24)
                    </span>
                  </div>
                  {item.urgent ? (
                    <Badge className="bg-[#CC2B52] text-white text-xs dark:bg-[#FF4D6D]">
                      <Clock className="w-3 h-3 mr-1" />
                      Kedaluwarsa dalam {item.expiryHours}j
                    </Badge>
                  ) : (
                    <Badge className="bg-[#740938] text-white text-xs dark:bg-[#CC2B52]">
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor(item.expiryHours / 24)}h tersisa
                    </Badge>
                  )}
                </div>
              </div>
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-[#CC2B52] hover:bg-[#CC2B52]/10 p-2 dark:text-gray-500 dark:hover:text-[#FF4D6D] dark:hover:bg-[#FF4D6D]/20 flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            {/* Price and Quantity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-2">
              <div className="flex items-center space-x-3">
                <div>
                  <span className="text-2xl font-bold text-[#AF1740] dark:text-[#FF4D6D]">
                    {formatRupiah(item.discountedPrice)}
                  </span>
                  <span className="text-gray-500 line-through text-lg ml-2 dark:text-gray-400">
                    {formatRupiah(item.originalPrice)}
                  </span>
                </div>
                <Badge className="bg-[#CC2B52] text-white font-bold dark:bg-[#FF4D6D]">
                  {item.discount}% DISKON
                </Badge>
              </div>
              {/* Quantity Controls */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center border-[#DE7C7D]/30 rounded-full dark:border-gray-700">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="rounded-full p-2 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-700"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                  <span className="px-4 py-2 font-semibold text-[#740938] dark:text-[#FFC0CB]">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="rounded-full p-2 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-700"
                    disabled={item.quantity >= item.maxQuantity}
                  >
                    <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  </Button>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#740938] dark:text-[#FFC0CB]">
                    {formatRupiah(item.discountedPrice * item.quantity)}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Maks: {item.maxQuantity} tersedia
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
