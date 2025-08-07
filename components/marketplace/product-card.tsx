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
  Utensils,
  Zap,
} from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isExpired = product.status === "expired";
  const isUrgent = product.expiryDays <= 1 && !isExpired;
  return (
    <Card
      className={`group hover:shadow-2xl transition-all duration-500 border-2 rounded-2xl overflow-hidden bg-white dark:bg-gray-800 hover:scale-105 w-full max-w-md sm:max-w-lg md:max-w-xl ${
        isExpired
          ? "border-red-300 dark:border-red-700 opacity-75"
          : isUrgent
          ? "border-[#CC2B52]/50 hover:border-[#CC2B52] bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20"
          : "border-[#DE7C7D]/30 hover:border-[#AF1740] dark:border-gray-600"
      }`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/product/${product.id}`}>
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className={`w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-500 ${
                isExpired ? "grayscale" : ""
              }`}
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          {isExpired && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <div className="text-center text-white">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <span className="font-bold text-sm">KEDALUWARSA</span>
              </div>
            </div>
          )}
          {isUrgent && !isExpired && (
            <Badge className="absolute top-3 right-3 bg-[#CC2B52] text-white animate-pulse font-bold text-xs sm:text-sm">
              <Clock className="w-3 h-3 mr-1" />
              KHUSUS HARI INI
            </Badge>
          )}
          {!isExpired && (
            <Badge className="absolute top-3 left-3 bg-[#AF1740] text-white text-base sm:text-lg font-bold">
              {product.discount}% OFF
            </Badge>
          )}
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs">{product.sold} terjual</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="outline"
              className={`${
                isExpired
                  ? "text-red-600 border-red-600 dark:text-red-400 dark:border-red-400"
                  : "text-[#740938] border-[#740938] dark:text-[#DE7C7D] dark:border-[#DE7C7D]"
              } bg-white/80 dark:bg-gray-800/80 text-xs sm:text-sm`}
            >
              {product.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({product.reviews})
              </span>
            </div>
          </div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D] text-base sm:text-lg mb-2 line-clamp-2 hover:text-[#AF1740] transition-colors">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {product.seller} • {product.location}
            </span>
          </div>
          {/* Informasi Kesegaran */}
          <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 mb-2">
              <Utensils className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                Informasi Kesegaran
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  Baik digunakan sebelum:
                </span>
                <span
                  className={`font-medium ${
                    isExpired
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-600 dark:text-green-400"
                  }`}
                >
                  {product.bestBy}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">
                  Baik untuk:
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
          <div className="flex items-center space-x-3 mb-4">
            <span
              className={`text-lg sm:text-xl font-bold ${
                isExpired
                  ? "text-red-500"
                  : "text-[#AF1740] dark:text-[#CC2B52]"
              }`}
            >
              Rp{product.discountedPrice.toLocaleString("id-ID")}
            </span>
            <span className="text-gray-500 line-through text-sm sm:text-base">
              Rp{product.originalPrice.toLocaleString("id-ID")}
            </span>
          </div>
          {/* Tombol Aksi */}
          {isExpired ? (
            <Button
              disabled
              className="w-full bg-gray-400 text-gray-600 rounded-2xl h-10 sm:h-12 font-semibold cursor-not-allowed text-sm sm:text-base"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              Kedaluwarsa
            </Button>
          ) : (
            <div className="space-y-2">
              {/* Baris Aksi Utama */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                <Link href="/cart" className="flex-1">
                  <Button
                    className={`w-full rounded-xl h-10 sm:h-11 font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm ${
                      isUrgent
                        ? "bg-gradient-to-r from-[#CC2B52] to-[#AF1740] hover:from-[#AF1740] hover:to-[#740938] text-white"
                        : "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
                    }`}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="whitespace-nowrap">
                      Tambah ke Keranjang
                    </span>
                  </Button>
                </Link>
                <Button
                  className={`w-full flex-1 rounded-xl h-10 sm:h-11 font-semibold shadow-lg hover:shadow-xl transition-all text-xs sm:text-sm ${
                    isUrgent
                      ? "bg-gradient-to-r from-[#740938] to-[#AF1740] hover:from-[#CC2B52] hover:to-[#AF1740] text-white"
                      : "bg-gradient-to-r from-[#740938] to-[#AF1740] hover:from-[#AF1740] hover:to-[#CC2B52] text-white"
                  }`}
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="whitespace-nowrap">Beli Sekarang</span>
                </Button>
              </div>
              {/* Tombol Lihat Detail */}
              <Link href={`/product/${product.id}`} className="block">
                <Button
                  variant="outline"
                  className="w-full border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white rounded-xl h-10 font-medium bg-transparent dark:border-[#DE7C7D] dark:text-[#DE7C7D] dark:hover:bg-[#DE7C7D] dark:hover:text-gray-900 text-xs sm:text-sm"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Lihat Detail
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}