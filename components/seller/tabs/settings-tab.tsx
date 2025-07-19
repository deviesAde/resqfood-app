"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Bell,
  Shield,
  CheckCircle,
  Key,
  Database,
  ChevronDown,
  Trash2,
} from "lucide-react";

export default function SettingsTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#740938] dark:text-white">
          Pengaturan Akun
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Konfigurasi preferensi akun dan pengaturan keamanan Anda
        </p>
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* General Settings */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Pengaturan Umum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base">
                    Bahasa
                  </Label>
                  <div className="mt-1 relative">
                    <select className="w-full border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg p-3 bg-white dark:bg-gray-700 dark:text-white text-sm sm:text-base">
                      <option>Bahasa Indonesia</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label className="text-[#740938] dark:text-white font-semibold text-sm sm:text-base">
                    Zona Waktu
                  </Label>
                  <div className="mt-1 relative">
                    <select className="w-full border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg p-3 bg-white dark:bg-gray-700 dark:text-white text-sm sm:text-base">
                      <option>WIB (UTC+7)</option>
                      <option>WITA (UTC+8)</option>
                      <option>WIT (UTC+9)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                
                
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Preferensi Notifikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  id: "orders",
                  label: "Pesanan Baru",
                  description:
                    "Dapatkan notifikasi saat Anda menerima pesanan baru",
                },
                {
                  id: "messages",
                  label: "Pesan Pelanggan",
                  description: "Terima peringatan untuk pesan pelanggan baru",
                },
                {
                  id: "reviews",
                  label: "Ulasan & Rating",
                  description: "Notifikasi untuk ulasan pelanggan baru",
                },
                {
                  id: "promotions",
                  label: "Promosi",
                  description: "Update tentang promosi platform dan fitur",
                },
                {
                  id: "reminders",
                  label: "Pengingat Pickup",
                  description:
                    "Pengingat tentang pickup pelanggan yang akan datang",
                },
              ].map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#DE7C7D]/10 dark:bg-gray-700 rounded-xl gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#740938] dark:text-white text-sm sm:text-base">
                      {notification.label}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {notification.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-[#DE7C7D]/30 dark:border-gray-500 dark:bg-gray-600 dark:checked:bg-[#AF1740]"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Email
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="rounded border-[#DE7C7D]/30 dark:border-gray-500 dark:bg-gray-600 dark:checked:bg-[#AF1740]"
                      />
                      <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        Push
                      </span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Keamanan & Privasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 dark:text-green-400" />
                  <div>
                    <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm sm:text-base">
                      Akun Terverifikasi
                    </h4>
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">
                      Akun Anda telah diverifikasi dan aman
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-between border-[#740938] dark:border-[#AF1740] text-[#740938] dark:text-white hover:bg-[#740938] dark:hover:bg-[#AF1740] hover:text-white rounded-lg bg-transparent text-sm sm:text-base"
                >
                  <span className="flex items-center">
                    <Key className="w-4 h-4 mr-2" />
                    Ubah Kata Sandi
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between border-[#AF1740] dark:border-green-500 text-[#AF1740] dark:text-green-500 hover:bg-[#AF1740] dark:hover:bg-green-500 hover:text-white dark:hover:text-white rounded-lg bg-transparent text-sm sm:text-base"
                >
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Autentikasi Dua Faktor
                  </span>
                  <Badge className="bg-green-500 dark:bg-green-600 text-white text-xs">
                    Aktif
                  </Badge>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-between border-[#CC2B52] dark:border-blue-500 text-[#CC2B52] dark:text-blue-500 hover:bg-[#CC2B52] dark:hover:bg-blue-500 hover:text-white dark:hover:text-white rounded-lg bg-transparent text-sm sm:text-base"
                >
                  <span className="flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Unduh Data Saya
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-2 border-red-200 dark:border-red-800 rounded-2xl shadow-lg bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400 flex items-center text-base sm:text-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Zona Berbahaya
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  Nonaktifkan Akun
                </h4>
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mb-4">
                  Nonaktifkan akun Anda sementara. Anda dapat mengaktifkannya
                  kembali kapan saja.
                </p>
                <Button
                  variant="outline"
                  className="border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-600 hover:text-white bg-transparent text-sm"
                >
                  Nonaktifkan Akun
                </Button>
              </div>
              <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-xl border border-red-300 dark:border-red-700">
                <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                  Hapus Akun
                </h4>
                <p className="text-xs sm:text-sm text-red-600 dark:text-red-400 mb-4">
                  Hapus akun Anda secara permanen beserta semua data terkait.
                  Tindakan ini tidak dapat dibatalkan.
                </p>
                <Button className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white text-sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus Akun
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
