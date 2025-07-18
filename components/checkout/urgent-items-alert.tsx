import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CartItem {
  id: string;
  name: string;
  seller: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  expiryHours: number;
  category: string;
  image: string;
  urgent: boolean;
}

interface UrgentItemsAlertProps {
  urgentItems: CartItem[];
}

export function UrgentItemsAlert({ urgentItems }: UrgentItemsAlertProps) {
  if (urgentItems.length === 0) {
    return null;
  }

  return (
    <Card className="border-2 border-[#CC2B52]/50 rounded-2xl bg-gradient-to-r from-[#CC2B52]/10 to-white shadow-lg dark:from-[#740938]/20 dark:to-gray-800 dark:border-[#AF1740]/50">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-2 h-2 sm:w-3 sm:h-3 bg-[#CC2B52] rounded-full animate-pulse"></div>
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#CC2B52]" />
          <div>
            <h3 className="font-bold text-[#CC2B52] text-sm sm:text-base">
              Urgent Items Alert
            </h3>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {urgentItems.length} item{urgentItems.length > 1 ? "s" : ""}{" "}
              Segera diambil atau dibeli sebelum kedaluwarsa!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
