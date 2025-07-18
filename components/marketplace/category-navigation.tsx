"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Grid3X3, List, SlidersHorizontal } from "lucide-react";

interface CategoryNavigationProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  showExpired: boolean;
  setShowExpired: (show: boolean) => void;
  expiredProductsLength: number;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export function CategoryNavigation({
  categories,
  selectedCategory,
  setSelectedCategory,
  showExpired,
  setShowExpired,
  expiredProductsLength,
  showFilters,
  setShowFilters,
  viewMode,
  setViewMode,
}: CategoryNavigationProps) {
  return (
    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-[#DE7C7D]/30 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 space-y-3 sm:space-y-0">
          {/* Categories - now wraps and centers on small screens */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 hover:text-[#740938] dark:hover:text-[#DE7C7D]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          {/* Filter and View Mode buttons - now wraps and centers on small screens */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExpired(!showExpired)}
              className={`border-[#DE7C7D]/30 dark:border-gray-600 transition-all text-xs ${
                showExpired
                  ? "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700"
                  : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20"
              }`}
            >
              {showExpired ? (
                <EyeOff className="w-3 h-3 mr-1" />
              ) : (
                <Eye className="w-3 h-3 mr-1" />
              )}
              {showExpired ? "Hide" : "Show"} Expired ({expiredProductsLength})
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-[#DE7C7D]/30 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 text-xs"
            >
              <SlidersHorizontal className="w-3 h-3 mr-1" />
              Filters
            </Button>
            <div className="flex border border-[#DE7C7D]/30 dark:border-gray-600 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-[#AF1740] text-white"
                    : "text-gray-600 dark:text-gray-400"
                }
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-[#AF1740] text-white"
                    : "text-gray-600 dark:text-gray-400"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
