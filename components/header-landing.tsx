"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Import Image component
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HeaderLanding() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <nav className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-[#DE7C7D]/20 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            {/* Replaced logo with Image component */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo/logo.png"
                alt="resQfood Logo"
                width={40}
                height={40}
                className="rounded-xl shadow-lg"
              />
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-[#740938] to-[#AF1740] bg-clip-text text-transparent">
                resQfood
              </span>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/marketplace"
              className="text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] transition-colors font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] transition-colors font-medium"
            >
              About
            </Link>
            {/* how it works */}
            <Link
              href="#how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] transition-colors font-medium"
            >
              How It Works
            </Link>
            <Button
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg transition-all duration-300"
              asChild
            >
              <Link href="/auth/register">Join Now</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#740938] text-[#740938] dark:border-[#DE7C7D] dark:text-[#DE7C7D] hover:bg-[#740938] hover:text-white dark:hover:bg-[#DE7C7D] dark:hover:text-gray-950 rounded-full px-6 transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/auth/login">Login</Link>
            </Button>
            <ThemeToggle />
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-[#DE7C7D]/20 dark:border-gray-700 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/marketplace"
              className="text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] transition-colors font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              Marketplace
            </Link>
            <Link
              href="#about"
              className="text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] transition-colors font-medium text-lg"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Button
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 py-3 text-lg shadow-lg transition-all duration-300"
              asChild
              onClick={toggleMobileMenu}
            >
              <Link href="/auth/register">Join Now</Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[#740938] text-[#740938] dark:border-[#DE7C7D] dark:text-[#DE7C7D] hover:bg-[#740938] hover:text-white dark:hover:bg-[#DE7C7D] dark:hover:text-gray-950 rounded-full px-6 py-3 text-lg transition-all duration-300 bg-transparent"
              asChild
              onClick={toggleMobileMenu}
            >
              <Link href="/auth/login">Login</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
