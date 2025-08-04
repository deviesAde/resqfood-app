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

// Sample data - replace with your actual data source
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Sarah Johnson",
    customerAvatar: "SJ",
    customerRating: 4.8,
    customerPhone: "+62 812-3456-7890",
    customerEmail: "sarah.johnson@email.com",
    items: ["Croissant Butter x2", "Americano x1", "Blueberry Muffin x1"],
    totalAmount: 85000,
    paymentMethod: "QRIS",
    status: "pending",
    orderDate: "2024-01-15",
    pickupTime: "10:30",
    notes: "Tolong croissant-nya dipanaskan",
  },
  {
    id: "ORD-002",
    customerName: "Michael Chen",
    customerAvatar: "MC",
    customerRating: 5.0,
    customerPhone: "+62 813-9876-5432",
    customerEmail: "michael.chen@email.com",
    items: ["Sourdough Bread x1", "Cappuccino x2"],
    totalAmount: 120000,
    paymentMethod: "Cash",
    status: "ready",
    orderDate: "2024-01-15",
    pickupTime: "11:00",
  },
  {
    id: "ORD-003",
    customerName: "Emma Wilson",
    customerAvatar: "EW",
    customerRating: 4.5,
    customerPhone: "+62 814-5555-1234",
    customerEmail: "emma.wilson@email.com",
    items: ["Chocolate Cake Slice x1", "Latte x1"],
    totalAmount: 95000,
    paymentMethod: "Debit Card",
    status: "completed",
    orderDate: "2024-01-14",
    pickupTime: "14:30",
  },
  {
    id: "ORD-004",
    customerName: "David Rodriguez",
    customerAvatar: "DR",
    customerRating: 4.2,
    customerPhone: "+62 815-7777-8888",
    customerEmail: "david.rodriguez@email.com",
    items: ["Bagel with Cream Cheese x2", "Orange Juice x1"],
    totalAmount: 75000,
    paymentMethod: "QRIS",
    status: "in-progress",
    orderDate: "2024-01-15",
    pickupTime: "09:45",
    notes: "Extra cream cheese please",
  },
  {
    id: "ORD-005",
    customerName: "Lisa Thompson",
    customerAvatar: "LT",
    customerRating: 4.9,
    customerPhone: "+62 816-2222-3333",
    customerEmail: "lisa.thompson@email.com",
    items: ["Danish Pastry x3", "Espresso x2"],
    totalAmount: 110000,
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
