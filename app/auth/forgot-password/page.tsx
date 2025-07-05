"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Leaf, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import FloatingLiveChat from "@/components/floating-live-chat";

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Peaceful food rescue scene with helping hands"
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
          {/* Left Side - Hero Content */}
          <div className="text-white space-y-8 hidden lg:block">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-tight">
                Don't Worry,
                <br />
                <span className="text-[#DE7C7D]">We've Got You!</span>
              </h1>
              <p className="text-2xl opacity-90 leading-relaxed max-w-lg">
                Every food hero needs a helping hand sometimes. Let's get you
                back to rescuing food in no time.
              </p>
            </div>

            {/* Support Info */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-lg">
              <h3 className="text-xl font-semibold mb-6 text-center">
                Need More Help?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-[#AF1740] rounded-full">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm opacity-80">help@resqfood.com</p>
                  </div>
                </div>
                <div className="text-sm opacity-90 bg-white/5 rounded-xl p-4">
                  <p className="italic">
                    "Our support team typically responds within 2 hours during
                    business hours. We're here to help you continue your food
                    rescue mission!"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Forgot Password Form */}
          <div className="w-full max-w-md mx-auto lg:ml-auto lg:mr-0">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  href="/login"
                  className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Login</span>
                </Link>
              </div>

              {/* Logo */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] rounded-2xl mb-4 shadow-lg">
                  <div className="flex items-center space-x-1">
                    <Leaf className="w-6 h-6 text-white" />
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Reset Password
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  {emailSent
                    ? "Check your email"
                    : "We'll help you get back in"}
                </p>
              </div>

              {!emailSent ? (
                /* Reset Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-white/90 font-medium"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 rounded-xl border-white/20 focus:border-[#AF1740] focus:ring-[#AF1740]/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="bg-gradient-to-r from-[#AF1740]/10 to-[#CC2B52]/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <p className="text-white/90 text-sm">
                      💡 <strong>Tip:</strong> Enter the email address you used
                      to create your resQfood account. We'll send you a secure
                      link to reset your password.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#AF1740] to-[#CC2B52] hover:from-[#CC2B52] hover:to-[#AF1740] text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Send Reset Link 📧
                  </Button>

                  <div className="text-center space-y-3">
                    <div className="text-sm text-white/80">
                      Remember your password?{" "}
                      <Link
                        href="/login"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Sign in here
                      </Link>
                    </div>
                    <div className="text-sm text-white/80">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Join resQfood
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
                      Email Sent Successfully!
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      We've sent a password reset link to{" "}
                      <strong className="text-[#DE7C7D]">{email}</strong>
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-[#AF1740]/10 to-[#CC2B52]/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-left">
                    <h4 className="text-white font-semibold text-sm mb-2">
                      Next Steps:
                    </h4>
                    <ul className="text-white/90 text-sm space-y-1">
                      <li>• Check your email inbox</li>
                      <li>• Click the reset link (expires in 1 hour)</li>
                      <li>• Create your new password</li>
                      <li>• Continue your food rescue mission!</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => setEmailSent(false)}
                      variant="outline"
                      className="w-full h-12 rounded-xl border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 bg-white/5 backdrop-blur-sm text-white"
                    >
                      Resend Email
                    </Button>

                    <div className="text-sm text-white/80">
                      Didn't receive the email?{" "}
                      <Link
                        href="/auth/contact"
                        className="text-[#DE7C7D] hover:text-white font-semibold transition-colors underline"
                      >
                        Contact Support
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
