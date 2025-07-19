"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Copy,
  Facebook,
  Link2,
  Mail,
  MessageSquare,
  Twitter,
  MessageCircleMore,
  X,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  productUrl: string;
  productName?: string;
}

export function ShareModal({
  isOpen,
  onClose,
  productUrl,
  productName = "Produk ini",
}: ShareModalProps) {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productUrl);
    toast({
      title: "Tautan disalin!",
      description: "Tautan produk telah disalin ke clipboard Anda.",
    });
  };

  const shareOnPlatform = (platform: string) => {
    const shareText = `Lihat ${productName} di resQfood: ${productUrl}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            productUrl
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodeURIComponent(
            productUrl
          )}&text=${encodeURIComponent(productName)}`,
          "_blank"
        );
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodeURIComponent(
            productName
          )}&body=${encodeURIComponent(shareText)}`
        );
        break;
      default:
        break;
    }
    onClose();
  };

  const shareOptions = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => shareOnPlatform("facebook"),
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      color: "bg-blue-400 hover:bg-blue-500",
      action: () => shareOnPlatform("twitter"),
    },
    {
      name: "WhatsApp",
      icon: <MessageCircleMore className="w-5 h-5" />,
      color: "bg-green-500 hover:bg-green-600",
      action: () => shareOnPlatform("whatsapp"),
    },
    {
      name: "Telegram",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => shareOnPlatform("telegram"),
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      color: "bg-gray-600 hover:bg-gray-700",
      action: () => shareOnPlatform("email"),
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link2 className="w-5 h-5" />
            Bagikan Produk
          </DialogTitle>
          <DialogDescription>
            Bagikan produk ini melalui platform favorit Anda
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-5 gap-2 mb-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={option.action}
              className={`flex flex-col items-center justify-center p-3 rounded-lg text-white ${option.color} transition-colors`}
              aria-label={`Bagikan melalui ${option.name}`}
            >
              {option.icon}
              <span className="sr-only">{option.name}</span>
            </button>
          ))}
        </div>

        <Separator className="my-2" />

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              value={productUrl}
              readOnly
              className="h-9"
              onFocus={(e) => e.target.select()}
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={handleCopyLink}
          >
            <span className="sr-only">Salin</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
