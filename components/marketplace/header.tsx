"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowLeft,
  Menu,
  Bell,
  User,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { NotificationDropdown } from "@/components/notification-dropdown";
import { UserMenu } from "@/components/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function Header({ searchTerm, setSearchTerm }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const unreadNotificationCount = 2;
  const cartItemCount = 3;
  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section: Logo and Back Button */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <ArrowLeft className="w-5 h-5 text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors" />
              <Image
                src="/logo/logo.png"
                alt="resQfood Logo"
                width={32}
                height={32}
                className="rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors">
                resQfood
              </span>
            </Link>
            <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2 text-xs sm:text-sm">
              Marketplace
            </Badge>
          </div>
          {/* Center Search Bar (Hidden on small screens, visible on md and up) */}
          <div className="flex-1 max-w-2xl mx-4 sm:mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for rescued food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-12 h-12 rounded-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-800/50 text-lg shadow-sm w-full"
              />
              {/* Desktop Search Button with icon */}
              <Button
                size="icon" // Make it an icon button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full w-8 h-8" // Adjusted size
              >
                <Search className="w-4 h-4" /> {/* Magnifying glass icon */}
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </div>
          {/* Right Section: Desktop Navigation / Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Navigation (Hidden on md and down, visible on md and up) */}
            <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
              <NotificationDropdown
                notifications={[]}
                onNotificationRead={() => {}}
                onNotificationDismiss={() => {}}
              />
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC2B52] text-white text-xs rounded-full flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
              <UserMenu cartItemCount={cartItemCount} />
              <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-4 sm:px-6 shadow-lg text-sm sm:text-base">
                <Link href="/auth/register">Become Seller</Link>
              </Button>
              <ThemeToggle />
            </div>
            {/* Mobile Menu Trigger (Visible on md and down) */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6 text-[#740938] dark:text-[#DE7C7D]" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[250px] sm:w-[300px] bg-white dark:bg-gray-900 p-4"
              >
                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                <div className="flex flex-col items-start space-y-6 pt-8">
                  {/* Mobile Search Bar inside Sheet */}
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-10 h-10 rounded-full border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-800/50 text-sm w-full"
                    />
                    {/* Mobile Search Button with icon */}
                    <Button
                      size="icon" // Make it an icon button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full w-7 h-7" // Adjusted size
                    >
                      <Search className="w-4 h-4" />{" "}
                      {/* Magnifying glass icon */}
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                  {/* Notifications Link with Badge */}
                  <Link
                    href="/notifications"
                    className="flex items-center w-full text-gray-700 dark:text-gray-300 hover:text-[#740938] dark:hover:text-[#DE7C7D] transition-colors text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Bell className="w-5 h-5 mr-3" />
                    Notifications
                    {unreadNotificationCount > 0 && (
                      <Badge className="ml-auto bg-[#CC2B52] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-4 flex items-center justify-center animate-pulse">
                        {unreadNotificationCount > 9
                          ? "9+"
                          : unreadNotificationCount}
                      </Badge>
                    )}
                  </Link>
                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    className="flex items-center w-full text-gray-700 dark:text-gray-300 hover:text-[#740938] dark:hover:text-[#DE7C7D] transition-colors text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5 mr-3" />
                    Profile
                  </Link>
                  {/* Cart Link (already present in mobile menu) */}
                  <Link
                    href="/cart"
                    className="flex items-center w-full text-gray-700 dark:text-gray-300 hover:text-[#740938] dark:hover:text-[#DE7C7D] transition-colors text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="w-5 h-5 mr-3" />
                    Cart
                    {cartItemCount > 0 && (
                      <Badge className="ml-auto bg-[#CC2B52] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-4 flex items-center justify-center animate-pulse">
                        {cartItemCount > 9 ? "9+" : cartItemCount}
                      </Badge>
                    )}
                  </Link>
                  {/* Logout Button */}
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-700 dark:text-gray-300 hover:text-[#740938] dark:hover:text-[#DE7C7D] transition-colors text-base font-medium"
                    onClick={() => {
                      // Handle logout logic here
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Log out
                  </Button>
                  {/* Become Seller Button */}
                  <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg text-base">
                    <Link
                      href="/auth/register"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Become Seller
                    </Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
