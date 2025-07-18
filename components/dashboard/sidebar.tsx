"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarItems: { id: string; label: string; icon: React.ElementType }[];
}

export function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  sidebarItems,
}: SidebarProps) {
  return (
    <div
      className={`${
        sidebarCollapsed ? "w-20" : "w-80"
      } bg-white dark:bg-gray-900 border-r border-[#DE7C7D]/30 dark:border-gray-700 transition-all duration-300 ease-in-out shadow-lg relative min-h-screen`}
    >
      {/* Collapse Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-[#DE7C7D]/30 dark:border-gray-700 rounded-full p-1 shadow-md hover:shadow-lg transition-all z-10"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="w-4 h-4 text-[#740938] dark:text-gray-300" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#740938] dark:text-gray-300" />
        )}
      </Button>
      {/* Admin Info */}
      <div
        className={`p-6 border-b border-[#DE7C7D]/30 dark:border-gray-700 ${
          sidebarCollapsed ? "px-3" : ""
        }`}
      >
        {!sidebarCollapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#740938] dark:text-gray-100">
                Panel Admin
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Super Administrator
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className={`p-6 ${sidebarCollapsed ? "px-3" : ""}`}>
        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center ${
                sidebarCollapsed ? "justify-center px-3" : "space-x-3 px-4"
              } py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 hover:text-[#740938] dark:hover:text-gray-100 hover:scale-102"
              }`}
              title={sidebarCollapsed ? item.label : ""}
            >
              {React.createElement(item.icon, { className: "w-5 h-5" })}
              {!sidebarCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
      {/* Quick Stats */}
      {!sidebarCollapsed && (
        <div className="p-6 bg-gradient-to-br from-[#DE7C7D]/20 to-[#AF1740]/10 m-6 rounded-2xl dark:from-gray-800 dark:to-gray-700">
          <h4 className="font-semibold text-[#740938] dark:text-gray-100 mb-3">
            Kesehatan Platform
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Pengguna Aktif:
              </span>
                <span className="font-semibold text-[#CC2B52]">1,234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Pendapatan:
              </span>
                <span className="font-semibold text-[#CC2B52]">RP.12,345,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className="font-semibold text-green-600">Sehat</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
