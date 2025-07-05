"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Send,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Heart,
  Leaf,
  Clock,
  Star,
  Award,
  Headphones,
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

export default function ChatPage() {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

      // Simulate agent response
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
      }, Math.random() * 1000 + 1500);
    }
  };

  const getSmartAgentResponse = (userMessage: string): string => {
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
      return "Hello! So great to meet you! 😊✨\n\nI'm Emma, and I'm super excited to help you start your food rescue journey! Whether you're here to:\n\n🥗 Learn about food rescue\n💰 Start saving money on groceries\n🌍 Make an environmental impact\n🔐 Get help with your account\n\nI've got you covered! What brings you to resQfood today?";
    }

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
    { text: "How do I start rescuing food?", label: "🚀 Get Started" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Container */}
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Home</span>
              </Link>

              <div className="flex items-center space-x-3">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Leaf className="w-5 h-5 text-white" />
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    resQfood Support
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Chat with our food rescue specialists
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Phone className="w-4 h-4" />
                <span>1-800-RESQFOOD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex max-w-6xl mx-auto w-full p-4 gap-6">
          {/* Left Sidebar - Agent Info & Quick Actions */}
          <div className="w-80 space-y-6 hidden lg:block">
            {/* Agent Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Emma Rodriguez - Food Rescue Specialist"
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full border-4 border-[#AF1740] shadow-lg mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
                </div>
                <h3 className="text-gray-900 font-bold text-lg mt-4">
                  Emma Rodriguez
                </h3>
                <p className="text-gray-600 text-sm">Food Rescue Specialist</p>
                <div className="flex items-center justify-center space-x-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-2">(4.9/5)</span>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center space-x-3">
                  <Award className="w-4 h-4 text-[#DE7C7D]" />
                  <span>3+ years helping food heroes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-[#DE7C7D]" />
                  <span>Avg response time: 30 seconds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Headphones className="w-4 h-4 text-[#DE7C7D]" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
              <h3 className="text-gray-900 font-semibold text-lg mb-4">
                Quick Help
              </h3>
              <div className="space-y-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={() => setNewMessage(action.text)}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left h-auto py-3 px-4 rounded-xl border-gray-200 hover:bg-[#AF1740] hover:text-white text-gray-700 transition-all duration-200 hover:border-[#AF1740]"
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-lg">
              <h3 className="text-gray-900 font-semibold text-lg mb-4">
                Other Ways to Reach Us
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-4 h-4 text-[#DE7C7D]" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-gray-600">help@resqfood.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-4 h-4 text-[#DE7C7D]" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-600">1-800-RESQFOOD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#AF1740] rounded-t-3xl">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image
                    src="/placeholder.svg?height=50&width=50"
                    alt="Emma Rodriguez"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    Emma Rodriguez
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

            {/* Messages */}
            <ScrollArea className="flex-1 p-6 bg-gray-50">
              <div className="space-y-6">
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
                      className={`flex items-start space-x-3 max-w-[80%] ${
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
                              "/placeholder.svg?height=40&width=40"
                            }
                            alt={message.agentName || "Agent"}
                            width={40}
                            height={40}
                            className="w-10 h-10 rounded-full border-2 border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center shadow-lg">
                            <User className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-6 py-4 shadow-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white"
                            : "bg-white text-gray-900 border border-gray-200"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {message.text}
                        </p>
                        <p
                          className={`text-xs mt-3 ${
                            message.sender === "user"
                              ? "text-white/70"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Emma"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full border-2 border-gray-200"
                      />
                      <div className="bg-white rounded-2xl px-6 py-4 border border-gray-200 shadow-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-600 text-sm">
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

            {/* Input Area */}
            <div className="p-6 border-t border-gray-200 bg-white rounded-b-3xl">
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="h-12 rounded-xl border-gray-300 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white text-gray-900 placeholder:text-gray-500 shadow-sm text-base"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Send className="w-5 h-5 text-white mr-2" />
                  Send
                </Button>
              </div>

              <p className="text-gray-500 text-xs mt-3 text-center">
                Press Enter to send • Shift + Enter for new line
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
