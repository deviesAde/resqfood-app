"use client";
import { useState } from "react";
import type React from "react";

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
import { Upload, X, ImageIcon } from "lucide-react";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductAdded: (productData: any) => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
  onProductAdded,
}: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    description: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const productData = {
      ...formData,
      originalPrice: Number.parseInt(formData.originalPrice),
      discountedPrice: Number.parseInt(formData.discountedPrice),
      image: imagePreview, // In real app, this would be the uploaded image URL
    };

    onProductAdded(productData);

    // Reset form
    setFormData({
      name: "",
      category: "",
      originalPrice: "",
      discountedPrice: "",
      expiryDate: "",
      description: "",
      image: null,
    });
    setImagePreview(null);
    setIsUploading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#740938] dark:text-white">
            Tambah Produk Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Foto Produk
            </Label>
            <div className="border-2 border-dashed border-[#DE7C7D]/30 dark:border-gray-600 rounded-lg p-6">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                    size="sm"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
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
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#AF1740] text-white rounded-lg hover:bg-[#740938] transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Pilih Foto
                  </Label>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nama Produk *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Masukkan nama produk"
                required
                className="border-[#DE7C7D]/30 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Kategori *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger className="border-[#DE7C7D]/30 dark:border-gray-600">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="makanan-siap-saji">
                    Makanan Siap Saji
                  </SelectItem>
                  <SelectItem value="roti-kue">Roti & Kue</SelectItem>
                  <SelectItem value="buah-sayur">Buah & Sayur</SelectItem>
                  <SelectItem value="minuman">Minuman</SelectItem>
                  <SelectItem value="makanan-beku">Makanan Beku</SelectItem>
                  <SelectItem value="lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="originalPrice"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                placeholder="50000"
                required
                className="border-[#DE7C7D]/30 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="discountedPrice"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                placeholder="25000"
                required
                className="border-[#DE7C7D]/30 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="expiryDate"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tanggal Kedaluwarsa *
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                required
                className="border-[#DE7C7D]/30 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Deskripsi Produk
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Deskripsikan kondisi dan detail produk..."
                rows={3}
                className="border-[#DE7C7D]/30 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-transparent"
              disabled={isUploading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Mengupload...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Produk
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
