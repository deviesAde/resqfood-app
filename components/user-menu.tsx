"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, ShoppingBag, Settings, LogOut, Heart, Award, ChevronDown } from "lucide-react"

interface UserMenuProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
  cartItemCount?: number
  notificationCount?: number
}

export function UserMenu({
  userName = "Sarah Johnson",
  userEmail = "sarah.johnson@email.com",
  userAvatar = "/placeholder.svg?height=40&width=40",
  cartItemCount = 3,
  notificationCount = 5,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center space-x-2 hover:bg-[#DE7C7D]/20 rounded-full p-2"
      >
        <img
          src={userAvatar || "/placeholder.svg"}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover border-2 border-[#DE7C7D]/30"
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-[#740938]">{userName}</div>
          <div className="text-xs text-gray-600">VIP Member</div>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600" />
        {(cartItemCount > 0 || notificationCount > 0) && (
          <div className="absolute -top-1 -right-1 flex space-x-1">
            {cartItemCount > 0 && (
              <span className="w-3 h-3 bg-[#CC2B52] rounded-full text-xs text-white flex items-center justify-center">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
            {notificationCount > 0 && <span className="w-3 h-3 bg-blue-500 rounded-full"></span>}
          </div>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-full mt-2 w-80 border-2 border-[#DE7C7D]/30 rounded-2xl shadow-xl z-50 bg-white">
          <CardContent className="p-4">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gradient-to-r from-[#DE7C7D]/10 to-white rounded-xl">
              <img
                src={userAvatar || "/placeholder.svg"}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#DE7C7D]/30"
              />
              <div className="flex-1">
                <div className="font-semibold text-[#740938]">{userName}</div>
                <div className="text-sm text-gray-600">{userEmail}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white text-xs">VIP Member</Badge>
                  <Badge className="bg-green-500 text-white text-xs">Food Hero</Badge>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="font-bold text-[#AF1740]">127</div>
                <div className="text-xs text-gray-600">Items Rescued</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="font-bold text-green-600">45.6kg</div>
                <div className="text-xs text-gray-600">Waste Saved</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="font-bold text-blue-600">$456</div>
                <div className="text-xs text-gray-600">Money Saved</div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#DE7C7D]/20 rounded-xl">
                  <User className="w-4 h-4 mr-3" />
                  My Profile
                </Button>
              </Link>

              <Link href="/cart" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#DE7C7D]/20 rounded-xl relative">
                  <ShoppingBag className="w-4 h-4 mr-3" />
                  Shopping Cart
                  {cartItemCount > 0 && (
                    <Badge className="ml-auto bg-[#CC2B52] text-white text-xs">{cartItemCount}</Badge>
                  )}
                </Button>
              </Link>

              <Link href="/payment" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#DE7C7D]/20 rounded-xl">
                  <CreditCard className="w-4 h-4 mr-3" />
                  Payment Methods
                </Button>
              </Link>

              <Link href="/profile?tab=achievements" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#DE7C7D]/20 rounded-xl">
                  <Award className="w-4 h-4 mr-3" />
                  Achievements
                  <Badge className="ml-auto bg-yellow-500 text-white text-xs">New!</Badge>
                </Button>
              </Link>

              <Link href="/profile?tab=favorites" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#DE7C7D]/20 rounded-xl">
                  <Heart className="w-4 h-4 mr-3" />
                  Favorites
                </Button>
              </Link>

              <Link href="/profile?tab=settings" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start hover:bg-[#DE7C7D]/20 rounded-xl">
                  <Settings className="w-4 h-4 mr-3" />
                  Account Settings
                </Button>
              </Link>
            </div>

            <div className="border-t border-[#DE7C7D]/30 mt-4 pt-4">
              <div className="flex space-x-2">
                <Link href="/profile" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full"
                  >
                    View Profile
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full px-4 bg-transparent"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
