"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCartState() {
  return (
    <div className="text-center py-16">
      <div className="w-32 h-32 bg-gradient-to-br from-[#DE7C7D]/30 to-[#CC2B52]/30 rounded-full flex items-center justify-center mx-auto mb-6 dark:from-gray-700 dark:to-gray-600">
        <ShoppingBag className="w-16 h-16 text-[#740938] dark:text-[#FFC0CB]" />
      </div>
      <h2 className="text-3xl font-bold text-[#740938] mb-4 dark:text-[#FFC0CB]">
        Keranjang Belanja Kosong
      </h2>
      <p className="text-gray-600 text-lg mb-8 dark:text-gray-400">
        Sepertinya Anda belum menambahkan produk apa pun ke keranjang belanja Anda.
      </p>
      <Link href="/marketplace">
        <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all dark:from-[#FF4D6D] dark:to-[#CC2B52] dark:hover:from-[#CC2B52] dark:hover:to-[#FF4D6D]">
            Browse Marketplace
        </Button>
      </Link>
    </div>
  );
}
