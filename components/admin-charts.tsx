"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  PieChart,
  Activity,
} from "lucide-react";

// Dummy chart data
const revenueData = [
  { month: "Jan", revenue: 12000, orders: 145 },
  { month: "Feb", revenue: 15000, orders: 178 },
  { month: "Mar", revenue: 18000, orders: 203 },
  { month: "Apr", revenue: 22000, orders: 267 },
  { month: "May", revenue: 28000, orders: 312 },
  { month: "Jun", revenue: 35000, orders: 389 },
];

const userGrowthData = [
  { month: "Jan", users: 1200, sellers: 25 },
  { month: "Feb", users: 1450, sellers: 32 },
  { month: "Mar", users: 1780, sellers: 38 },
  { month: "Apr", users: 2100, sellers: 45 },
  { month: "May", users: 2500, sellers: 52 },
  { month: "Jun", users: 2847, sellers: 58 },
];

const categoryData = [
  { category: "Baked Goods", percentage: 35, color: "#AF1740" },
  { category: "Fresh Produce", percentage: 28, color: "#CC2B52" },
  { category: "Dairy", percentage: 18, color: "#DE7C7D" },
  { category: "Prepared Foods", percentage: 12, color: "#740938" },
  { category: "Others", percentage: 7, color: "#F4A6A7" },
];

export function RevenueChart() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Revenue Analytics
          </div>
          <Badge className="bg-green-500 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            +18.5%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#AF1740]">$35K</div>
              <div className="text-sm text-gray-600">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#CC2B52]">389</div>
              <div className="text-sm text-gray-600">Orders</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#740938]">$90</div>
              <div className="text-sm text-gray-600">Avg Order</div>
            </div>
          </div>

          <div className="space-y-3">
            {revenueData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-3">
                <div className="w-8 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                    ${(data.revenue / 1000).toFixed(0)}K
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">
                  {data.orders}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function UserGrowthChart() {
  const maxUsers = Math.max(...userGrowthData.map((d) => d.users));

  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center justify-between">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            User Growth
          </div>
          <Badge className="bg-blue-500 text-white">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.3%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#AF1740]">2,847</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#CC2B52]">58</div>
              <div className="text-sm text-gray-600">Active Sellers</div>
            </div>
          </div>

          <div className="h-48 flex items-end justify-between space-x-2">
            {userGrowthData.map((data, index) => (
              <div
                key={data.month}
                className="flex-1 flex flex-col items-center"
              >
                <div className="w-full space-y-1">
                  <div
                    className="bg-gradient-to-t from-[#AF1740] to-[#CC2B52] rounded-t transition-all duration-1000 ease-out"
                    style={{ height: `${(data.users / maxUsers) * 120}px` }}
                  />
                  <div
                    className="bg-gradient-to-t from-[#740938] to-[#AF1740] rounded-t transition-all duration-1000 ease-out"
                    style={{ height: `${(data.sellers / 60) * 40}px` }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2">{data.month}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded"></div>
              <span>Users</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gradient-to-r from-[#740938] to-[#AF1740] rounded"></div>
              <span>Sellers</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CategoryDistributionChart() {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#AF1740]/10">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center">
          <PieChart className="w-5 h-5 mr-2" />
          Product Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative w-48 h-48 mx-auto">
            {/* Simplified pie chart representation */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#AF1740] via-[#CC2B52] to-[#DE7C7D] flex items-center justify-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <Package className="w-8 h-8 text-[#740938]" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {categoryData.map((category, index) => (
              <div
                key={category.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-gray-700">
                    {category.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-[#740938] w-8">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ActivityChart() {
  const activityData = [
    { time: "00:00", activity: 12 },
    { time: "04:00", activity: 8 },
    { time: "08:00", activity: 45 },
    { time: "12:00", activity: 78 },
    { time: "16:00", activity: 65 },
    { time: "20:00", activity: 34 },
  ];

  const maxActivity = Math.max(...activityData.map((d) => d.activity));

  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#CC2B52]/10">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Daily Activity
          </div>
          <Badge className="bg-[#AF1740] text-white">Live</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#AF1740]">78</div>
            <div className="text-sm text-gray-600">Peak Activity (12:00)</div>
          </div>

          <div className="h-32 flex items-end justify-between space-x-1">
            {activityData.map((data, index) => (
              <div
                key={data.time}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-full bg-gradient-to-t from-[#CC2B52] to-[#DE7C7D] rounded-t transition-all duration-1000 ease-out"
                  style={{ height: `${(data.activity / maxActivity) * 100}px` }}
                />
                <div className="text-xs text-gray-600 mt-2">{data.time}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PerformanceMetrics() {
  const metrics = [
    { label: "Response Time", value: "1.2s", trend: "down", color: "green" },
    { label: "Uptime", value: "99.9%", trend: "up", color: "green" },
    { label: "Error Rate", value: "0.1%", trend: "down", color: "green" },
    { label: "Load Time", value: "0.8s", trend: "down", color: "green" },
  ];

  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-green-50">
      <CardHeader>
        <CardTitle className="text-[#740938] flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          System Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className="text-center p-3 bg-white rounded-lg border border-green-200"
            >
              <div className="text-2xl font-bold text-green-600">
                {metric.value}
              </div>
              <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                <span>{metric.label}</span>
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
