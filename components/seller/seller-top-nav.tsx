"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Menu,
  Search,
  Bell,
  ShoppingBag,
  User,
  Moon,
  Sun,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

import { ArrowLeft } from "lucide-react";

interface SellerTopNavProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export default function SellerTopNav({
  sidebarCollapsed,
  setSidebarCollapsed,
}: SellerTopNavProps) {
  const { theme, setTheme } = useTheme();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-14 lg:h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-1 min-w-0">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] transition-colors dark:text-rose-300 dark:group-hover:text-rose-400" />
                {/* Replaced Heart icon with Image component */}
                <Image
                  src="/logo/logo.png"
                  alt="resQfood Logo"
                  width={32} // Adjust width as needed
                  height={32} // Adjust height as needed
                  className="rounded-lg group-hover:scale-105 transition-transform"
                />
                <span className="text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] transition-colors dark:text-rose-300 dark:group-hover:text-rose-400">
                  resQfood
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">
                Profil Toko
              </Badge>
            </div>
          </div>

          {/* Center Section - Search (Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari..."
                className="pl-10 w-full rounded-full border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 shrink-0">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-1 sm:p-2"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative p-1 sm:p-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-[#CC2B52] rounded-full"></span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1 sm:p-2"
            >
              <Sun className="h-4 w-4 sm:h-5 sm:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 sm:h-5 sm:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#740938] dark:border-[#AF1740] text-[#740938] dark:text-[#AF1740] hover:bg-[#740938] hover:text-white bg-transparent rounded-full text-sm hidden lg:inline-flex"
                >
                  Lihat Marketplace
                </Button>
              </Link>

              <Link href="/">
                <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full shadow-lg text-sm px-3 lg:px-4">
                  Kembali ke Situs
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-1 sm:p-2">
                    <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/cart" className="flex items-center">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Keranjang
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace" className="flex items-center">
                      Lihat Marketplace
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/" className="flex items-center">
                      Kembali ke Situs
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="lg:hidden pb-3 px-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari produk..."
                className="pl-10 w-full rounded-full border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-700"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
