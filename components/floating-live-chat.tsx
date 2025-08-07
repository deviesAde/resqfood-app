"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  X,
  Send,
  User,
  Phone,
  Clock,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

export default function FloatingLiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Saya Dhiya, Spesialis Penyelamatan Makanan Anda. Ada yang bisa saya bantu hari ini?",
      sender: "agent",
      timestamp: new Date(),
      agentName: "Dhiya",
      agentAvatar: "/landing/avatar.png",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setNewMessage("");
      setIsTyping(true);

      setTimeout(() => {
        const agentResponse: Message = {
          id: messages.length + 2,
          text: getSmartAgentResponse(userMessage.text),
          sender: "agent",
          timestamp: new Date(),
          agentName: "Dhiya",
          agentAvatar: "/landing/avatar.png",
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      }, Math.random() * 1000 + 1500);
    }
  };

  const getSmartAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("password") ||
      message.includes("kata sandi") ||
      message.includes("login") ||
      message.includes("masuk")
    ) {
      return "Baik! Mari kita atasi masalah masuk Anda. 🔐\n\n**Langkah-langkah untuk mengatur ulang kata sandi:**\n1. Kunjungi halaman masuk resQfood\n2. Klik 'Lupa Kata Sandi?'\n3. Masukkan email Anda\n4. Periksa email untuk tautan pengaturan ulang\n5. Ikuti instruksi untuk membuat kata sandi baru\n\nJika Anda masih mengalami masalah, saya di sini untuk membantu!";
    }

    if (
      message.includes("akun") ||
      message.includes("daftar") ||
      message.includes("register") ||
      message.includes("bergabung")
    ) {
      return "Bagus! Mari kita buat akun Anda. 📝\n\n**Cara membuat akun di resQfood:**\n1. Kunjungi halaman pendaftaran\n2. Isi formulir dengan data Anda\n3. Verifikasi email Anda\n4. Mulai jelajahi makanan yang bisa diselamatkan\n\nProsesnya cepat dan mudah!";
    }

    if (
      message.includes("makanan") ||
      message.includes("selamatkan") ||
      message.includes("bagaimana") ||
      message.includes("kerja")
    ) {
      return "Pertama-tama, terima kasih telah tertarik dengan penyelamatan makanan! 🥗\n\n**Cara kerja resQfood:**\n1. **Daftar gratis:** Buat akun dalam beberapa detik\n2. **Jelajahi penawaran:** Temukan produk yang hampir kadaluarsa dari bisnis lokal\n3. **Pesan dengan harga diskon:** Dapatkan makanan berkualitas dengan harga terjangkau\n4. **Ambil pesanan Anda:** Kunjungi lokasi bisnis untuk mengambil pesanan Anda\n5. **Selamatkan makanan:** Nikmati makanan sambil mengurangi limbah";
    }

    if (
      message.includes("harga") ||
      message.includes("biaya") ||
      message.includes("hemat") ||
      message.includes("uang")
    ) {
      return "Pertanyaan yang bagus! 💰\n\n**Harga di resQfood:**\n- **Diskon hingga 70%** untuk produk yang hampir kadaluarsa\n- **Tidak ada biaya berlangganan** - bayar hanya untuk apa yang Anda pesan\n- **Harga transparan** - lihat total sebelum checkout\n- **Banyak penawaran harian** - hemat lebih banyak dengan setiap pembelian\n\nDengan resQfood, Anda tidak hanya menghemat uang, tetapi juga membantu mengurangi limbah makanan!";
    }

    if (
      message.includes("bantuan") ||
      message.includes("dukungan") ||
      message.includes("masalah") ||
      message.includes("kendala")
    ) {
      return "Baik! Saya di sini untuk membantu Anda. 🌟\n\n**Cara mendapatkan bantuan:**\n- **Chat dengan saya:** Saya akan menjawab pertanyaan Anda secara real-time\n- **Email kami:** Kirim pesan ke support@resqfood.com\n- **Hubungi kami:** Telepon 1-800-RESQFOOD (24/7)\n\nMasalah apa yang Anda alami?";
    }

    if (
      message.includes("hai") ||
      message.includes("halo") ||
      message.includes("hallo")
    ) {
      return "Halo! 👋 Saya Dhiya, Spesialis Penyelamatan Makanan Anda. Ada yang bisa saya bantu hari ini?";
    }

    if (
      message.includes("lokasi") ||
      message.includes("area") ||
      message.includes("dekat") ||
      message.includes("dimana")
    ) {
      return "Tentu! resQfood tersedia di berbagai lokasi. 📍\n\n**Cara memeriksa ketersediaan di area Anda:**\n1. Kunjungi halaman utama resQfood\n2. Masukkan kode pos atau nama kota Anda\n3. Lihat daftar bisnis yang berpartisipasi di daerah Anda\n\nJika Anda tidak melihat bisnis di area Anda, kami terus memperluas jangkauan kami, jadi pantau terus!";
    }

    return "Terima kasih telah menghubungi kami! Saya Dhiya, Spesialis Penyelamatan Makanan Anda. Ada yang bisa saya bantu hari ini? 😊";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    {
      text: "Saya butuh bantuan dengan kata sandi saya",
      label: "🔐 Bantuan Kata Sandi",
    },
    { text: "Bagaimana cara membuat akun?", label: "📝 Buat Akun" },
    {
      text: "Ceritakan tentang penyelamatan makanan",
      label: "🥗 Penyelamatan Makanan",
    },
    { text: "Berapa harga Anda?", label: "💰 Harga" },
    { text: "Apakah resQfood tersedia di area saya?", label: "📍 Lokasi" },
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-3 right-3 z-50 sm:bottom-4 sm:right-4 md:bottom-6 md:right-6">
        {/* Floating Chat Button */}
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] shadow-2xl transition-all duration-300 transform hover:scale-110 border border-white/20"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
          </Button>
          {/* Notification Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#DE7C7D] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {unreadCount}
              </span>
            </div>
          )}
          {/* Floating Tooltip - Hidden on mobile */}
          <div className="hidden md:block absolute bottom-full right-0 mb-4 px-4 py-3 bg-gradient-to-r from-[#740938] to-[#AF1740] text-white text-sm rounded-2xl shadow-xl opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap transform translate-y-2 hover:translate-y-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#DE7C7D]" />
              <span className="font-medium">
                Butuh bantuan? Chat dengan Dhiya! 💬
              </span>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-[#AF1740]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6">
      <div
        className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-none sm:rounded-2xl md:rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 transition-all duration-500 w-full h-full sm:w-80 sm:h-[500px] md:w-96 md:h-[600px] lg:w-[420px] lg:h-[650px] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#AF1740]/10 to-[#CC2B52]/10 rounded-t-none sm:rounded-t-2xl md:rounded-t-3xl flex-shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="relative">
              <Image
                src="/landing/avatar.png"
                alt="Dhiya - Spesialis Penyelamatan Makanan"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#AF1740] shadow-lg"
              />
              <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-sm sm:text-base">
                Dhiya
              </h3>
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                <p className="text-gray-600 dark:text-gray-400 text-xs">
                  Spesialis Penyelamatan Makanan • Online
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href="/chat"
              className="hidden sm:flex text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 w-8 h-8 p-0 rounded-full transition-all duration-200 items-center justify-center"
              aria-label="Perluas chat"
            >
              <Maximize2 className="w-4 h-4" />
            </Link>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 w-8 h-8 p-0 rounded-full transition-all duration-200"
              aria-label="Tutup chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Support Info Bar - Hidden on small screens */}
        <div className="hidden sm:block px-3 sm:px-4 py-2 bg-gradient-to-r from-[#AF1740]/5 to-[#CC2B52]/5 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span className="hidden sm:inline">
                  Waktu respon rata-rata: 30s
                </span>
                <span className="sm:hidden">30s</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-3 h-3" />
                <span className="hidden md:inline">1-800-RESQFOOD</span>
                <span className="md:hidden">Telepon</span>
              </div>
            </div>
            <div className="text-[#AF1740] font-medium">Dukungan 24/7</div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-3 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[90%] sm:max-w-[85%] ${
                    message.sender === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div className="flex-shrink-0">
                    {message.sender === "agent" ? (
                      <Image
                        src={
                          message.agentAvatar ||
                          "/placeholder.svg?height=32&width=32" ||
                          "/placeholder.svg"
                        }
                        alt={message.agentName || "Agen"}
                        width={32}
                        height={32}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div
                    className={`rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                    <p className="text-xs opacity-70 mt-1 sm:mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <Image
                    src="/landing/avatar.png"
                    alt="Dhiya"
                    width={32}
                    height={32}
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-200 dark:border-gray-700"
                  />
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-1">
                      <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mr-2">
                        Dhiya sedang mengetik
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#AF1740] rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#AF1740] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#AF1740] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="px-3 sm:px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex flex-wrap gap-1">
            {quickActions
              .slice(0, window.innerWidth < 640 ? 2 : 3)
              .map((action, index) => (
                <Button
                  key={index}
                  onClick={() => setNewMessage(action.text)}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2 rounded-full border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:border-[#AF1740]"
                >
                  {action.label}
                </Button>
              ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#740938]/5 to-[#AF1740]/5 rounded-b-none sm:rounded-b-2xl md:rounded-b-3xl flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanyakan apapun tentang resQfood kepada Dhiya..."
              className="flex-1 h-10 sm:h-11 rounded-xl border-gray-200 dark:border-gray-700 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-inner text-sm"
              aria-label="Ketik pesan Anda"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="w-10 h-10 sm:w-11 sm:h-11 p-0 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
              aria-label="Kirim pesan"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
