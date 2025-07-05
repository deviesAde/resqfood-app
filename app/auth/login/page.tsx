"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Apple, Heart, Leaf, Recycle, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FloatingLiveChat from "@/components/floating-live-chat";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Welcome back food rescue hero with beautiful rescued meals"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/85 via-[#740938]/65 to-[#AF1740]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/95 via-transparent to-[#CC2B52]/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-items-end">
          {/* Left Side - Hero Content */}
          <div className="text-white space-y-8 hidden lg:block">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-tight">
                Welcome Back,
                <br />
                <span className="text-[#DE7C7D]">Food Hero!</span>
              </h1>
              <p className="text-2xl opacity-90 leading-relaxed max-w-lg">
                Continue your mission to save food and the planet, one rescue at
                a time.
              </p>
            </div>

            {/* Your Impact Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-lg">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Your Impact So Far
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#AF1740] rounded-full mb-3 mx-auto">
                    <Recycle className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold">127</p>
                  <p className="text-sm opacity-80">Meals Saved</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#AF1740] rounded-full mb-3 mx-auto">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold">$340</p>
                  <p className="text-sm opacity-80">Money Saved</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#AF1740] rounded-full mb-3 mx-auto">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold">23</p>
                  <p className="text-sm opacity-80">Friends Invited</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl mb-4 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Leaf className="w-6 h-6 text-white" />
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  Continue your food rescue mission
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-[#AF1740]/20 to-[#CC2B52]/20 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">2.3M</p>
                  <p className="text-xs text-white/70">Meals Saved</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">50K+</p>
                  <p className="text-xs text-white/70">Heroes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">70%</p>
                  <p className="text-xs text-white/70">Savings</p>
                </div>
              </div>

              {/* Login Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-12 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white/90 font-medium"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                  />
                </div>

                <Button className="w-full h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  Continue Food Rescue Mission 🚀
                </Button>

                <div className="relative">
                  <Separator className="bg-white/20" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-3 text-sm text-white/70">
                    or continue with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    Apple
                  </Button>
                </div>

                <div className="text-center space-y-3">
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-[#DE7C7D] hover:text-white font-medium transition-colors underline"
                  >
                    Forgot your password?
                  </Link>

                  <div className="text-sm text-white/80">
                    New to resQfood?{" "}
                    <Link
                      href="/register"
                      className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                    >
                      Start saving food today
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Live Chat Widget */}
      <FloatingLiveChat />
    </div>
  );
}
