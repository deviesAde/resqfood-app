"use client";

import { useState } from "react";

interface Order {
  id: string;
  customerName: string;
  customerAvatar: string;
  customerRating?: number;
  customerPhone?: string;
  customerEmail?: string;
  items: string[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  orderDate: string;
  pickupTime: string;
  notes?: string;
}

// Updated sample data with Indonesian names and menu items from the image
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Budi Santoso",
    customerAvatar: "BS",
    customerRating: 4.8,
    customerPhone: "+62 812-3456-7890",
    customerEmail: "budi.santoso@email.com",
    items: ["Nasi Gudeg Jogja x1", "Es Teh x1"],
    totalAmount: 25000,
    paymentMethod: "QRIS",
    status: "pending",
    orderDate: "2024-01-15",
    pickupTime: "12:30",
    notes: "Tolong nasinya lebih banyak",
  },
  {
    id: "ORD-002",
    customerName: "Ani Wijaya",
    customerAvatar: "AW",
    customerRating: 5.0,
    customerPhone: "+62 813-9876-5432",
    customerEmail: "ani.wijaya@email.com",
    items: ["Makanan Siap Saji x1", "Air Mineral x1"],
    totalAmount: 30000,
    paymentMethod: "Cash",
    status: "ready",
    orderDate: "2024-01-15",
    pickupTime: "11:00",
  },
  {
    id: "ORD-003",
    customerName: "Dewi Lestari",
    customerAvatar: "DL",
    customerRating: 4.5,
    customerPhone: "+62 814-5555-1234",
    customerEmail: "dewi.lestari@email.com",
    items: ["Roti Tawar Gandum x2", "Susu Kaleng x1"],
    totalAmount: 35000,
    paymentMethod: "Debit Card",
    status: "completed",
    orderDate: "2024-01-14",
    pickupTime: "14:30",
  },
  {
    id: "ORD-004",
    customerName: "Agus Setiawan",
    customerAvatar: "AS",
    customerRating: 4.2,
    customerPhone: "+62 815-7777-8888",
    customerEmail: "agus.setiawan@email.com",
    items: ["Salad Buah Segar x1", "Jus Jeruk x1"],
    totalAmount: 30000,
    paymentMethod: "QRIS",
    status: "in-progress",
    orderDate: "2024-01-15",
    pickupTime: "09:45",
    notes: "Tolong saladnya fresh ya",
  },
  {
    id: "ORD-005",
    customerName: "Rina Permata",
    customerAvatar: "RP",
    customerRating: 4.9,
    customerPhone: "+62 816-2222-3333",
    customerEmail: "rina.permata@email.com",
    items: ["Roti Tawar Gandum x1", "Susu Kaleng x2"],
    totalAmount: 32000,
    paymentMethod: "Credit Card",
    status: "completed",
    orderDate: "2024-01-14",
    pickupTime: "16:15",
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return {
    orders,
    updateOrderStatus,
  };
}
