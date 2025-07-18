"use client";

import { Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryOptionsProps {
  deliveryOption: string;
  setDeliveryOption: (option: string) => void;
  subtotal: number;
  formatRupiah: (amount: number) => string;
}

export function DeliveryOptions({
  deliveryOption,
  setDeliveryOption,
  subtotal,
}: DeliveryOptionsProps) {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-[#DE7C7D] flex items-center text-lg sm:text-xl">
          <Truck className="w-5 h-5 mr-2" />
          Opsi Pengiriman
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            onClick={() => setDeliveryOption("pickup")}
            className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
              deliveryOption === "pickup"
                ? "border-[#AF1740] bg-[#AF1740]/10 dark:bg-[#740938]/20"
                : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50 dark:border-gray-700 dark:hover:border-[#CC2B52]/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  deliveryOption === "pickup"
                    ? "border-[#AF1740] bg-[#AF1740]"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              ></div>
              <div>
                <h3 className="font-semibold text-[#740938] dark:text-[#DE7C7D] text-base sm:text-lg">
                  Ambil Sendiri
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Di toko dalam 30 menit
                </p>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  FREE
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => setDeliveryOption("delivery")}
            className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
              deliveryOption === "delivery"
                ? "border-[#AF1740] bg-[#AF1740]/10 dark:bg-[#740938]/20"
                : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50 dark:border-gray-700 dark:hover:border-[#CC2B52]/50"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  deliveryOption === "delivery"
                    ? "border-[#AF1740] bg-[#AF1740]"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              ></div>
              <div>
                <h3 className="font-semibold text-[#740938] dark:text-[#DE7C7D] text-base sm:text-lg">
                  Pengiriman
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  Diantar ke alamat Anda 1-2 Jam jika jarak tidak lebih dari 5km
                </p>
                <p className="text-sm font-medium text-[#AF1740] dark:text-[#CC2B52]">
                  {subtotal > 25 ? "FREE" : "$2.99"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
