"use client";
import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { AgentInfoSidebar } from "@/components/chat/agent-info-sidebar";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

export default function ChatPage() {
  const agentName = "Dhiya Ulhaq"; // Set agent name here
  const agentAvatar = "/placeholder.svg?height=40&width=40";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Halo! 👋 Selamat datang di resQfood! Saya ${agentName}, spesialis penyelamatan makanan yang siap membantu Anda. Saya di sini untuk membantu Anda menyelamatkan makanan, menghemat uang, dan membuat dampak nyata! Bagaimana saya bisa membantu Anda hari ini?`,
      sender: "agent",
      timestamp: new Date(),
      agentName: agentName,
      agentAvatar: agentAvatar,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getSmartAgentResponse = useCallback(
    (userMessage: string): string => {
      const message = userMessage.toLowerCase();

      if (
        message.includes("password") ||
        message.includes("kata sandi") ||
        message.includes("login") ||
        message.includes("masuk") ||
        message.includes("sign in")
      ) {
        return "Saya pasti bisa membantu dengan masalah login! 🔐 Berikut adalah pilihan Anda:\n\n• Gunakan tautan 'Lupa Kata Sandi' di halaman login\n• Saya bisa memandu Anda melalui proses reset\n• Periksa apakah Caps Lock aktif\n• Coba hapus cache browser Anda\n\nApakah Anda ingin saya memandu Anda melalui salah satu langkah ini?";
      }

      if (
        message.includes("account") ||
        message.includes("akun") ||
        message.includes("register") ||
        message.includes("daftar") ||
        message.includes("sign up") ||
        message.includes("bergabung")
      ) {
        return "Luar biasa! Membuat akun resQfood Anda sangat mudah! 🎉\n\n✨ **Bonus Selamat Datang**: Dapatkan diskon 20% untuk penyelamatan makanan pertama Anda!\n\n**Langkah cepat:**\n1. Klik 'Bergabung dengan resQfood'\n2. Isi formulir sederhana\n3. Verifikasi email Anda\n4. Mulai menyelamatkan makanan & uang!\n\nButuh bantuan dengan bagian tertentu dari pendaftaran?";
      }

      if (
        message.includes("food") ||
        message.includes("makanan") ||
        message.includes("rescue") ||
        message.includes("penyelamatan") ||
        message.includes("bagaimana") ||
        message.includes("cara kerja")
      ) {
        return "Pertanyaan yang bagus! Penyelamatan makanan adalah passion kami! 🥗💚\n\n**Begini cara kerjanya:**\n• Kami bermitra dengan toko & restoran lokal\n• Mereka menawarkan makanan surplus dengan diskon 50-70%\n• Anda menyelamatkannya sebelum terbuang sia-sia\n• Semua menang - Anda hemat uang, planet tetap bahagia!\n\n**Dampak Anda sejauh ini:** 2,3 juta+ makanan diselamatkan oleh komunitas kami!\n\nIngin tahu tentang kategori makanan atau lokasi tertentu?";
      }

      if (
        message.includes("hi") ||
        message.includes("halo") ||
        message.includes("hello") ||
        message.includes("hai")
      ) {
        return `Halo! Senang sekali bertemu dengan Anda! 😊✨\n\nSaya ${agentName}, dan saya sangat senang membantu Anda memulai perjalanan penyelamatan makanan! Apakah Anda di sini untuk:\n\n🥗 Belajar tentang penyelamatan makanan\n💰 Mulai menghemat uang untuk belanja\n🌍 Membuat dampak lingkungan\n🔐 Mendapat bantuan dengan akun Anda\n\nSaya siap membantu! Apa yang membawa Anda ke resQfood hari ini?`;
      }

      return "Terima kasih telah menghubungi! 🌟 Saya senang membantu Anda dengan itu!\n\nUntuk bantuan detail, saya bisa:\n• Menjawab pertanyaan tentang penyelamatan makanan\n• Membantu dengan masalah akun\n• Menghubungkan Anda dengan tim spesialis kami\n• Memandu Anda untuk memulai\n\n**Pilihan cepat:**\n📧 Email: help@resqfood.com\n📞 Telepon: 1-800-RESQFOOD\n💬 Terus mengobrol dengan saya!\n\nApa yang paling membantu untuk Anda sekarang?";
    },
    [agentName]
  );

  const handleSendMessage = useCallback(() => {
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

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: Message = {
          id: messages.length + 2,
          text: getSmartAgentResponse(userMessage.text),
          sender: "agent",
          timestamp: new Date(),
          agentName: agentName,
          agentAvatar: agentAvatar,
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, Math.random() * 1000 + 1500);
    }
  }, [
    newMessage,
    messages.length,
    getSmartAgentResponse,
    agentName,
    agentAvatar,
  ]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const quickActions = [
    {
      text: "Saya butuh bantuan dengan kata sandi",
      label: "🔐 Bantuan Kata Sandi",
    },
    { text: "Bagaimana cara membuat akun?", label: "📝 Buat Akun" },
    {
      text: "Ceritakan tentang penyelamatan makanan",
      label: "🥗 Penyelamatan Makanan",
    },
    { text: "Berapa harganya?", label: "💰 Harga" },
    { text: "Apakah resQfood tersedia di daerah saya?", label: "📍 Lokasi" },
    { text: "Bagaimana cara mulai menyelamatkan makanan?", label: "🚀 Mulai" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="min-h-screen flex flex-col">
        <ChatHeader agentName={agentName} />
        <div className="flex-1 flex max-w-6xl mx-auto w-full p-4 gap-6">
          <AgentInfoSidebar
            agentName={agentName}
            quickActions={quickActions}
            setNewMessage={setNewMessage}
          />
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Chat Header within chat area */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-[#AF1740] rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt={agentName}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-900 shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {agentName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <p className="text-white/90 text-sm">
                      Spesialis Penyelamatan Makanan • Online
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right text-white/90 text-sm">
                <p>Waktu respons rata-rata</p>
                <p className="text-[#DE7C7D] font-semibold">30 detik</p>
              </div>
            </div>
            <ChatMessages
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              agentName={agentName}
            />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              handleKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
