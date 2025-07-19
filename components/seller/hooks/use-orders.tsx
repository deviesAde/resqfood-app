"use client";

import { useState } from "react";

export interface Order {
  id: string;
  customerName: string;
  customerAvatar: string;
  items: string[];
  totalAmount: number;
  status: "completed" | "ready" | "pending" | "in-progress" | "cancelled";
  orderDate: string;
  pickupTime: string;
  paymentMethod: string;
  customerRating?: number;
  customerReview?: string;
  pickupLocation: string;
}

const initialOrders: Order[] = [
  {
    id: "ORD-2024-001",
    customerName: "Sarah Chen",
    customerAvatar: "SC",
    items: ["Roti Sourdough Artisan x2", "Croissant Cokelat x1"],
    totalAmount: 159700,
    status: "completed",
    orderDate: "2024-01-15",
    pickupTime: "14:30",
    paymentMethod: "Kartu Kredit",
    customerRating: 5,
    customerReview: "Roti segar yang luar biasa! Akan pesan lagi.",
    pickupLocation: "Toko Roti Emas, Jl. Raya Utama 123",
  },
  {
    id: "ORD-2024-002",
    customerName: "Mike Johnson",
    customerAvatar: "MJ",
    items: ["Bagel Segar x6"],
    totalAmount: 89900,
    status: "ready",
    orderDate: "2024-01-16",
    pickupTime: "16:00",
    paymentMethod: "Dompet Digital",
    pickupLocation: "Toko Roti Emas, Jl. Raya Utama 123",
  },
  {
    id: "ORD-2024-003",
    customerName: "Lisa Wong",
    customerAvatar: "LW",
    items: ["Roti Sourdough x1", "Bagel x3"],
    totalAmount: 124800,
    status: "pending",
    orderDate: "2024-01-16",
    pickupTime: "18:00",
    paymentMethod: "Tunai",
    pickupLocation: "Toko Roti Emas, Jl. Raya Utama 123",
  },
  {
    id: "ORD-2024-004",
    customerName: "David Kim",
    customerAvatar: "DK",
    items: ["Croissant Cokelat x3", "Bagel Segar x2"],
    totalAmount: 239500,
    status: "cancelled",
    orderDate: "2024-01-14",
    pickupTime: "12:00",
    paymentMethod: "Kartu Kredit",
    pickupLocation: "Toko Roti Emas, Jl. Raya Utama 123",
  },
  {
    id: "ORD-2024-005",
    customerName: "Emma Rodriguez",
    customerAvatar: "ER",
    items: ["Roti Sourdough Artisan x1"],
    totalAmount: 39900,
    status: "in-progress",
    orderDate: "2024-01-16",
    pickupTime: "15:30",
    paymentMethod: "Dompet Digital",
    pickupLocation: "Toko Roti Emas, Jl. Raya Utama 123",
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [...prev, order]);
  };

  const deleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return {
    orders,
    updateOrderStatus,
    addOrder,
    deleteOrder,
  };
}
