"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { NotificationDropdown } from "@/components/notification-dropdown"
import {
  Heart,
  Edit,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Star,
  Award,
  Leaf,
  ShoppingBag,
  Settings,
  ArrowLeft,
  Save,
  X,
  CheckCircle,
  Target,
  Users,
  Package,
  CreditCard,
  Shield,
  Bell,
  Gift,
  History,
  Download,
  Share,
  Crown,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import FloatingLiveChat from "@/components/floating-live-chat"

const userStats = {
  itemsRescued: 127,
  totalSaved: 456.78,
  co2Prevented: 89.2,
  wasteReduced: 45.6,
  memberSince: "January 2024",
  currentStreak: 12,
  totalOrders: 89,
  favoriteCategory: "Baked Goods",
  totalSpent: 1234.56,
  averageRating: 4.8,
  reviewsGiven: 23,
}

const achievements = [
  {
    id: 1,
    title: "Food Hero",
    description: "Rescued 50+ items",
    icon: <Heart className="w-6 h-6" />,
    earned: true,
    earnedDate: "March 15, 2024",
    color: "from-[#AF1740] to-[#CC2B52]",
    points: 500,
  },
  {
    id: 2,
    title: "Eco Warrior",
    description: "Prevented 25kg+ waste",
    icon: <Leaf className="w-6 h-6" />,
    earned: true,
    earnedDate: "March 20, 2024",
    color: "from-green-500 to-emerald-500",
    points: 750,
  },
  {
    id: 3,
    title: "Streak Master",
    description: "10 day rescue streak",
    icon: <Target className="w-6 h-6" />,
    earned: true,
    earnedDate: "March 25, 2024",
    color: "from-orange-500 to-red-500",
    points: 300,
  },
  {
    id: 4,
    title: "Community Champion",
    description: "Refer 5 friends",
    icon: <Users className="w-6 h-6" />,
    earned: false,
    progress: 60,
    color: "from-purple-500 to-pink-500",
    points: 1000,
  },
  {
    id: 5,
    title: "Bulk Saver",
    description: "Order 100+ items",
    icon: <Package className="w-6 h-6" />,
    earned: false,
    progress: 85,
    color: "from-blue-500 to-cyan-500",
    points: 800,
  },
  {
    id: 6,
    title: "VIP Member",
    description: "Spend $1000+",
    icon: <Crown className="w-6 h-6" />,
    earned: true,
    earnedDate: "April 1, 2024",
    color: "from-yellow-500 to-amber-500",
    points: 1500,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "purchase",
    action: "Rescued 3 items",
    details: "Sourdough bread, croissants, and bagels from Golden Crust",
    timestamp: "2 hours ago",
    impact: "Saved $12.50, prevented 2.1kg waste",
    amount: 12.5,
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 2,
    type: "achievement",
    action: "Earned achievement",
    details: "VIP Member badge for spending $1000+",
    timestamp: "1 day ago",
    impact: "Milestone reached! +1500 points",
    icon: <Award className="w-4 h-4" />,
  },
  {
    id: 3,
    type: "review",
    action: "Left review",
    details: "5-star review for Fresh Valley Farm",
    timestamp: "3 days ago",
    impact: "Helped other food heroes",
    rating: 5,
    icon: <Star className="w-4 h-4" />,
  },
  {
    id: 4,
    type: "purchase",
    action: "Rescued 2 items",
    details: "Organic yogurt and cheese from Fresh Valley",
    timestamp: "5 days ago",
    impact: "Saved $8.99, prevented 1.5kg waste",
    amount: 8.99,
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 5,
    type: "referral",
    action: "Friend joined",
    details: "Mike Chen joined using your referral code",
    timestamp: "1 week ago",
    impact: "Earned $5 credit",
    icon: <Users className="w-4 h-4" />,
  },
]

const favoriteItems = [
  {
    id: 1,
    name: "Artisan Sourdough Bread",
    seller: "Golden Crust Bakery",
    image: "/placeholder.svg?height=80&width=80",
    timesOrdered: 8,
    lastOrdered: "2 days ago",
  },
  {
    id: 2,
    name: "Organic Greek Yogurt",
    seller: "Fresh Valley Farm",
    image: "/placeholder.svg?height=80&width=80",
    timesOrdered: 6,
    lastOrdered: "5 days ago",
  },
  {
    id: 3,
    name: "Premium Coffee Beans",
    seller: "Roast Masters",
    image: "/placeholder.svg?height=80&width=80",
    timesOrdered: 4,
    lastOrdered: "1 week ago",
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Passionate about reducing food waste and supporting local businesses. Love discovering new flavors while making a positive impact on our planet! 🌍",
    avatar: "/placeholder.svg?height=150&width=150",
    birthday: "1990-06-15",
    preferences: {
      notifications: true,
      newsletter: true,
      recommendations: true,
    },
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset form data if needed
  }

  const totalPoints = achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0)

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "achievements", label: "Achievements", icon: Award },
    { id: "activity", label: "Activity", icon: History },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-[#DE7C7D]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <ArrowLeft className="w-5 h-5 text-[#740938] group-hover:text-[#AF1740] transition-colors" />
                <div className="w-8 h-8 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#740938] group-hover:text-[#AF1740] transition-colors">
                  resQfood
                </span>
              </Link>
              <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white ml-2">Profile</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <NotificationDropdown />
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                >
                  Browse Food
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-[#DE7C7D]/10">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <img
                    src={profileData.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#DE7C7D]/30 shadow-lg mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center border-2 border-white">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#740938] mb-1">{profileData.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{profileData.location}</p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Badge className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white">VIP Member</Badge>
                  <Badge className="bg-green-500 text-white">Food Hero</Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white rounded-lg p-3 border border-[#DE7C7D]/20">
                    <div className="font-bold text-[#AF1740] text-lg">{userStats.itemsRescued}</div>
                    <div className="text-gray-600">Items Rescued</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-[#DE7C7D]/20">
                    <div className="font-bold text-[#CC2B52] text-lg">{totalPoints}</div>
                    <div className="text-gray-600">Points</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Tabs */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-[#AF1740] to-[#CC2B52] text-white shadow-lg"
                          : "text-gray-700 hover:bg-[#DE7C7D]/20 hover:text-[#740938]"
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-white to-green-50">
              <CardHeader>
                <CardTitle className="text-[#740938] text-lg flex items-center">
                  <Leaf className="w-5 h-5 mr-2" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                  <div className="text-2xl font-bold">{userStats.wasteReduced}kg</div>
                  <div className="text-green-100 text-sm">Waste Prevented</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-lg font-bold text-blue-600">{userStats.co2Prevented}kg</div>
                    <div className="text-blue-500 text-xs">CO2 Saved</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-lg font-bold text-purple-600">{userStats.currentStreak}</div>
                    <div className="text-purple-500 text-xs">Day Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Profile Header */}
                <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-r from-white to-[#DE7C7D]/10">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h1 className="text-3xl font-bold text-[#740938] mb-2">Welcome back, Sarah! 👋</h1>
                        <p className="text-gray-600 text-lg">
                          You've saved <span className="font-bold text-[#AF1740]">${userStats.totalSaved}</span> and
                          prevented <span className="font-bold text-green-600">{userStats.wasteReduced}kg</span> of
                          waste!
                        </p>
                      </div>
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>

                    {!isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">{profileData.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">{profileData.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">{profileData.location}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="text-gray-700">Member since {userStats.memberSince}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#740938] mb-2">About</h3>
                          <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <Label htmlFor="name" className="text-[#740938] font-semibold">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email" className="text-[#740938] font-semibold">
                              Email
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone" className="text-[#740938] font-semibold">
                              Phone
                            </Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="location" className="text-[#740938] font-semibold">
                              Location
                            </Label>
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="bio" className="text-[#740938] font-semibold">
                            Bio
                          </Label>
                          <Textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                            className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1"
                            rows={3}
                          />
                        </div>
                        <div className="flex space-x-4">
                          <Button
                            onClick={handleSave}
                            className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={handleCancel}
                            variant="outline"
                            className="border-gray-300 text-gray-600 hover:bg-gray-100 rounded-full px-6 bg-transparent"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-[#DE7C7D]/10">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-[#740938] mb-2">${userStats.totalSaved}</div>
                      <div className="text-gray-600 text-sm">Total Saved</div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-green-600 mb-2">{userStats.wasteReduced}kg</div>
                      <div className="text-gray-600 text-sm">Waste Prevented</div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.totalOrders}</div>
                      <div className="text-gray-600 text-sm">Total Orders</div>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-orange-50">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-orange-600 mb-2">{userStats.currentStreak}</div>
                      <div className="text-gray-600 text-sm">Day Streak</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-[#740938]">Achievements</h2>
                    <p className="text-gray-600">Track your progress and unlock rewards</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#AF1740]">{totalPoints} Points</div>
                    <div className="text-sm text-gray-600">
                      {achievements.filter((a) => a.earned).length} of {achievements.length} earned
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`border-2 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                        achievement.earned
                          ? "border-transparent bg-gradient-to-br " +
                            achievement.color +
                            " text-white shadow-lg hover:scale-105"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full ${achievement.earned ? "bg-white/20" : "bg-gray-200"}`}>
                              {achievement.earned ? (
                                achievement.icon
                              ) : (
                                <div className="w-6 h-6 text-gray-400">{achievement.icon}</div>
                              )}
                            </div>
                            <div>
                              <h3
                                className={`font-bold text-lg ${achievement.earned ? "text-white" : "text-gray-600"}`}
                              >
                                {achievement.title}
                              </h3>
                              <p className={`text-sm ${achievement.earned ? "text-white/80" : "text-gray-500"}`}>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                          {achievement.earned && <CheckCircle className="w-6 h-6 text-white/80 flex-shrink-0" />}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className={`text-sm ${achievement.earned ? "text-white/80" : "text-gray-500"}`}>
                            {achievement.earned ? (
                              <span>Earned {achievement.earnedDate}</span>
                            ) : (
                              <span>{achievement.progress || 0}% complete</span>
                            )}
                          </div>
                          <div className={`font-bold ${achievement.earned ? "text-white" : "text-gray-600"}`}>
                            +{achievement.points} pts
                          </div>
                        </div>

                        {!achievement.earned && achievement.progress && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${achievement.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-[#740938]">Recent Activity</h2>
                    <p className="text-gray-600">Your food rescue journey</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export History
                  </Button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <Card
                      key={activity.id}
                      className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-lg transition-all duration-300 bg-white"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              activity.type === "purchase"
                                ? "bg-gradient-to-br from-[#AF1740] to-[#CC2B52]"
                                : activity.type === "achievement"
                                  ? "bg-gradient-to-br from-yellow-500 to-amber-500"
                                  : activity.type === "review"
                                    ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                            } text-white`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-[#740938] text-lg">{activity.action}</h4>
                                <p className="text-gray-600 mt-1">{activity.details}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <span className="text-xs text-gray-500">{activity.timestamp}</span>
                                  {activity.rating && (
                                    <div className="flex items-center space-x-1">
                                      {[...Array(activity.rating)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                {activity.amount && (
                                  <div className="font-bold text-[#AF1740] text-lg">${activity.amount}</div>
                                )}
                                <Badge
                                  variant="outline"
                                  className="text-[#AF1740] border-[#AF1740] bg-white/80 text-xs mt-1"
                                >
                                  {activity.impact}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === "favorites" && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-[#740938]">Favorite Items</h2>
                    <p className="text-gray-600">Items you love to rescue</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Favorites
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteItems.map((item) => (
                    <Card
                      key={item.id}
                      className="border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover border border-[#DE7C7D]/30"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-[#740938] mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.seller}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Times ordered:</span>
                            <span className="font-semibold text-[#AF1740]">{item.timesOrdered}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last ordered:</span>
                            <span className="text-gray-700">{item.lastOrdered}</span>
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full">
                          Order Again
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#740938]">Account Settings</h2>
                  <p className="text-gray-600">Manage your preferences and account security</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Notifications */}
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#740938] flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#740938]">Push Notifications</h4>
                          <p className="text-sm text-gray-600">Get notified about urgent items and deals</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#740938]">Email Newsletter</h4>
                          <p className="text-sm text-gray-600">Weekly updates and tips</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-[#740938]">Recommendations</h4>
                          <p className="text-sm text-gray-600">Personalized food suggestions</p>
                        </div>
                        <input type="checkbox" defaultChecked className="toggle" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security */}
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#740938] flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button
                        variant="outline"
                        className="w-full border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full justify-start"
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#DE7C7D]/30 text-gray-700 hover:bg-[#DE7C7D]/20 rounded-full justify-start bg-transparent"
                      >
                        Two-Factor Authentication
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-[#DE7C7D]/30 text-gray-700 hover:bg-[#DE7C7D]/20 rounded-full justify-start bg-transparent"
                      >
                        Download Data
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Payment Methods */}
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-[#740938] flex items-center">
                        <CreditCard className="w-5 h-5 mr-2" />
                        Payment Methods
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 border border-[#DE7C7D]/30 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                              <CreditCard className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold">•••• •••• •••• 4242</div>
                              <div className="text-sm text-gray-600">Expires 12/26</div>
                            </div>
                          </div>
                          <Badge className="bg-green-500 text-white">Default</Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full"
                      >
                        Add Payment Method
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Referral Program */}
                  <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52] text-white">
                    <CardContent className="p-6 text-center">
                      <Gift className="w-12 h-12 mx-auto mb-4 text-[#DE7C7D]" />
                      <h3 className="text-lg font-bold mb-2">Invite Friends</h3>
                      <p className="text-[#DE7C7D] text-sm mb-4">
                        Share the love! Get $5 credit for each friend who joins resQfood.
                      </p>
                      <div className="bg-white/20 rounded-lg p-3 mb-4">
                        <div className="text-sm text-[#DE7C7D] mb-1">Your referral code</div>
                        <div className="font-bold text-lg">SARAH2024</div>
                      </div>
                      <Button className="bg-white text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-6 font-semibold shadow-lg w-full">
                        Share Code
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <FloatingLiveChat />
    </div>
  )
}
