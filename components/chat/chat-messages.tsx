import type React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";

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
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  agentName: string;
}

export function ChatMessages({
  messages,
  isTyping,
  messagesEndRef,
  agentName,
}: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              } items-start space-x-3`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                {message.sender === "agent" ? (
                  <Image
                    src="/landing/avatar.png"
                    alt={agentName}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <>
                    <AvatarImage src="/landing/user.png" />
                    <AvatarFallback className="bg-[#AF1740] text-white text-sm">
                      A
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={`flex flex-col ${
                  message.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-4 py-3 max-w-full ${
                    message.sender === "user"
                      ? "bg-[#AF1740] text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.text}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-1">
                  {formatDistanceToNow(message.timestamp, {
                    addSuffix: true,
                    locale: id,
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <Image
                  src="/landing/avatar.png"
                  alt={agentName}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              </Avatar>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
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
  );
}
