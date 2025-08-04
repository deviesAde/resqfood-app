"use client";
import { useState } from "react";
import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Eye,
  CheckCircle,
  Ban,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Product {
  id: number;
  name: string;
  seller: string;
  reason: string;
  severity: string;
  date: string;
}

interface ProductsTabProps {
  flaggedProducts: Product[];
  setFlaggedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function ProductsTab({
  flaggedProducts,
  setFlaggedProducts,
}: ProductsTabProps) {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductSeller, setNewProductSeller] = useState("");
  const [newProductReason, setNewProductReason] = useState("");
  const [newProductSeverity, setNewProductSeverity] = useState("sedang");

  // State untuk dialog tinjau
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewingProduct, setReviewingProduct] = useState<Product | null>(
    null
  );

  // State untuk alert dialog hapus
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddProduct = () => {
    if (newProductName && newProductSeller && newProductReason) {
      const newProduct: Product = {
        id:
          flaggedProducts.length > 0
            ? Math.max(...flaggedProducts.map((p) => p.id)) + 1
            : 1,
        name: newProductName,
        seller: newProductSeller,
        reason: newProductReason,
        severity: newProductSeverity,
        date: new Date().toISOString().slice(0, 10),
      };
      setFlaggedProducts([...flaggedProducts, newProduct]);
      setNewProductName("");
      setNewProductSeller("");
      setNewProductReason("");
      setNewProductSeverity("sedang");
      setShowAddProductForm(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProductName(product.name);
    setNewProductSeller(product.seller);
    setNewProductReason(product.reason);
    setNewProductSeverity(product.severity);
    setShowAddProductForm(true);
  };

  const handleUpdateProduct = () => {
    if (
      editingProduct &&
      newProductName &&
      newProductSeller &&
      newProductReason
    ) {
      setFlaggedProducts(
        flaggedProducts.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                name: newProductName,
                seller: newProductSeller,
                reason: newProductReason,
                severity: newProductSeverity,
              }
            : product
        )
      );
      setEditingProduct(null);
      setNewProductName("");
      setNewProductSeller("");
      setNewProductReason("");
      setNewProductSeverity("sedang");
      setShowAddProductForm(false);
    }
  };

  const handleRemoveProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      setFlaggedProducts(
        flaggedProducts.filter((product) => product.id !== productToDelete.id)
      );
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleReviewProduct = (product: Product) => {
    setReviewingProduct(product);
    setReviewDialogOpen(true);
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      rendah: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        label: "Rendah",
      },
      sedang: {
        color:
          "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
        label: "Sedang",
      },
      tinggi: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        label: "Tinggi",
      },
    };

    const config =
      severityConfig[severity as keyof typeof severityConfig] ||
      severityConfig.sedang;

    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100">
            Pemantauan Produk
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Pantau dan moderasi daftar produk
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => {
              setShowAddProductForm(true);
              setEditingProduct(null);
              setNewProductName("");
              setNewProductSeller("");
              setNewProductReason("");
              setNewProductSeverity("sedang");
            }}
            className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Produk
          </Button>
          <Button
            variant="outline"
            className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white rounded-full bg-transparent dark:border-red-700 dark:text-red-400 dark:hover:bg-red-700"
          >
            <AlertTriangle className="w-4 h-4 mr-2" />
            Tinjau Produk Terflag ({flaggedProducts.length})
          </Button>
        </div>
      </div>

      {showAddProductForm && (
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-6">
          <h2 className="text-xl font-bold text-[#740938] dark:text-gray-100 mb-4">
            {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="productName"
                className="text-[#740938] dark:text-gray-300"
              >
                Nama Produk
              </Label>
              <Input
                id="productName"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="productSeller"
                className="text-[#740938] dark:text-gray-300"
              >
                Penjual
              </Label>
              <Input
                id="productSeller"
                value={newProductSeller}
                onChange={(e) => setNewProductSeller(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="productReason"
                className="text-[#740938] dark:text-gray-300"
              >
                Alasan Flag
              </Label>
              <Input
                id="productReason"
                value={newProductReason}
                onChange={(e) => setNewProductReason(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="productSeverity"
                className="text-[#740938] dark:text-gray-300"
              >
                Tingkat Keparahan
              </Label>
              <select
                id="productSeverity"
                value={newProductSeverity}
                onChange={(e) => setNewProductSeverity(e.target.value)}
                className="w-full mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="rendah">Rendah</option>
                <option value="sedang">Sedang</option>
                <option value="tinggi">Tinggi</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAddProductForm(false)}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
            >
              Batal
            </Button>
            <Button
              onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-lg"
            >
              {editingProduct ? "Perbarui Produk" : "Tambah Produk"}
            </Button>
          </div>
        </Card>
      )}

      <Card className="border-2 border-[#CC2B52]/30 dark:border-red-700 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/5 dark:from-gray-900 dark:to-red-950/10">
        <CardHeader>
          <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Produk Terflag
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {flaggedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-[#CC2B52]/30 dark:border-red-900/30 shadow-sm"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-semibold text-[#740938] dark:text-gray-100">
                      {product.name}
                    </p>
                    {getSeverityBadge(product.severity)}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Penjual: {product.seller}
                  </p>
                  <p className="text-sm text-[#CC2B52] dark:text-red-400">
                    Alasan: {product.reason}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Dilaporkan: {product.date}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                  <Button
                    size="sm"
                    className="bg-[#AF1740] hover:bg-[#740938] text-white"
                    onClick={() => handleReviewProduct(product)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Tinjau
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent dark:border-red-700 dark:text-red-400 dark:hover:bg-red-700"
                    onClick={() => handleRemoveProduct(product)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dialog Tinjau Produk */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-2 border-[#DE7C7D]/30 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Tinjau Produk
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Detail lengkap produk yang dilaporkan
            </DialogDescription>
          </DialogHeader>

          {reviewingProduct && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                    Nama Produk
                  </Label>
                  <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100">
                      {reviewingProduct.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                    Penjual
                  </Label>
                  <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100">
                      {reviewingProduct.seller}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                    Alasan Pelaporan
                  </Label>
                  <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                    <p className="text-[#CC2B52] dark:text-red-400">
                      {reviewingProduct.reason}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                      Tingkat Keparahan
                    </Label>
                    <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                      {getSeverityBadge(reviewingProduct.severity)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                      Tanggal Laporan
                    </Label>
                    <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                      <p className="text-gray-900 dark:text-gray-100">
                        {reviewingProduct.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setReviewDialogOpen(false)}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Tutup
            </Button>
           
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog Hapus Produk */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-2 border-red-200 dark:border-red-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Konfirmasi Hapus Produk
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {productToDelete && (
            <div className="my-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/30">
              <div className="space-y-2">
                <p className="font-semibold text-[#740938] dark:text-gray-100">
                  <span className="text-gray-600 dark:text-gray-400">
                    Produk:
                  </span>{" "}
                  {productToDelete.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Penjual:</span>{" "}
                  {productToDelete.seller}
                </p>
                <p className="text-sm text-[#CC2B52] dark:text-red-400">
                  <span className="font-medium">Alasan:</span>{" "}
                  {productToDelete.reason}
                </p>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProduct}
              className="bg-[#CC2B52] hover:bg-[#AF1740] text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Produk
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
