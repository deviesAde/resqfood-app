"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Apple, Heart, Leaf, Recycle, Users, Star, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FloatingLiveChat from "@/components/floating-live-chat";

export default function Component() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/auth/login.jpg"
          alt="Beautiful rescued organic vegetables and fruits in a vibrant market setting"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/85 via-[#740938]/60 to-[#AF1740]/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/90 via-transparent to-[#CC2B52]/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-items-end">
          {/* Left Side - Hero Content */}
          <div className="text-white space-y-8 hidden lg:block">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-tight">
                Save Food,
                <br />
                <span className="text-[#DE7C7D]">Save Planet</span>
              </h1>
              <p className="text-2xl opacity-90 leading-relaxed max-w-lg">
                Bergabunglah dengan gerakan mengurangi sampah makanan dengan
                belanja cerdas dan menyelamatkan lebih banyak. Temukan makanan
              </p>
            </div>

            {/* Impact Stats */}
            <div className="flex items-center space-x-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-[#AF1740] rounded-2xl mb-3">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold">2.3M+</p>
                <p className="text-sm opacity-80">Food Rescued</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-[#AF1740] rounded-2xl mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-sm opacity-80">Food Heroes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-16 h-16 bg-[#AF1740] rounded-2xl mb-3">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <p className="text-3xl font-bold">70%</p>
                <p className="text-sm opacity-80">Avg Savings</p>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src="/auth/profile/profile.png"
                  alt="Daniel Baskara. - Food rescue hero"
                  width={50}
                  height={50}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <h4 className="text-white font-semibold">Daniel Baskara</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/90 italic">
                "Belanja di resQfood bukan hanya menghemat uang, tapi juga
                membuat saya merasa baik karena menyelamatkan makanan yang
                seharusnya terbuang."
              </p>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Logo and Brand */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl mb-4 shadow-lg">
                  <Image
                    src="/logo/logo.png"
                    alt="resQfood Logo"
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Join resQfood
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  Menjadi bagian dari komunitas penyelamat makanan
                </p>
              </div>

              {/* Welcome Bonus */}
              <div className="bg-gradient-to-r from-[#AF1740]/20 to-[#CC2B52]/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#AF1740] rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        Welcome Bonus
                      </p>
                      <p className="text-white/80 text-xs">
                        Dapatkan diskon 20% untuk penyelamatan pertama Anda
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#AF1740] font-bold text-lg">20%</p>
                    <p className="text-white/60 text-xs">OFF</p>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label
                      htmlFor="firstName"
                      className="text-white/90 font-medium text-sm"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="lastName"
                      className="text-white/90 font-medium text-sm"
                    >
                      Nama Depan
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="email"
                    className="text-white/90 font-medium text-sm"
                  >
                    Alamat Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-white/90 font-medium text-sm"
                  >
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                  />
                </div>

                <div className="space-y-1">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-white/90 font-medium text-sm"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                  />
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      className="border-white/30 data-[state=checked]:bg-[#AF1740] mt-0.5"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-xs text-white/90 leading-relaxed"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-[#DE7C7D] hover:text-white font-medium underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-[#DE7C7D] hover:text-white font-medium underline"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="newsletter"
                      className="border-white/30 data-[state=checked]:bg-[#AF1740] mt-0.5"
                    />
                    <Label
                      htmlFor="newsletter"
                      className="text-xs text-white/90"
                    >
                      Send me food rescue tips and exclusive deals
                    </Label>
                  </div>
                </div>

                <Link href="/marketplace">
                  <Button
                    asChild
                    className="w-full h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl"
                  >
                    <span>Mulai Menyelamatkan</span>
                  </Button>
                </Link>

                <div className="relative">
                  <Separator className="bg-white/20" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-3 text-xs text-white/70">
                    Atau daftar dengan
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-11 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
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
                    className="h-11 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                  >
                    <Apple className="w-4 h-4 mr-2" />
                    Apple
                  </Button>
                </div>

                <div className="text-center">
                  <div className="text-xs text-white/80">
                    Sudah Menjadi Penyelamat?{" "}
                    <Link
                      href="/auth/login"
                      className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                    >
                      Masuk Sekarang
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
