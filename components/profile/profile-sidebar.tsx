"use client";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, Leaf } from "lucide-react";
import Image from "next/image";

interface ProfileSidebarProps {
  profileData: {
    avatar: string;
    name: string;
    location: string;
  };
  userStats: {
    itemsRescued: number;
    memberSince: string;
    wasteReduced: number;
    co2Prevented: number;
    currentStreak: number;
  };
  totalPoints: number;
  tabs: { id: string; label: string; icon: React.ElementType }[];
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

export function ProfileSidebar({
  profileData,
  userStats,
  totalPoints,
  tabs,
  activeTab,
  setActiveTab,
}: ProfileSidebarProps) {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Kartu Profil */}
      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
        <CardContent className="p-6 text-center">
          <div className="relative inline-block mb-4">
            <Image
              src={profileData.avatar || "/placeholder.svg"}
              alt="Profil"
              width={150}
              height={150}
              className="w-24 h-24 rounded-full object-cover border-4 border-[#DE7C7D]/30 shadow-lg mx-auto dark:border-gray-700"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
              <Crown className="w-4 h-4 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-[#740938] mb-1 dark:text-gray-50">
            {profileData.name}
          </h2>
          <p className="text-gray-600 text-sm mb-3 dark:text-gray-400">
            {profileData.location}
          </p>
          <div className="flex justify-center space-x-2 mb-4">
            <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white">
              VIP
            </Badge>
            <Badge className="bg-green-500 text-white">Pahlawan Makanan</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white rounded-lg p-3 border border-[#DE7C7D]/20 dark:bg-gray-900 dark:border-gray-700">
              <div className="font-bold text-[#AF1740] text-lg">
                {userStats.itemsRescued}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Item Diselamatkan
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 border border-[#DE7C7D]/20 dark:bg-gray-900 dark:border-gray-700">
              <div className="font-bold text-[#CC2B52] text-lg">
                {totalPoints}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Poin</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigasi */}
      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="p-4">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg"
                    : "text-gray-700 hover:bg-[#DE7C7D]/20 hover:text-[#740938] dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {tab.icon && <tab.icon className="w-5 h-5" />}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </CardContent>
      </Card>

      {/* Statistik Cepat */}
      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-[#740938] text-lg flex items-center dark:text-gray-50">
            <Leaf className="w-5 h-5 mr-2" />
            Dampak Lingkungan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
            <div className="text-2xl font-bold">{userStats.wasteReduced}kg</div>
            <div className="text-green-100 text-sm">Limbah Dicegah</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-950 dark:border-blue-800">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-300">
                {userStats.co2Prevented}kg
              </div>
              <div className="text-blue-500 text-xs dark:text-blue-400">
                CO2 Dihindari
              </div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200 dark:bg-purple-950 dark:border-purple-800">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-300">
                {userStats.currentStreak}
              </div>
              <div className="text-purple-500 text-xs dark:text-purple-400">
                Hari Streak
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
