"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";

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

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductUpdated: (productData: any) => void;
  product: Product | null;
}

export default function EditProductModal({
  isOpen,
  onClose,
  onProductUpdated,
  product,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    description: "",
    image: "",
  });
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        originalPrice: product.originalPrice.toString(),
        discountedPrice: product.discountedPrice.toString(),
        expiryDate: product.expiryDate,
        description: product.description || "",
        image: product.image || "",
      });
      setImagePreview(product.image || "");
    }
  }, [product]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.originalPrice ||
      !formData.discountedPrice ||
      !formData.expiryDate
    ) {
      return;
    }

    const updatedProduct = {
      ...formData,
      originalPrice: parseFloat(formData.originalPrice),
      discountedPrice: parseFloat(formData.discountedPrice),
    };

    onProductUpdated(updatedProduct);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      category: "",
      originalPrice: "",
      discountedPrice: "",
      expiryDate: "",
      description: "",
      image: "",
    });
    setImagePreview("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-2 border-[#DE7C7D]/30 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#740938] dark:text-white">
            Edit Produk
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#740938] dark:text-white">
              Foto Produk
            </Label>
            <div className="border-2 border-dashed border-[#DE7C7D]/50 dark:border-gray-600 rounded-lg p-4">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setImagePreview("");
                      setFormData((prev) => ({ ...prev, image: "" }));
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-[#DE7C7D] dark:text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Klik untuk upload foto produk
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-[#AF1740] hover:bg-[#740938] text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Pilih Foto
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-medium text-[#740938] dark:text-white"
            >
              Nama Produk *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Masukkan nama produk"
              className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740]"
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#740938] dark:text-white">
              Kategori *
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740]">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Makanan Siap Saji">
                  Makanan Siap Saji
                </SelectItem>
                <SelectItem value="Roti & Kue">Roti & Kue</SelectItem>
                <SelectItem value="Buah & Sayur">Buah & Sayur</SelectItem>
                <SelectItem value="Minuman">Minuman</SelectItem>
                <SelectItem value="Makanan Beku">Makanan Beku</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="originalPrice"
                className="text-sm font-medium text-[#740938] dark:text-white"
              >
                Harga Asli *
              </Label>
              <Input
                id="originalPrice"
                type="number"
                value={formData.originalPrice}
                onChange={(e) =>
                  handleInputChange("originalPrice", e.target.value)
                }
                placeholder="0"
                className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="discountedPrice"
                className="text-sm font-medium text-[#740938] dark:text-white"
              >
                Harga Diskon *
              </Label>
              <Input
                id="discountedPrice"
                type="number"
                value={formData.discountedPrice}
                onChange={(e) =>
                  handleInputChange("discountedPrice", e.target.value)
                }
                placeholder="0"
                className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740]"
                required
              />
            </div>
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label
              htmlFor="expiryDate"
              className="text-sm font-medium text-[#740938] dark:text-white"
            >
              Tanggal Kedaluwarsa *
            </Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740]"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-[#740938] dark:text-white"
            >
              Deskripsi Produk
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Masukkan deskripsi produk (opsional)"
              className="border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] min-h-[80px]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-[#DE7C7D]/50 dark:border-gray-600 text-[#740938] dark:text-white hover:bg-[#DE7C7D]/10 dark:hover:bg-gray-700"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
