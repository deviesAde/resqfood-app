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
import { ProfileHeader } from "@/components/profile/profile-header"; // Import the new ProfileHeader

// Mock Data - In a real application, this would come from an API or database
const userStats: UserStats = {
  itemsRescued: 127,
  totalSaved: 456.78,
  co2Prevented: 89.2,
  wasteReduced: 45.6,
  memberSince: "January 2024",
  currentStreak: 12,
  totalOrders: 89,
  favoriteCategory: "Baked Goods",
  totalSpent: 1234.56,
  averageRating: 4.8,
  reviewsGiven: 23,
};

const achievements: Achievement[] = [
  {
    id: 1,
    title: "Food Hero",
    description: "Rescued 50+ items",
    icon: <Heart className="w-6 h-6" />,
    earned: true,
    earnedDate: "March 15, 2024",
    color: "from-[#AF1740] to-[#CC2B52]",
    points: 500,
  },
  {
    id: 2,
    title: "Eco Warrior",
    description: "Prevented 25kg+ waste",
    icon: <Leaf className="w-6 h-6" />,
    earned: true,
    earnedDate: "March 20, 2024",
    color: "from-green-500 to-emerald-500",
    points: 750,
  },
  {
    id: 3,
    title: "Streak Master",
    description: "10 day rescue streak",
    icon: <Target className="w-6 h-6" />,
    earned: true,
    earnedDate: "March 25, 2024",
    color: "from-orange-500 to-red-500",
    points: 300,
  },
  {
    id: 4,
    title: "Community Champion",
    description: "Refer 5 friends",
    icon: <Users className="w-6 h-6" />,
    earned: false,
    progress: 60,
    color: "from-purple-500 to-pink-500",
    points: 1000,
  },
  {
    id: 5,
    title: "Bulk Saver",
    description: "Order 100+ items",
    icon: <Package className="w-6 h-6" />,
    earned: false,
    progress: 85,
    color: "from-blue-500 to-cyan-500",
    points: 800,
  },
  {
    id: 6,
    title: "VIP Member",
    description: "Spend $1000+",
    icon: <Crown className="w-6 h-6" />,
    earned: true,
    earnedDate: "April 1, 2024",
    color: "from-yellow-500 to-amber-500",
    points: 1500,
  },
];

const recentActivity: ActivityItem[] = [
  {
    id: 1,
    type: "purchase",
    action: "Rescued 3 items",
    details: "Sourdough bread, croissants, and bagels from Golden Crust",
    timestamp: "2 hours ago",
    impact: "Saved $12.50, prevented 2.1kg waste",
    amount: 12.5,
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 2,
    type: "achievement",
    action: "Earned achievement",
    details: "VIP Member badge for spending $1000+",
    timestamp: "1 day ago",
    impact: "Milestone reached! +1500 points",
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: 3,
    type: "review",
    action: "Left review",
    details: "5-star review for Fresh Valley Farm",
    timestamp: "3 days ago",
    impact: "Helped other food heroes",
    rating: 5,
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: 4,
    type: "purchase",
    action: "Rescued 2 items",
    details: "Organic yogurt and cheese from Fresh Valley",
    timestamp: "5 days ago",
    impact: "Saved $8.99, prevented 1.5kg waste",
    amount: 8.99,
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 5,
    type: "referral",
    action: "Friend joined",
    details: "Mike Chen joined using your referral code",
    timestamp: "1 week ago",
    impact: "Earned $5 credit",
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
    lastOrdered: "2 days ago",
  },
  {
    id: 2,
    name: "Susu Kental",
    seller: "Fresh Valley Farm",
    image: "/products/4/susu2.png",
    timesOrdered: 6,
    lastOrdered: "5 days ago",
  },
  {
    id: 3,
    name: "Kroisan Cokelat",
    seller: "Roast Masters",
    image: "/products/4/kroisant.png",
    timesOrdered: 4,
    lastOrdered: "1 week ago",
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "devies agbe",
    email: "deviesagbe@email.com",
    phone: "+1234567890",
    location: "Jakarta, Indonesia",
    bio: "Passionate about reducing food waste and supporting local businesses. Love discovering new flavors while making a positive impact on our planet! 🌍",
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
    // Here you would typically save to backend
    console.log("Profile saved:", profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed (e.g., fetch original data again)
    // For now, we'll just log
    console.log("Edit cancelled.");
  };

  const totalPoints = achievements
    .filter((a) => a.earned)
    .reduce((sum, a) => sum + a.points, 0);

  const tabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "activity", label: "Activity", icon: History },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-900 dark:to-gray-950">
      <ProfileHeader /> {/* Use the new ProfileHeader component */}
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
          {/* Main Content */}
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
