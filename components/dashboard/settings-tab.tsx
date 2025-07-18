import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings, Globe, Bell, Shield, Database, RefreshCw, Save } from 'lucide-react';

export function SettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100">
          Pengaturan Platform
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Konfigurasi pengaturan dan preferensi seluruh platform
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-6">
              <nav className="space-y-2">
                {[
                  { id: "general", label: "Umum", icon: Settings },
                  { id: "platform", label: "Platform", icon: Globe },
                  {
                    id: "notifications",
                    label: "Notifikasi",
                    icon: Bell,
                  },
                  { id: "security", label: "Keamanan", icon: Shield },
                  {
                    id: "integrations",
                    label: "Integrasi",
                    icon: Database,
                  },
                  {
                    id: "maintenance",
                    label: "Pemeliharaan",
                    icon: RefreshCw,
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 hover:text-[#740938] dark:hover:text-gray-100"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>
        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {/* General Settings */}
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Pengaturan Platform Umum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                        Nama Platform
                      </Label>
                      <Input
                        defaultValue="resQfood"
                        className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                        Email Dukungan
                      </Label>
                      <Input
                        defaultValue="support@resqfood.com"
                        className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                      Deskripsi Platform
                    </Label>
                    <Textarea
                      defaultValue="Menghubungkan penjual makanan dengan konsumen yang sadar untuk mengurangi limbah makanan dan menghemat uang."
                      className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                        Tingkat Komisi (%)
                      </Label>
                      <Input
                        type="number"
                        defaultValue="5"
                        className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                        Mata Uang
                      </Label>
                      <select className="w-full mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>IDR (Rp)</option>
                      </select>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            {/* Notification Settings */}
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Pengaturan Notifikasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      id: "new-users",
                      label: "Pendaftaran Pengguna Baru",
                      description:
                        "Dapatkan notifikasi saat pengguna baru bergabung dengan platform",
                    },
                    {
                      id: "seller-applications",
                      label: "Aplikasi Penjual",
                      description:
                        "Notifikasi untuk permintaan verifikasi penjual baru",
                    },
                    {
                      id: "flagged-content",
                      label: "Konten Terflag",
                      description: "Peringatan untuk produk atau pengguna yang dilaporkan",
                    },
                    {
                      id: "system-alerts",
                      label: "Peringatan Sistem",
                      description: "Notifikasi dan kesalahan sistem kritis",
                    },
                    {
                      id: "revenue-reports",
                      label: "Laporan Pendapatan",
                      description: "Ringkasan pendapatan harian dan mingguan",
                    },
                  ].map((notification) => (
                    <div
                      key={notification.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-xl"
                    >
                      <div>
                        <h4 className="font-semibold text-[#740938] dark:text-gray-100">
                          {notification.label}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {notification.description}
                        </p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center space-x-4">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-[#DE7C7D]/30 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Email
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-[#DE7C7D]/30 dark:border-gray-700 bg-white dark:bg-gray-800"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            SMS
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* Security Settings */}
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Keamanan & Kontrol Akses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                        Batas Waktu Sesi (menit)
                      </Label>
                      <Input
                        type="number"
                        defaultValue="30"
                        className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                        Maks. Percobaan Login
                      </Label>
                      <Input
                        type="number"
                        defaultValue="5"
                        className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-200 dark:border-green-900/30">
                      <div>
                        <h4 className="font-semibold text-green-800 dark:text-green-300">
                          Autentikasi Dua Faktor
                        </h4>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Keamanan yang ditingkatkan untuk akun admin
                        </p>
                      </div>
                      <Badge className="bg-green-500 text-white">Diaktifkan</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-900/30">
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                          Sertifikat SSL
                        </h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          Enkripsi koneksi aman
                        </p>
                      </div>
                      <Badge className="bg-blue-500 text-white">Aktif</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Save Settings */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Setel Ulang ke Default
              </Button>
              <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-lg px-8 shadow-lg hover:shadow-xl transition-all">
                <Save className="w-4 h-4 mr-2" />
                Simpan Semua Pengaturan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
;