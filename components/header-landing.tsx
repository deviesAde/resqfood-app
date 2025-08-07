"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderLandingProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeaderLanding({ scrollToSection }: HeaderLandingProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Tentang Kami", action: () => scrollToSection("about") },
    { label: "Cara Kerja", action: () => scrollToSection("how-it-works") },
    { label: "Belanja", href: "/marketplace" },
    { label: "Artikel", href: "/artikel" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/logo/logo.png"
                alt="resQfood Logo"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg group-hover:scale-105 transition-transform"
              />
              <span
                className={`text-xl sm:text-2xl font-bold transition-colors group-hover:scale-105 transform ${
                  isScrolled
                    ? "text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740]"
                    : "text-white group-hover:text-[#DE7C7D]"
                }`}
              >
                resQfood
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`font-medium transition-colors hover:scale-105 transform ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className={`font-medium transition-colors hover:scale-105 transform ${
                      isScrolled
                        ? "text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D]"
                        : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle */}
            <div
              className={`${
                !isScrolled
                  ? "[&_button]:text-white/90 [&_button]:hover:text-white [&_button]:hover:bg-white/10"
                  : ""
              }`}
            >
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              className={`transition-colors ${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
              asChild
            >
              <Link href="/auth/login">Masuk</Link>
            </Button>
            <Button
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/auth/register">Daftar Gratis</Link>
            </Button>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <div
              className={`${
                !isScrolled
                  ? "[&_button]:text-white/90 [&_button]:hover:text-white [&_button]:hover:bg-white/10"
                  : ""
              }`}
            >
              <ThemeToggle />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`${
                isScrolled
                  ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="block text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                        setIsMenuOpen(false);
                      }}
                      className="block text-gray-700 dark:text-gray-300 hover:text-[#AF1740] dark:hover:text-[#DE7C7D] font-medium transition-colors w-full text-left"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent"
                  asChild
                >
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Masuk
                  </Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
                  asChild
                >
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Daftar Gratis
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
