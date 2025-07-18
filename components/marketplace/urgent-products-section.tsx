import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { ProductCard } from "./product-card";
import type { Product } from "@/types/product";

interface UrgentProductsSectionProps {
  urgentProducts: Product[];
}

export function UrgentProductsSection({
  urgentProducts,
}: UrgentProductsSectionProps) {
  if (urgentProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-4 h-4 bg-[#CC2B52] rounded-full animate-pulse"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#740938] dark:text-[#DE7C7D]">
            ⚡ Urgent - Expires Today!
          </h2>
          <Badge className="bg-[#CC2B52] text-white animate-bounce text-sm">
            <Clock className="w-3 h-3 mr-1" />
            {urgentProducts.length} items
          </Badge>
        </div>
        <Button
          variant="outline"
          className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent dark:border-[#CC2B52] dark:text-[#CC2B52] text-sm"
        >
          View All Urgent
        </Button>
      </div>
      {/* Added overflow-hidden to prevent product card scaling from causing scrollbars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-hidden">
        {urgentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
