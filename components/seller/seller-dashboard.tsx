"use client";

import { useState, useEffect } from "react";
import SellerTopNav from "./seller-top-nav";
import SellerSidebar from "./seller-sidebar";
import DashboardTab from "./tabs/dashboard-tab";
import ProductsTab from "./tabs/products-tab";
import OrdersTab from "./tabs/orders-tab";
import MessagesTab from "./tabs/messages-tab";
import CalendarTab from "./tabs/calendar-tab";
import ProfileTab from "./tabs/profile-tab";
import SettingsTab from "./tabs/settings-tab";
import AnalyticsTab from "./tabs/analytics-tab";
import MobileBottomNav from "./mobile-bottom-nav";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab />;
      case "products":
        return <ProductsTab />;
      case "orders":
        return <OrdersTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "messages":
        return <MessagesTab />;
      case "calendar":
        return <CalendarTab />;
      case "profile":
        return <ProfileTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      <SellerTopNav
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      <div className="flex">
        <SellerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />

        <div className="flex-1 transition-all duration-300 min-w-0">
          <div
            className={`max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 ${
              isMobile ? "pb-20" : ""
            }`}
          >
            {renderActiveTab()}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <MobileBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
    </div>
  );
}
