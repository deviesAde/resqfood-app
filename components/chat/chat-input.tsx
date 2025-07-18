"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import type React from "react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

export function ChatInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyPress,
}: ChatInputProps) {
  return (
    <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-3xl">
      <div className="flex items-end space-x-4">
        <div className="flex-1">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="h-12 rounded-xl border-gray-300 dark:border-gray-600 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm text-base"
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
      <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 text-center">
        Press Enter to send • Shift + Enter for new line
      </p>
    </div>
  );
}
