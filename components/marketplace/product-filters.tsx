"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface ProductFiltersProps {
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOptions: string[];
}

export function ProductFilters({
  sortBy,
  setSortBy,
  sortOptions,
}: ProductFiltersProps) {
  return (
    <div className="mb-8">
      <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                Urutkan Berdasarkan
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300 text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                Rentang Harga
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Min"
                  className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:bg-gray-800 text-sm"
                />
                <Input
                  placeholder="Max"
                  className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:bg-gray-800 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                Lokasi
              </label>
              <select className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300 text-sm">
                <option>Semua Lokasi</option>
                <option>0-1 Km</option>
                <option>1-5 Km</option>
                <option>5-10 Km</option>
                <option>10+ Km</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#740938] dark:text-[#DE7C7D] mb-2">
                Rating
              </label>
              <select className="w-full h-10 rounded-lg border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] bg-white dark:bg-gray-800 px-3 text-gray-700 dark:text-gray-300 text-sm">
                <option>Semua Rating</option>
                <option>4.5+ Bintang</option>
                <option>4.0+ Bintang</option>
                <option>3.5+ Bintang</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
