"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Mic,
  CheckCheck,
  Check,
  Clock,
  X,
  AlertTriangle,
  User,
  Store,
  Settings,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "admin" | "other";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
  type: "text" | "image" | "alert" | "system";
  alertData?: {
    type: "warning" | "info" | "error";
    title: string;
    description: string;
  };
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  role: "user" | "seller" | "support";
  priority: "low" | "medium" | "high";
  department?: string;
}

const adminContacts: Contact[] = [
  {
    id: "1",
    name: "Golden Crust Bakery",
    avatar: "GB",
    lastMessage: "Butuh bantuan verifikasi produk",
    timestamp: "sekarang",
    unreadCount: 3,
    isOnline: true,
    role: "seller",
    priority: "high",
    department: "Dukungan Penjual",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "SJ",
    lastMessage: "Masalah pembayaran pesanan saya",
    timestamp: "2m",
    unreadCount: 1,
    isOnline: true,
    role: "user",
    priority: "medium",
    department: "Dukungan Pelanggan",
  },
  {
    id: "3",
    name: "Tim Dukungan Teknis",
    avatar: "TS",
    lastMessage: "Pemeliharaan server dijadwalkan",
    timestamp: "15m",
    unreadCount: 0,
    isOnline: true,
    role: "support",
    priority: "low",
    department: "Teknis",
  },
  {
    id: "4",
    name: "Fresh Valley Farm",
    avatar: "FV",
    lastMessage: "Pertanyaan tentang tarif komisi",
    timestamp: "1j",
    unreadCount: 2,
    isOnline: false,
    role: "seller",
    priority: "medium",
    department: "Dukungan Penjual",
  },
  {
    id: "5",
    name: "Mike Chen",
    avatar: "MC",
    lastMessage: "Aplikasi crash saat upload foto",
    timestamp: "3j",
    unreadCount: 1,
    isOnline: false,
    role: "user",
    priority: "high",
    department: "Dukungan Teknis",
  },
];

const sampleMessages: Message[] = [
  {
    id: "1",
    text: "Halo! Saya butuh bantuan untuk memverifikasi produk toko roti saya. Sistem terus menolak pengajuan saya.",
    sender: "other",
    timestamp: new Date(Date.now() - 300000),
    status: "read",
    type: "text",
  },
  {
    id: "2",
    text: "Saya memahami kekhawatiran Anda. Biarkan saya periksa akun dan pengajuan terbaru Anda. Bisakah Anda beri tahu produk mana yang ditolak?",
    sender: "admin",
    timestamp: new Date(Date.now() - 240000),
    status: "read",
    type: "text",
  },
  {
    id: "3",
    text: "Terutama roti sourdough dan croissant saya. Pesan error mengatakan 'informasi produk tidak lengkap' tapi saya sudah mengisi semua field yang diperlukan.",
    sender: "other",
    timestamp: new Date(Date.now() - 180000),
    status: "read",
    type: "text",
  },
  {
    id: "4",
    text: "",
    sender: "admin",
    timestamp: new Date(Date.now() - 120000),
    status: "read",
    type: "alert",
    alertData: {
      type: "info",
      title: "Tinjauan Akun Diperlukan",
      description:
        "Akun penjual Anda memerlukan verifikasi tambahan. Harap sediakan dokumentasi izin usaha.",
    },
  },
  {
    id: "5",
    text: "Saya telah meninjau akun Anda. Masalahnya adalah kami memerlukan izin usaha Anda untuk verifikasi. Setelah diunggah, produk Anda akan disetujui secara otomatis.",
    sender: "admin",
    timestamp: new Date(Date.now() - 60000),
    status: "read",
    type: "text",
  },
];

interface AdminChatProps {
  onClose?: () => void;
}

export default function AdminChat({ onClose }: AdminChatProps) {
  const [selectedContact, setSelectedContact] = useState<Contact>(
    adminContacts[0]
  );
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "admin",
        timestamp: new Date(),
        status: "sending",
        type: "text",
      };
      setMessages([...messages, message]);
      setNewMessage("");
      // Simulate message status updates
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === message.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="w-3 h-3 text-gray-400 dark:text-gray-500" />;
      case "sent":
        return <Check className="w-3 h-3 text-gray-400 dark:text-gray-500" />;
      case "delivered":
        return (
          <CheckCheck className="w-3 h-3 text-gray-400 dark:text-gray-500" />
        );
      case "read":
        return (
          <CheckCheck className="w-3 h-3 text-[#AF1740] dark:text-[#DE7C7D]" />
        );
    }
  };

  const getPriorityColor = (priority: Contact["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-500 dark:bg-red-600";
      case "medium":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "low":
        return "bg-green-500 dark:bg-green-600";
    }
  };

  const getRoleIcon = (role: Contact["role"]) => {
    switch (role) {
      case "user":
        return <User className="w-4 h-4" />;
      case "seller":
        return <Store className="w-4 h-4" />;
      case "support":
        return <Settings className="w-4 h-4" />;
    }
  };

  const filteredContacts = adminContacts.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" ||
      contact.department
        ?.toLowerCase()
        .includes(filterDepartment.toLowerCase());
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="flex h-[700px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-[#DE7C7D]/30 dark:border-gray-700 overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-96 border-r border-[#DE7C7D]/30 dark:border-gray-700 flex flex-col bg-gradient-to-b from-white to-[#DE7C7D]/10 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#740938] to-[#AF1740] dark:from-[#740938] dark:to-[#AF1740] p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Pusat Dukungan Admin</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-1"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
            <Input
              placeholder="Cari percakapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 rounded-full"
            />
          </div>
          <div className="flex space-x-2">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="bg-white/20 border-white/30 text-white text-sm rounded-full px-3 py-1 focus:bg-white/30"
            >
              <option value="all" className="text-gray-900">
                Semua Departemen
              </option>
              <option value="pelanggan" className="text-gray-900">
                Dukungan Pelanggan
              </option>
              <option value="penjual" className="text-gray-900">
                Dukungan Penjual
              </option>
              <option value="teknis" className="text-gray-900">
                Teknis
              </option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 bg-[#DE7C7D]/20 dark:bg-gray-800/50 border-b border-[#DE7C7D]/30 dark:border-gray-700">
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="font-bold text-red-600 dark:text-red-400">
                {adminContacts.filter((c) => c.priority === "high").length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Prioritas Tinggi
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-[#AF1740] dark:text-[#DE7C7D]">
                {adminContacts.filter((c) => c.unreadCount > 0).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Belum Dibaca
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-green-600 dark:text-green-400">
                {adminContacts.filter((c) => c.isOnline).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Online</div>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`p-4 border-b border-[#DE7C7D]/20 dark:border-gray-700 cursor-pointer transition-all hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 ${
                selectedContact.id === contact.id
                  ? "bg-[#DE7C7D]/30 dark:bg-gray-800"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      contact.role === "support"
                        ? "bg-gradient-to-br from-[#740938] to-[#AF1740]"
                        : contact.role === "seller"
                        ? "bg-gradient-to-br from-[#AF1740] to-[#CC2B52]"
                        : "bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D]"
                    }`}
                  >
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  )}
                  <div
                    className={`absolute -top-1 -left-1 w-4 h-4 ${getPriorityColor(
                      contact.priority
                    )} rounded-full border-2 border-white dark:border-gray-900`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-[#740938] dark:text-gray-100 truncate">
                        {contact.name}
                      </h3>
                      <div className="text-gray-600 dark:text-gray-400">
                        {getRoleIcon(contact.role)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {contact.timestamp}
                      </span>
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-[#AF1740] dark:bg-[#DE7C7D] text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs border-[#DE7C7D] text-[#740938] dark:border-gray-600 dark:text-gray-300`}
                    >
                      {contact.department}
                    </Badge>
                    <Badge
                      className={`text-xs ${getPriorityColor(
                        contact.priority
                      )} text-white`}
                    >
                      {contact.priority === "high"
                        ? "tinggi"
                        : contact.priority === "medium"
                        ? "sedang"
                        : "rendah"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#740938] to-[#AF1740] dark:from-[#740938] dark:to-[#AF1740] p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-white/20">
                  {selectedContact.avatar}
                </div>
                {selectedContact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{selectedContact.name}</h3>
                  <div className="text-white/80">
                    {getRoleIcon(selectedContact.role)}
                  </div>
                  <Badge
                    className={`text-xs ${getPriorityColor(
                      selectedContact.priority
                    )} text-white`}
                  >
                    {selectedContact.priority === "high"
                      ? "tinggi"
                      : selectedContact.priority === "medium"
                      ? "sedang"
                      : "rendah"}
                  </Badge>
                </div>
                <p className="text-sm text-white/80">
                  {selectedContact.department} •{" "}
                  {selectedContact.isOnline
                    ? "Online"
                    : "Terakhir dilihat baru-baru ini"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <Video className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-[#DE7C7D]/5 to-white dark:from-gray-800 dark:to-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === "admin" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "admin"
                    ? "bg-gradient-to-r from-[#DE7C7D]/20 to-[#CC2B52]/20 dark:from-[#DE7C7D]/30 dark:to-[#CC2B52]/30 text-[#740938] dark:text-gray-100 rounded-br-md"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-[#DE7C7D]/20 dark:border-gray-700 rounded-bl-md"
                }`}
              >
                {message.type === "text" && (
                  <p className="text-sm">{message.text}</p>
                )}
                {message.type === "alert" && message.alertData && (
                  <Card
                    className={`border ${
                      message.alertData.type === "error"
                        ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
                        : message.alertData.type === "warning"
                        ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20"
                        : "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle
                          className={`w-4 h-4 ${
                            message.alertData.type === "error"
                              ? "text-red-500 dark:text-red-400"
                              : message.alertData.type === "warning"
                              ? "text-yellow-500 dark:text-yellow-400"
                              : "text-blue-500 dark:text-blue-400"
                          }`}
                        />
                        <span className="font-semibold text-[#740938] dark:text-gray-100 text-sm">
                          {message.alertData.title}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">
                        {message.alertData.description}
                      </p>
                    </CardContent>
                  </Card>
                )}
                <div
                  className={`flex items-center justify-between mt-1 ${
                    message.sender === "admin" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === "admin" && (
                    <div className="mr-1">{getStatusIcon(message.status)}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-[#DE7C7D]/30 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 p-2"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Ketik balasan Anda..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-20 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#DE7C7D] rounded-full bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 p-1"
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 p-1"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
