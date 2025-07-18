"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Eye, CheckCircle, Ban, Plus, Edit, Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export function ProductsTab({ flaggedProducts, setFlaggedProducts }: ProductsTabProps) {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState("");
  const [newProductSeller, setNewProductSeller] = useState("");
  const [newProductReason, setNewProductReason] = useState("");
  const [newProductSeverity, setNewProductSeverity] = useState("sedang");

  const handleAddProduct = () => {
    if (newProductName && newProductSeller && newProductReason) {
      const newProduct: Product = {
        id: flaggedProducts.length > 0 ? Math.max(...flaggedProducts.map(p => p.id)) + 1 : 1,
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
    if (editingProduct && newProductName && newProductSeller && newProductReason) {
      setFlaggedProducts(flaggedProducts.map(product =>
        product.id === editingProduct.id
          ? { ...product, name: newProductName, seller: newProductSeller, reason: newProductReason, severity: newProductSeverity }
          : product
      ));
      setEditingProduct(null);
      setNewProductName("");
      setNewProductSeller("");
      setNewProductReason("");
      setNewProductSeverity("sedang");
      setShowAddProductForm(false);
    }
  };

  const handleRemoveProduct = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setFlaggedProducts(flaggedProducts.filter((product) => product.id !== id));
    }
  };

  const handleReviewProduct = (id: number) => {
    const product = flaggedProducts.find((p) => p.id === id);
    if (product) {
      alert(`Tinjau produk: ${product.name}\nPenjual: ${product.seller}\nAlasan: ${product.reason}`);
      
    }
  }
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
              <Label htmlFor="productName" className="text-[#740938] dark:text-gray-300">Nama Produk</Label>
              <Input
                id="productName"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="productSeller" className="text-[#740938] dark:text-gray-300">Penjual</Label>
              <Input
                id="productSeller"
                value={newProductSeller}
                onChange={(e) => setNewProductSeller(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="productReason" className="text-[#740938] dark:text-gray-300">Alasan Flag</Label>
              <Input
                id="productReason"
                value={newProductReason}
                onChange={(e) => setNewProductReason(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label htmlFor="productSeverity" className="text-[#740938] dark:text-gray-300">Tingkat Keparahan</Label>
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
                <div>
                  <p className="font-semibold text-[#740938] dark:text-gray-100">
                    {product.name}
                  </p>
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
                <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="bg-[#AF1740] hover:bg-[#740938] text-white"
                      onClick={() => handleReviewProduct(product.id)}
                    >
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
                      onClick={() => handleRemoveProduct(product.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
;
