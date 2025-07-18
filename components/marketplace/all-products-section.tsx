"use client";
import { ProductCard } from "./product-card";
import { ProductListItem } from "./product-list-item";
import type { Product } from "@/types/product";

interface AllProductsSectionProps {
  filteredProducts: Product[];
  viewMode: "grid" | "list";
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOptions: string[];
}

export function AllProductsSection({
  filteredProducts,
  viewMode,
  sortBy,
  setSortBy,
  sortOptions,
}: AllProductsSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-[#740938] dark:text-[#DE7C7D]">
          All Rescued Food
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} products
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
