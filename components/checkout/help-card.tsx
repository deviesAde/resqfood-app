import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function HelpCard() {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52] text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 dark:border-gray-700">
      <CardContent className="p-3 sm:p-4 text-center">
        <h3 className="font-semibold mb-2 text-base sm:text-lg">Need Help?</h3>
        <p className="text-[#DE7C7D] dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
          Support Kami Siap Membantu Anda
        </p>
        <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-3 sm:px-4 py-2 text-sm font-semibold shadow-lg w-full">
          Contact Support
        </Button>
      </CardContent>
    </Card>
  );
}
