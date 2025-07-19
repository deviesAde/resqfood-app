"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Phone, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useState } from "react";

interface ChatHeaderProps {
  agentName: string;
}

export function ChatHeader({ agentName }: ChatHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        {/* Mobile Layout */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-xl shadow-lg">
                <Image
                  src="/logo/logo.png"
                  alt="resQfood Logo"
                  width={24}
                  height={24}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  resQfood
                </h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Dukungan
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Informasi Dukungan</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 pt-6">
                  <div className="flex items-center space-x-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl shadow-lg">
                      <Image
                        src="/logo/logo.png"
                        alt="resQfood Logo"
                        width={32}
                        height={32}
                        className="rounded-lg"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                        {agentName}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Spesialis Penyelamatan Makanan
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Clock className="w-5 h-5 text-[#AF1740]" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-50">
                          Dukungan 24/7
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Selalu siap membantu
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Phone className="w-5 h-5 text-[#AF1740]" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-50">
                          Hubungi Kami
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          1-800-RESQFOOD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Kembali</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-11 h-11 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl shadow-lg">
                <Image
                  src="/logo/logo.png"
                  alt="resQfood Logo"
                  width={28}
                  height={28}
                  className="rounded-lg"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                  resQfood Support
                </h1>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Chat dengan spesialis penyelamatan makanan
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-gray-600 text-sm dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>24/7</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Kembali ke Beranda</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl shadow-lg">
                <Image
                  src="/logo/logo.png"
                  alt="resQfood Logo"
                  width={32}
                  height={32}
                  className="rounded-lg group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-50">
                  resQfood Support
                </h1>
                <p className="text-gray-600 text-sm dark:text-gray-400">
                  Chat dengan spesialis penyelamatan makanan kami
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600 text-sm dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Dukungan 24/7</span>
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
    </div>
  );
}
