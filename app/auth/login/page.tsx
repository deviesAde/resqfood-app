"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Apple, Heart, Leaf, Recycle, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FloatingLiveChat from "@/components/floating-live-chat";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Redirect based on the role received from the API
        if (data.role === "admin") {
          router.push("/admin");
        } else if (data.role === "seller") {
          router.push("/seller");
        } else {
          router.push("/marketplace"); // Default user role
        }
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/auth/login.jpg"
          alt="Selamat datang pahlawan makanan"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/85 via-[#740938]/65 to-[#AF1740]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/95 via-transparent to-[#CC2B52]/40"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-items-end">
          {/* Left Side - Hero Content */}
          <div className="text-white space-y-8 hidden lg:block">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-tight">
                Selamat Datang,
                <br />
                <span className="text-[#DE7C7D]">Pahlawan Makanan!</span>
              </h1>
              <p className="text-2xl opacity-90 leading-relaxed max-w-lg">
                Lanjutkan misi Anda untuk Save Food, Save Planet, satu makanan
                pada satu waktu.
              </p>
            </div>
            {/* Statistik Dampak */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-lg">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Dampak Anda Sejauh Ini
              </h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#AF1740] rounded-full mb-3 mx-auto">
                    <Recycle className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold">127</p>
                  <p className="text-sm opacity-80">Makanan Terselamatkan</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#AF1740] rounded-full mb-3 mx-auto">
                    <ShoppingCart className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold">Rp4.8jt</p>
                  <p className="text-sm opacity-80">Uang Tersimpan</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-14 h-14 bg-[#AF1740] rounded-full mb-3 mx-auto">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-3xl font-bold">23</p>
                  <p className="text-sm opacity-80">Teman Diundang</p>
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
                 <Image
                                    src="/logo/logo.png"
                                    alt="resQfood Logo"
                                    width={48}
                                    height={48}
                                    className="rounded-lg"
                                  />

                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Selamat Datang
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  Lanjutkan misi Save Food, Save Planet Anda
                </p>
              </div>
              {/* Statistik Cepat */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-4 bg-gradient-to-r from-[#AF1740]/20 to-[#CC2B52]/20 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">2.3Jt</p>
                  <p className="text-xs text-white/70">Makanan Terselamatkan</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">50Rb+</p>
                  <p className="text-xs text-white/70">Pahlawan</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-white">70%</p>
                  <p className="text-xs text-white/70">Penghematan</p>
                </div>
              </div>
              {/* Form Login */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90 font-medium">
                    Alamat Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@anda.com"
                    className="h-12 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-white/90 font-medium"
                  >
                    Kata Sandi
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-sm text-center">{error}</p>
                )}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Lanjutkan Misi 🚀
                </Button>
                <div className="relative">
                  <Separator className="bg-white/20" />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent px-3 text-sm text-white/70">
                    atau lanjutkan dengan
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-12 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                    type="button"
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
                    type="button"
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
                    Lupa kata sandi?
                  </Link>
                  <div className="text-sm text-white/80">
                    Baru di resQfood?{" "}
                    <Link
                      href="/register"
                      className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                    >
                      Mulai selamatkan makanan sekarang
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Live Chat Widget */}
      <FloatingLiveChat />
    </div>
  );
}
