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
      text: `Hi there! 👋 Welcome to resQfood! I'm ${agentName}, your dedicated food rescue specialist. I'm here to help you save food, save money, and make a real impact! How can I assist you today?`,
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
        message.includes("login") ||
        message.includes("sign in")
      ) {
        return "I can definitely help with login issues! 🔐 Here are your options:\n\n• Use the 'Forgot Password' link on the login page\n• I can guide you through the reset process\n• Check if Caps Lock is on\n• Try clearing your browser cache\n\nWould you like me to walk you through any of these steps?";
      }
      if (
        message.includes("account") ||
        message.includes("register") ||
        message.includes("sign up") ||
        message.includes("join")
      ) {
        return "Awesome! Creating your resQfood account is super easy! 🎉\n\n✨ **Welcome Bonus**: Get 20% off your first food rescue!\n\n**Quick steps:**\n1. Click 'Join resQfood'\n2. Fill out the simple form\n3. Verify your email\n4. Start saving food & money!\n\nNeed help with any specific part of the registration?";
      }
      if (
        message.includes("food") ||
        message.includes("rescue") ||
        message.includes("how") ||
        message.includes("work")
      ) {
        return "Great question! Food rescue is our passion! 🥗💚\n\n**Here's how it works:**\n• We partner with local stores & restaurants\n• They offer surplus food at 50-70% off\n• You rescue it before it goes to waste\n• Everyone wins - you save money, planet stays happy!\n\n**Your impact so far:** 2.3M+ meals rescued by our community!\n\nWant to know about specific food categories or locations?";
      }
      if (
        message.includes("hi") ||
        message.includes("hello") ||
        message.includes("hey")
      ) {
        return `Hello! So great to meet you! 😊✨\n\nI'm ${agentName}, and I'm super excited to help you start your food rescue journey! Whether you're here to:\n\n🥗 Learn about food rescue\n💰 Start saving money on groceries\n🌍 Make an environmental impact\n🔐 Get help with your account\n\nI've got you covered! What brings you to resQfood today?`;
      }
      return "Thanks for reaching out! 🌟 I'd love to help you with that!\n\nFor detailed assistance, I can:\n• Answer questions about food rescue\n• Help with account issues\n• Connect you with our specialist team\n• Guide you through getting started\n\n**Quick options:**\n📧 Email: help@resqfood.com\n📞 Call: 1-800-RESQFOOD\n💬 Keep chatting with me!\n\nWhat would be most helpful for you right now?";
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
    { text: "I need help with my password", label: "🔐 Password Help" },
    { text: "How do I create an account?", label: "📝 Create Account" },
    { text: "Tell me about food rescue", label: "🥗 Food Rescue" },
    { text: "What are your prices?", label: "💰 Pricing" },
    { text: "Is resQfood available in my area?", label: "📍 Locations" },
    { text: "How do I start rescuing food?", label: "🚀 Get Started" },
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
                      Food Rescue Specialist • Online
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right text-white/90 text-sm">
                <p>Average response time</p>
                <p className="text-[#DE7C7D] font-semibold">30 seconds</p>
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
