"use client";
import { useState } from "react";
import {
  Heart,
  ShoppingBag,
  Users,
  Award,
  History,
  Settings,
  Leaf,
  Target,
  Crown,
  Package,
  Star,
} from "lucide-react";
import FloatingLiveChat from "@/components/floating-live-chat";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { OverviewTab } from "@/components/profile/tabs/overview-tab";
import { AchievementsTab } from "@/components/profile/tabs/achievements-tab";
import { ActivityTab } from "@/components/profile/tabs/activity-tab";
import { FavoritesTab } from "@/components/profile/tabs/favorites-tab";
import { SettingsTab } from "@/components/profile/tabs/settings-tab";
import type {
  UserStats,
  Achievement,
  ActivityItem,
  FavoriteItem,
  ProfileData,
  TabItem,
} from "@/types/profile";
import { ProfileHeader } from "@/components/profile/profile-header";

// Data Contoh - Di aplikasi nyata, ini akan berasal dari API atau database
const userStats: UserStats = {
  itemsRescued: 127,
  totalSaved: 456.78,
  co2Prevented: 89.2,
  wasteReduced: 45.6,
  memberSince: "Januari 2024",
  currentStreak: 12,
  totalOrders: 89,
  favoriteCategory: "Produk Roti",
  totalSpent: 1234.56,
  averageRating: 4.8,
  reviewsGiven: 23,
};

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Pahlawan Makanan",
    description: "Menyelamatkan 50+ item",
    icon: <Heart className="w-6 h-6" />,
    earned: true,
    earnedDate: "15 Maret 2024",
    color: "from-[#AF1740] to-[#CC2B52]",
    points: 500,
  },
  {
    id: 2,
    title: "Pejuang Lingkungan",
    description: "Mencegah 25kg+ limbah",
    icon: <Leaf className="w-6 h-6" />,
    earned: true,
    earnedDate: "20 Maret 2024",
    color: "from-green-500 to-emerald-500",
    points: 750,
  },
  {
    id: 3,
    title: "Raja Streak",
    description: "Streak penyelamatan 10 hari",
    icon: <Target className="w-6 h-6" />,
    earned: true,
    earnedDate: "25 Maret 2024",
    color: "from-orange-500 to-red-500",
    points: 300,
  },
  {
    id: 4,
    title: "Juara Komunitas",
    description: "Mengajak 5 teman",
    icon: <Users className="w-6 h-6" />,
    earned: false,
    progress: 60,
    color: "from-purple-500 to-pink-500",
    points: 1000,
  },
  {
    id: 5,
    title: "Penabung Handal",
    description: "Memesan 100+ item",
    icon: <Package className="w-6 h-6" />,
    earned: false,
    progress: 85,
    color: "from-blue-500 to-cyan-500",
    points: 800,
  },
  {
    id: 6,
    title: "Anggota VIP",
    description: "Menghabiskan $1000+",
    icon: <Crown className="w-6 h-6" />,
    earned: true,
    earnedDate: "1 April 2024",
    color: "from-yellow-500 to-amber-500",
    points: 1500,
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: 1,
    type: "purchase",
    action: "Menyelamatkan 3 item",
    details: "Roti sourdough, croissant, dan bagel dari Golden Crust",
    timestamp: "2 jam lalu",
    impact: "Menghemat Rp175.000, mencegah 2.1kg limbah",
    amount: 175000,
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 2,
    type: "achievement",
    action: "Mendapatkan pencapaian",
    details: "Lencana Anggota VIP untuk belanja $1000+",
    timestamp: "1 hari lalu",
    impact: "Pencapaian tercapai! +1500 poin",
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: 3,
    type: "review",
    action: "Memberi ulasan",
    details: "Ulasan 5 bintang untuk Fresh Valley Farm",
    timestamp: "3 hari lalu",
    impact: "Membantu pahlawan makanan lainnya",
    rating: 5,
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: 4,
    type: "purchase",
    action: "Menyelamatkan 2 item",
    details: "Yogurt dan keju organik dari Fresh Valley",
    timestamp: "5 hari lalu",
    impact: "Menghemat Rp125.000, mencegah 1.5kg limbah",
    amount: 125000,
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 5,
    type: "referral",
    action: "Teman bergabung",
    details: "Mike Chen bergabung menggunakan kode referral Anda",
    timestamp: "1 minggu lalu",
    impact: "Mendapatkan kredit Rp70.000",
    icon: <Users className="w-4 h-4" />,
  },
];

const favoriteItems: FavoriteItem[] = [
  {
    id: 1,
    name: "Roti Tawar",
    seller: "Golden Crust Bakery",
    image: "/products/1/roti2.png",
    timesOrdered: 8,
    lastOrdered: "2 hari lalu",
  },
  {
    id: 2,
    name: "Susu Kental",
    seller: "Fresh Valley Farm",
    image: "/products/4/susu2.png",
    timesOrdered: 6,
    lastOrdered: "5 hari lalu",
  },
  {
    id: 3,
    name: "Kroisan Cokelat",
    seller: "Roast Masters",
    image: "/products/4/kroisant.png",
    timesOrdered: 4,
    lastOrdered: "1 minggu lalu",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Devies Agbe",
    email: "deviesagbe@email.com",
    phone: "+6281234567890",
    location: "Jakarta, Indonesia",
    bio: "Bersemangat mengurangi limbah makanan dan mendukung bisnis lokal. Suka menemukan rasa baru sambil membuat dampak positif untuk planet kita! 🌍",
    avatar: "/profile/profile.jpg",
    birthday: "1990-06-15",
    preferences: {
      notifications: true,
      newsletter: true,
      recommendations: true,
    },
  });

  const handleSave = () => {
    setIsEditing(false);
    // Di sini biasanya akan menyimpan ke backend
    console.log("Profil disimpan:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset data form jika diperlukan
    console.log("Edit dibatalkan.");
  };

  const totalPoints = achievements
    .filter((a) => a.earned)
    .reduce((sum, a) => sum + a.points, 0);

  const tabs: TabItem[] = [
    { id: "overview", label: "Ringkasan", icon: Users },
    { id: "achievements", label: "Pencapaian", icon: Award },
    { id: "activity", label: "Aktivitas", icon: History },
    { id: "favorites", label: "Favorit", icon: Heart },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-950">
      <ProfileHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <ProfileSidebar
            profileData={profileData}
            userStats={userStats}
            totalPoints={totalPoints}
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* Konten Utama */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === "overview" && (
              <OverviewTab
                profileData={profileData}
                setProfileData={setProfileData}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                handleSave={handleSave}
                handleCancel={handleCancel}
                userStats={userStats}
              />
            )}
            {activeTab === "achievements" && (
              <AchievementsTab
                achievements={achievements}
                totalPoints={totalPoints}
              />
            )}
            {activeTab === "activity" && (
              <ActivityTab recentActivity={recentActivity} />
            )}
            {activeTab === "favorites" && (
              <FavoritesTab favoriteItems={favoriteItems} />
            )}
            {activeTab === "settings" && (
              <SettingsTab
                profileData={profileData}
                setProfileData={setProfileData}
              />
            )}
          </div>
        </div>
      </div>
      <FloatingLiveChat />
    </div>
  );
}
