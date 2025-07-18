"use client";

import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UrgentItemsAlertProps {
  urgentItemsCount: number;
}

export function UrgentItemsAlert({ urgentItemsCount }: UrgentItemsAlertProps) {
  const s = urgentItemsCount === 1 ? "" : "s";
  return (
    <Card className="border-2 border-[#CC2B52]/50 rounded-2xl bg-gradient-to-r from-[#CC2B52]/10 to-white shadow-lg dark:border-[#FF4D6D]/50 dark:bg-gradient-to-r dark:from-[#FF4D6D]/20 dark:to-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#CC2B52] rounded-full animate-pulse dark:bg-[#FF4D6D]"></div>
          <AlertCircle className="w-5 h-5 text-[#CC2B52] dark:text-[#FF4D6D]" />
          <div>
            <h3 className="font-bold text-[#CC2B52] dark:text-[#FF4D6D]">
               Item {urgentItemsCount} Memasuki Batas!
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {urgentItemsCount} item{s} dalam keranjang Anda akan segera kedaluwarsa. Segera checkout sebelum kehabisan!
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Jangan lupa untuk melakukan checkout sebelum kehabisan, agar Anda dapat membeli produk yang Anda inginkan
             
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
