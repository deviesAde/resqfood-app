"use client";
import { useState, useEffect } from "react"; // Import useState and useEffect
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, CreditCard, Leaf, Truck, Trash2 } from "lucide-react";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  originalTotal: number;
  totalSavings: number;
  promoCode: string;
  setPromoCode: (code: string) => void;
  applyPromoCode: () => void;
  appliedPromo: { code: string; discount: number } | null;
  removePromoCode: () => void;
  deliveryFee: number;
  total: number;
  totalItems: number;
}

export function OrderSummary({
  subtotal,
  originalTotal,
  totalSavings,
  promoCode,
  setPromoCode,
  applyPromoCode,
  appliedPromo,
  removePromoCode,
  deliveryFee,
  total,
  totalItems,
}: OrderSummaryProps) {
  const [isMounted, setIsMounted] = useState(false); // State to track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
  }, []);

  // Helper function for conditional formatting
  const formatRupiah = (amount: number) => {
    return isMounted ? `Rp${amount.toLocaleString("id-ID")}` : "Rp0"; // Render placeholder if not mounted
  };

  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg sticky top-24 dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center dark:text-[#FFC0CB]">
          <CreditCard className="w-5 h-5 mr-2" />
          Ringkasan Pesanan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Promo Code */}
        <div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-2">
            <Input
              placeholder="Masukkan kode promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              className="flex-1 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-lg dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:focus:border-[#FF4D6D]"
            />
            <Button
              onClick={applyPromoCode}
              disabled={!promoCode}
              className="bg-[#740938] hover:bg-[#AF1740] text-white rounded-lg px-4 dark:bg-[#CC2B52] dark:hover:bg-[#FF4D6D]"
            >
              Terapkan
            </Button>
          </div>
          {appliedPromo && (
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200 dark:bg-green-950 dark:border-green-800">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {appliedPromo.code} ({appliedPromo.discount}% diskon)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removePromoCode}
                className="text-green-700 hover:text-green-800 p-1 h-auto dark:text-green-300 dark:hover:text-green-400"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
        <Separator className="bg-[#DE7C7D]/30 dark:bg-gray-700" />
        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Subtotal ({totalItems} item)
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {formatRupiah(subtotal)}
            </span>
          </div>
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Anda menghemat</span>
            <span className="font-bold">-{formatRupiah(totalSavings)}</span>
          </div>
          {appliedPromo && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Diskon promo ({appliedPromo.discount}%)</span>
              <span className="font-bold">
                -{formatRupiah((appliedPromo.discount * subtotal) / 100)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Biaya Pengiriman{" "}
              {subtotal > 250000 && (
                <span className="text-green-600 text-xs ml-1 dark:text-green-400">
                  (Gratis di atas Rp250.000)
                </span>
              )}
            </span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              {deliveryFee === 0 ? "GRATIS" : formatRupiah(deliveryFee)}
            </span>
          </div>
        </div>
        <Separator className="bg-[#DE7C7D]/30 dark:bg-gray-700" />
        <div className="flex justify-between text-lg font-bold text-[#740938] dark:text-[#FFC0CB]">
          <span>Total</span>
          <span>{formatRupiah(total)}</span>
        </div>
        {/* Environmental Impact */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 dark:bg-gradient-to-r dark:from-green-950 dark:to-emerald-950 dark:border-green-800">
          <div className="flex items-center space-x-2 mb-2">
            <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="font-semibold text-green-700 dark:text-green-300">
              Dampak Anda
            </span>
          </div>
          <div className="text-sm text-green-600 space-y-1 dark:text-green-400">
            <div>🌍 {(totalItems * 0.8).toFixed(1)}kg sampah dicegah</div>
            <div>💧 {(totalItems * 12).toFixed(0)}L air dihemat</div>
            <div>🌱 {(totalItems * 0.3).toFixed(1)}kg CO2 dikurangi</div>
          </div>
        </div>
        {/* Checkout Button */}
        <Link href="/payment">
          <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-2xl h-12 font-semibold shadow-lg hover:shadow-xl transition-all dark:from-[#FF4D6D] dark:to-[#CC2B52] dark:hover:from-[#CC2B52] dark:hover:to-[#FF4D6D]">
            <CreditCard className="w-4 h-4 mr-2" />
            Lanjutkan ke Pembayaran
          </Button>
        </Link>
        {/* Delivery Info */}
        <div className="text-center text-sm text-gray-600 space-y-1 dark:text-gray-400">
          <div className="flex items-center justify-center space-x-1">
            <Truck className="w-4 h-4" />
            <span>Pengiriman gratis di atas Rp250.000</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
            <span>Pembayaran aman</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
