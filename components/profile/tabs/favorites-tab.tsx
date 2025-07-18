import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import Image from "next/image";

interface FavoriteItem {
  id: number;
  name: string;
  seller: string;
  image: string;
  timesOrdered: number;
  lastOrdered: string;
}

interface FavoritesTabProps {
  favoriteItems: FavoriteItem[];
}

export function FavoritesTab({ favoriteItems }: FavoritesTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#740938] dark:text-gray-50">
            Favorite Items
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Items you love to rescue
          </p>
        </div>
        <Button
          variant="outline"
          className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <Share className="w-4 h-4 mr-2" />
          Share Favorites
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteItems.map((item) => (
          <Card
            key={item.id}
            className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 rounded-xl object-cover border border-[#DE7C7D]/30 dark:border-gray-700"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#740938] mb-1 dark:text-gray-50">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.seller}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Times ordered:
                  </span>
                  <span className="font-semibold text-[#AF1740]">
                    {item.timesOrdered}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Last ordered:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.lastOrdered}
                  </span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full">
                Order Again
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
