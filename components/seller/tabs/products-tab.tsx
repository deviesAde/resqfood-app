"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  Clock,
  ShoppingBag,
  MoreVertical,
} from "lucide-react";
import AddProductModal from "../modals/add-product-modal";
import EditProductModal from "../modals/edit-product-modal";
import ProductDetailModal from "../modals/product-detail-modal";
import { useProducts } from "../hooks/use-products";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function ProductsTab() {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const { products, deleteProduct, addProduct, updateProduct } = useProducts();
  const { toast } = useToast();

  const handleDelete = (id: number) => {
    setDeleteProductId(id);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditProduct(true);
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const confirmDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      toast({
        title: "Produk Berhasil Dihapus",
        description: "Produk telah dihapus dari daftar Anda.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      setDeleteProductId(null);
    }
  };

  const handleProductAdded = (productData: any) => {
    const newProduct = {
      id: Date.now(),
      name: productData.name,
      category: productData.category,
      originalPrice: productData.originalPrice,
      discountedPrice: productData.discountedPrice,
      expiryDate: productData.expiryDate,
      image: productData.image,
      description: productData.description,
      status: "active" as const,
      views: 0,
      orders: 0,
    };

    addProduct(newProduct);
    toast({
      title: "Produk Berhasil Ditambahkan! 🎉",
      description: "Produk Anda telah berhasil diupload dan siap dijual.",
      className: "bg-green-50 border-green-200 text-green-800",
    });
    setShowAddProduct(false);
  };

  const handleProductUpdated = (productData: any) => {
    if (selectedProduct) {
      const updatedProduct = {
        ...selectedProduct,
        ...productData,
      };
      updateProduct(selectedProduct.id, updatedProduct);
      toast({
        title: "Produk Berhasil Diperbarui! ✅",
        description: "Perubahan produk Anda telah disimpan.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      setShowEditProduct(false);
      setSelectedProduct(null);
    }
  };

  const handleEditFromDetail = () => {
    setShowProductDetail(false);
    setShowEditProduct(true);
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0 gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
              Produk Saya
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              Kelola daftar makanan penyelamatan Anda
            </p>
          </div>
          <div className="flex justify-end w-full sm:w-auto">
            <Button
              onClick={() => setShowAddProduct(true)}
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="block sm:hidden space-y-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-white dark:bg-gray-800"
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={product.image || "/placeholder.svg?height=80&width=80"}
                    alt={product.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#DE7C7D]/30 dark:border-gray-600 shrink-0 cursor-pointer"
                    onClick={() => handleViewDetail(product)}
                  />
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3
                          className="font-semibold text-[#740938] dark:text-white text-sm truncate cursor-pointer hover:text-[#AF1740]"
                          onClick={() => handleViewDetail(product)}
                        >
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {product.category}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-1">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleViewDetail(product)}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Lihat Detail
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#AF1740] text-sm">
                          Rp{product.discountedPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 line-through">
                          Rp{product.originalPrice.toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        className={`text-xs ${
                          product.status === "active"
                            ? "bg-green-500"
                            : product.status === "sold"
                            ? "bg-[#AF1740]"
                            : "bg-gray-500"
                        } text-white`}
                      >
                        {product.status === "active"
                          ? "Aktif"
                          : product.status === "sold"
                          ? "Terjual"
                          : "Tidak Aktif"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-[#CC2B52]" />
                        <span>{product.expiryDate}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3 text-gray-500" />
                          <span>{product.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ShoppingBag className="w-3 h-3 text-green-500" />
                          <span>{product.orders}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop Table View */}
        <Card className="hidden sm:block border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-[#DE7C7D]/30 dark:border-gray-600 bg-[#DE7C7D]/10 dark:bg-gray-700">
                    <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                      Produk
                    </th>
                    <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                      Harga
                    </th>
                    <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                      Kedaluwarsa
                    </th>
                    <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                      Status
                    </th>
                    <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base hidden lg:table-cell">
                      Performa
                    </th>
                    <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#DE7C7D]/20 dark:border-gray-600 hover:bg-[#DE7C7D]/10 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-3 lg:py-4 px-2 sm:px-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <img
                            src={
                              product.image ||
                              "/placeholder.svg?height=60&width=60" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt={product.name}
                            className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover border border-[#DE7C7D]/30 dark:border-gray-600 shrink-0 cursor-pointer"
                            onClick={() => handleViewDetail(product)}
                          />
                          <div className="min-w-0 flex-1">
                            <p
                              className="font-semibold text-[#740938] dark:text-white text-sm lg:text-base truncate cursor-pointer hover:text-[#AF1740]"
                              onClick={() => handleViewDetail(product)}
                            >
                              {product.name}
                            </p>
                            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-2 sm:px-4">
                        <div>
                          <p className="font-bold text-[#AF1740] text-sm lg:text-lg">
                            Rp{product.discountedPrice.toLocaleString()}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-500 line-through">
                            Rp{product.originalPrice.toLocaleString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-2 sm:px-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-[#CC2B52]" />
                          <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                            {product.expiryDate}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-2 sm:px-4">
                        <Badge
                          className={`text-xs lg:text-sm ${
                            product.status === "active"
                              ? "bg-green-500"
                              : product.status === "sold"
                              ? "bg-[#AF1740]"
                              : "bg-gray-500"
                          } text-white`}
                        >
                          {product.status === "active"
                            ? "Aktif"
                            : product.status === "sold"
                            ? "Terjual"
                            : "Tidak Aktif"}
                        </Badge>
                      </td>
                      <td className="py-3 lg:py-4 px-2 sm:px-4 hidden lg:table-cell">
                        <div className="text-xs lg:text-sm">
                          <div className="flex items-center space-x-2 mb-1">
                            <Eye className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500" />
                            <span className="text-gray-600 dark:text-gray-300">
                              {product.views} views
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ShoppingBag className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                            <span className="text-green-600">
                              {product.orders} pesanan
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-2 sm:px-4">
                        <div className="flex items-center space-x-1 lg:space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(product)}
                            className="border-[#740938] dark:border-[#740938] text-[#740938] dark:text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent text-xs lg:text-sm p-1 lg:p-2"
                          >
                            <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(product.id)}
                            className="border-[#CC2B52] dark:border-[#CC2B52] text-[#CC2B52] dark:text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent text-xs lg:text-sm p-1 lg:p-2"
                          >
                            <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewDetail(product)}
                            className="border-[#AF1740] dark:border-[#AF1740] text-[#AF1740] dark:text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent text-xs lg:text-sm p-1 lg:p-2 hidden sm:flex"
                          >
                            <ExternalLink className="w-3 h-3 lg:w-4 lg:h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onProductAdded={handleProductAdded}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={showEditProduct}
        onClose={() => {
          setShowEditProduct(false);
          setSelectedProduct(null);
        }}
        onProductUpdated={handleProductUpdated}
        product={selectedProduct}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        isOpen={showProductDetail}
        onClose={() => {
          setShowProductDetail(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onEdit={handleEditFromDetail}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteProductId !== null}
        onOpenChange={() => setDeleteProductId(null)}
      >
        <AlertDialogContent className="bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Konfirmasi Hapus Produk
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak
              dapat dibatalkan dan produk akan dihapus secara permanen dari
              daftar Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Ya, Hapus Produk
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
