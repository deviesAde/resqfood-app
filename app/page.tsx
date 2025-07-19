"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Leaf,
  Users,
  ShoppingCart,
  Clock,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Globe,
  Shield,
  Gift,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FloatingLiveChat from "@/components/floating-live-chat";
import HeaderLanding from "@/components/header-landing";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* Navigation */}
      <HeaderLanding />

      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/landing/hero.jpg"
            alt="Makanan segar yang diselamatkan"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/80 via-[#740938]/60 to-[#AF1740]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/90 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-4 md:mb-6 bg-gradient-to-r from-[#DE7C7D] to-[#CC2B52] text-white px-4 md:px-6 py-1 md:py-2 text-sm md:text-base rounded-full shadow-lg animate-pulse-slow hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 mr-2" />
              🌱 Bergabunglah dengan Gerakan Kami
            </Badge>

            {/* Responsive Heading Structure */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight drop-shadow-2xl">
              <div className="text-white">Setiap Detik Berharga.</div>
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#DE7C7D] to-[#FFD700] animate-gradient">
                Selamatkan Makanan.
              </div>
              <div className="bg-clip-text text-transparent bg-gradient-to-r from-[#CC2B52] to-[#FF6347] animate-gradient-delay">
                Selamatkan Bumi.
              </div>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md px-2 sm:px-0">
              Bantu selamatkan makanan yang hampir kedaluwarsa namun masih layak
              konsumsi. Dengan berbelanja cerdas di resQfood, Anda tidak hanya
              mendapatkan makanan berkualitas dengan harga terjangkau, tetapi
              juga ikut berkontribusi dalam mengurangi limbah makanan dan dampak
              negatif terhadap lingkungan.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 md:mb-12 px-4 sm:px-0">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group w-full sm:w-auto"
                asChild
              >
                <Link
                  href="/marketplace"
                  className="flex items-center justify-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Jelajahi Makanan Diselamatkan
                  </span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg transition-all duration-300 transform hover:scale-105 bg-transparent shadow-lg hover:shadow-xl group w-full sm:w-auto"
                asChild
              >
                <Link
                  href="/seller"
                  className="flex items-center justify-center"
                >
                  <span className="group-hover:translate-x-1 transition-transform">
                    Jadi Penjual
                  </span>
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Responsive Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
              {[
                {
                  value: "2.3Jt+",
                  label: "Makanan Diselamatkan",
                  icon: <Heart className="w-4 h-4 sm:w-5 sm:h-5" />,
                },
                {
                  value: "50Rb+",
                  label: "Pahlawan Makanan",
                  icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
                },
                {
                  value: "70%",
                  label: "Rata-rata Penghematan",
                  icon: <Gift className="w-4 h-4 sm:w-5 sm:h-5" />,
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.03] transform"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-1 sm:mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 animate-countup">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white mt-1 sm:mt-2 rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Impact Highlights with Floating Animation */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 sm:w-64 h-40 sm:h-64 bg-[#DE7C7D]/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-[#740938]/10 rounded-full blur-2xl sm:blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <Badge className="mb-3 sm:mb-4 bg-[#DE7C7D]/20 text-[#740938] dark:text-[#DE7C7D] border border-[#DE7C7D]/30 px-3 sm:px-4 py-1 text-xs sm:text-sm">
              Dampak Kami
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#740938] dark:text-[#DE7C7D] mb-3 sm:mb-4 leading-tight">
              Misi Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Bersama-sama, kami membuat perbedaan nyata untuk planet dan
              komunitas kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                value: "10.000+",
                title: "Makanan Per Hari",
                description:
                  "Target kami: Selamatkan 10.000+ makanan setiap hari untuk mengurangi sampah makanan secara signifikan.",
                trend: "+23% bulan ini",
                bg: "from-[#AF1740] to-[#CC2B52]",
              },
              {
                icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                value: "50Rb+",
                title: "Komunitas",
                description:
                  "Target kami: Tumbuh menjadi 50Rb+ Pahlawan Makanan aktif, membina komunitas yang hidup.",
                trend: "+15% bulan ini",
                bg: "from-[#740938] to-[#AF1740]",
              },
              {
                icon: <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-white" />,
                value: "90%",
                title: "Pengurangan",
                description:
                  "Target kami: Capai 90% lebih sedikit sampah makanan, berkontribusi langsung pada keberlanjutan lingkungan.",
                trend: "Target tercapai",
                bg: "from-[#CC2B52] to-[#DE7C7D]",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 bg-white dark:bg-gray-900 group overflow-hidden"
              >
                <div className="relative h-full">
                  <div
                    className={`absolute -top-10 -right-10 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br ${item.bg} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-105 sm:group-hover:scale-110 transition-transform`}
                    >
                      {item.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-2 sm:mb-3 text-center">
                      {item.value}
                    </h3>
                    <h4 className="text-lg sm:text-xl font-semibold text-center mb-2 sm:mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg text-center mb-3 sm:mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-center text-green-600 font-medium text-sm sm:text-base">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span>{item.trend}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works with Interactive Steps */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-800 dark:to-gray-900 relative">
        <div className="absolute top-0 left-0 w-full h-12 sm:h-20 bg-gradient-to-b from-white dark:from-gray-950 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-12 sm:h-20 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10"></div>

        <div className="max-w-6xl mx-auto relative z-0">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <Badge className="mb-3 sm:mb-4 bg-[#DE7C7D]/20 text-[#740938] dark:text-[#DE7C7D] border border-[#DE7C7D]/30 px-3 sm:px-4 py-1 text-xs sm:text-sm">
              Mudah Digunakan
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#740938] dark:text-[#DE7C7D] mb-3 sm:mb-4 leading-tight">
              Cara Kerjanya
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Langkah sederhana untuk membuat dampak besar pada sampah makanan
              dan dompet Anda.
            </p>
          </div>

          <div className="relative">
            {/* Timeline */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#DE7C7D]/20 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
              {[
                {
                  step: "1",
                  icon: (
                    <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  ),
                  title: "Temukan",
                  description:
                    "Temukan makanan berkualitas yang mendekati kadaluarsa dengan diskon menakjubkan dari penjual lokal, mencegahnya terbuang.",
                  bg: "from-[#AF1740] to-[#CC2B52]",
                },
                {
                  step: "2",
                  icon: (
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  ),
                  title: "Beli Cerdas",
                  description:
                    "Beli dengan diskon besar dan berkontribusi aktif mengurangi sampah makanan di komunitas Anda.",
                  bg: "from-[#740938] to-[#AF1740]",
                },
                {
                  step: "3",
                  icon: (
                    <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  ),
                  title: "Nikmati",
                  description:
                    "Terima dengan aman, makan dengan cerdas, dan rasakan dampak positif Anda pada lingkungan dan bisnis lokal.",
                  bg: "from-[#CC2B52] to-[#DE7C7D]",
                },
              ].map((step, index) => (
                <div key={index} className="text-center group relative">
                  <div className="relative mb-6 sm:mb-8 mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.bg} rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105`}
                    >
                      {step.icon}
                    </div>
                    <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base md:text-lg border-2 sm:border-3 md:border-4 border-white shadow-lg group-hover:animate-pulse">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-2 sm:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Swiper Effect */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="absolute -top-20 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-[#740938]/10 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-[#CC2B52]/10 rounded-full blur-2xl sm:blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <Badge className="mb-3 sm:mb-4 bg-[#DE7C7D]/20 text-[#740938] dark:text-[#DE7C7D] border border-[#DE7C7D]/30 px-3 sm:px-4 py-1 text-xs sm:text-sm">
              Testimoni
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#740938] dark:text-[#DE7C7D] mb-3 sm:mb-4 leading-tight">
              Suara Komunitas
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Dengarkan langsung dari pahlawan makanan kami yang membuat
              perbedaan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                initial: "S",
                name: "Sarah M.",
                role: "Pengguna",
                testimoni:
                  "Aplikasi ini membantu saya menghemat uang dan mengurangi sampah makanan. Saya senang bisa membuat perbedaan nyata untuk planet ini!",
                bg: "from-[#AF1740] to-[#CC2B52]",
              },
              {
                initial: "M",
                name: "Michael T.",
                role: "Pemilik Toko Roti",
                testimoni:
                  "resQfood membantu saya mengurangi limbah sekaligus menjangkau pelanggan baru yang menghargai makanan berkualitas dengan harga terjangkau.",
                bg: "from-[#740938] to-[#AF1740]",
              },
              {
                initial: "L",
                name: "Lisa K.",
                role: "Ibu Rumah Tangga",
                testimoni:
                  "Diskon menakjubkan untuk makanan segar! Saya menghemat ratusan ribu sambil makan lebih baik dan membantu mengurangi sampah makanan.",
                bg: "from-[#CC2B52] to-[#DE7C7D]",
              },
            ].map((testi, index) => (
              <Card
                key={index}
                className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl sm:rounded-3xl hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-3 bg-white dark:bg-gray-900 group overflow-hidden"
              >
                <div className="relative h-full">
                  <div
                    className={`absolute -bottom-20 -right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br ${testi.bg} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div
                        className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${testi.bg} rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-lg text-xl sm:text-2xl font-bold text-white`}
                      >
                        {testi.initial}
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg sm:text-xl text-[#740938] dark:text-[#DE7C7D]">
                          {testi.name}
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {testi.role}
                        </p>
                        <div className="flex text-yellow-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 italic text-sm sm:text-base md:text-lg leading-relaxed">
                      "{testi.testimoni}"
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/landing/food-pattern.svg')] opacity-10 animate-float"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#740938]/90 via-[#740938]/70 to-[#AF1740]/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#740938] via-transparent to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <Badge className="mb-4 sm:mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 sm:px-6 py-1 sm:py-2 text-sm sm:text-base rounded-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Bergabung Sekarang
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight drop-shadow-2xl">
            Siap Menjadi Pahlawan Makanan?
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 opacity-90 max-w-2xl mx-auto">
            Bergabung dengan ribuan orang yang membuat perubahan, satu makanan
            terselamatkan pada satu waktu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#740938] hover:bg-gray-100 rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group w-full sm:w-auto"
              asChild
            >
              <Link
                href="/auth/register"
                className="flex items-center justify-center"
              >
                <Sparkles className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform" />
                Mulai Menyelamatkan Hari Ini
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-bold hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-transparent shadow-md sm:shadow-lg group w-full sm:w-auto"
              asChild
            >
              <Link
                href="/marketplace"
                className="flex items-center justify-center"
              >
                <Globe className="mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform" />
                Jelajahi Marketplace
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[#740938] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/landing/footer-pattern.svg')] opacity-10"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-lg flex items-center justify-center shadow-lg">
                  <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-xl sm:text-2xl font-bold">resQfood</span>
              </div>
              <p className="text-[#DE7C7D] mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                Selamatkan Makanan. Selamatkan Bumi.
              </p>
              <div className="flex space-x-2 sm:space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#DE7C7D] hover:text-white hover:bg-[#AF1740]/30 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Facebook className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#DE7C7D] hover:text-white hover:bg-[#AF1740]/30 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Twitter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[#DE7C7D] hover:text-white hover:bg-[#AF1740]/30 rounded-full h-8 w-8 sm:h-10 sm:w-10"
                >
                  <Instagram className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 md:mb-6 flex items-center">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#DE7C7D]" />
                Navigasi
              </h4>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { label: "Tentang Kami", href: "#" },
                  { label: "Marketplace", href: "/marketplace" },
                  { label: "Blog", href: "/artikel" },
                ].map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="text-[#DE7C7D] hover:text-white transition-colors text-xs sm:text-sm md:text-base flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 md:mb-6 flex items-center">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#DE7C7D]" />
                Save World with us
              </h4>
            </div>

            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 md:mb-6 flex items-center">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#DE7C7D]" />
                Newsletter
              </h4>
              <p className="text-[#DE7C7D] mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base">
                Dapatkan update terbaru tentang misi kami
              </p>
              <div className="flex">
                <Input
                  placeholder="Email Anda"
                  className="rounded-l-full border-[#AF1740] bg-white/10 text-white placeholder:text-[#DE7C7D] focus:ring-2 focus:ring-[#DE7C7D] focus:border-transparent text-xs sm:text-sm h-10 sm:h-12"
                />
                <Button className="bg-[#AF1740] hover:bg-[#CC2B52] rounded-r-full px-3 sm:px-4 transition-colors h-10 sm:h-12">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#AF1740] mt-8 sm:mt-12 md:mt-16 pt-6 sm:pt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-[#DE7C7D] text-xs sm:text-sm mb-3 sm:mb-0">
                &copy; 2024 resQfood. Semua hak dilindungi. Dibuat dengan ❤️
                untuk bumi.
              </p>
              <div className="flex space-x-4 sm:space-x-6">
                <Link
                  href="#"
                  className="text-[#DE7C7D] hover:text-white text-xs sm:text-sm transition-colors"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  href="#"
                  className="text-[#DE7C7D] hover:text-white text-xs sm:text-sm transition-colors"
                >
                  Syarat Layanan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Live Chat Widget */}
      <FloatingLiveChat />

      {/* Add these animations to your global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-7px);
          }
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 7s ease-in-out infinite 1s;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-gradient-delay {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite 0.5s;
        }
        .animate-pulse-slow {
          animation: pulse 3s ease infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-countup {
          animation: countUp 1s ease-out forwards;
        }
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(6px);
            opacity: 0;
          }
        }
        .animate-scroll {
          animation: scroll 1.5s infinite;
        }
      `}</style>
    </div>
  );
}
