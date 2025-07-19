"use client";

import { Button } from "@/components/ui/button";
import { Heart, Users, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CallToActionBanner() {
  return (
    <div className="mt-12 sm:mt-16 relative rounded-3xl overflow-hidden text-center shadow-xl">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/landing/hero.jpg" // Replace with your actual image path
          alt="Food waste crisis"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/85 via-[#AF1740]/75 to-[#CC2B52]/65"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8 text-white">
        <div className="max-w-2xl mx-auto">
          <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-[#DE7C7D]" />
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Bergabunglah dengan Gerakan Penyelamatan Makanan
          </h3>
          <p className="text-[#DE7C7D] mb-4 sm:mb-6 text-base sm:text-lg">
            Setiap tahun, jutaan ton makanan terbuang sia-sia. Dengan resQfood,
            Anda dapat membantu mengurangi limbah makanan dan mendapatkan
            penawaran terbaik pada produk berkualitas.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          

            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-6 sm:px-8 font-semibold bg-transparent text-sm sm:text-base"
            >
              <Link href="/artikel">
                <ChevronDown className="w-4 h-4 mr-2" />
                Baca Selengkapnya
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
