"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SuggestedItems() {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center dark:text-[#FFC0CB]">
          <Heart className="w-5 h-5 mr-2" />
          Kamu Mungkin Suka Ini
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-8">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3 dark:text-gray-600" />
          <p className="text-gray-500 dark:text-gray-400">
            Explore Produk Lainnya di Marketplace Kami
          </p>
          <Link href="/marketplace">
            <Button
              variant="outline"
              className="mt-4 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full dark:border-[#FFC0CB] dark:text-[#FFC0CB] dark:hover:bg-[#FFC0CB] dark:hover:text-gray-900"
            >
              Cari Produk Lainnya
              <ShoppingBag className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
