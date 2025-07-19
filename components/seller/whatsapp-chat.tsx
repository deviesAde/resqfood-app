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
    name: "Sarah Chen",
    avatar: "SC",
    lastMessage: "Is the sourdough bread still available?",
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
    lastMessage: "Your account verification is complete",
    timestamp: "5m",
    unreadCount: 0,
    isOnline: true,
    role: "admin",
    isVerified: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "MJ",
    lastMessage: "Thank you for the fresh bagels!",
    timestamp: "2h",
    unreadCount: 0,
    isOnline: false,
    role: "customer",
    rating: 5.0,
  },
  {
    id: "4",
    name: "Lisa Wong",
    avatar: "LW",
    lastMessage: "Can I pick up at 3 PM?",
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
    text: "Hi! Is the sourdough bread still available?",
    sender: "other",
    timestamp: new Date(Date.now() - 300000),
    status: "read",
    type: "text",
  },
  {
    id: "2",
    text: "Yes! We have 3 loaves left. Fresh from this morning.",
    sender: "user",
    timestamp: new Date(Date.now() - 240000),
    status: "read",
    type: "text",
  },
  {
    id: "3",
    text: "Perfect! Can I reserve 2 loaves?",
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
      id: "ORD-001",
      items: ["Sourdough Bread x2"],
      total: 7.98,
      status: "Reserved",
    },
  },
  {
    id: "5",
    text: "Great! Here's my pickup location:",
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
      address: "123 Main Street, Downtown",
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
  const [showChatArea, setShowChatArea] = useState(false); // State for responsiveness

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showChatArea]); // Scroll when messages change or view switches

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
    return date.toLocaleTimeString("en-US", {
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
          <CheckCheck className="w-3 h-3 text-[#AF1740] dark:text-[#F8A5B2]" />
        );
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[600px] bg-white dark:bg-gray-800/50 rounded-2xl shadow-xl border-2 border-[#DE7C7D]/30 dark:border-[#DE7C7D]/50 overflow-hidden">
      {/* Contacts Sidebar */}
      <div
        className={`${
          showChatArea ? "hidden" : "flex"
        } w-full md:w-80 border-r border-[#DE7C7D]/30 dark:border-[#DE7C7D]/50 flex-col bg-white dark:bg-[#1A1A1A]`}
      >
        {/* Header */}
        <div className="bg-[#740938] p-4 text-white dark:bg-[#AF1740]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Pesan</h2>
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-4 h-4" />
            <Input
              placeholder="Cari percakapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30 rounded-full dark:bg-white/20 dark:border-white/30 dark:text-white dark:placeholder:text-white/70 dark:focus:bg-white/30"
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
              className={`p-4 border-b border-[#DE7C7D]/20 dark:border-[#DE7C7D]/40 cursor-pointer transition-all hover:bg-[#DE7C7D]/20 dark:hover:bg-[#DE7C7D]/30 ${
                selectedContact.id === contact.id
                  ? "bg-[#DE7C7D]/30 dark:bg-[#DE7C7D]/40"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                      contact.role === "admin"
                        ? "bg-[#740938] dark:bg-[#AF1740]"
                        : "bg-[#AF1740] dark:bg-[#CC2B52]"
                    }`}
                  >
                    {contact.avatar}
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-[#1A1A1A]"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-[#740938] dark:text-[#F8A5B2] truncate">
                        {contact.name}
                      </h3>
                      {contact.isVerified && (
                        <Shield className="w-4 h-4 text-[#AF1740] dark:text-[#F8A5B2]" />
                      )}
                      {contact.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-400 dark:text-yellow-300 fill-current" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
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
                        <Badge className="bg-[#AF1740] dark:bg-[#F8A5B2] text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {contact.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                    {contact.lastMessage}
                  </p>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        contact.role === "admin"
                          ? "border-[#740938] text-[#740938] dark:border-[#F8A5B2] dark:text-[#F8A5B2]"
                          : "border-[#CC2B52] text-[#CC2B52] dark:border-[#F8A5B2] dark:text-[#F8A5B2]"
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
        <div className="bg-[#740938] p-4 text-white dark:bg-[#AF1740]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatArea(false)}
                className="text-white hover:bg-white/20 p-2 md:block"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    selectedContact.role === "admin"
                      ? "bg-white/20"
                      : "bg-white/20"
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
                <p className="text-sm text-white/80">
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
        <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-950">
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
                    ? "bg-[#DE7C7D]/20 text-[#740938] rounded-br-md dark:bg-[#740938]/30 dark:text-[#F8A5B2]"
                    : "bg-white text-gray-800 shadow-sm border border-[#DE7C7D]/20 rounded-bl-md dark:bg-[#2A2A2A] dark:text-gray-200 dark:border-[#DE7C7D]/30"
                }`}
              >
                {message.type === "text" && (
                  <p className="text-sm">{message.text}</p>
                )}
                {message.type === "order" && message.orderData && (
                  <Card className="border border-[#AF1740]/20 bg-[#AF1740]/10 dark:border-[#F8A5B2]/20 dark:bg-[#F8A5B2]/10">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Package className="w-4 h-4 text-[#740938] dark:text-[#F8A5B2]" />
                        <span className="font-semibold text-[#740938] dark:text-[#F8A5B2] text-sm">
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
                        <div className="flex justify-between items-center pt-2 border-t border-[#AF1740]/20 dark:border-[#F8A5B2]/20">
                          <span className="text-sm font-semibold text-[#740938] dark:text-[#F8A5B2]">
                            Total: ${message.orderData.total}
                          </span>
                          <Badge className="bg-[#AF1740] dark:bg-[#F8A5B2] text-white text-xs">
                            {message.orderData.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {message.type === "location" && message.locationData && (
                  <Card className="border border-[#CC2B52]/20 bg-[#CC2B52]/10 dark:border-[#F8A5B2]/20 dark:bg-[#F8A5B2]/10">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#740938] dark:text-[#F8A5B2]" />
                        <span className="font-semibold text-[#740938] dark:text-[#F8A5B2] text-sm">
                          Lokasi
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 mb-2">
                        {message.locationData.address}
                      </p>
                      <div className="bg-[#DE7C7D]/20 dark:bg-[#740938]/30 rounded-lg p-2 text-center">
                        <MapPin className="w-8 h-8 text-[#AF1740] dark:text-[#F8A5B2] mx-auto mb-1" />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
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
        <div className="p-4 border-t border-[#DE7C7D]/30 dark:border-[#DE7C7D]/50 bg-white dark:bg-[#1A1A1A]">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-[#740938] hover:bg-[#DE7C7D]/20 p-2 dark:text-[#F8A5B2] dark:hover:bg-[#740938]/30"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Ketik pesan..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-20 border-2 border-[#DE7C7D]/30 focus:border-[#AF1740] rounded-full bg-[#DE7C7D]/10 dark:bg-[#740938]/20 dark:border-[#740938]/50 dark:focus:border-[#F8A5B2] dark:text-gray-50 dark:placeholder:text-gray-400"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#740938] hover:bg-[#DE7C7D]/20 p-1 dark:text-[#F8A5B2] dark:hover:bg-[#740938]/30"
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#740938] hover:bg-[#DE7C7D]/20 p-1 dark:text-[#F8A5B2] dark:hover:bg-[#740938]/30"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all dark:bg-[#740938] dark:hover:bg-[#AF1740]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
