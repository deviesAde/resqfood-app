"use client";

import WhatsAppChat from "../whatsapp-chat";

export default function MessagesTab() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#740938]">Pesan</h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Chat dengan pelanggan dan dapatkan dukungan dari admin
        </p>
      </div>
      <div className="flex justify-center">
        <WhatsAppChat />
      </div>
    </div>
  );
}
