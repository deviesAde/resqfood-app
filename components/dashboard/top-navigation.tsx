"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Heart,
  Search,
  Bell,
  User,
  Download,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface TopNavigationProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export function TopNavigation({
  sidebarCollapsed,
  setSidebarCollapsed,
}: TopNavigationProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#740938] dark:text-gray-100">
                resQfood
              </span>
              <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">
                Admin
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari..."
                className="pl-10 w-64 rounded-full border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-600 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <div className="w-5 h-5" /> // Empty div to maintain layout during SSR
              ) : theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            <Link href="/profile">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Ekspor Data
            </Button>
            <Link href="/">
              <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
                Kembali ke Situs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
