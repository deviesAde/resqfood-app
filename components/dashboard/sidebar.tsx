"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarItems: Array<{
    id: string;
    label: string;
    icon: any;
    badge?: number;
  }>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  isMobile?: boolean;
}

export function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  sidebarItems,
  mobileMenuOpen,
  setMobileMenuOpen,
  isMobile = false,
}: SidebarProps) {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay - Only shown when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Combined Sidebar for both desktop and mobile */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 z-50 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700",
          "transition-all duration-300 ease-in-out",
          // Desktop behavior
          "lg:block", // Always show on desktop
          sidebarCollapsed ? "lg:w-20" : "lg:w-64", // Desktop width
          // Mobile behavior
          "lg:translate-x-0", // Always visible on desktop
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full" // Mobile slide in/out
        )}
        style={{
          width: isMobile ? "16rem" : sidebarCollapsed ? "5rem" : "16rem",
        }}
      >
        <div className="flex flex-col h-full">
          <nav
            className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            style={{
              maxHeight: "calc(100vh - 4rem)", // Account for header height
            }}
          >
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-10 flex-shrink-0 relative",
                    activeTab === item.id &&
                      "bg-[#AF1740] hover:bg-[#DE7C7D]/90 text-white",
                    sidebarCollapsed && !isMobile && "justify-center px-2"
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {(!sidebarCollapsed || isMobile) && (
                    <span className="truncate text-sm">{item.label}</span>
                  )}
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute flex items-center justify-center rounded-full h-5 w-5 text-xs",
                        activeTab === item.id
                          ? "bg-white text-[#DE7C7D]"
                          : "bg-[#AF1740] text-white",
                        sidebarCollapsed && !isMobile
                          ? "right-1 top-1"
                          : "right-3"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Collapse/Expand Button - Desktop only */}
          {!isMobile && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-3 h-10"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <>
                    <ChevronLeft className="h-5 w-5" />
                    <span className="truncate text-sm">Collapse</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
