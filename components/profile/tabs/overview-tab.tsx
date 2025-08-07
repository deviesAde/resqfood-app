"use client";

import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Edit,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  X,
  DollarSign,
  Leaf,
  ShoppingBag,
  Target,
} from "lucide-react";

interface OverviewTabProps {
  profileData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
  };
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
  handleCancel: () => void;
  userStats: {
    totalSaved: number;
    wasteReduced: number;
    memberSince: string;
    totalOrders: number;
    currentStreak: number;
  };
}

export function OverviewTab({
  profileData,
  setProfileData,
  isEditing,
  setIsEditing,
  handleSave,
  handleCancel,
  userStats,
}: OverviewTabProps) {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-r from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#740938] mb-2 dark:text-gray-50">
                Selamat datang kembali, {profileData.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-gray-600 text-lg dark:text-gray-400">
                Anda telah menghemat{" "}
                <span className="font-bold text-[#AF1740]">
                  ${userStats.totalSaved}
                </span>{" "}
                dan mencegah{" "}
                <span className="font-bold text-green-600">
                  {userStats.wasteReduced}kg
                </span>{" "}
                sampah!
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profil
            </Button>
          </div>
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {profileData.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {profileData.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {profileData.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Member sejak {userStats.memberSince}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#740938] mb-2 dark:text-gray-50">
                  Tentang
                </h3>
                <p className="text-gray-700 leading-relaxed dark:text-gray-300">
                  {profileData.bio}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="name"
                    className="text-[#740938] font-semibold dark:text-gray-50"
                  >
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:focus:border-[#CC2B52]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="email"
                    className="text-[#740938] font-semibold dark:text-gray-50"
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:focus:border-[#CC2B52]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="text-[#740938] font-semibold dark:text-gray-50"
                  >
                    Telepon
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:focus:border-[#CC2B52]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="location"
                    className="text-[#740938] font-semibold dark:text-gray-50"
                  >
                    Lokasi
                  </Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                    className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:focus:border-[#CC2B52]"
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="bio"
                  className="text-[#740938] font-semibold dark:text-gray-50"
                >
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-50 dark:focus:border-[#CC2B52]"
                  rows={3}
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Simpan Perubahan
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full px-6 bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Batal
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-[#740938] mb-2 dark:text-gray-50">
              ${userStats.totalSaved}
            </div>
            <div className="text-gray-600 text-sm dark:text-gray-400">
              Total Penghematan
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2 dark:text-green-400">
              {userStats.wasteReduced}kg
            </div>
            <div className="text-gray-600 text-sm dark:text-gray-400">
              Sampah Dihindari
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2 dark:text-blue-400">
              {userStats.totalOrders}
            </div>
            <div className="text-gray-600 text-sm dark:text-gray-400">
              Total Pesanan
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 dark:border-gray-700">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-orange-600 mb-2 dark:text-orange-400">
              {userStats.currentStreak}
            </div>
            <div className="text-gray-600 text-sm dark:text-gray-400">
              Hari Streak
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
