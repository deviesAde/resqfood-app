"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  X,
  Star,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Settings,
} from "lucide-react";

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
    title: "Penting: Barang Akan Segera Kedaluwarsa!",
    message:
      "5 produk dari Golden Crust Bakery akan kedaluwarsa dalam 2 jam. Selamatkan sekarang dengan diskon 60%!",
    timestamp: "2 menit lalu",
    read: false,
    actionLabel: "Lihat Produk",
    actionUrl: "/marketplace",
    icon: <Clock className="w-4 h-4" />,
  },
  {
    id: "2",
    type: "success",
    title: "Pesanan Dikonfirmasi!",
    message:
      "Pesanan Roti Sourdough Artisan Anda telah dikonfirmasi. Siap diambil dalam 30 menit.",
    timestamp: "15 menit lalu",
    read: false,
    actionLabel: "Lacak Pesanan",
    actionUrl: "/orders",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    id: "3",
    type: "achievement",
    title: "Lencana Pahlawan Makanan Didapat! 🏆",
    message:
      "Selamat! Anda telah menyelamatkan 50 produk dan mendapatkan lencana 'Pahlawan Makanan'.",
    timestamp: "1 jam lalu",
    read: false,
    actionLabel: "Lihat Profil",
    actionUrl: "/profile",
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: "4",
    type: "info",
    title: "Penjual Baru Bergabung",
    message:
      "Patisserie Belle baru saja bergabung dengan resQfood! Lihat kue dan dessert segar mereka.",
    timestamp: "3 jam lalu",
    read: true,
    actionLabel: "Kunjungi Toko",
    actionUrl: "/seller/patisserie-belle",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "5",
    type: "warning",
    title: "Peringatan Harga Turun",
    message:
      "Kopi Premium dari Roast Masters turun menjadi $12.99 (dari $24.99). Waktu terbatas!",
    timestamp: "5 jam lalu",
    read: true,
    actionLabel: "Beli Sekarang",
    actionUrl: "/marketplace",
    icon: <TrendingUp className="w-4 h-4" />,
  },
];

interface NotificationDropdownProps {
  notifications?: Notification[];
  onNotificationRead?: (id: string) => void;
  onNotificationDismiss?: (id: string) => void;
  className?: string;
}

export function NotificationDropdown({
  notifications = sampleNotifications,
  onNotificationRead,
  onNotificationDismiss,
  className = "",
}: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRead = (id: string) => {
    setLocalNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    onNotificationRead?.(id);
  };

  const handleDismiss = (id: string) => {
    setLocalNotifications((prev) => prev.filter((notif) => notif.id !== id));
    onNotificationDismiss?.(id);
  };

  const handleMarkAllRead = () => {
    setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
        return "text-[#CC2B52] dark:text-[#DE7C7D]";
      case "success":
        return "text-green-500 dark:text-green-400";
      case "achievement":
        return "text-[#AF1740] dark:text-[#CC2B52]";
      case "warning":
        return "text-yellow-500 dark:text-yellow-400";
      case "info":
      default:
        return "text-[#740938] dark:text-[#DE7C7D]";
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-[#DE7C7D]/20 transition-colors dark:hover:bg-gray-700"
      >
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 bg-[#CC2B52] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] h-4 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>
      {/* Dropdown Card */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 animate-in slide-in-from-top-2 duration-200">
          <Card className="w-96 max-w-[90vw] border-2 border-[#DE7C7D]/30 rounded-2xl shadow-xl bg-white dark:bg-gray-800">
            <CardContent className="p-0">
              {/* Header */}
              <div className="p-4 border-b border-[#DE7C7D]/30 bg-gradient-to-r from-[#DE7C7D]/10 to-white dark:from-gray-700/20 dark:to-gray-900">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-[#740938] dark:text-[#DE7C7D]" />
                    <div>
                      <h3 className="font-bold text-[#740938] dark:text-[#DE7C7D]">
                        Notifikasi
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {unreadCount > 0
                          ? `${unreadCount} belum dibaca`
                          : "Semua sudah dibaca!"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleMarkAllRead}
                        className="text-[#740938] hover:bg-[#DE7C7D]/20 text-xs px-2 py-1 h-auto dark:text-[#DE7C7D] dark:hover:bg-gray-700"
                      >
                        Tandai semua sudah dibaca
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 h-auto dark:hover:bg-gray-700 dark:text-gray-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {localNotifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <h4 className="font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      Tidak ada notifikasi
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Anda sudah mengecek semuanya!
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-[#DE7C7D]/10 dark:divide-gray-700/50">
                    {localNotifications.slice(0, 5).map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 ${getNotificationStyle(
                          notification.type,
                          notification.read
                        )} cursor-pointer`}
                        onClick={() =>
                          !notification.read && handleRead(notification.id)
                        }
                      >
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <div
                            className={`flex-shrink-0 ${getIconColor(
                              notification.type
                            )} mt-0.5`}
                          >
                            {notification.icon || <Bell className="w-4 h-4" />}
                          </div>
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4
                                  className={`text-sm font-semibold ${
                                    notification.read
                                      ? "text-gray-600 dark:text-gray-400"
                                      : "text-[#740938] dark:text-[#DE7C7D]"
                                  }`}
                                >
                                  {notification.title}
                                </h4>
                                <p
                                  className={`text-xs mt-1 ${
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
                              {/* Actions */}
                              <div className="flex items-center space-x-1 ml-2">
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-[#CC2B52] rounded-full"></div>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDismiss(notification.id);
                                  }}
                                  className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-0.5 h-auto dark:hover:bg-gray-700 dark:text-gray-500"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            {/* Action Button */}
                            {notification.actionLabel && (
                              <div className="mt-2">
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRead(notification.id);
                                    // Navigate to actionUrl
                                  }}
                                  className={`${
                                    notification.type === "urgent"
                                      ? "bg-[#CC2B52] hover:bg-[#AF1740]"
                                      : notification.type === "success"
                                      ? "bg-green-500 hover:bg-green-600"
                                      : notification.type === "achievement"
                                      ? "bg-[#AF1740] hover:bg-[#740938]"
                                      : "bg-[#740938] hover:bg-[#AF1740]"
                                  } text-white rounded-full px-3 py-1 text-xs font-medium shadow-sm hover:shadow-md transition-all`}
                                >
                                  {notification.actionLabel}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Footer */}
              {localNotifications.length > 0 && (
                <div className="p-3 border-t border-[#DE7C7D]/30 bg-gradient-to-r from-[#DE7C7D]/5 to-white dark:from-gray-700/20 dark:to-gray-900">
                  <div className="flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => (window.location.href = "/notifications")}
                      className="text-[#740938] hover:bg-[#DE7C7D]/20 text-xs px-2 py-1 h-auto dark:text-[#DE7C7D] dark:hover:bg-gray-700"
                    >
                      Lihat Semua Notifikasi
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:bg-gray-100 p-1 h-auto dark:hover:bg-gray-700 dark:text-gray-400"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default NotificationDropdown;
