"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface PaymentConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  total: number;
  formatRupiah: (amount: number) => string;
}

export function PaymentConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  total,
  formatRupiah,
}: PaymentConfirmationDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <DialogHeader>
          <AlertTriangle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <DialogTitle className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D]">
            Konfirmasi Pembayaran
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
            Anda akan membayar total{" "}
            <span className="font-bold text-[#AF1740]">
              {formatRupiah(total)}
            </span>
            . Apakah Anda yakin ingin melanjutkan?
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white rounded-full dark:border-[#DE7C7D] dark:text-[#DE7C7D] dark:hover:bg-[#DE7C7D] dark:hover:text-gray-900 bg-transparent"
          >
            Batal
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full"
          >
            Konfirmasi & Bayar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
