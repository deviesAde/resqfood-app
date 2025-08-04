"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  Eye,
  ShoppingBag,
  Tag,
  Calendar,
  DollarSign,
  Package,
  Edit,
  ExternalLink,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string;
  image?: string;
  status: "active" | "sold" | "inactive";
  views: number;
  orders: number;
  description?: string;
}

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onEdit: () => void;
}

export default function ProductDetailModal({
  isOpen,
  onClose,
  product,
  onEdit,
}: ProductDetailModalProps) {
  if (!product) return null;

  const discountPercentage = Math.round(
    ((product.originalPrice - product.discountedPrice) /
      product.originalPrice) *
      100
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "sold":
        return "bg-[#AF1740]";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif";
      case "sold":
        return "Terjual";
      default:
        return "Tidak Aktif";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-2 border-[#DE7C7D]/30 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#740938] dark:text-white">
            Detail Produk
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg?height=300&width=400"}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg border border-[#DE7C7D]/30 dark:border-gray-600"
            />
            <Badge
              className={`absolute top-3 right-3 ${getStatusColor(
                product.status
              )} text-white`}
            >
              {getStatusText(product.status)}
            </Badge>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#740938] dark:text-white mb-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <Tag className="w-4 h-4" />
                <span>{product.category}</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-[#DE7C7D]/10 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-[#AF1740]" />
                  <span className="font-semibold text-[#740938] dark:text-white">
                    Harga
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                >
                  Hemat {discountPercentage}%
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-[#AF1740]">
                  Rp{product.discountedPrice.toLocaleString()}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  Rp{product.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Expiry Date */}
            <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <span className="font-medium text-orange-800 dark:text-orange-200">
                  Kedaluwarsa:
                </span>
                <span className="ml-2 text-orange-700 dark:text-orange-300">
                  {product.expiryDate}
                </span>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Total Views
                  </span>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {product.views}
                </span>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Total Pesanan
                  </span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {product.orders}
                </span>
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#740938] dark:text-white" />
                  <span className="font-medium text-[#740938] dark:text-white">
                    Deskripsi Produk
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <Separator className="bg-[#DE7C7D]/30 dark:bg-gray-600" />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={onEdit}
                className="flex-1 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Produk
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#DE7C7D]/50 dark:border-gray-600 text-[#740938] dark:text-white hover:bg-[#DE7C7D]/10 dark:hover:bg-gray-700"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Lihat di Toko
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
