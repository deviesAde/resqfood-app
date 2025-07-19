"use client";

import { useState } from "react";

export interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  expiryDate: string;
  category: string;
  status: "active" | "sold" | "inactive";
  views: number;
  orders: number;
  image: string;
  description?: string;
  purchaseLink?: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Roti Sourdough Artisan",
    originalPrice: 89900,
    discountedPrice: 39900,
    expiryDate: "2024-01-16",
    category: "Produk Roti",
    status: "active",
    views: 45,
    orders: 12,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Croissant Cokelat",
    originalPrice: 129900,
    discountedPrice: 59900,
    expiryDate: "2024-01-15",
    category: "Produk Roti",
    status: "sold",
    views: 32,
    orders: 8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Bagel Segar",
    originalPrice: 69900,
    discountedPrice: 29900,
    expiryDate: "2024-01-17",
    category: "Produk Roti",
    status: "active",
    views: 28,
    orders: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
