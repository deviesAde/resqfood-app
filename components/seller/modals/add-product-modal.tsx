"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Upload } from "lucide-react";
import { useProducts } from "../hooks/use-products";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    originalPrice: "",
    discountedPrice: "",
    expiryDate: "",
    category: "",
    description: "",
    purchaseLink: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      originalPrice: Number.parseFloat(formData.originalPrice),
      discountedPrice: Number.parseFloat(formData.discountedPrice),
      expiryDate: formData.expiryDate,
      category: formData.category,
      description: formData.description,
      purchaseLink: formData.purchaseLink,
      status: "active" as const,
      views: 0,
      orders: 0,
      image: "/placeholder.svg?height=100&width=100",
    };

    addProduct(newProduct);

    setFormData({
      name: "",
      originalPrice: "",
      discountedPrice: "",
      expiryDate: "",
      category: "",
      description: "",
      purchaseLink: "",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-[#740938] dark:text-white flex items-center text-lg sm:text-xl">
            <Plus className="w-5 h-5 mr-2" />
            Tambah Produk Baru
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="name"
                className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
              >
                Nama Produk
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="contoh: Roti Sourdough Segar"
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="category"
                className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
              >
                Kategori
              </Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="contoh: Produk Roti"
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label
                htmlFor="originalPrice"
                className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
              >
                Harga Asli (Rp)
              </Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="89900"
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="discountedPrice"
                className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
              >
                Harga Diskon (Rp)
              </Label>
              <Input
                id="discountedPrice"
                name="discountedPrice"
                type="number"
                step="0.01"
                value={formData.discountedPrice}
                onChange={handleInputChange}
                placeholder="39900"
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="expiryDate"
                className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
              >
                Tanggal Kedaluwarsa
              </Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
            >
              Deskripsi
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Deskripsikan produk Anda..."
              className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
              rows={3}
            />
          </div>

          <div>
            <Label
              htmlFor="purchaseLink"
              className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
            >
              Link Pembelian Eksternal
            </Label>
            <Input
              id="purchaseLink"
              name="purchaseLink"
              type="url"
              value={formData.purchaseLink}
              onChange={handleInputChange}
              placeholder="https://shopee.com/link-produk-anda"
              className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <Label className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base">
              Gambar Produk
            </Label>
            <div className="mt-1 border-2 border-dashed border-[#DE7C7D]/50 dark:border-gray-600 rounded-lg p-6 sm:p-8 text-center hover:border-[#AF1740] dark:hover:border-[#AF1740] transition-colors bg-[#DE7C7D]/10 dark:bg-gray-700">
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-[#740938] mx-auto mb-4" />
              <p className="text-[#740938] dark:text-white font-semibold mb-2 text-sm sm:text-base">
                Upload gambar produk
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                PNG, JPG hingga 5MB
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent text-sm"
              >
                Pilih File
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg bg-transparent"
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all"
            >
              Tambah Produk
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
