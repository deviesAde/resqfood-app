import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { JSX } from "react";

interface ActivityItem {
  id: number;
  type: "purchase" | "achievement" | "review" | "referral";
  action: string;
  details: string;
  timestamp: string;
  impact: string;
  amount?: number;
  rating?: number;
  icon: JSX.Element;
}

interface ActivityTabProps {
  recentActivity: ActivityItem[];
}

export function ActivityTab({ recentActivity }: ActivityTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#740938] dark:text-gray-50">
            Aktivitas Terkini
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Perjalanan penyelamatan makanan Anda
          </p>
        </div>
        <Button
          variant="outline"
          className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Ekspor Riwayat
        </Button>
      </div>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <Card
            key={activity.id}
            className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === "purchase"
                      ? "bg-gradient-to-br from-[#AF1740] to-[#CC2B52]"
                      : activity.type === "achievement"
                      ? "bg-gradient-to-br from-yellow-500 to-amber-500"
                      : activity.type === "review"
                      ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                      : "bg-gradient-to-br from-purple-500 to-pink-500"
                  } text-white`}
                >
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-[#740938] text-lg dark:text-gray-50">
                        {activity.action}
                      </h4>
                      <p className="text-gray-600 mt-1 dark:text-gray-400">
                        {activity.details}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.timestamp}
                        </span>
                        {activity.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(activity.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <div className="font-bold text-[#AF1740] text-lg">
                          Rp{activity.amount.toLocaleString("id-ID")}
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className="text-[#AF1740] border-[#AF1740] bg-white/80 text-xs mt-1"
                      >
                        {activity.impact}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
