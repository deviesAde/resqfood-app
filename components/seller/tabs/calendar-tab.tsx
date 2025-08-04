"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarIcon,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: "production" | "pickup" | "task";
  description: string;
}

const initialEvents: CalendarEvent[] = [
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
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024
  const [selectedDate, setSelectedDate] = useState(16);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isFullCalendarView, setIsFullCalendarView] = useState(false);
  const [newEvent, setNewEvent] = useState<{
    title: string;
    date: string;
    time: string;
    type: "production" | "pickup" | "task";
    description: string;
  }>({
    title: "",
    date: "",
    time: "",
    type: "production",
    description: "",
  });

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateForInput = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: CalendarEvent = {
        id: Math.max(...events.map((e) => e.id), 0) + 1,
        ...newEvent,
      };
      setEvents([...events, event]);
      setNewEvent({
        title: "",
        date: "",
        time: "",
        type: "production",
        description: "",
      });
      setIsAddEventOpen(false);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (day: number) => {
    const dateStr = formatDateForInput(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return events.filter((event) => event.date === dateStr);
  };

  const getTodaysEvents = () => {
    const today = formatDateForInput(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      selectedDate
    );
    return events
      .filter((event) => event.date === today)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isSelected = day === selectedDate;
      const hasEvents = dayEvents.length > 0;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(day)}
          className={`aspect-square flex flex-col items-center justify-center text-xs sm:text-sm rounded-lg cursor-pointer transition-all hover:bg-[#DE7C7D]/20 dark:hover:bg-[#DE7C7D]/30 relative ${
            isSelected
              ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] dark:from-[#CC2B52] dark:to-[#DE7C7D] text-white font-bold"
              : hasEvents
              ? "bg-[#DE7C7D]/30 dark:bg-[#DE7C7D]/40 text-[#740938] dark:text-white font-semibold"
              : "text-gray-700 dark:text-gray-300 hover:text-[#740938] dark:hover:text-white"
          }`}
        >
          <span>{day}</span>
          {hasEvents && !isSelected && (
            <div className="absolute bottom-1 flex gap-0.5">
              {dayEvents.slice(0, 3).map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-[#740938] dark:bg-white rounded-full"
                ></div>
              ))}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

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
        <div className={isFullCalendarView ? "xl:col-span-3" : "xl:col-span-2"}>
          <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
            <CardHeader className="dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                  <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  {monthNames[currentDate.getMonth()]}{" "}
                  {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("prev")}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth("next")}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                {renderCalendarGrid()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule - Hidden in full calendar view */}
        {!isFullCalendarView && (
          <div className="space-y-4 sm:space-y-6">
            <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10 dark:from-gray-800 dark:to-[#CC2B52]/20">
              <CardHeader className="dark:bg-gray-800/50">
                <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Jadwal Tanggal {selectedDate}
                </CardTitle>
              </CardHeader>
              <CardContent className="dark:bg-gray-800/50">
                <div className="space-y-3 sm:space-y-4">
                  {getTodaysEvents().length > 0 ? (
                    getTodaysEvents().map((event) => (
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
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      Tidak ada acara untuk tanggal ini
                    </p>
                  )}
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
                  <Dialog
                    open={isAddEventOpen}
                    onOpenChange={setIsAddEventOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] dark:from-[#AF1740] dark:to-[#CC2B52] dark:hover:from-[#740938] dark:hover:to-[#AF1740] text-white rounded-xl text-sm sm:text-base">
                        <Plus className="w-4 h-4 mr-2" />
                        Tambah Acara
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Tambah Acara Baru</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="title">Judul Acara</Label>
                          <Input
                            id="title"
                            value={newEvent.title}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                title: e.target.value,
                              })
                            }
                            placeholder="Masukkan judul acara"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="date">Tanggal</Label>
                          <Input
                            id="date"
                            type="date"
                            value={newEvent.date}
                            onChange={(e) =>
                              setNewEvent({ ...newEvent, date: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="time">Waktu</Label>
                          <Input
                            id="time"
                            type="time"
                            value={newEvent.time}
                            onChange={(e) =>
                              setNewEvent({ ...newEvent, time: e.target.value })
                            }
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="type">Jenis Acara</Label>
                          <Select
                            value={newEvent.type}
                            onValueChange={(
                              value: "production" | "pickup" | "task"
                            ) => setNewEvent({ ...newEvent, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih jenis acara" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="production">
                                Produksi
                              </SelectItem>
                              <SelectItem value="pickup">Pickup</SelectItem>
                              <SelectItem value="task">Tugas</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Deskripsi</Label>
                          <Textarea
                            id="description"
                            value={newEvent.description}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                description: e.target.value,
                              })
                            }
                            placeholder="Masukkan deskripsi acara"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddEventOpen(false)}
                        >
                          Batal
                        </Button>
                        <Button onClick={handleAddEvent}>Simpan Acara</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    className="w-full border-[#740938] dark:border-[#740938] text-[#740938] dark:text-[#740938] hover:bg-[#740938] hover:text-white dark:hover:bg-[#740938] dark:hover:text-white rounded-xl bg-transparent dark:bg-transparent text-sm sm:text-base"
                    onClick={() => setIsFullCalendarView(!isFullCalendarView)}
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {isFullCalendarView
                      ? "Tampilan Normal"
                      : "Lihat Kalender Penuh"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Full Calendar View Toggle Button */}
      {isFullCalendarView && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setIsFullCalendarView(false)}
            className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white"
          >
            Kembali ke Tampilan Normal
          </Button>
        </div>
      )}
    </div>
  );
}
