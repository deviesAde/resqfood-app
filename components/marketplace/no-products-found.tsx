"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NoProductsFoundProps {
  onClearFilters: () => void;
}

export function NoProductsFound({ onClearFilters }: NoProductsFoundProps) {
  return (
    <div className="text-center py-8 sm:py-16">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-[#DE7C7D]/30 to-[#CC2B52]/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <Search className="w-12 h-12 sm:w-16 sm:h-16 text-[#740938] dark:text-[#DE7C7D]" />
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-2 sm:mb-4">
        No products found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mb-4 sm:mb-6">
        Try adjusting your search or filters
      </p>
      <Button
        onClick={onClearFilters}
        className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 sm:px-8 text-sm sm:text-base"
      >
        Clear Filters
      </Button>
    </div>
  );
}
