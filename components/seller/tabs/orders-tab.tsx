"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  Package,
  Clock,
  DollarSign,
  Eye,
  MessageSquare,
  Star,
  MapPin,
  MoreVertical,
  User,
  Phone,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";
import { useOrders } from "../hooks/use-orders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";

interface Order {
  id: string;
  customerName: string;
  customerAvatar: string;
  customerRating?: number;
  customerPhone?: string;
  customerEmail?: string;
  items: string[];
  totalAmount: number;
  paymentMethod: string;
  status: string;
  orderDate: string;
  pickupTime: string;
  notes?: string;
}

export default function OrdersTab() {
  const { orders, updateOrderStatus } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [paymentFilter, setPaymentFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 dark:bg-green-600";
      case "ready":
        return "bg-blue-500 dark:bg-blue-600";
      case "pending":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "in-progress":
        return "bg-[#AF1740] dark:bg-[#CC2B52]";
      case "cancelled":
        return "bg-gray-500 dark:bg-gray-600";
      default:
        return "bg-gray-500 dark:bg-gray-600";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Selesai";
      case "ready":
        return "Siap";
      case "pending":
        return "Menunggu";
      case "in-progress":
        return "Diproses";
      case "cancelled":
        return "Dibatalkan";
      default:
        return status;
    }
  };

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Status filter
      if (statusFilter.length > 0 && !statusFilter.includes(order.status)) {
        return false;
      }

      // Payment method filter
      if (
        paymentFilter.length > 0 &&
        !paymentFilter.includes(order.paymentMethod)
      ) {
        return false;
      }

      // Date filter (today, yesterday, this week, etc.)
      if (dateFilter) {
        const orderDate = new Date(order.orderDate);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        switch (dateFilter) {
          case "today":
            if (orderDate.toDateString() !== today.toDateString()) return false;
            break;
          case "yesterday":
            if (orderDate.toDateString() !== yesterday.toDateString())
              return false;
            break;
          case "week":
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            if (orderDate < weekAgo) return false;
            break;
        }
      }

      return true;
    });
  }, [orders, statusFilter, paymentFilter, dateFilter]);

  const completedOrders = filteredOrders.filter(
    (order) => order.status === "completed"
  );
  const readyOrders = filteredOrders.filter(
    (order) => order.status === "ready"
  );
  const pendingOrders = filteredOrders.filter(
    (order) => order.status === "pending"
  );
  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  // Export functionality
  const exportToCSV = () => {
    const headers = [
      "ID Pesanan",
      "Pelanggan",
      "Email",
      "Telepon",
      "Item",
      "Total",
      "Metode Pembayaran",
      "Status",
      "Tanggal Pesanan",
      "Waktu Pickup",
    ];

    const csvData = filteredOrders.map((order) => [
      order.id,
      order.customerName,
      order.customerEmail || "-",
      order.customerPhone || "-",
      order.items.join("; "),
      order.totalAmount,
      order.paymentMethod,
      getStatusText(order.status),
      order.orderDate,
      order.pickupTime,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearFilters = () => {
    setStatusFilter([]);
    setPaymentFilter([]);
    setDateFilter("");
  };

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const uniquePaymentMethods = [
    ...new Set(orders.map((order) => order.paymentMethod)),
  ];
  const statusOptions = [
    { value: "pending", label: "Menunggu" },
    { value: "in-progress", label: "Diproses" },
    { value: "ready", label: "Siap" },
    { value: "completed", label: "Selesai" },
    { value: "cancelled", label: "Dibatalkan" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-start sm:space-y-0 gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-white">
            Manajemen Pesanan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Lacak dan kelola pesanan pelanggan
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-[#AF1740] dark:border-[#AF1740] text-[#AF1740] dark:text-[#AF1740] hover:bg-[#AF1740] hover:text-white dark:hover:bg-[#AF1740] dark:hover:text-white rounded-full bg-transparent dark:bg-transparent text-sm flex-1 sm:flex-none"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
                {(statusFilter.length > 0 ||
                  paymentFilter.length > 0 ||
                  dateFilter) && (
                  <Badge className="ml-2 bg-[#AF1740] text-white text-xs">
                    {statusFilter.length +
                      paymentFilter.length +
                      (dateFilter ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
              {statusOptions.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status.value}
                  checked={statusFilter.includes(status.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setStatusFilter([...statusFilter, status.value]);
                    } else {
                      setStatusFilter(
                        statusFilter.filter((s) => s !== status.value)
                      );
                    }
                  }}
                >
                  {status.label}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter Pembayaran</DropdownMenuLabel>
              {uniquePaymentMethods.map((method) => (
                <DropdownMenuCheckboxItem
                  key={method}
                  checked={paymentFilter.includes(method)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setPaymentFilter([...paymentFilter, method]);
                    } else {
                      setPaymentFilter(
                        paymentFilter.filter((p) => p !== method)
                      );
                    }
                  }}
                >
                  {method}
                </DropdownMenuCheckboxItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter Tanggal</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={dateFilter === "today"}
                onCheckedChange={(checked) =>
                  setDateFilter(checked ? "today" : "")
                }
              >
                Hari Ini
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={dateFilter === "yesterday"}
                onCheckedChange={(checked) =>
                  setDateFilter(checked ? "yesterday" : "")
                }
              >
                Kemarin
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={dateFilter === "week"}
                onCheckedChange={(checked) =>
                  setDateFilter(checked ? "week" : "")
                }
              >
                7 Hari Terakhir
              </DropdownMenuCheckboxItem>

              {(statusFilter.length > 0 ||
                paymentFilter.length > 0 ||
                dateFilter) && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearFilters}>
                    Hapus Semua Filter
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={exportToCSV}
            variant="outline"
            className="border-[#740938] dark:border-[#740938] text-[#740938] dark:text-[#740938] hover:bg-[#740938] hover:text-white dark:hover:bg-[#740938] dark:hover:text-white rounded-full bg-transparent dark:bg-transparent text-sm flex-1 sm:flex-none"
          >
            <Download className="w-4 h-4 mr-2" />
            Ekspor ({filteredOrders.length})
          </Button>

          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] dark:from-[#AF1740] dark:to-[#CC2B52] dark:hover:from-[#740938] dark:hover:to-[#AF1740] text-white rounded-full shadow-lg hover:shadow-xl transition-all text-sm flex-1 sm:flex-none"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-green-900/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">
                  Selesai
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 dark:text-green-400">
                  {completedOrders.length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-500 dark:bg-green-600 rounded-full flex items-center justify-center shrink-0 ml-2">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">
                  Siap
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {readyOrders.length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center shrink-0 ml-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-yellow-900/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">
                  Menunggu
                </p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                  {pendingOrders.length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center shrink-0 ml-2">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10 dark:from-gray-800 dark:to-[#DE7C7D]/20">
          <CardContent className="p-3 sm:p-4 lg:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm truncate">
                  Total Pendapatan
                </p>
                <p className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#740938] dark:text-[#DE7C7D]">
                  Rp{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] dark:from-[#CC2B52] dark:to-[#DE7C7D] rounded-full flex items-center justify-center shrink-0 ml-2">
                <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#740938] dark:text-white flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Detail Pesanan {selectedOrder?.id}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Informasi Pelanggan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center text-white font-semibold">
                      {selectedOrder.customerAvatar}
                    </div>
                    <div>
                      <p className="font-semibold text-[#740938] dark:text-white">
                        {selectedOrder.customerName}
                      </p>
                      {selectedOrder.customerRating && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {selectedOrder.customerRating}/5
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedOrder.customerPhone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {selectedOrder.customerPhone}
                      </span>
                    </div>
                  )}

                  {selectedOrder.customerEmail && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {selectedOrder.customerEmail}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <Package className="w-4 h-4 mr-2" />
                    Informasi Pesanan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Tanggal Pesanan
                      </p>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4 text-[#AF1740]" />
                        <span className="font-medium">
                          {selectedOrder.orderDate}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Waktu Pickup
                      </p>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-[#AF1740]" />
                        <span className="font-medium">
                          {selectedOrder.pickupTime}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Status
                    </p>
                    <Badge
                      className={`${getStatusColor(
                        selectedOrder.status
                      )} text-white`}
                    >
                      {getStatusText(selectedOrder.status)}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Item Pesanan
                    </p>
                    <div className="space-y-1">
                      {selectedOrder.items.map((item, index) => (
                        <p
                          key={index}
                          className="text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Catatan
                      </p>
                      <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border-l-4 border-yellow-400">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Informasi Pembayaran
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      Metode Pembayaran
                    </span>
                    <span className="font-medium">
                      {selectedOrder.paymentMethod}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#740938] dark:text-white">
                      Total
                    </span>
                    <span className="text-lg font-bold text-[#AF1740] dark:text-[#CC2B52]">
                      Rp{selectedOrder.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat Pelanggan
                </Button>
                {selectedOrder.status === "pending" && (
                  <Button
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, "ready");
                      setIsDetailOpen(false);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Tandai Siap
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Mobile Cards View */}
      <div className="block sm:hidden space-y-4">
        {filteredOrders.map((order) => (
          <Card
            key={order.id}
            className="border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl shadow-lg bg-white dark:bg-gray-800"
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-[#740938] dark:text-white text-sm">
                      {order.id}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {order.orderDate}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="dark:bg-gray-800 dark:border-gray-600"
                    >
                      <DropdownMenuItem
                        onClick={() => openOrderDetail(order)}
                        className="dark:hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem className="dark:hover:bg-gray-700">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Chat Pelanggan
                      </DropdownMenuItem>
                      {order.status === "pending" && (
                        <DropdownMenuItem
                          onClick={() => updateOrderStatus(order.id, "ready")}
                          className="dark:hover:bg-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Tandai Siap
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] dark:from-[#CC2B52] dark:to-[#DE7C7D] rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {order.customerAvatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#740938] dark:text-white text-sm truncate">
                      {order.customerName}
                    </p>
                    {order.customerRating && (
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {order.customerRating}/5
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  {order.items.slice(0, 2).map((item, index) => (
                    <p
                      key={index}
                      className="text-xs text-gray-700 dark:text-gray-300"
                    >
                      {item}
                    </p>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      +{order.items.length - 2} lainnya
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#AF1740] dark:text-[#CC2B52] text-sm">
                      Rp{order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {order.paymentMethod}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} text-white text-xs`}
                  >
                    {getStatusText(order.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-[#CC2B52] dark:text-[#DE7C7D]" />
                    <span>{order.pickupTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                    <span>Toko Roti</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <Card className="hidden sm:block border-2 border-[#DE7C7D]/30 dark:border-gray-600 rounded-xl lg:rounded-2xl shadow-lg bg-white dark:bg-gray-800">
        <CardHeader className="dark:bg-gray-800">
          <CardTitle className="text-[#740938] dark:text-white flex items-center text-base sm:text-lg">
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Pesanan Terbaru ({filteredOrders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 lg:p-6 dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-[#DE7C7D]/30 dark:border-gray-600 bg-[#DE7C7D]/10 dark:bg-gray-700">
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    ID Pesanan
                  </th>
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    Pelanggan
                  </th>
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    Item
                  </th>
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    Jumlah
                  </th>
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    Status
                  </th>
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    Pickup
                  </th>
                  <th className="text-left py-3 lg:py-4 px-2 sm:px-4 text-[#740938] dark:text-white font-semibold text-sm lg:text-base">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#DE7C7D]/20 dark:border-gray-600 hover:bg-[#DE7C7D]/10 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <div>
                        <p className="font-semibold text-[#740938] dark:text-white text-sm lg:text-base">
                          {order.id}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                          {order.orderDate}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] dark:from-[#CC2B52] dark:to-[#DE7C7D] rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm shrink-0">
                          {order.customerAvatar}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#740938] dark:text-white text-sm lg:text-base truncate">
                            {order.customerName}
                          </p>
                          {order.customerRating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600 dark:text-gray-300">
                                {order.customerRating}/5
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, index) => (
                          <p
                            key={index}
                            className="text-xs lg:text-sm text-gray-700 dark:text-gray-300"
                          >
                            {item}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            +{order.items.length - 2} lainnya
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <div>
                        <p className="font-bold text-[#AF1740] dark:text-[#CC2B52] text-sm lg:text-lg">
                          Rp{order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <Badge
                        className={`${getStatusColor(
                          order.status
                        )} text-white text-xs lg:text-sm`}
                      >
                        {getStatusText(order.status)}
                      </Badge>
                    </td>
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 lg:w-4 lg:h-4 text-[#CC2B52] dark:text-[#DE7C7D]" />
                        <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-300">
                          {order.pickupTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Toko Roti
                        </span>
                      </div>
                    </td>
                    <td className="py-3 lg:py-4 px-2 sm:px-4">
                      <div className="flex items-center space-x-1 lg:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openOrderDetail(order)}
                          className="border-[#740938] dark:border-[#740938] text-[#740938] dark:text-[#740938] hover:bg-[#740938] hover:text-white dark:hover:bg-[#740938] dark:hover:text-white bg-transparent dark:bg-transparent text-xs p-1 lg:p-2"
                        >
                          <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#AF1740] dark:border-[#AF1740] text-[#AF1740] dark:text-[#AF1740] hover:bg-[#AF1740] hover:text-white dark:hover:bg-[#AF1740] dark:hover:text-white bg-transparent dark:bg-transparent text-xs p-1 lg:p-2"
                        >
                          <MessageSquare className="w-3 h-3 lg:w-4 lg:h-4" />
                        </Button>
                        {order.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, "ready")}
                            className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] dark:from-[#AF1740] dark:to-[#CC2B52] dark:hover:from-[#740938] dark:hover:to-[#AF1740] text-white text-xs p-1 lg:p-2"
                          >
                            <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
