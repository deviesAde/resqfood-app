import AdminChat from "@/components/admin-chat";
export function MessagesTab() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100">
          Pusat Dukungan Admin
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Kelola dukungan pelanggan dan komunikasi penjual
        </p>
      </div>
      <div className="flex justify-center">
        <AdminChat />
      </div>
    </div>
  );
}
;

