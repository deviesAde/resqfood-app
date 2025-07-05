"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, CreditCard, ShoppingBag, BarChart3, Heart, Star } from "lucide-react"

export function QuickNav() {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold text-[#740938] mb-4 text-center">Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/profile">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col items-center justify-center border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-xl"
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs">Profile</span>
            </Button>
          </Link>
          <Link href="/payment">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col items-center justify-center border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent rounded-xl"
            >
              <CreditCard className="w-5 h-5 mb-1" />
              <span className="text-xs">Payment</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col items-center justify-center border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent rounded-xl relative"
            >
              <ShoppingBag className="w-5 h-5 mb-1" />
              <span className="text-xs">Cart</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
            </Button>
          </Link>
          <Link href="/charts">
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col items-center justify-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent rounded-xl"
            >
              <BarChart3 className="w-5 h-5 mb-1" />
              <span className="text-xs">Analytics</span>
            </Button>
          </Link>
        </div>

        <div className="mt-4 pt-4 border-t border-[#DE7C7D]/30">
          <div className="flex justify-center space-x-2">
            <Link href="/profile">
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-4"
              >
                <Heart className="w-3 h-3 mr-1" />
                My Account
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                size="sm"
                variant="outline"
                className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full px-4"
              >
                <Star className="w-3 h-3 mr-1" />
                Browse
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
