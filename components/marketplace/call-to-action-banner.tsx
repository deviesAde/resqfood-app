import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";

export function CallToActionBanner() {
  return (
    <div className="mt-12 sm:mt-16 bg-gradient-to-r from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
      <div className="max-w-2xl mx-auto">
        <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-[#DE7C7D]" />
        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Join the Food Rescue Movement
        </h3>
        <p className="text-[#DE7C7D] mb-4 sm:mb-6 text-base sm:text-lg">
          Every purchase helps reduce food waste and supports local businesses
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-6 sm:px-8 font-semibold shadow-lg text-sm sm:text-base">
            <Users className="w-4 h-4 mr-2" />
            Join Community
          </Button>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-6 sm:px-8 font-semibold bg-transparent text-sm sm:text-base"
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
