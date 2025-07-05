"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Mail,
  ArrowLeft,
  CheckCircle,
  Phone,
  MessageCircle,
  Clock,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FloatingLiveChat from "@/components/floating-live-chat";

export default function ContactSupportPage() {
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending message
    setMessageSent(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Supportive community helping each other with food rescue"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#740938]/85 via-[#740938]/65 to-[#AF1740]/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#740938]/95 via-transparent to-[#CC2B52]/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center justify-items-end">
          {/* Left Side - Support Info */}
          <div className="text-white space-y-8 hidden lg:block">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-tight">
                We're Here
                <br />
                <span className="text-[#DE7C7D]">To Help!</span>
              </h1>
              <p className="text-2xl opacity-90 leading-relaxed max-w-lg">
                Our dedicated support team is ready to assist you with any
                questions about your food rescue journey.
              </p>
            </div>

            {/* Support Options */}
            <div className="space-y-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#AF1740] rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Support</h3>
                    <p className="text-sm opacity-80">help@resqfood.com</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  Get detailed help with account issues, technical problems, or
                  general questions.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#AF1740] rounded-full">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Live Chat</h3>
                    <p className="text-sm opacity-80">
                      Available 9 AM - 6 PM EST
                    </p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  Quick answers to urgent questions about orders and account
                  access.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#AF1740] rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone Support</h3>
                    <p className="text-sm opacity-80">1-800-RESQFOOD</p>
                  </div>
                </div>
                <p className="text-sm opacity-90">
                  Speak directly with our food rescue specialists for complex
                  issues.
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-[#AF1740]/20 to-[#CC2B52]/20 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-3">
                <Clock className="w-6 h-6 text-[#DE7C7D]" />
                <h3 className="font-semibold text-lg">Response Times</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Email Support:</span>
                  <span className="text-[#DE7C7D] font-semibold">
                    Within 2 hours
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Live Chat:</span>
                  <span className="text-[#DE7C7D] font-semibold">Instant</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Support:</span>
                  <span className="text-[#DE7C7D] font-semibold">
                    Immediate
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  href="/forgot-password"
                  className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </Link>
              </div>

              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl mb-4 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Headphones className="w-6 h-6 text-white" />
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Contact Support
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  {messageSent
                    ? "Message sent successfully!"
                    : "We're here to help you succeed"}
                </p>
              </div>

              {!messageSent ? (
                /* Contact Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label
                      htmlFor="name"
                      className="text-white/90 font-medium text-sm"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="email"
                      className="text-white/90 font-medium text-sm"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="subject"
                      className="text-white/90 font-medium text-sm"
                    >
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="h-11 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="message"
                      className="text-white/90 font-medium text-sm"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe your issue or question in detail..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 resize-none"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-[#AF1740]/10 to-[#CC2B52]/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <p className="text-white/90 text-sm">
                      💡 <strong>Tip:</strong> Include as much detail as
                      possible to help us provide the best assistance.
                      Screenshots are welcome!
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Send Message 📨
                  </Button>

                  <div className="text-center space-y-3">
                    <div className="text-sm text-white/80">
                      Need immediate help?{" "}
                      <Link
                        href="tel:1-800-RESQFOOD"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Call us now
                      </Link>
                    </div>
                    <div className="text-sm text-white/80">
                      Back to{" "}
                      <Link
                        href="/login"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Login
                      </Link>{" "}
                      or{" "}
                      <Link
                        href="/register"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Register
                      </Link>
                    </div>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-white">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Thank you for contacting us! We've received your message
                      and will respond to{" "}
                      <strong className="text-[#DE7C7D]">
                        {formData.email}
                      </strong>{" "}
                      within 2 hours.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#AF1740]/10 to-[#CC2B52]/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-left">
                    <h4 className="text-white font-semibold text-sm mb-2">
                      What happens next:
                    </h4>
                    <ul className="text-white/90 text-sm space-y-1">
                      <li>• Our support team will review your message</li>
                      <li>• You'll receive a response within 2 hours</li>
                      <li>• We'll provide detailed solutions</li>
                      <li>• Follow-up support if needed</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        setMessageSent(false);
                        setFormData({
                          name: "",
                          email: "",
                          subject: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                      className="w-full h-12 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                    >
                      Send Another Message
                    </Button>

                    <div className="text-sm text-white/80">
                      Need immediate help?{" "}
                      <Link
                        href="tel:1-800-RESQFOOD"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Call 1-800-RESQFOOD
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Live Chat Widget */}
      <FloatingLiveChat />
    </div>
  );
}
