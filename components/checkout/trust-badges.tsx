import { CheckCircle, Heart, Shield, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TrustBadges() {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardContent className="p-3 sm:p-4">
        <h3 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-2 sm:mb-3 text-base sm:text-lg text-center">
          Trusted & Secure
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg dark:bg-gray-900">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 dark:text-green-400 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              SSL Secure
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg dark:bg-gray-900">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Verified
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg dark:bg-gray-900">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#AF1740] dark:text-[#CC2B52] mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              2.8K+ Happy
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg dark:bg-gray-900">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 dark:text-yellow-400 mx-auto mb-1" />
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              4.9 Rating
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
