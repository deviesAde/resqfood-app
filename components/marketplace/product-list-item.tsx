import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Clock,
  Info,
  MapPin,
  ShoppingCart,
  Star,
  Zap,
} from "lucide-react";
import type { Product } from "../../types/product"; // Adjust the import path as necessary

interface ProductListItemProps {
  product: Product;
}

// Helper function to format currency in Indonesian Rupiah
const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("IDR", "Rp");
};

export function ProductListItem({ product }: ProductListItemProps) {
  const isExpired = product.status === "expired";
  const isUrgent = product.expiryDays <= 1 && !isExpired;

  return (
    <Card
      className={`hover:shadow-lg transition-all duration-300 border-2 rounded-2xl overflow-hidden ${
        isExpired
          ? "border-red-300 dark:border-red-700 opacity-75 bg-white dark:bg-gray-800"
          : "border-[#DE7C7D]/30 hover:border-[#AF1740] dark:border-gray-600 bg-white dark:bg-gray-800"
      }`}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="relative flex-shrink-0">
            <Link href={`/product/${product.id}`}>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className={`w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl ${
                  isExpired ? "grayscale" : ""
                }`}
              />
            </Link>
            {isExpired && (
              <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            )}
            <Badge
              className={`absolute top-2 right-2 text-xs sm:text-sm font-bold ${
                isExpired ? "bg-red-500 text-white" : "bg-[#CC2B52] text-white"
              }`}
            >
              {product.discount}% OFF
            </Badge>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <Badge
                variant="outline"
                className={`${
                  isExpired
                    ? "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                    : "text-[#740938] border-[#740938] dark:text-[#DE7C7D] dark:border-[#DE7C7D]"
                } text-xs sm:text-sm`}
              >
                {product.category}
              </Badge>
              {isExpired ? (
                <Badge className="bg-red-500 text-white text-xs sm:text-sm">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  EXPIRED
                </Badge>
              ) : isUrgent ? (
                <Badge className="bg-[#CC2B52] text-white animate-pulse text-xs sm:text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  Urgent
                </Badge>
              ) : null}
            </div>
            <Link href={`/product/${product.id}`}>
              <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-lg sm:text-xl mb-2 line-clamp-2 hover:text-[#AF1740] transition-colors">
                {product.name}
              </h3>
            </Link>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500 dark:text-gray-400">
                  ({product.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {product.seller} • {product.location}
                </span>
              </div>
              <span className="text-gray-500 dark:text-gray-400">
                {product.sold} sold
              </span>
            </div>
            {/* Freshness Info in List View */}
            <div className="mb-3 p-2 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Best by: {product.bestBy}
                </span>
                <span
                  className={`font-medium ${
                    isExpired
                      ? "text-red-600 dark:text-red-400"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                >
                  {product.goodFor}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row flex-shrink-0 w-full sm:w-auto">
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span
                className={`text-2xl sm:text-3xl font-bold ${
                  isExpired
                    ? "text-red-500"
                    : "text-[#AF1740] dark:text-[#CC2B52]"
                }`}
              >
                {formatRupiah(product.discountedPrice)}
              </span>
              <span className="text-gray-500 line-through text-lg sm:text-xl">
                {formatRupiah(product.originalPrice)}
              </span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {isExpired ? "Expired" : `${product.expiryDays} days left`}
                </span>
              </div>
            </div>
            {isExpired ? (
              <Button
                disabled
                className="bg-gray-400 text-gray-600 rounded-2xl px-6 sm:px-8 h-10 sm:h-12 font-semibold cursor-not-allowed w-full sm:w-auto text-sm sm:text-base"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Expired
              </Button>
            ) : (
              <div className="flex space-x-2 w-full sm:w-auto">
                <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl px-3 sm:px-4 h-10 font-semibold flex-1 text-sm sm:text-base">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Cart
                </Button>
                <Button className="bg-gradient-to-r from-[#740938] to-[#AF1740] hover:from-[#CC2B52] hover:to-[#AF1740] text-white rounded-xl px-3 sm:px-4 h-10 font-semibold flex-1 text-sm sm:text-base">
                  <Zap className="w-4 h-4 mr-1" />
                  Buy
                </Button>
                <Link href={`/product/${product.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-xl px-3 sm:px-4 h-10 font-medium bg-transparent w-full text-sm sm:text-base"
                  >
                    <Info className="w-4 h-4 mr-1" />
                    Details
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
