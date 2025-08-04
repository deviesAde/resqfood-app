"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
}

export function Sidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
  activeTab,
  setActiveTab,
  sidebarItems,
  mobileMenuOpen,
  setMobileMenuOpen,
}: SidebarProps) {
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false); // Close mobile menu when tab is selected
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300",
          "fixed top-16 left-0 bottom-0 z-40",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          <nav
            className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            style={{
              maxHeight: "calc(100vh - 4rem)", // Subtract the height of the header (top-16)
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
                      "bg-[#DE7C7D] hover:bg-[#DE7C7D]/90 text-white",
                    sidebarCollapsed && "justify-center px-2"
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="truncate text-sm">{item.label}</span>
                  )}
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute flex items-center justify-center rounded-full h-5 w-5 text-xs",
                        activeTab === item.id
                          ? "bg-white text-[#DE7C7D]"
                          : "bg-[#DE7C7D] text-white",
                        sidebarCollapsed ? "right-1 top-1" : "right-3"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-16 left-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <nav
            className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            style={{
              maxHeight: "calc(100vh - 4rem)", // Subtract the height of the header (top-16)
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
                      "bg-[#DE7C7D] hover:bg-[#DE7C7D]/90 text-white"
                  )}
                  onClick={() => handleTabClick(item.id)}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate text-sm">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "absolute right-3 flex items-center justify-center rounded-full h-5 w-5 text-xs",
                        activeTab === item.id
                          ? "bg-white text-[#DE7C7D]"
                          : "bg-[#DE7C7D] text-white"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
