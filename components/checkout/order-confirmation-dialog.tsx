"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Leaf, Star } from "lucide-react";
import Link from "next/link";

interface OrderConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalItemsSaved: number;
}

export function OrderConfirmationDialog({
  isOpen,
  onClose,
  totalItemsSaved,
}: OrderConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 text-center bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[#DE7C7D]/30 dark:border-gray-700">
        <DialogHeader className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-bounce-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D]">
            Pesanan Selesai!
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 text-base">
            Kamu pahlawan karena telah menyelamatkan {totalItemsSaved} makanan
            {totalItemsSaved !== 1 ? "" : ""} dari pemborosan!
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-center space-x-4 text-green-600 dark:text-green-400">
            <Leaf className="w-6 h-6" />
            <span className="font-semibold">Membuat perubahan berarti!</span>
          </div>
          <div className="flex items-center justify-center space-x-4 text-yellow-500 dark:text-yellow-400">
            <Star className="w-6 h-6" />
            <span className="font-semibold">
              Terima kasih atas kontribusimu!
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-xl h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link
              href="/marketplace"
              className="flex items-center justify-center"
            >
              Lanjutkan Belanja
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
