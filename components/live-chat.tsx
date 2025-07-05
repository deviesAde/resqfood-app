"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Minimize2, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to resQfood! I'm Emma, your food rescue specialist. How can I help you save food and money today?",
      sender: "agent",
      timestamp: new Date(),
      agentName: "Emma",
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
          text: getAgentResponse(newMessage),
          sender: "agent",
          timestamp: new Date(),
          agentName: "Emma",
          agentAvatar: "/placeholder.svg?height=40&width=40",
        };
        setMessages((prev) => [...prev, agentResponse]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const getAgentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes("password") || message.includes("login")) {
      return "I can help you with password issues! You can reset your password using the 'Forgot Password' link on the login page. If you need further assistance, I'm here to help! 🔐";
    }

    if (message.includes("account") || message.includes("register")) {
      return "Creating an account is easy! Just click 'Join resQfood' and fill out the form. You'll get a 20% welcome bonus on your first food rescue! 🎉";
    }

    if (message.includes("food") || message.includes("rescue")) {
      return "That's awesome! Food rescue is our mission. We help you save perfectly good food from waste while saving up to 70% on groceries. What specific questions do you have about food rescue? 🥗";
    }

    if (message.includes("help") || message.includes("support")) {
      return "I'm here to help! You can also reach our support team at help@resqfood.com or call 1-800-RESQFOOD. What specific issue can I assist you with? 💪";
    }

    if (message.includes("hi") || message.includes("hello")) {
      return "Hello! Great to meet you! I'm excited to help you start your food rescue journey. Do you have any questions about joining resQfood? 😊";
    }

    return "Thanks for your message! I'd be happy to help you with that. For detailed assistance, you can also contact our support team at help@resqfood.com or use our contact form. Is there anything specific about resQfood I can explain? 🌟";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] shadow-2xl transition-all duration-300 transform hover:scale-110 animate-pulse"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>

        {/* Notification Badge */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#CC2B52] rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">1</span>
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-[#740938] text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Need help? Chat with us! 💬
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#740938]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className={`bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Emma - Support Agent"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-[#AF1740]"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Emma</h3>
              <p className="text-white/70 text-xs">
                Food Rescue Specialist • Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsMinimized(!isMinimized)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 p-0"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="h-80 p-4">
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
                      className={`flex items-start space-x-2 max-w-[80%] ${
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
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-[#AF1740] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white"
                            : "bg-white/20 backdrop-blur-sm text-white border border-white/20"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
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
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Emma"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-white/20">
              <div className="flex items-center space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 h-10 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 p-0 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-3">
                <Button
                  onClick={() => setNewMessage("I need help with my password")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-3 rounded-full border-white/20 hover:bg-white/10 text-white/80 hover:text-white"
                >
                  Password Help
                </Button>
                <Button
                  onClick={() => setNewMessage("How do I create an account?")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-3 rounded-full border-white/20 hover:bg-white/10 text-white/80 hover:text-white"
                >
                  Create Account
                </Button>
                <Button
                  onClick={() => setNewMessage("Tell me about food rescue")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 px-3 rounded-full border-white/20 hover:bg-white/10 text-white/80 hover:text-white"
                >
                  Food Rescue
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
