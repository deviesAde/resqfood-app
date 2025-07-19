"use client";

import { useState } from "react";
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

  // Dummy data for CRUD operations
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      status: "aktif",
      joinDate: "2024-01-15",
      avatar: "S",
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@email.com",
      status: "aktif",
      joinDate: "2024-01-14",
      avatar: "M",
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      email: "lisa@email.com",
      status: "diblokir",
      joinDate: "2024-01-13",
      avatar: "L",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david@email.com",
      status: "aktif",
      joinDate: "2024-01-12",
      avatar: "D",
    },
  ]);

  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "Golden Crust Bakery",
      email: "info@goldencrust.com",
      status: "terverifikasi",
      performance: "sangat baik",
      revenue: 2340,
    },
    {
      id: 2,
      name: "Fresh Valley Farm",
      email: "contact@freshvalley.com",
      status: "terverifikasi",
      performance: "baik",
      revenue: 1890,
    },
    {
      id: 3,
      name: "Roast Masters",
      email: "hello@roastmasters.com",
      status: "tertunda",
      performance: "baru",
      revenue: 0,
    },
    {
      id: 4,
      name: "Patisserie Belle",
      email: "info@patisseriebelle.com",
      status: "terverifikasi",
      performance: "sangat baik",
      revenue: 3120,
    },
  ]);

  const [flaggedProducts, setFlaggedProducts] = useState([
    {
      id: 1,
      name: "Susu Kedaluwarsa",
      seller: "Quick Mart",
      reason: "Lewat tanggal kedaluwarsa",
      severity: "tinggi",
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Roti Berjamur",
      seller: "Corner Bakery",
      reason: "Masalah kualitas",
      severity: "tinggi",
      date: "2024-01-14",
    },
    {
      id: 3,
      name: "Kedaluwarsa Tidak Jelas",
      seller: "Food Hub",
      reason: "Informasi kedaluwarsa hilang",
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

  const sidebarItems = [
    { id: "overview", label: "Ikhtisar", icon: Home },
    { id: "users", label: "Pengguna", icon: Users },
    { id: "sellers", label: "Penjual", icon: Store },
    { id: "products", label: "Produk", icon: Package },
    { id: "analytics", label: "Analitik", icon: BarChart3 },
    { id: "reports", label: "Laporan", icon: PieChart },
    { id: "messages", label: "Pesan", icon: MessageSquare },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <TopNavigation
      
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
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
        />

        <div className="flex-1 transition-all duration-300 min-h-screen w-full lg:w-auto">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
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
            {activeTab === "analytics" && <AnalyticsTab />}
            {activeTab === "reports" && <ReportsTab />}
            {activeTab === "messages" && <MessagesTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
