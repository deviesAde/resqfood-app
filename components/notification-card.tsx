"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Star, CheckCircle, Clock, TrendingUp, Users } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "urgent" | "achievement"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionLabel?: string
  actionUrl?: string
  icon?: React.ReactNode
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    type: "urgent",
    title: "Urgent: Items Expiring Soon!",
    message: "5 items from Golden Crust Bakery expire in 2 hours. Rescue them now at 60% off!",
    timestamp: "2 minutes ago",
    read: false,
    actionLabel: "View Items",
    actionUrl: "/marketplace",
    icon: <Clock className="w-5 h-5" />,
  },
  {
    id: "2",
    type: "success",
    title: "Order Confirmed!",
    message: "Your order of Artisan Sourdough Bread has been confirmed. Pickup ready in 30 minutes.",
    timestamp: "15 minutes ago",
    read: false,
    actionLabel: "Track Order",
    actionUrl: "/orders",
    icon: <CheckCircle className="w-5 h-5" />,
  },
  {
    id: "3",
    type: "achievement",
    title: "Food Hero Badge Earned! 🏆",
    message: "Congratulations! You've rescued 50 items and earned the 'Food Hero' badge.",
    timestamp: "1 hour ago",
    read: false,
    actionLabel: "View Profile",
    actionUrl: "/profile",
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: "4",
    type: "info",
    title: "New Seller Joined",
    message: "Patisserie Belle just joined resQfood! Check out their fresh pastries and desserts.",
    timestamp: "3 hours ago",
    read: true,
    actionLabel: "Visit Store",
    actionUrl: "/seller/patisserie-belle",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "5",
    type: "warning",
    title: "Price Drop Alert",
    message: "Premium Coffee Beans from Roast Masters dropped to $12.99 (was $24.99). Limited time!",
    timestamp: "5 hours ago",
    read: true,
    actionLabel: "Buy Now",
    actionUrl: "/marketplace",
    icon: <TrendingUp className="w-5 h-5" />,
  },
]

interface NotificationCardProps {
  notifications?: Notification[]
  onNotificationRead?: (id: string) => void
  onNotificationDismiss?: (id: string) => void
  className?: string
}

export function NotificationCard({
  notifications = sampleNotifications,
  onNotificationRead,
  onNotificationDismiss,
  className = "",
}: NotificationCardProps) {
  const [localNotifications, setLocalNotifications] = useState(notifications)

  const handleRead = (id: string) => {
    setLocalNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    onNotificationRead?.(id)
  }

  const handleDismiss = (id: string) => {
    setLocalNotifications((prev) => prev.filter((notif) => notif.id !== id))
    onNotificationDismiss?.(id)
  }

  const getNotificationStyle = (type: Notification["type"], read: boolean) => {
    const baseStyle = `border-l-4 transition-all duration-300 hover:shadow-lg ${read ? "opacity-75" : ""}`

    switch (type) {
      case "urgent":
        return `${baseStyle} border-l-[#CC2B52] bg-gradient-to-r from-[#CC2B52]/10 to-white hover:from-[#CC2B52]/20`
      case "success":
        return `${baseStyle} border-l-green-500 bg-gradient-to-r from-green-50 to-white hover:from-green-100`
      case "achievement":
        return `${baseStyle} border-l-[#AF1740] bg-gradient-to-r from-[#AF1740]/10 to-white hover:from-[#AF1740]/20`
      case "warning":
        return `${baseStyle} border-l-yellow-500 bg-gradient-to-r from-yellow-50 to-white hover:from-yellow-100`
      case "info":
      default:
        return `${baseStyle} border-l-[#740938] bg-gradient-to-r from-[#DE7C7D]/10 to-white hover:from-[#DE7C7D]/20`
    }
  }

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "urgent":
        return "text-[#CC2B52]"
      case "success":
        return "text-green-500"
      case "achievement":
        return "text-[#AF1740]"
      case "warning":
        return "text-yellow-500"
      case "info":
      default:
        return "text-[#740938]"
    }
  }

  const unreadCount = localNotifications.filter((n) => !n.read).length

  return (
    <Card className={`border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-white ${className}`}>
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-6 border-b border-[#DE7C7D]/30 bg-gradient-to-r from-[#DE7C7D]/10 to-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bell className="w-6 h-6 text-[#740938]" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#CC2B52] text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#740938]">Notifications</h3>
                <p className="text-sm text-gray-600">{unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocalNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
              className="text-[#740938] hover:bg-[#DE7C7D]/20"
            >
              Mark all read
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          {localNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-500 mb-2">No notifications</h4>
              <p className="text-gray-400">You're all caught up! Check back later for updates.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#DE7C7D]/20">
              {localNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${getNotificationStyle(notification.type, notification.read)}`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 ${getIconColor(notification.type)} mt-1`}>
                      {notification.icon || <Bell className="w-5 h-5" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-semibold ${notification.read ? "text-gray-600" : "text-[#740938]"}`}
                          >
                            {notification.title}
                          </h4>
                          <p className={`text-sm mt-1 ${notification.read ? "text-gray-500" : "text-gray-700"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">{notification.timestamp}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => handleRead(notification.id)}
                              className="w-2 h-2 bg-[#CC2B52] rounded-full hover:bg-[#AF1740] transition-colors"
                              title="Mark as read"
                            />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDismiss(notification.id)}
                            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 h-auto"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Action Button */}
                      {notification.actionLabel && (
                        <div className="mt-3">
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
                            } text-white rounded-full px-4 text-xs font-medium shadow-sm hover:shadow-md transition-all`}
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
          <div className="p-4 border-t border-[#DE7C7D]/30 bg-gradient-to-r from-[#DE7C7D]/5 to-white">
            <Button variant="ghost" className="w-full text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full">
              View All Notifications
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
