import { Card, CardContent } from "@/components/ui/card";
import { Zap, TrendingDown, Timer, Users } from "lucide-react";

interface HeroStatsBannerProps {
  availableItemsCount: number;
  urgentItemsCount: number;
}

export function HeroStatsBanner({
  availableItemsCount,
  urgentItemsCount,
}: HeroStatsBannerProps) {
  return (
    <div className="mb-8">
      <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-2xl shadow-lg bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] text-white">
        <CardContent className="p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-2 sm:mb-4">
              🌍 Rescue Food Marketplace
            </h1>
            <p className="text-[#DE7C7D] text-base sm:text-lg mb-4 sm:mb-6">
              Join thousands of food heroes saving the planet one meal at a time
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {availableItemsCount}
                </div>
                <div className="text-[#DE7C7D] text-xs sm:text-sm">
                  Items Available
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">52%</div>
                <div className="text-[#DE7C7D] text-xs sm:text-sm">
                  Avg. Discount
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  {urgentItemsCount}
                </div>
                <div className="text-[#DE7C7D] text-xs sm:text-sm">
                  Urgent Items
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <div className="flex items-center justify-center mb-1 sm:mb-2">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">2.8K</div>
                <div className="text-[#DE7C7D] text-xs sm:text-sm">
                  Happy Customers
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
