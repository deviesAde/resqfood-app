"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Notification {
  id: string;
  type: "success" | "warning" | "info" | "urgent" | "achievement";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
  icon?: React.ReactNode;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "Urgent: Items Expiring Soon!",
    message:
      "5 items from Golden Crust Bakery expire in 2 hours. Rescue them now at 60% off!",
    timestamp: "2 minutes ago",
    read: false,
    actionLabel: "View Items",
    actionUrl: "/marketplace",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: "2",
    type: "success",
    title: "Order Confirmed!",
    message:
      "Your order of Artisan Sourdough Bread has been confirmed. Pickup ready in 30 minutes.",
    timestamp: "15 minutes ago",
    read: false,
    actionLabel: "Track Order",
    actionUrl: "/orders",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    id: "3",
    type: "achievement",
    title: "Food Hero Badge Earned! 🏆",
    message:
      "Congratulations! You've rescued 50 items and earned the 'Food Hero' badge.",
    timestamp: "1 hour ago",
    read: false,
    actionLabel: "View Profile",
    actionUrl: "/profile",
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "4",
    type: "info",
    title: "New Seller Joined",
    message:
      "Patisserie Belle just joined resQfood! Check out their fresh pastries and desserts.",
    timestamp: "3 hours ago",
    read: true,
    actionLabel: "Visit Store",
    actionUrl: "/seller/patisserie-belle",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "5",
    type: "warning",
    title: "Price Drop Alert",
    message:
      "Premium Coffee Beans from Roast Masters dropped to $12.99 (was $24.99). Limited time!",
    timestamp: "5 hours ago",
    read: true,
    actionLabel: "Buy Now",
    actionUrl: "/marketplace",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "6",
    type: "info",
    title: "Welcome to resQfood!",
    message: "Start exploring delicious rescued food near you.",
    timestamp: "1 day ago",
    read: true,
    icon: <Bell className="w-4 h-4" />,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationStyle = (type: Notification["type"], read: boolean) => {
    const baseStyle = `border-l-4 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
      read ? "opacity-75" : ""
    }`;
    switch (type) {
      case "urgent":
        return `${baseStyle} border-l-[#CC2B52] bg-gradient-to-r from-[#CC2B52]/5 to-transparent dark:from-[#CC2B52]/10`;
      case "success":
        return `${baseStyle} border-l-green-500 bg-gradient-to-r from-green-50/50 to-transparent dark:from-green-900/20`;
      case "achievement":
        return `${baseStyle} border-l-[#AF1740] bg-gradient-to-r from-[#AF1740]/5 to-transparent dark:from-[#AF1740]/10`;
      case "warning":
        return `${baseStyle} border-l-yellow-500 bg-gradient-to-r from-yellow-50/50 to-transparent dark:from-yellow-900/20`;
      case "info":
      default:
        return `${baseStyle} border-l-[#740938] bg-gradient-to-r from-[#DE7C7D]/5 to-transparent dark:from-[#DE7C7D]/10`;
    }
  };

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "urgent":
        return "text-[#CC2B52]";
      case "success":
        return "text-green-500";
      case "achievement":
        return "text-[#AF1740]";
      case "warning":
        return "text-yellow-500";
      case "info":
      default:
        return "text-[#740938]";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header for the Notification Page */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-[#DE7C7D]/30 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/marketplace"
            className="flex items-center space-x-2 group"
          >
            <ArrowLeft className="w-5 h-5 text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors" />
            <span className="text-lg font-bold text-[#740938] dark:text-[#DE7C7D] group-hover:text-[#AF1740] transition-colors">
              Back to Marketplace
            </span>
          </Link>
          <h1 className="text-xl font-bold text-[#740938] dark:text-[#DE7C7D]">
            Notifications
          </h1>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllRead}
              className="text-[#740938] hover:bg-[#DE7C7D]/20 dark:text-[#DE7C7D] dark:hover:bg-gray-700 text-xs px-2 py-1 h-auto"
            >
              Mark all read
            </Button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length === 0 ? (
          <div className="text-center py-16">
            <Bell className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-2">
              No notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              You're all caught up!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`rounded-xl shadow-sm ${getNotificationStyle(
                  notification.type,
                  notification.read
                )}`}
              >
                <CardContent className="p-4 flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 ${getIconColor(
                      notification.type
                    )} mt-0.5`}
                  >
                    {notification.icon || <Bell className="w-5 h-5" />}
                  </div>
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4
                          className={`text-base font-semibold ${
                            notification.read
                              ? "text-gray-600 dark:text-gray-400"
                              : "text-[#740938] dark:text-[#DE7C7D]"
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <p
                          className={`text-sm mt-1 ${
                            notification.read
                              ? "text-gray-500"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                      {/* Dismiss Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDismiss(notification.id);
                        }}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 h-auto flex-shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    {/* Action Button */}
                    {notification.actionLabel && (
                      <div className="mt-3">
                        <Link href={notification.actionUrl || "#"} passHref>
                          <Button
                            size="sm"
                            onClick={() => handleRead(notification.id)}
                            className={`${
                              notification.type === "urgent"
                                ? "bg-[#CC2B52] hover:bg-[#AF1740]"
                                : notification.type === "success"
                                ? "bg-green-500 hover:bg-green-600"
                                : notification.type === "achievement"
                                ? "bg-[#AF1740] hover:bg-[#740938]"
                                : "bg-[#740938] hover:bg-[#AF1740]"
                            } text-white rounded-full px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all`}
                          >
                            {notification.actionLabel}
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
