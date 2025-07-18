import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { JSX } from "react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  earned: boolean;
  earnedDate?: string;
  color: string;
  points: number;
  progress?: number;
}

interface AchievementsTabProps {
  achievements: Achievement[];
  totalPoints: number;
}

export function AchievementsTab({
  achievements,
  totalPoints,
}: AchievementsTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#740938] dark:text-gray-50">
            Achievements
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and unlock rewards
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#AF1740]">
            {totalPoints} Points
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {achievements.filter((a) => a.earned).length} of{" "}
            {achievements.length} earned
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`border-2 rounded-2xl transition-all duration-300 hover:shadow-xl ${
              achievement.earned
                ? "border-transparent bg-gradient-to-br " +
                  achievement.color +
                  " text-white shadow-lg hover:scale-105"
                : "border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full ${
                      achievement.earned
                        ? "bg-white/20"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {achievement.earned ? (
                      achievement.icon
                    ) : (
                      <div className="w-6 h-6 text-gray-400">
                        {achievement.icon}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3
                      className={`font-bold text-lg ${
                        achievement.earned
                          ? "text-white"
                          : "text-gray-600 dark:text-gray-50"
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        achievement.earned
                          ? "text-white/80"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.earned && (
                  <CheckCircle className="w-6 h-6 text-white/80 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div
                  className={`text-sm ${
                    achievement.earned
                      ? "text-white/80"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {achievement.earned ? (
                    <span>Earned {achievement.earnedDate}</span>
                  ) : (
                    <span>{achievement.progress || 0}% complete</span>
                  )}
                </div>
                <div
                  className={`font-bold ${
                    achievement.earned
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-50"
                  }`}
                >
                  +{achievement.points} pts
                </div>
              </div>
              {!achievement.earned && achievement.progress && (
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
