import type { LucideIcon } from "lucide-react";
import type { JSX } from "react"; // Declare JSX variable

export interface UserStats {
  itemsRescued: number;
  totalSaved: number;
  co2Prevented: number;
  wasteReduced: number;
  memberSince: string;
  currentStreak: number;
  totalOrders: number;
  favoriteCategory: string;
  totalSpent: number;
  averageRating: number;
  reviewsGiven: number;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  color: string;
  points: number;
}

export interface ActivityItem {
  id: number;
  type: "purchase" | "achievement" | "review" | "referral"; // Added "referral"
  action: string;
  details: string;
  timestamp: string;
  impact: string;
  amount?: number;
  rating?: number;
  icon: JSX.Element;
}

export interface FavoriteItem {
  id: number;
  name: string;
  seller: string;
  image: string;
  timesOrdered: number;
  lastOrdered: string;
}

export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
  birthday: string;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    recommendations: boolean;
  };
}

export interface TabItem {
  id: string;
  label: string;
  icon: LucideIcon;
}
