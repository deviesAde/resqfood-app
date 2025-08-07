"use client";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect, useRef } from "react";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Menu,
  Search,
  X,
  Clock,
  FileText,
  BarChart3,
  Users,
  Store,
  Settings,
  Package,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  icon: React.ReactNode;
}

export function TopNavigation({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeTab,
  setActiveTab,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchData: SearchResult[] = [
    {
      id: "overview",
      title: "Dashboard Utama",
      description: "Ringkasan aktivitas dan metrik utama",
      category: "Dashboard",
      url: "#",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "users",
      title: "Manajemen Pengguna",
      description: "Kelola pengguna dan hak akses",
      category: "Pengguna",
      url: "#",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "sellers",
      title: "Manajemen Penjual",
      description: "Kelola penjual dan toko",
      category: "Penjual",
      url: "#",
      icon: <Store className="w-4 h-4" />,
    },
    {
      id: "products",
      title: "Manajemen Produk",
      description: "Kelola produk dan item bermasalah",
      category: "Produk",
      url: "#",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "analytics",
      title: "Analitik",
      description: "Lihat grafik dan analisis data",
      category: "Analitik",
      url: "#",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    {
      id: "reports",
      title: "Laporan & Wawasan",
      description: "Hasilkan dan unduh laporan",
      category: "Laporan",
      url: "#",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "messages",
      title: "Pesan",
      description: "Kelola pesan dan komunikasi",
      category: "Komunikasi",
      url: "#",
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      id: "settings",
      title: "Pengaturan",
      description: "Konfigurasi sistem dan preferensi",
      category: "Pengaturan",
      url: "#",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  // Search logic
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered.slice(0, 6));
  }, [searchQuery]);

  const handleSearchFocus = () => {
    setIsSearchOpen(true);
  };

  const handleSearchBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      if (!searchRef.current?.contains(e.relatedTarget as Node)) {
        setIsSearchOpen(false);
      }
    }, 200);
  };

  const handleResultClick = (result: SearchResult) => {
    const newRecentSearches = [
      result.title,
      ...recentSearches.filter((s) => s !== result.title),
    ].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    if (setActiveTab && result.id !== "#") {
      setActiveTab(result.id);
    }
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRecentSearchClick = (searchTerm: string) => {
    setSearchQuery(searchTerm);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isScrolled
          ? "shadow-lg backdrop-blur-sm bg-white/95 dark:bg-gray-800/95"
          : ""
      }`}
    >
      <div className="flex h-16 items-center px-4">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 sm:p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-lg flex items-center justify-center">
              <Image
                src="/logo/logo.png"
                alt="Logo"
                width={28}
                height={28}
                className="rounded-lg"
              />
            </div>
            <span className="font-bold text-lg text-[#740938] dark:text-white">
              Dashboard
            </span>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="ml-4">
          <ThemeToggle />
        </div>

        {/* Desktop Search Bar - Moved to center with proper positioning */}
        <div className="hidden lg:flex items-center justify-center flex-1 px-4">
          <div className="relative w-full max-w-xl" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
            <Input
              placeholder="Cari di dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="pl-10 pr-10 w-full rounded-full border-gray-200 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-[#AF1740]/20"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"
              >
                <X className="w-3 h-3" />
              </Button>
            )}

            {/* Search Results Dropdown - Adjusted positioning */}
            {isSearchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-[60] max-h-96 overflow-y-auto">
                {searchQuery.trim() === "" ? (
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      Pencarian Terkini
                    </h4>
                    {recentSearches.length > 0 ? (
                      <div className="space-y-1">
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleRecentSearchClick(search)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Belum ada pencarian terkini
                      </p>
                    )}
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="p-2">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Hasil Pencarian ({searchResults.length})
                    </div>
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result)}
                        className="flex items-start space-x-3 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group w-full text-left"
                      >
                        <div className="flex-shrink-0 mt-0.5 text-[#AF1740] dark:text-[#DE7C7D]">
                          {result.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-[#AF1740] dark:group-hover:text-[#DE7C7D] transition-colors">
                              {result.title}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs border-[#DE7C7D]/30 text-[#740938] dark:text-[#DE7C7D]"
                            >
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {result.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center">
                    <div className="text-gray-400 mb-2">
                      <Search className="w-8 h-8 mx-auto" />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tidak ada hasil untuk "{searchQuery}"
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Coba kata kunci yang berbeda
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Button */}
        <div className="lg:hidden flex-1 flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {/* User Menu */}
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <User className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 dark:bg-gray-800 dark:border-gray-700"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/"
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Kembali ke Situs
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-gray-700" />
              <DropdownMenuItem asChild>
                <Link
                  href="/auth/login"
                  className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar - Full width below header */}
      {isSearchOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari di dashboard..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 w-full rounded-full border-gray-200 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] bg-gray-50 dark:bg-gray-700"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-6 w-6"
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </div>

          {/* Mobile Search Results - Full width below search bar */}
          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors w-full text-left"
                >
                  <div className="text-[#AF1740] dark:text-[#DE7C7D]">
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {result.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {result.description}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-[#DE7C7D]/30 text-[#740938] dark:text-[#DE7C7D]"
                  >
                    {result.category}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
