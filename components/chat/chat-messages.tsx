import Image from "next/image";
import { User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
}

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  agentName: string;
}

export function ChatMessages({
  messages,
  isTyping,
  messagesEndRef,
  agentName,
}: ChatMessagesProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const formatTime = (date: Date) => {
    if (!isMounted) return ""; // Return empty string during SSR
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <ScrollArea className="flex-1 p-6 bg-gray-50 dark:bg-gray-950">
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
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
                    className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                    priority={message.id === messages.length - 1} // Only prioritize last image
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
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-3 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* Typing Indicator - now client-only */}
        {isMounted && isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3 max-w-[80%]">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt={agentName}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
              />
              <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-4 border border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {agentName} is typing
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
  );
}
