"use client";

import { Button } from "@/components/ui/button";
import {
  Home,
  Package,
  ShoppingBag,
  BarChart3,
  MessageSquare,
  CalendarIcon,
  User,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import AddProductModal from "./modals/add-product-modal";

interface SellerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dasbor", icon: Home },
  { id: "products", label: "Produk Saya", icon: Package },
  { id: "orders", label: "Pesanan", icon: ShoppingBag },
  { id: "analytics", label: "Analitik", icon: BarChart3 },
  { id: "messages", label: "Pesan", icon: MessageSquare },
  { id: "calendar", label: "Kalender", icon: CalendarIcon },
  { id: "profile", label: "Profil", icon: User },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

const sellerStats = {
  activeListings: 12,
  soldToday: 8,
  totalRating: 4.8,
  itemsRescued: 120,
  monthlyRevenue: 1247,
  totalOrders: 89,
};

export default function SellerSidebar({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
}: SellerSidebarProps) {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when tab changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [activeTab, isMobile]);

  // Mobile overlay
  if (isMobile && mobileMenuOpen) {
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Sidebar */}
        <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 border-r border-[#DE7C7D]/30 dark:border-gray-700 shadow-xl z-50 md:hidden overflow-y-auto">
          <SidebarContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            sidebarCollapsed={false}
            showAddProduct={showAddProduct}
            setShowAddProduct={setShowAddProduct}
            isMobile={true}
            onClose={() => setMobileMenuOpen(false)}
          />
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={`hidden md:block ${
        sidebarCollapsed ? "w-16 lg:w-20" : "w-64 lg:w-80"
      } bg-white dark:bg-gray-900 border-r border-[#DE7C7D]/30 dark:border-gray-700 transition-all duration-300 ease-in-out shadow-lg relative min-h-screen`}
    >
      <SidebarContent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        showAddProduct={showAddProduct}
        setShowAddProduct={setShowAddProduct}
        isMobile={false}
      />
    </div>
  );
}

function SidebarContent({
  activeTab,
  setActiveTab,
  sidebarCollapsed,
  setSidebarCollapsed,
  showAddProduct,
  setShowAddProduct,
  isMobile,
  onClose,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarCollapsed?: boolean;
  setSidebarCollapsed?: (collapsed: boolean) => void;
  showAddProduct: boolean;
  setShowAddProduct: (show: boolean) => void;
  isMobile: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Collapse Toggle (Desktop only) */}
      {!isMobile && setSidebarCollapsed && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-[#DE7C7D]/30 dark:border-gray-600 rounded-full p-1 shadow-md hover:shadow-lg transition-all z-10"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4 text-[#740938] dark:text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-[#740938] dark:text-white" />
          )}
        </Button>
      )}

      {/* Mobile Close Button */}
      {isMobile && onClose && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute right-4 top-4 z-10"
        >
          <X className="w-5 h-5" />
        </Button>
      )}

      {/* Seller Profile Card */}
      <div
        className={`p-3 sm:p-4 lg:p-6 border-b border-[#DE7C7D]/30 dark:border-gray-700 bg-gradient-to-r from-[#DE7C7D]/10 to-rose-50 dark:from-gray-800 dark:to-gray-700 ${
          !isMobile && sidebarCollapsed ? "px-2 sm:px-3" : ""
        }`}
      >
        {!sidebarCollapsed || isMobile ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm sm:text-lg">
                  T
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-[#740938] dark:text-white text-sm sm:text-base truncate">
                  Toko Roti Emas
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    {sellerStats.totalRating} rating
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center border border-[#DE7C7D]/20 dark:border-gray-600">
                <div className="font-bold text-[#AF1740]">
                  {sellerStats.activeListings}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Produk</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center border border-[#DE7C7D]/20 dark:border-gray-600">
                <div className="font-bold text-[#CC2B52]">
                  {sellerStats.totalOrders}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Pesanan</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div
        className={`p-3 sm:p-4 lg:p-6 ${
          !isMobile && sidebarCollapsed ? "px-2 sm:px-3" : ""
        }`}
      >
        <nav className="space-y-1 sm:space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${
                !isMobile && sidebarCollapsed
                  ? "justify-center px-2 sm:px-3"
                  : "space-x-3 px-3 sm:px-4"
              } py-2 sm:py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-700 hover:text-[#740938] dark:hover:text-white hover:scale-102"
              }`}
              title={!isMobile && sidebarCollapsed ? item.label : ""}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              {(isMobile || !sidebarCollapsed) && (
                <span className="font-medium text-sm sm:text-base truncate">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      {(isMobile || !sidebarCollapsed) && (
        <div className="p-3 sm:p-4 lg:p-6 border-t border-[#DE7C7D]/30 dark:border-gray-700">
          <Button
            onClick={() => setShowAddProduct(true)}
            className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Produk Baru
          </Button>
        </div>
      )}

      {/* Performance Summary */}
      {(isMobile || !sidebarCollapsed) && (
        <div className="p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 dark:from-gray-800/50 dark:to-gray-700/50 m-3 sm:m-4 lg:m-6 rounded-2xl border border-[#DE7C7D]/30 dark:border-gray-600">
          <h4 className="font-semibold text-[#740938] dark:text-white mb-3 flex items-center text-sm sm:text-base">
            <TrendingUp className="w-4 h-4 mr-2" />
            Bulan Ini
          </h4>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Item Diselamatkan:
              </span>
              <span className="font-semibold text-[#AF1740]">
                {sellerStats.itemsRescued}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Skor Dampak:
              </span>
              <span className="font-semibold text-green-600">Sangat Baik</span>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed Quick Action */}
      {!isMobile && sidebarCollapsed && (
        <div className="p-2 sm:p-3">
          <Button
            onClick={() => setShowAddProduct(true)}
            size="sm"
            className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl p-2"
            title="Tambah Produk Baru"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      )}

      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
      />
    </>
  );
}
