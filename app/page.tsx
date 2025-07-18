"use client";
import { useState, useEffect } from "react";
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
  CheckCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FloatingLiveChat from "@/components/floating-live-chat";
import HeaderLanding from "@/components/header-landing";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      {/* Navigation */}
      <HeaderLanding />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/landing/hero.jpg"
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
            <Badge className="mb-6 bg-gradient-to-r from-[#DE7C7D] to-[#CC2B52] text-white px-6 py-2 text-base rounded-full shadow-lg animate-pulse-slow">
              <Sparkles className="w-4 h-4 mr-2" />
              🌍 Join the Movement
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-2xl">
              <span className="text-white">Every Second Counts.</span>
              <br />
              <span className="text-[#DE7C7D]">Save a Meal.</span>
              <br />
              <span className="text-[#CC2B52]">Save the Planet.</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
              Join the movement to reduce food waste by buying smart and saving
              more. Discover quality food at incredible prices while making a
              positive impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#740938] hover:to-[#AF1740] text-white rounded-full px-10 py-4 text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl"
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
                className="border-2 border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 bg-transparent shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/seller">Become a Seller</Link>
              </Button>
            </div>
            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-1">2.3M+</div>
                <div className="text-white/80">Meals Rescued</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-white/80">Food Heroes</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-3xl font-bold text-white mb-1">70%</div>
                <div className="text-white/80">Average Savings</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#740938] dark:text-[#DE7C7D] mb-4 leading-tight">
              Our Goals
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto">
              Together, we're making a tangible difference for the planet and
              our community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="text-center p-8 border-2 border-[#DE7C7D]/30 dark:border-gray-700 hover:border-[#AF1740]/50 dark:hover:border-[#DE7C7D]/50 transition-all duration-300 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-3">
                  10,000+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Our goal: Rescue 10,000+ meals daily to significantly reduce
                  food waste.
                </p>
                <div className="mt-4 flex items-center justify-center text-green-600 font-medium">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-base">+23% this month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-8 border-2 border-[#DE7C7D]/30 dark:border-gray-700 hover:border-[#AF1740]/50 dark:hover:border-[#DE7C7D]/50 transition-all duration-300 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-3">
                  50K+
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Our goal: Grow to 50K+ active Food Heroes, fostering a vibrant
                  community.
                </p>
                <div className="mt-4 flex items-center justify-center text-green-600 font-medium">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  <span className="text-base">+15% this month</span>
                </div>
              </CardContent>
            </Card>
            <Card className="text-center p-8 border-2 border-[#DE7C7D]/30 dark:border-gray-700 hover:border-[#AF1740]/50 dark:hover:border-[#DE7C7D]/50 transition-all duration-300 rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Leaf className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-3">
                  90%
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Our goal: Achieve 90% less food waste, directly contributing
                  to environmental sustainability.
                </p>
                <div className="mt-4 flex items-center justify-center text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-base">Goal achieved</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-800 dark:to-gray-900"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#740938] dark:text-[#DE7C7D] mb-4 leading-tight">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto">
              Simple steps to make a big impact on food waste and your wallet.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <ShoppingCart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
                Discover
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Find quality food near expiration at amazing discounts from
                local sellers, preventing it from going to waste.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Clock className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
                Buy Smart
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Purchase with huge discounts and actively contribute to reducing
                food waste in your community.
              </p>
            </div>
            <div className="text-center group">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-10 h-10 bg-[#DE7C7D] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-md">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-4">
                Enjoy
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Receive safely, eat smartly, and feel good about your positive
                impact on the environment and local businesses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#740938] dark:text-[#DE7C7D] mb-4 leading-tight">
              Community Voices
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl max-w-2xl mx-auto">
              Hear directly from our amazing food heroes who are making a
              difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Card className="p-8 border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mr-4 shadow-lg text-xl font-bold text-white">
                    S
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-[#740938] dark:text-[#DE7C7D]">
                      Sarah M.
                    </h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed">
                  "This app helped me save money and drastically reduce my food
                  waste. I love knowing I'm making a real difference for the
                  planet!"
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center mr-4 shadow-lg text-xl font-bold text-white">
                    M
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-[#740938] dark:text-[#DE7C7D]">
                      Mike R.
                    </h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed">
                  "As a bakery owner, resQfood helps me reduce waste while
                  reaching new customers who appreciate quality food at a great
                  value. It's a win-win!"
                </p>
              </CardContent>
            </Card>
            <Card className="p-8 border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-900">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#CC2B52] to-[#DE7C7D] rounded-full flex items-center justify-center mr-4 shadow-lg text-xl font-bold text-white">
                    L
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-[#740938] dark:text-[#DE7C7D]">
                      Lisa K.
                    </h4>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic text-lg leading-relaxed">
                  "Amazing discounts on fresh food! I've saved hundreds while
                  eating better and actively helping to combat food waste."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#740938] via-[#AF1740] to-[#CC2B52]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Ready to Become a Food Hero?
          </h2>
          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
            Join thousands of people making a difference, one rescued meal at a
            time.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-[#740938] hover:bg-gray-100 rounded-full px-12 py-5 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
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
              className="border-2 border-white text-white hover:bg-white hover:text-[#740938] rounded-full px-12 py-5 text-lg font-bold transition-all duration-300 transform hover:scale-105 bg-transparent shadow-lg hover:shadow-xl"
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
                <div className="w-8 h-8 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-lg flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">resQfood</span>
              </div>
              <p className="text-[#DE7C7D] mb-4 text-sm">
                Rescue Food. Restore the Planet.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6 text-[#DE7C7D] hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-[#DE7C7D] hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-6 h-6 text-[#DE7C7D] hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Navigation</h4>
              <ul className="space-y-3 text-[#DE7C7D]">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="hover:text-white transition-colors text-base"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-3 text-[#DE7C7D]">
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    Safety
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    Community
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-white transition-colors text-base"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
              <p className="text-[#DE7C7D] mb-4 text-base">
                Stay updated on our mission
              </p>
              <div className="flex">
                <Input
                  placeholder="Your email"
                  className="rounded-l-full border-[#AF1740] bg-white/10 text-white placeholder:text-[#DE7C7D] focus:ring-2 focus:ring-[#DE7C7D] focus:border-transparent"
                />
                <Button className="bg-[#AF1740] hover:bg-[#CC2B52] rounded-r-full px-6 transition-colors">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-[#AF1740] mt-10 pt-8 text-center text-[#DE7C7D] text-sm">
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
