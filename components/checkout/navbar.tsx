import Link from "next/link";
import { ArrowLeft, Heart, Lock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/notification-dropdown";
import Image from "next/image"; // Import Image component

export function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/cart" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] dark:text-[#DE7C7D] dark:group-hover:text-[#CC2B52] transition-colors" />
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                 <Image
                       src="/logo/logo.png"
                       alt="resQfood Logo"
                       width={32} 
                        height={32} 
                        className="rounded-lg group-hover:scale-105 transition-transform"
                              />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] dark:text-[#DE7C7D] dark:group-hover:text-[#CC2B52] transition-colors">
                resQfood
              </span>
            </Link>
            <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white text-xs sm:text-sm ml-1 sm:ml-2 px-2 py-1">
              <Shield className="w-3 h-3 mr-1" />
           Amankan Pembayaran Anda
            </Badge>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <NotificationDropdown />
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
             
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
