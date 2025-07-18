"use client";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { ArrowLeft, ShoppingBag, Bell } from "lucide-react"; // Removed Heart
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/notification-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";

export function ProfileHeader() {
  return (
    <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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
              Profile
            </Badge>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Notification: Link for mobile, Dropdown for desktop */}
            <div className="md:hidden">
              <Link href="/notifications">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
                </Button>
              </Link>
            </div>
            <div className="hidden md:block">
              <NotificationDropdown />
            </div>
            {/* Cart: Always just the logo */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
              </Button>
            </Link>
            {/* Browse Food: Logo for mobile, text for desktop */}
            <Link href="/marketplace">
              <Button
                variant="outline"
                className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full dark:border-rose-400 dark:text-rose-400 dark:hover:bg-rose-400 dark:hover:text-white"
              >
                <span className="md:hidden">
                  <ShoppingBag className="w-5 h-5" />
                </span>
                <span className="hidden md:block">Browse Food</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
