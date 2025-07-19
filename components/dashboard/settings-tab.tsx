"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Shield,
  Database,
  Globe,
  Bell,
  Settings,
  RefreshCw,
} from "lucide-react";

// Type definitions
type NotificationMethod = {
  email: boolean;
  sms: boolean;
};

type NotificationType =
  | "newUsers"
  | "sellerApplications"
  | "flaggedContent"
  | "systemAlerts"
  | "revenueReports";

type NotificationSettings = {
  [K in NotificationType]: NotificationMethod;
};

interface SettingsState {
  siteName: string;
  supportEmail: string;
  siteDescription: string;
  commissionRate: string;
  currency: string;
  sessionTimeout: string;
  maxLoginAttempts: string;
  enableNotifications: boolean;
  enableUserRegistration: boolean;
  enableSellerVerification: boolean;
  maintenanceMode: boolean;
  autoApproveProducts: boolean;
  notifications: NotificationSettings;
}

export function SettingsTab() {
  const [activeSection, setActiveSection] = useState("general");
  const [settings, setSettings] = useState<SettingsState>({
    siteName: "resQfood",
    supportEmail: "support@resqfood.com",
    siteDescription:
      "Menghubungkan penjual makanan dengan konsumen yang sadar untuk mengurangi limbah makanan dan menghemat uang.",
    commissionRate: "5",
    currency: "IDR",
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    enableNotifications: true,
    enableUserRegistration: true,
    enableSellerVerification: true,
    maintenanceMode: false,
    autoApproveProducts: false,
    notifications: {
      newUsers: { email: true, sms: true },
      sellerApplications: { email: true, sms: false },
      flaggedContent: { email: true, sms: true },
      systemAlerts: { email: true, sms: true },
      revenueReports: { email: true, sms: false },
    },
  });

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotificationChange = (
    type: NotificationType,
    method: keyof NotificationMethod,
    value: boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: {
          ...prev.notifications[type],
          [method]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    // Add your save logic here
  };

  const handleReset = () => {
    // Reset to default values
    setSettings({
      siteName: "resQfood",
      supportEmail: "support@resqfood.com",
      siteDescription:
        "Menghubungkan penjual makanan dengan konsumen yang sadar untuk mengurangi limbah makanan dan menghemat uang.",
      commissionRate: "5",
      currency: "IDR",
      sessionTimeout: "30",
      maxLoginAttempts: "5",
      enableNotifications: true,
      enableUserRegistration: true,
      enableSellerVerification: true,
      maintenanceMode: false,
      autoApproveProducts: false,
      notifications: {
        newUsers: { email: true, sms: true },
        sellerApplications: { email: true, sms: false },
        flaggedContent: { email: true, sms: true },
        systemAlerts: { email: true, sms: true },
        revenueReports: { email: true, sms: false },
      },
    });
  };

  const settingsNavigation = [
    { id: "general", label: "Umum", icon: Settings },
    { id: "platform", label: "Platform", icon: Globe },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "security", label: "Keamanan", icon: Shield },
    { id: "integrations", label: "Integrasi", icon: Database },
    { id: "maintenance", label: "Pemeliharaan", icon: RefreshCw },
  ];

  const notificationTypes: Array<{
    id: NotificationType;
    label: string;
    description: string;
  }> = [
    {
      id: "newUsers",
      label: "Pendaftaran Pengguna Baru",
      description:
        "Dapatkan notifikasi saat pengguna baru bergabung dengan platform",
    },
    {
      id: "sellerApplications",
      label: "Aplikasi Penjual",
      description: "Notifikasi untuk permintaan verifikasi penjual baru",
    },
    {
      id: "flaggedContent",
      label: "Konten Terflag",
      description: "Peringatan untuk produk atau pengguna yang dilaporkan",
    },
    {
      id: "systemAlerts",
      label: "Peringatan Sistem",
      description: "Notifikasi dan kesalahan sistem kritis",
    },
    {
      id: "revenueReports",
      label: "Laporan Pendapatan",
      description: "Ringkasan pendapatan harian dan mingguan",
    },
  ];

  const renderGeneralSettings = () => (
    <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Pengaturan Platform Umum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                Nama Platform
              </Label>
              <Input
                value={settings.siteName}
                onChange={(e) =>
                  handleSettingChange("siteName", e.target.value)
                }
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                Email Dukungan
              </Label>
              <Input
                value={settings.supportEmail}
                onChange={(e) =>
                  handleSettingChange("supportEmail", e.target.value)
                }
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div>
            <Label className="text-[#740938] dark:text-gray-300 font-semibold">
              Deskripsi Platform
            </Label>
            <Textarea
              value={settings.siteDescription}
              onChange={(e) =>
                handleSettingChange("siteDescription", e.target.value)
              }
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
                value={settings.commissionRate}
                onChange={(e) =>
                  handleSettingChange("commissionRate", e.target.value)
                }
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                Mata Uang
              </Label>
              <select
                value={settings.currency}
                onChange={(e) =>
                  handleSettingChange("currency", e.target.value)
                }
                className="w-full mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg p-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="IDR">IDR (Rp)</option>
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderPlatformSettings = () => (
    <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Pengaturan Platform
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-[#740938] dark:text-gray-300 font-semibold">
              Registrasi Pengguna
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Izinkan registrasi pengguna baru
            </p>
          </div>
          <Switch
            checked={settings.enableUserRegistration}
            onCheckedChange={(checked) =>
              handleSettingChange("enableUserRegistration", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-[#740938] dark:text-gray-300 font-semibold">
              Verifikasi Penjual
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Wajibkan verifikasi untuk penjual baru
            </p>
          </div>
          <Switch
            checked={settings.enableSellerVerification}
            onCheckedChange={(checked) =>
              handleSettingChange("enableSellerVerification", checked)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-[#740938] dark:text-gray-300 font-semibold">
              Auto Approve Produk
            </Label>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Otomatis setujui produk baru
            </p>
          </div>
          <Switch
            checked={settings.autoApproveProducts}
            onCheckedChange={(checked) =>
              handleSettingChange("autoApproveProducts", checked)
            }
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderNotificationSettings = () => (
    <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Pengaturan Notifikasi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {notificationTypes.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-xl"
            >
              <div className="flex-1">
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
                    checked={settings.notifications[notification.id].email}
                    onChange={(e) =>
                      handleNotificationChange(
                        notification.id,
                        "email",
                        e.target.checked
                      )
                    }
                    className="rounded border-[#DE7C7D]/30 dark:border-gray-700 bg-white dark:bg-gray-800"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Email
                  </span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.notifications[notification.id].sms}
                    onChange={(e) =>
                      handleNotificationChange(
                        notification.id,
                        "sms",
                        e.target.checked
                      )
                    }
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
  );

  const renderSecuritySettings = () => (
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
                value={settings.sessionTimeout}
                onChange={(e) =>
                  handleSettingChange("sessionTimeout", e.target.value)
                }
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                Maks. Percobaan Login
              </Label>
              <Input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) =>
                  handleSettingChange("maxLoginAttempts", e.target.value)
                }
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-[#740938] dark:text-gray-300 font-semibold">
                Mode Maintenance
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Aktifkan mode pemeliharaan situs
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) =>
                handleSettingChange("maintenanceMode", checked)
              }
            />
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
  );

  const renderIntegrationsSettings = () => (
    <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Integrasi & API
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Payment Gateway
              </span>
              <Badge className="bg-green-500 text-white">Terhubung</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Email Service
              </span>
              <Badge className="bg-green-500 text-white">Aktif</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                SMS Gateway
              </span>
              <Badge className="bg-yellow-500 text-white">Pending</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Analytics
              </span>
              <Badge className="bg-green-500 text-white">Terhubung</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderMaintenanceSettings = () => (
    <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-gray-100 flex items-center">
          <RefreshCw className="w-5 h-5 mr-2" />
          Pemeliharaan Sistem
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Versi Sistem
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                v2.1.0
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Database
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                MySQL 8.0
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Server
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Nginx 1.20
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm font-medium text-[#740938] dark:text-gray-100">
                Last Backup
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                2024-01-15 10:30
              </span>
            </div>
          </div>
          <div className="pt-4">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <RefreshCw className="w-4 h-4 mr-2" />
              Jalankan Backup Sekarang
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "general":
        return renderGeneralSettings();
      case "platform":
        return renderPlatformSettings();
      case "notifications":
        return renderNotificationSettings();
      case "security":
        return renderSecuritySettings();
      case "integrations":
        return renderIntegrationsSettings();
      case "maintenance":
        return renderMaintenanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-4 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#740938] dark:text-gray-100">
          Pengaturan Platform
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Konfigurasi pengaturan dan preferensi seluruh platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900">
            <CardContent className="p-4 sm:p-6">
              <nav className="space-y-2">
                {settingsNavigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl transition-all duration-200 text-left ${
                      activeSection === item.id
                        ? "bg-[#DE7C7D]/30 text-[#740938] dark:text-gray-100 font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 hover:text-[#740938] dark:hover:text-gray-100"
                    }`}
                  >
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <span className="font-medium text-sm sm:text-base">
                      {item.label}
                    </span>
                  </button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="space-y-6 sm:space-y-8">
            {renderContent()}

            {/* Save Settings */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-lg bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 w-full sm:w-auto"
              >
                Setel Ulang ke Default
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-lg px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
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
