"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, Shield, CreditCard, Gift } from "lucide-react";

interface SettingsTabProps {
  profileData: {
    preferences: {
      notifications: boolean;
      newsletter: boolean;
      recommendations: boolean;
    };
  };
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
}

export function SettingsTab({ profileData, setProfileData }: SettingsTabProps) {
  const handlePreferenceChange = (
    key: keyof typeof profileData.preferences
  ) => {
    setProfileData((prev: any) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key],
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-[#740938] dark:text-gray-50">
          Account Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your preferences and account security
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Notifications */}
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-[#740938] flex items-center dark:text-gray-50">
              <Bell className="w-5 h-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#740938] dark:text-gray-50">
                  Push Notifications
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified about urgent items and deals
                </p>
              </div>
              <input
                type="checkbox"
                checked={profileData.preferences.notifications}
                onChange={() => handlePreferenceChange("notifications")}
                className="toggle"
              />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#740938] dark:text-gray-50">
                  Email Newsletter
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Weekly updates and tips
                </p>
              </div>
              <input
                type="checkbox"
                checked={profileData.preferences.newsletter}
                onChange={() => handlePreferenceChange("newsletter")}
                className="toggle"
              />
            </div>
            <Separator className="dark:bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-[#740938] dark:text-gray-50">
                  Recommendations
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Personalized food suggestions
                </p>
              </div>
              <input
                type="checkbox"
                checked={profileData.preferences.recommendations}
                onChange={() => handlePreferenceChange("recommendations")}
                className="toggle"
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-[#740938] flex items-center dark:text-gray-50">
              <Shield className="w-5 h-5 mr-2" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full justify-start dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#DE7C7D]/30 text-gray-700 hover:bg-[#DE7C7D]/20 rounded-full justify-start bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Two-Factor Authentication
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#DE7C7D]/30 text-gray-700 hover:bg-[#DE7C7D]/20 rounded-full justify-start bg-transparent dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Download Data
            </Button>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-[#740938] flex items-center dark:text-gray-50">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-[#DE7C7D]/30 rounded-xl dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold dark:text-gray-50">
                      •••• •••• •••• 4242
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Expires 12/26
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Default</Badge>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Add Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52] text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:border-gray-600">
          <CardContent className="p-6 text-center">
            <Gift className="w-12 h-12 mx-auto mb-4 text-[#DE7C7D] dark:text-gray-400" />
            <h3 className="text-lg font-bold mb-2">Invite Friends</h3>
            <p className="text-[#DE7C7D] text-sm mb-4 dark:text-gray-300">
              Share the love! Get $5 credit for each friend who joins resQfood.
            </p>
            <div className="bg-white/20 rounded-lg p-3 mb-4">
              <div className="text-sm text-[#DE7C7D] mb-1 dark:text-gray-300">
                Your referral code
              </div>
              <div className="font-bold text-lg">SARAH2024</div>
            </div>
            <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-6 font-semibold shadow-lg w-full">
              Share Code
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
