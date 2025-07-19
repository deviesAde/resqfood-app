"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Edit, Clock } from "lucide-react";

const sellerStats = {
  totalRating: 4.8,
  totalOrders: 89,
  itemsRescued: 120,
};

export default function ProfileTab() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
          Profil Bisnis
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Kelola informasi bisnis dan profil publik Anda
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Profile Overview */}
        <div className="xl:col-span-1">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
            <CardContent className="p-4 sm:p-6 lg:p-8 dark:bg-gray-800/50">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] dark:from-[#CC2B52] dark:to-[#DE7C7D] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <span className="text-white font-bold text-lg sm:text-xl lg:text-2xl">
                      T
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 text-[#740938] dark:text-white hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-600 rounded-full p-2 shadow-lg border border-[#DE7C7D]/30 dark:border-gray-600"
                  >
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#740938] dark:text-white mb-2">
                  Toko Roti Emas
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                  Toko Roti Artisan & Spesialis Makanan Penyelamatan
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Badge className="bg-green-500 dark:bg-green-600 text-white text-xs sm:text-sm">
                    ✓ Terverifikasi
                  </Badge>
                  <Badge className="bg-[#AF1740] dark:bg-[#CC2B52] text-white text-xs sm:text-sm">
                    ★ Premium
                  </Badge>
                  <Badge className="bg-blue-500 dark:bg-blue-600 text-white text-xs sm:text-sm">
                    🏆 Rating Teratas
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#AF1740] dark:text-[#CC2B52]">
                      {sellerStats.totalRating}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#CC2B52] dark:text-[#DE7C7D]">
                      {sellerStats.totalOrders}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Pesanan
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#740938] dark:text-white">
                      {sellerStats.itemsRescued}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      Diselamatkan
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20 mt-4 sm:mt-6">
            <CardHeader className="dark:bg-gray-800/50">
              <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Jam Operasional
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:bg-gray-800/50">
              <div className="space-y-2 text-xs sm:text-sm">
                {[
                  { day: "Senin", hours: "06:00 - 18:00" },
                  { day: "Selasa", hours: "06:00 - 18:00" },
                  { day: "Rabu", hours: "06:00 - 18:00" },
                  { day: "Kamis", hours: "06:00 - 18:00" },
                  { day: "Jumat", hours: "06:00 - 20:00" },
                  { day: "Sabtu", hours: "07:00 - 20:00" },
                  { day: "Minggu", hours: "08:00 - 16:00" },
                ].map((schedule) => (
                  <div key={schedule.day} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {schedule.day}:
                    </span>
                    <span className="font-semibold text-[#740938] dark:text-white">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Details */}
        <div className="xl:col-span-2">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-white dark:bg-gray-800">
            <CardHeader className="dark:bg-gray-800">
              <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Informasi Bisnis
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:bg-gray-800">
              <form className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="businessName"
                      className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                    >
                      Nama Bisnis
                    </Label>
                    <Input
                      id="businessName"
                      defaultValue="Toko Roti Emas"
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="ownerName"
                      className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                    >
                      Nama Pemilik
                    </Label>
                    <Input
                      id="ownerName"
                      defaultValue="Budi Santoso"
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="description"
                    className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                  >
                    Deskripsi Bisnis
                  </Label>
                  <Textarea
                    id="description"
                    defaultValue="Toko roti keluarga yang mengkhususkan diri pada roti sourdough tradisional dan kue-kue. Berkomitmen mengurangi limbah makanan melalui platform resQfood."
                    className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="phone"
                      className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                    >
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      defaultValue="+62 812-3456-7890"
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="email"
                      className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                    >
                      Alamat Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="budi@tokorotiemas.com"
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="address"
                    className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                  >
                    Alamat Bisnis
                  </Label>
                  <Input
                    id="address"
                    defaultValue="Jl. Raya Utama No. 123, Jakarta Pusat 10110"
                    className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="website"
                      className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                    >
                      Website
                    </Label>
                    <Input
                      id="website"
                      defaultValue="www.tokorotiemas.com"
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="socialMedia"
                      className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base"
                    >
                      Media Sosial
                    </Label>
                    <Input
                      id="socialMedia"
                      defaultValue="@tokorotiemas"
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg bg-transparent dark:bg-transparent"
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] dark:from-[#AF1740] dark:to-[#CC2B52] dark:hover:from-[#740938] dark:hover:to-[#AF1740] text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
