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
  Star,
  MapPin,
  Package,
  CheckCheck,
  Check,
  Clock,
  Shield,
  X,
  ArrowLeft,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
  type: "text" | "image" | "order" | "location";
  orderData?: {
    id: string;
    items: string[];
    total: number;
    status: string;
  };
  locationData?: {
    address: string;
    coordinates: string;
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
  role: "customer" | "admin";
  rating?: number;
  isVerified?: boolean;
}

const contacts: Contact[] = [
  {
    id: "1",
    name: "Budi Santoso",
    avatar: "BS",
    lastMessage: "Apakah roti tawar masih tersedia?",
    timestamp: "now",
    unreadCount: 2,
    isOnline: true,
    role: "customer",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Admin Support",
    avatar: "AS",
    lastMessage: "Akun Anda telah diverifikasi",
    timestamp: "5m",
    unreadCount: 0,
    isOnline: true,
    role: "admin",
    isVerified: true,
  },
  {
    id: "3",
    name: "Dewi Maharani",
    avatar: "DM",
    lastMessage: "Roti tawarnya enak banget!",
    timestamp: "2h",
    unreadCount: 0,
    isOnline: false,
    role: "customer",
    rating: 5.0,
  },
  {
    id: "4",
    name: "Ani Setiawan",
    avatar: "AS",
    lastMessage: "Apakah ada diskon untuk pembelian besar?",
    timestamp: "1d",
    unreadCount: 1,
    isOnline: true,
    role: "customer",
    rating: 4.5,
  },
];

const sampleMessages: Message[] = [
  {
    id: "1",
    text: "Halo! Apakah roti tawar masih tersedia?",
    sender: "other",
    timestamp: new Date(Date.now() - 300000),
    status: "read",
    type: "text",
  },
  {
    id: "2",
    text: "Ya, masih tersedia! Masih ada beberapa yang bisa dipesan.",
    sender: "user",
    timestamp: new Date(Date.now() - 240000),
    status: "read",
    type: "text",
  },
  {
    id: "3",
    text: "Bagus! Saya mau pesan 2 roti tawar.",
    sender: "other",
    timestamp: new Date(Date.now() - 180000),
    status: "read",
    type: "text",
  },
  {
    id: "4",
    text: "",
    sender: "user",
    timestamp: new Date(Date.now() - 120000),
    status: "read",
    type: "order",
    orderData: {
      id: "ORD-006",
      items: ["Roti Tawar x2"],
      total: 7.98,
      status: "Reserved",
    },
  },
  {
    id: "5",
    text: "Terima kasih! Ini lokasi saya:",
    sender: "other",
    timestamp: new Date(Date.now() - 60000),
    status: "read",
    type: "text",
  },
  {
    id: "6",
    text: "",
    sender: "other",
    timestamp: new Date(Date.now() - 30000),
    status: "read",
    type: "location",
    locationData: {
      address: "Jl. Kebon Jeruk No. 123, Jakarta",
      coordinates: "1.2966, 103.8558",
    },
  },
];

interface WhatsAppChatProps {
  onClose?: () => void;
}

export default function WhatsAppChat({ onClose }: WhatsAppChatProps) {
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showChatArea, setShowChatArea] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showChatArea]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
        status: "sending",
        type: "text",
      };
      setMessages([...messages, message]);
      setNewMessage("");

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
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return <Clock className="w-3 h-3 text-gray-400 dark:text-gray-400" />;
      case "sent":
        return <Check className="w-3 h-3 text-gray-400 dark:text-gray-400" />;
      case "delivered":
        return (
          <CheckCheck className="w-3 h-3 text-gray-400 dark:text-gray-400" />
        );
      case "read":
        return (
          <CheckCheck className="w-3 h-3 text-[#AF1740] dark:text-[#AF1740]" />
        );
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-[#DE7C7D]/30 dark:border-gray-700 overflow-hidden">
      {/* Contacts Sidebar */}
      <div
        className={`${
          showChatArea ? "hidden" : "flex"
        } w-full md:w-80 border-r border-[#DE7C7D]/30 dark:border-gray-700 flex-col bg-white dark:bg-gray-800`}
      >
        {/* Header */}
        <div className="bg-[#740938] dark:bg-gray-900 p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Pesan</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 dark:hover:bg-gray-700 p-1"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
              {onClose && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 dark:hover:bg-gray-700 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
            <Input
              placeholder="Cari percakapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 dark:bg-gray-700 border-white/30 dark:border-gray-600 text-white placeholder:text-white/70 dark:placeholder:text-gray-300 focus:bg-white/30 dark:focus:bg-gray-600 rounded-full"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => {
                setSelectedContact(contact);
                setShowChatArea(true);
              }}
              className={`p-4 border-b border-[#DE7C7D]/20 dark:border-gray-700 cursor-pointer transition-all hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-700 ${
                selectedContact.id === contact.id
                  ? "bg-[#DE7C7D]/30 dark:bg-gray-700"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      contact.role === "admin"
                        ? "bg-[#740938] dark:bg-[#740938]"
                        : "bg-[#AF1740] dark:bg-[#740938]"
                    }`}
                  >
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-[#740938] dark:text-gray-100 truncate">
                        {contact.name}
                      </h3>
                      {contact.isVerified && (
                        <Shield className="w-4 h-4 text-[#AF1740] dark:text-blue-400" />
                      )}
                      {contact.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {contact.rating}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {contact.timestamp}
                      </span>
                      {contact.unreadCount > 0 && (
                        <Badge className="bg-[#AF1740] dark:bg-[#AF1740] text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        contact.role === "admin"
                          ? "border-[#740938] text-[#740938] dark:border-[#740938] dark:text-[#740938]"
                          : "border-[#CC2B52] text-[#CC2B52] dark:border-[#CC2B52] dark:text-[#CC2B52]"
                      }`}
                    >
                      {contact.role === "admin" ? "Dukungan" : "Pelanggan"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`${
          showChatArea ? "flex" : "hidden"
        } flex-1 flex-col md:flex`}
      >
        {/* Chat Header */}
        <div className="bg-[#740938] dark:bg-gray-900 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatArea(false)}
                className="text-white hover:bg-white/20 dark:hover:bg-gray-700 p-2 md:block"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    selectedContact.role === "admin"
                      ? "bg-white/20 dark:bg-blue-600"
                      : "bg-white/20 dark:bg-green-600"
                  }`}
                >
                  {selectedContact.avatar}
                </div>
                {selectedContact.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white"></div>
                )}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold">{selectedContact.name}</h3>
                  {selectedContact.isVerified && (
                    <Shield className="w-4 h-4 text-white" />
                  )}
                </div>
                <p className="text-sm text-white/80 dark:text-gray-300">
                  {selectedContact.isOnline
                    ? "Online"
                    : "Terakhir terlihat baru-baru ini"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 dark:hover:bg-gray-700 p-2"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 dark:hover:bg-gray-700 p-2"
              >
                <Video className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 dark:hover:bg-gray-700 p-2"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-[#DE7C7D]/20 dark:bg-[#DE7C7D]/20 text-[#740938] dark:text-white rounded-br-md"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-sm border border-[#DE7C7D]/20 dark:border-gray-600 rounded-bl-md"
                }`}
              >
                {message.type === "text" && (
                  <p className="text-sm">{message.text}</p>
                )}

                {message.type === "order" && message.orderData && (
                  <Card className="border border-[#AF1740]/20 dark:border-gray-600 bg-[#AF1740]/10 dark:bg-gray-800">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="w-4 h-4 text-[#740938] dark:text-[#740938]" />
                        <span className="font-semibold text-[#740938] dark:text-[#740938] text-sm">
                          Pesanan #{message.orderData.id}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {message.orderData.items.map((item, index) => (
                          <p
                            key={index}
                            className="text-xs text-gray-700 dark:text-gray-300"
                          >
                            {item}
                          </p>
                        ))}
                        <div className="flex justify-between items-center pt-2 border-t border-[#AF1740]/20 dark:border-gray-600">
                          <span className="text-sm font-semibold text-[#740938] dark:text-[#740938]">
                            Total: ${message.orderData.total}
                          </span>
                          <Badge className="bg-[#AF1740] dark:bg-[#740938] text-white text-xs">
                            {message.orderData.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {message.type === "location" && message.locationData && (
                  <Card className="border border-[#CC2B52]/20 dark:border-gray-600 bg-[#CC2B52]/10 dark:bg-gray-800">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#740938] dark:text-blue-400" />
                        <span className="font-semibold text-[#740938] dark:text-blue-400 text-sm">
                          Lokasi
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                        {message.locationData.address}
                      </p>
                      <div className="bg-[#DE7C7D]/20 dark:bg-gray-700 rounded-lg p-2 text-center">
                        <MapPin className="w-8 h-8 text-[#AF1740] dark:text-blue-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Ketuk untuk melihat di peta
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div
                  className={`flex items-center justify-between mt-1 ${
                    message.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(message.timestamp)}
                  </span>
                  {message.sender === "user" && (
                    <div className="mr-1">{getStatusIcon(message.status)}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-[#DE7C7D]/30 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-700 p-2"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-20 border-2 border-[#DE7C7D]/30 dark:border-gray-600 focus:border-[#AF1740] dark:focus:border-green-500 rounded-full bg-[#DE7C7D]/10 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-600 p-1"
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#740938] dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-600 p-1"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#AF1740] hover:bg-[#740938] dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
