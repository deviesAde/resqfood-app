"use client";
import { useState, useEffect } from "react";
import {
  Users,
  Store,
  Package,
  BarChart3,
  PieChart,
  Settings,
  Home,
  MessageSquare,
} from "lucide-react";
import { TopNavigation } from "@/components/dashboard/top-navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { OverviewTab } from "@/components/dashboard/overview-tab";
import { UsersTab } from "@/components/dashboard/users-tab";
import { SellersTab } from "@/components/dashboard/sellers-tab";
import { ProductsTab } from "@/components/dashboard/products-tab";
import { AnalyticsTab } from "@/components/dashboard/analitics-tab";
import { ReportsTab } from "@/components/dashboard/reports-tab";
import { MessagesTab } from "@/components/dashboard/messages-tab";
import { SettingsTab } from "@/components/dashboard/settings-tab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dummy data for CRUD operations
  // Dummy data untuk operasi CRUD
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dewi Lestari",
      email: "dewi.lestari@email.com",
      status: "aktif",
      joinDate: "2024-01-15",
      avatar: "D",
    },
    {
      id: 2,
      name: "Andi Wijaya",
      email: "andi.wijaya@email.com",
      status: "aktif",
      joinDate: "2024-01-14",
      avatar: "A",
    },
    {
      id: 3,
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@email.com",
      status: "diblokir",
      joinDate: "2024-01-13",
      avatar: "S",
    },
    {
      id: 4,
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      status: "aktif",
      joinDate: "2024-01-12",
      avatar: "B",
    },
  ]);

  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Warung Bu Tini",
      email: "butini@warungku.id",
      status: "terverifikasi",
      performance: "sangat baik",
      revenue: 2340000,
    },
    {
      id: 2,
      name: "Kopi Nusantara",
      email: "info@kopinusantara.id",
      status: "terverifikasi",
      performance: "baik",
      revenue: 1890000,
    },
    {
      id: 3,
      name: "Dapur Mama Ina",
      email: "contact@mamaina.co.id",
      status: "tertunda",
      performance: "baru",
      revenue: 0,
    },
    {
      id: 4,
      name: "Toko Oleh-Oleh Malang",
      email: "admin@oleholehmalang.id",
      status: "terverifikasi",
      performance: "sangat baik",
      revenue: 3120000,
    },
  ]);

  const [flaggedProducts, setFlaggedProducts] = useState([
    {
      id: 1,
      name: "Keripik Singkong Kadaluarsa",
      seller: "Warung Bu Tini",
      reason: "Tanggal kedaluwarsa sudah lewat",
      severity: "tinggi",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Sambal Botolan Berjamur",
      seller: "Dapur Mama Ina",
      reason: "Ada jamur dalam kemasan",
      severity: "tinggi",
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Label Kadaluarsa Tidak Jelas",
      seller: "Toko Oleh-Oleh Malang",
      reason: "Informasi tanggal kedaluwarsa tidak terlihat",
      severity: "sedang",
      date: "2024-01-13",
    },
  ]);

  const stats = {
    totalUsers: users.length,
    activeSellers: sellers.filter((s) => s.status === "terverifikasi").length,
    productsListed: 1234,
    ordersTracked: 8956,
    monthlyRevenue: 45678,
    totalRevenue: 234567,
  };

  // Enhanced sidebar items with badges for notifications
  const sidebarItems = [
    { id: "overview", label: "Ringkasan", icon: Home },
    {
      id: "users",
      label: "Pengguna",
      icon: Users,
      badge:
        users.filter((u) => u.status === "tertunda").length > 0
          ? users.filter((u) => u.status === "tertunda").length
          : undefined,
    },
    {
      id: "sellers",
      label: "Penjual",
      icon: Store,
      badge:
        sellers.filter((s) => s.status === "tertunda").length > 0
          ? sellers.filter((s) => s.status === "tertunda").length
          : undefined,
    },
    {
      id: "products",
      label: "Produk",
      icon: Package,
      badge:
        flaggedProducts.filter((p) => p.severity === "tinggi").length > 0
          ? flaggedProducts.filter((p) => p.severity === "tinggi").length
          : undefined,
    },
    { id: "analytics", label: "Analitik", icon: BarChart3 },
    { id: "reports", label: "Laporan", icon: PieChart },
    {
      id: "messages",
      label: "Pesan",
      icon: MessageSquare,
      badge: 3, // Mock unread messages
    },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <TopNavigation
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex relative">
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        <Sidebar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarItems={sidebarItems}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isMobile={isMobile}
        />

        <div
          className={`flex-1 transition-all duration-300 min-h-screen ${
            sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
          } ${mobileMenuOpen ? "ml-64" : "ml-0"}`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Home className="w-4 h-4" />
                <span>/</span>
                <span className="capitalize text-[#740938] dark:text-[#DE7C7D] font-medium">
                  {sidebarItems.find((item) => item.id === activeTab)?.label}
                </span>
              </div>
            </div>

            {activeTab === "overview" && (
              <OverviewTab stats={stats} flaggedProducts={flaggedProducts} />
            )}
            {activeTab === "users" && (
              <UsersTab users={users} setUsers={setUsers} />
            )}
            {activeTab === "sellers" && (
              <SellersTab sellers={sellers} setSellers={setSellers} />
            )}
            {activeTab === "products" && (
              <ProductsTab
                flaggedProducts={flaggedProducts}
                setFlaggedProducts={setFlaggedProducts}
              />
            )}
            {activeTab === "analytics" && <AnalyticsTab stats={stats} />}
            {activeTab === "reports" && <ReportsTab />}
            {activeTab === "messages" && <MessagesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
