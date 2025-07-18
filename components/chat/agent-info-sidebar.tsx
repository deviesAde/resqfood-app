"use client";

import Image from "next/image";
import {
  Award,
  MessageCircle,
  Headphones,
  Star,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AgentInfoSidebarProps {
  agentName: string;
  quickActions: { text: string; label: string }[];
  setNewMessage: (message: string) => void;
}

export function AgentInfoSidebar({
  agentName,
  quickActions,
  setNewMessage,
}: AgentInfoSidebarProps) {
  return (
    <div className="w-80 space-y-6 hidden lg:block">
      {/* Agent Card */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt={`${agentName} - Food Rescue Specialist`}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full border-4 border-[#AF1740] shadow-lg mx-auto"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-white dark:border-gray-900"></div>
          </div>
          <h3 className="text-gray-900 dark:text-gray-50 font-bold text-lg mt-4">
            {agentName}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Food Rescue Specialist
          </p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">
              (4.9/5)
            </span>
          </div>
        </div>
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
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
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h3 className="text-gray-900 dark:text-gray-50 font-semibold text-lg mb-4">
          Quick Help
        </h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={() => setNewMessage(action.text)}
              variant="outline"
              size="sm"
              className="w-full justify-start text-left h-auto py-3 px-4 rounded-xl border-gray-200 dark:border-gray-700 hover:bg-[#AF1740] hover:text-white text-gray-700 dark:text-gray-300 transition-all duration-200 hover:border-[#AF1740] dark:hover:border-[#AF1740]"
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Contact Options */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
        <h3 className="text-gray-900 dark:text-gray-50 font-semibold text-lg mb-4">
          Other Ways to Reach Us
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <Mail className="w-4 h-4 text-[#DE7C7D]" />
            <div>
              <p className="font-medium">Email Support</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                help@resqfood.com
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
            <Phone className="w-4 h-4 text-[#DE7C7D]" />
            <div>
              <p className="font-medium">Phone Support</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                1-800-RESQFOOD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
