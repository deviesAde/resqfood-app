"use client";

import { Home, Package, ShoppingBag, MessageSquare, User } from "lucide-react";

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const bottomNavItems = [
  { id: "dashboard", label: "Dasbor", icon: Home },
  { id: "products", label: "Produk", icon: Package },
  { id: "orders", label: "Pesanan", icon: ShoppingBag },
  { id: "messages", label: "Pesan", icon: MessageSquare },
  { id: "profile", label: "Profil", icon: User },
];

export default function MobileBottomNav({
  activeTab,
  setActiveTab,
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-[#DE7C7D]/30 dark:border-gray-700 z-40 md:hidden">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
              activeTab === item.id
                ? "text-[#AF1740] bg-[#DE7C7D]/10"
                : "text-gray-600 dark:text-gray-400 hover:text-[#740938] dark:hover:text-white"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
