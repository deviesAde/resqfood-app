"use client";

import { useState } from "react";

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

// Sample data
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Gudeg Jogja Instant",
    category: "Makanan Siap Saji",
    originalPrice: 25000,
    discountedPrice: 15000,
    expiryDate: "2024-12-25",
    image: "/products/1/gudeg.jpg",
    status: "active",
    views: 45,
    orders: 12,
    description:
      "Gudeg khas Jogja dengan cita rasa autentik, terdiri dari nangka muda, ayam, dan telur. Masih segar dan siap santap.",
  },
  {
    id: 2,
    name: "Roti Tawar Gandum",
    category: "Roti & Kue",
    originalPrice: 18000,
    discountedPrice: 10000,
    expiryDate: "2024-12-24",
    image: "/products/1/roti.png",
    status: "active",
    views: 32,
    orders: 8,
    description:
      "Roti tawar gandum segar, cocok untuk sarapan atau camilan sehat. Tekstur lembut dan rasa yang nikmat.",
  },
  {
    id: 3,
    name: "Salad Buah instan",
    category: "Buah & Sayur",
    originalPrice: 20000,
    discountedPrice: 12000,
    expiryDate: "2024-12-23",
    image: "/products/1/salad.jpeg",
    status: "sold",
    views: 28,
    orders: 15,
    description:
      "Salad buah segar dengan berbagai macam buah pilihan. Sehat, segar, dan kaya vitamin.",
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
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
