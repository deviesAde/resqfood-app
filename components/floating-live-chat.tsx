"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  X,
  Send,
  Minimize2,
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to resQfood! I'm Emma, your dedicated food rescue specialist. I'm here to help you save food, save money, and make a real impact! How can I assist you today?",
      sender: "agent",
      timestamp: new Date(),
      agentName: "Emma Rodriguez",
      agentAvatar: "/placeholder.svg?height=40&width=40",
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

      setMessages([...messages, userMessage]);
      setNewMessage("");
      setIsTyping(true);

      // Simulate agent response with more realistic delay
      setTimeout(() => {
        const agentResponse: Message = {
          id: messages.length + 2,
          text: getSmartAgentResponse(newMessage),
          sender: "agent",
          timestamp: new Date(),
          agentName: "Emma Rodriguez",
          agentAvatar: "/placeholder.svg?height=40&width=40",
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);

        if (!isOpen) {
          setUnreadCount((prev) => prev + 1);
        }
      }, Math.random() * 1000 + 1500); // 1.5-2.5 seconds
    }
  };

  const getSmartAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Password and login issues
    if (
      message.includes("password") ||
      message.includes("login") ||
      message.includes("sign in")
    ) {
      return "I can definitely help with login issues! 🔐 Here are your options:\n\n• Use the 'Forgot Password' link on the login page\n• I can guide you through the reset process\n• Check if Caps Lock is on\n• Try clearing your browser cache\n\nWould you like me to walk you through any of these steps?";
    }

    // Account creation and registration
    if (
      message.includes("account") ||
      message.includes("register") ||
      message.includes("sign up") ||
      message.includes("join")
    ) {
      return "Awesome! Creating your resQfood account is super easy! 🎉\n\n✨ **Welcome Bonus**: Get 20% off your first food rescue!\n\n**Quick steps:**\n1. Click 'Join resQfood'\n2. Fill out the simple form\n3. Verify your email\n4. Start saving food & money!\n\nNeed help with any specific part of the registration?";
    }

    // Food rescue and how it works
    if (
      message.includes("food") ||
      message.includes("rescue") ||
      message.includes("how") ||
      message.includes("work")
    ) {
      return "Great question! Food rescue is our passion! 🥗💚\n\n**Here's how it works:**\n• We partner with local stores & restaurants\n• They offer surplus food at 50-70% off\n• You rescue it before it goes to waste\n• Everyone wins - you save money, planet stays happy!\n\n**Your impact so far:** 2.3M+ meals rescued by our community!\n\nWant to know about specific food categories or locations?";
    }

    // Pricing and savings
    if (
      message.includes("price") ||
      message.includes("cost") ||
      message.includes("save") ||
      message.includes("money")
    ) {
      return "You'll love our savings! 💰\n\n**Average savings:** 50-70% off retail prices\n**Welcome bonus:** 20% off your first rescue\n**No membership fees:** Pay only for what you rescue\n\n**Example savings:**\n• $50 grocery bill → Pay just $15-25\n• Fresh produce, bakery items, prepared meals\n• Premium organic foods at amazing prices\n\nReady to start saving?";
    }

    // Technical support
    if (
      message.includes("help") ||
      message.includes("support") ||
      message.includes("problem") ||
      message.includes("issue")
    ) {
      return "I'm here to help! 💪 Our support team is amazing:\n\n**Instant help:**\n• Live chat (that's me!) - Right now\n• Phone: 1-800-RESQFOOD - Immediate\n• Email: help@resqfood.com - Within 2 hours\n\n**Common solutions:**\n• Password resets\n• Account questions\n• Order assistance\n• Technical issues\n\nWhat specific issue can I help you solve?";
    }

    // Greetings
    if (
      message.includes("hi") ||
      message.includes("hello") ||
      message.includes("hey")
    ) {
      return "Hello! So great to meet you! 😊✨\n\nI'm Emma, and I'm super excited to help you start your food rescue journey! Whether you're here to:\n\n🥗 Learn about food rescue\n💰 Start saving money on groceries\n🌍 Make an environmental impact\n🔐 Get help with your account\n\nI've got you covered! What brings you to resQfood today?";
    }

    // Location and availability
    if (
      message.includes("location") ||
      message.includes("area") ||
      message.includes("near") ||
      message.includes("where")
    ) {
      return "We're expanding rapidly! 📍\n\n**Currently available in:**\n• 50+ major cities across the US\n• Growing to new areas monthly\n• Partnered with 1,000+ local businesses\n\n**To check your area:**\n1. Create your account\n2. Enter your zip code\n3. See available rescues nearby\n\nEven if we're not in your area yet, join our waitlist - you'll be first to know when we arrive! 🚀";
    }

    // Default helpful response
    return "Thanks for reaching out! 🌟 I'd love to help you with that!\n\nFor detailed assistance, I can:\n• Answer questions about food rescue\n• Help with account issues\n• Connect you with our specialist team\n• Guide you through getting started\n\n**Quick options:**\n📧 Email: help@resqfood.com\n📞 Call: 1-800-RESQFOOD\n💬 Keep chatting with me!\n\nWhat would be most helpful for you right now?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "I need help with my password", label: "🔐 Password Help" },
    { text: "How do I create an account?", label: "📝 Create Account" },
    { text: "Tell me about food rescue", label: "🥗 Food Rescue" },
    { text: "What are your prices?", label: "💰 Pricing" },
    { text: "Is resQfood available in my area?", label: "📍 Locations" },
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating Chat Button */}
        <div className="relative">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] shadow-2xl transition-all duration-300 transform hover:scale-110"
          >
            <MessageCircle className="w-8 h-8 text-white" />
          </Button>

          {/* Notification Badge */}
          {unreadCount > 0 && (
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#CC2B52] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {unreadCount}
              </span>
            </div>
          )}

          {/* Floating Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 px-4 py-3 bg-gradient-to-r from-[#740938] to-[#AF1740] text-white text-sm rounded-2xl shadow-xl opacity-0 hover:opacity-100 transition-all duration-300 whitespace-nowrap transform translate-y-2 hover:translate-y-0">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#DE7C7D]" />
              <span className="font-medium">Need help? Chat with Emma! 💬</span>
            </div>
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-[#AF1740]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 transition-all duration-500 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-[#740938]/20 to-[#AF1740]/20 rounded-t-3xl">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Emma Rodriguez - Food Rescue Specialist"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-[#AF1740] shadow-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                Emma Rodriguez
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-white/80 text-xs">
                  Food Rescue Specialist • Online
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href="/chat"
              className="text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 p-0 rounded-full transition-all duration-200 flex items-center justify-center"
            >
              <Maximize2 className="w-4 h-4" />
            </Link>
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 p-0 rounded-full transition-all duration-200"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 p-0 rounded-full transition-all duration-200"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Support Info Bar */}
            <div className="px-4 py-2 bg-gradient-to-r from-[#AF1740]/10 to-[#CC2B52]/10 border-b border-white/10">
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Avg response: 30s</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>1-800-RESQFOOD</span>
                  </div>
                </div>
                <div className="text-[#DE7C7D] font-medium">24/7 Support</div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-96 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start space-x-2 max-w-[85%] ${
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
                              "/placeholder.svg?height=32&width=32"
                            }
                            alt={message.agentName || "Agent"}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full border border-white/20"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white"
                            : "bg-white/15 backdrop-blur-sm text-white border border-white/20"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                        <p className="text-xs opacity-70 mt-2">
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
                        src="/placeholder.svg?height=32&width=32"
                        alt="Emma"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border border-white/20"
                      />
                      <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                        <div className="flex items-center space-x-1">
                          <span className="text-white/80 text-sm mr-2">
                            Emma is typing
                          </span>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#DE7C7D] rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-[#DE7C7D] rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-[#DE7C7D] rounded-full animate-bounce"
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
            <div className="px-4 py-2 border-t border-white/10">
              <div className="flex flex-wrap gap-1">
                {quickActions.slice(0, 3).map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => setNewMessage(action.text)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-6 px-2 rounded-full border-white/20 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 hover:border-[#AF1740]"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-gradient-to-r from-[#740938]/10 to-[#AF1740]/10 rounded-b-3xl">
              <div className="flex items-center space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Emma anything about resQfood..."
                  className="flex-1 h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 shadow-inner"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-11 h-11 p-0 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Send className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
