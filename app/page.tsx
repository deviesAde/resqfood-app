"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Leaf,
  Users,
  ShoppingCart,
  Clock,
  Star,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  User,
  CheckCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import FloatingLiveChat from "@/components/floating-live-chat";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg border-b border-[#DE7C7D]/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52] rounded-xl flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#740938] to-[#AF1740] bg-clip-text text-transparent">
                resQfood
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/marketplace"
                className="text-gray-700 hover:text-[#AF1740] transition-colors font-medium"
              >
                Marketplace
              </Link>
              <Link
                href="#about"
                className="text-gray-700 hover:text-[#AF1740] transition-colors font-medium"
              >
                About
              </Link>
              <Link href="/profile">
                <Button
                  variant="ghost"
                  className="text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-4"
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="text-[#740938] hover:bg-[#DE7C7D]/20 rounded-full px-4 relative"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC2B52] rounded-full"></span>
                </Button>
              </Link>
              <Button
                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-6 shadow-lg transition-all duration-300"
                asChild
              >
                <Link href="/auth/register">Join Now</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white rounded-full px-6 transition-all duration-300 bg-transparent"
                asChild
              >
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Beautiful fresh rescued food - organic vegetables, fruits, and artisan breads"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/80 via-[#740938]/60 to-[#AF1740]/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/90 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="mb-6 bg-gradient-to-r from-[#DE7C7D] to-[#CC2B52] text-white px-6 py-2 text-base rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              🌍 Join the Movement
            </Badge>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="text-white drop-shadow-lg">
                Every Second Counts.
              </span>
              <br />
              <span className="text-[#DE7C7D] drop-shadow-lg">
                Save a Meal.
              </span>
              <br />
              <span className="text-[#CC2B52] drop-shadow-lg">
                Save the Planet.
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join the movement to reduce food waste by buying smart and saving
              more. Discover quality food at incredible prices while making a
              positive impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-10 py-4 text-lg shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link href="/marketplace">
                  Browse Rescued Foods
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 bg-transparent"
                asChild
              >
                <Link href="/seller">Become a Seller</Link>
              </Button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="text-3xl font-bold text-white mb-1">2.3M+</div>
                <div className="text-white/80">Meals Rescued</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/80">Food Heroes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                <div className="text-3xl font-bold text-white mb-1">70%</div>
                <div className="text-white/80">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#740938] mb-4">
              Our Impact So Far
            </h2>
            <p className="text-gray-600 text-lg">
              Together, we're making a difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 border-[#DE7C7D]/30 hover:border-[#AF1740]/50 transition-all duration-300 rounded-2xl hover:shadow-lg transform hover:scale-105">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#740938] mb-2">
                  10,000+
                </h3>
                <p className="text-gray-600">Meals Saved Daily</p>
                <div className="mt-2 flex items-center justify-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+23% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 border-[#DE7C7D]/30 hover:border-[#AF1740]/50 transition-all duration-300 rounded-2xl hover:shadow-lg transform hover:scale-105">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#740938] mb-2">50K+</h3>
                <p className="text-gray-600">Active Food Heroes</p>
                <div className="mt-2 flex items-center justify-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">+15% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-2 border-[#DE7C7D]/30 hover:border-[#AF1740]/50 transition-all duration-300 rounded-2xl hover:shadow-lg transform hover:scale-105">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-[#740938] mb-2">90%</h3>
                <p className="text-gray-600">Less Food Waste</p>
                <div className="mt-2 flex items-center justify-center text-green-600">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Goal achieved</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#740938] mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg">
              Simple steps to make a big impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#740938] mb-3">
                Discover
              </h3>
              <p className="text-gray-600">
                Find quality food near expiration at amazing discounts from
                local sellers
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#740938] mb-3">
                Buy Smart
              </h3>
              <p className="text-gray-600">
                Purchase with huge discounts and help prevent food from going to
                waste
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#740938] mb-3">Enjoy</h3>
              <p className="text-gray-600">
                Receive safely, eat smartly, and feel good about your positive
                impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#740938] mb-4">
              Community Voices
            </h2>
            <p className="text-gray-600 text-lg">
              What our food heroes are saying
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#740938]">Sarah M.</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "This app helped me save money and reduce my waste. I love
                  knowing I'm making a difference!"
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#740938]">Mike R.</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "As a bakery owner, resQfood helps me reduce waste while
                  reaching customers who appreciate quality food."
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 border-2 border-[#DE7C7D]/30 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#740938]">Lisa K.</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "Amazing discounts on fresh food! I've saved hundreds while
                  eating better and helping the planet."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Become a Food Hero?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people making a difference, one meal at a time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#740938] hover:bg-gray-100 rounded-full px-10 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/register">
                <Sparkles className="mr-2 w-5 h-5" />
                Start Saving Today
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-10 py-4 text-lg font-bold transition-all duration-300 transform hover:scale-105 bg-transparent"
              asChild
            >
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#740938] text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">resQfood</span>
              </div>
              <p className="text-[#DE7C7D] mb-4">
                Rescue Food. Restore the Planet.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-[#DE7C7D] hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-[#DE7C7D] hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-[#DE7C7D] hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-[#DE7C7D]">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="hover:text-white transition-colors"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-[#DE7C7D]">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-[#DE7C7D] mb-4">Stay updated on our mission</p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="rounded-l-full border-[#AF1740] bg-white/10 text-white placeholder:text-[#DE7C7D]"
                />
                <Button className="bg-[#AF1740] hover:bg-[#CC2B52] rounded-r-full px-4">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#AF1740] mt-8 pt-8 text-center text-[#DE7C7D]">
            <p>
              &copy; 2024 resQfood. All rights reserved. Made with ❤️ for the
              planet.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Live Chat Widget */}
      <FloatingLiveChat />
    </div>
  );
}
