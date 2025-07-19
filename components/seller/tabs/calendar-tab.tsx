"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, Plus } from "lucide-react";

const calendarEvents = [
  {
    id: 1,
    title: "Batch Roti Segar",
    date: "2024-01-16",
    time: "06:00",
    type: "production",
    description: "Siapkan batch sourdough pagi",
  },
  {
    id: 2,
    title: "Pickup Pelanggan - Sarah",
    date: "2024-01-16",
    time: "14:30",
    type: "pickup",
    description: "Pesanan #ORD-2024-001",
  },
  {
    id: 3,
    title: "Cek Inventori",
    date: "2024-01-17",
    time: "09:00",
    type: "task",
    description: "Penilaian inventori mingguan",
  },
  {
    id: 4,
    title: "Pickup Pelanggan - Mike",
    date: "2024-01-16",
    time: "16:00",
    type: "pickup",
    description: "Pesanan #ORD-2024-002",
  },
];

export default function CalendarTab() {
  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
          Kalender & Jadwal
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Kelola jadwal produksi dan pickup pelanggan Anda
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Calendar View */}
        <div className="xl:col-span-2">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
            <CardHeader className="dark:bg-gray-800/50">
              <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Januari 2024
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:bg-gray-800/50">
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 py-2"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center text-xs sm:text-sm rounded-lg cursor-pointer transition-all hover:bg-[#DE7C7D]/20 dark:hover:bg-[#DE7C7D]/30 ${
                      day === 16
                        ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] dark:from-[#CC2B52] dark:to-[#DE7C7D] text-white font-bold"
                        : calendarEvents.some(
                            (event) => new Date(event.date).getDate() === day
                          )
                        ? "bg-[#DE7C7D]/30 dark:bg-[#DE7C7D]/40 text-[#740938] dark:text-white font-semibold"
                        : "text-gray-700 dark:text-gray-300 hover:text-[#740938] dark:hover:text-white"
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <div className="space-y-4 sm:space-y-6">
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20">
            <CardHeader className="dark:bg-gray-800/50">
              <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Jadwal Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:bg-gray-800/50">
              <div className="space-y-3 sm:space-y-4">
                {calendarEvents
                  .filter((event) => event.date === "2024-01-16")
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`p-3 sm:p-4 rounded-xl border-l-4 ${
                        event.type === "production"
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400"
                          : event.type === "pickup"
                          ? "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400"
                          : "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-400"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#740938] dark:text-white text-sm sm:text-base">
                          {event.title}
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {event.time}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#AF1740]/10 dark:from-gray-800 dark:to-[#AF1740]/20">
            <CardHeader className="dark:bg-gray-800/50">
              <CardTitle className="text-[#740938] dark:text-white text-base sm:text-lg">
                Aksi Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:bg-gray-800/50">
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] dark:from-[#AF1740] dark:to-[#CC2B52] dark:hover:from-[#740938] dark:hover:to-[#AF1740] text-white rounded-xl text-sm sm:text-base">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Acara
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#740938] dark:border-[#740938] text-[#740938] dark:text-[#740938] hover:bg-[#740938] hover:text-white dark:hover:bg-[#740938] dark:hover:text-white rounded-xl bg-transparent dark:bg-transparent text-sm sm:text-base"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Lihat Kalender Penuh
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
