import Link from "next/link";
import { ArrowLeft, Clock, Phone, Heart, Leaf } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image"; // Import Image component

interface ChatHeaderProps {
  agentName: string;
}

export function ChatHeader({ agentName }: ChatHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors hidden sm:inline-flex"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl shadow-lg">
              <div className="flex items-center space-x-1">
                 <Image
                                src="/logo/logo.png"
                                alt="resQfood Logo"
                                width={32} // Adjust width as needed
                                height={32} // Adjust height as needed
                                className="rounded-lg group-hover:scale-105 transition-transform"
                              />
                <span className="text-lg font-bold text-white">
                  {agentName}
                </span>
                
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                resQfood Support
              </h1>
              <p className="text-gray-600 text-sm dark:text-gray-400">
                Chat with our food rescue specialists
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <div className="flex items-center space-x-4 hidden md:flex">
            <div className="flex items-center space-x-2 text-gray-600 text-sm dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm dark:text-gray-400">
              <Phone className="w-4 h-4" />
              <span>1-800-RESQFOOD</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
