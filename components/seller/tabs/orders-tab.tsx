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
} from "lucide-react";
import { useOrders } from "../hooks/use-orders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OrdersTab() {
  const { orders, updateOrderStatus } = useOrders();

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

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  const readyOrders = orders.filter((order) => order.status === "ready");
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

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
          <Button
            variant="outline"
            className="border-[#AF1740] dark:border-[#AF1740] text-[#AF1740] dark:text-[#AF1740] hover:bg-[#AF1740] hover:text-white dark:hover:bg-[#AF1740] dark:hover:text-white rounded-full bg-transparent dark:bg-transparent text-sm flex-1 sm:flex-none"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button
            variant="outline"
            className="border-[#740938] dark:border-[#740938] text-[#740938] dark:text-[#740938] hover:bg-[#740938] hover:text-white dark:hover:bg-[#740938] dark:hover:text-white rounded-full bg-transparent dark:bg-transparent text-sm flex-1 sm:flex-none"
          >
            <Download className="w-4 h-4 mr-2" />
            Ekspor
          </Button>
          <Button className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] dark:from-[#AF1740] dark:to-[#CC2B52] dark:hover:from-[#740938] dark:hover:to-[#AF1740] text-white rounded-full shadow-lg hover:shadow-xl transition-all text-sm flex-1 sm:flex-none">
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

      {/* Mobile Cards View */}
      <div className="block sm:hidden space-y-4">
        {orders.map((order) => (
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
                      <DropdownMenuItem className="dark:hover:bg-gray-700">
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
            Pesanan Terbaru
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
                {orders.map((order) => (
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
