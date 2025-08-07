"use client";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { ArrowLeft, ShoppingBag, User } from "lucide-react"; // Removed Heart
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartNavigationProps {
  totalItems: number;
}

export function CartNavigation({ totalItems }: CartNavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              href="/marketplace"
              className="flex items-center space-x-2 group"
            >
              <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] transition-colors dark:text-[#FFC0CB] dark:group-hover:text-[#FF4D6D]" />
              
              <Image
                src="/logo/logo.png"
                alt="resQfood Logo"
                width={32} 
                height={32} // Adjust height as needed
                className="rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] transition-colors dark:text-[#FFC0CB] dark:group-hover:text-[#FF4D6D]">
                resQfood
              </span>
            </Link>
            <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2 dark:from-[#FF4D6D] dark:to-[#CC2B52]">
              <ShoppingBag className="w-3 h-3 mr-1" />
              Keranjang ({totalItems})
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant="outline"
                className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full dark:border-[#FFC0CB] dark:text-[#FFC0CB] dark:hover:bg-[#FFC0CB] dark:hover:text-gray-900"
              >
                Lanjutkan Belanja
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
