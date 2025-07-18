"use client";

import { CreditCard, Plus, Edit, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { JSX } from "react";

interface PaymentMethodSelectionProps {
  selectedPaymentMethod: string;
  setSelectedPaymentMethod: (method: string) => void;
  selectedCard: string;
  setSelectedCard: (cardId: string) => void;
  showNewCardForm: boolean;
  setShowNewCardForm: (show: boolean) => void;
  newCard: { number: string; expiry: string; cvv: string; name: string };
  setNewCard: (card: {
    number: string;
    expiry: string;
    cvv: string;
    name: string;
  }) => void;
  paymentMethods: {
    id: string;
    name: string;
    icon: JSX.Element;
    description: string;
    popular: boolean;
  }[];
  savedCards: {
    id: string;
    type: string;
    last4: string;
    expiry: string;
    name: string;
    isDefault: boolean;
  }[];
}

export function PaymentMethodSelection({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  selectedCard,
  setSelectedCard,
  showNewCardForm,
  setShowNewCardForm,
  newCard,
  setNewCard,
  paymentMethods,
  savedCards,
}: PaymentMethodSelectionProps) {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-[#DE7C7D] flex items-center text-lg sm:text-xl">
          <CreditCard className="w-5 h-5 mr-2" />
          Metode Pembayaran
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Opsi Metode Pembayaran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method.id)}
              className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all relative ${
                selectedPaymentMethod === method.id
                  ? "border-[#AF1740] bg-[#AF1740]/10 dark:bg-[#740938]/20"
                  : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50 dark:border-gray-700 dark:hover:border-[#CC2B52]/50"
              }`}
            >
              {method.popular && (
                <Badge className="absolute -top-2 left-4 bg-[#CC2B52] text-white text-xs px-2 py-1">
                  Populer
                </Badge>
              )}
              <div className="flex items-center space-x-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === method.id
                      ? "border-[#AF1740] bg-[#AF1740]"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                ></div>
                <div className="text-[#740938] dark:text-[#DE7C7D]">
                  {method.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#740938] dark:text-[#DE7C7D] text-base sm:text-lg">
                    {method.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Formulir Pembayaran Kartu */}
        {selectedPaymentMethod === "card" && (
          <div className="space-y-6">
            {/* Kartu Tersimpan */}
            {savedCards.length > 0 && !showNewCardForm && (
              <div>
                <h4 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-3 sm:mb-4 text-base sm:text-lg">
                  Kartu Tersimpan
                </h4>
                <div className="space-y-3">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCard(card.id)}
                      className={`p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedCard === card.id
                          ? "border-[#AF1740] bg-[#AF1740]/10 dark:bg-[#740938]/20"
                          : "border-[#DE7C7D]/30 hover:border-[#AF1740]/50 dark:border-gray-700 dark:hover:border-[#CC2B52]/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full border-2 ${
                              selectedCard === card.id
                                ? "border-[#AF1740] bg-[#AF1740]"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          ></div>
                          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 dark:bg-blue-700 rounded flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#740938] dark:text-[#DE7C7D] text-sm sm:text-base">
                              •••• •••• •••• {card.last4}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {card.name} • Kadaluarsa {card.expiry}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {card.isDefault && (
                            <Badge className="bg-green-500 text-white text-xs px-2 py-1 dark:bg-green-700">
                              Default
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 h-auto"
                          >
                            <Edit className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setShowNewCardForm(true)}
                  variant="outline"
                  className="w-full mt-4 border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent rounded-full text-sm sm:text-base dark:border-[#DE7C7D] dark:text-[#DE7C7D] dark:hover:bg-[#DE7C7D] dark:hover:text-gray-900"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah Kartu Baru
                </Button>
              </div>
            )}
            {/* Formulir Kartu Baru */}
            {(showNewCardForm || savedCards.length === 0) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-[#740938] dark:text-[#DE7C7D] text-base sm:text-lg">
                    {savedCards.length > 0
                      ? "Tambah Kartu Baru"
                      : "Informasi Kartu"}
                  </h4>
                  {savedCards.length > 0 && (
                    <Button
                      onClick={() => setShowNewCardForm(false)}
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1 h-auto"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="cardNumber"
                      className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
                    >
                      Nomor Kartu
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.number}
                      onChange={(e) =>
                        setNewCard({ ...newCard, number: e.target.value })
                      }
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="expiry"
                      className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
                    >
                      Tanggal Kadaluarsa
                    </Label>
                    <Input
                      id="expiry"
                      placeholder="BB/TT"
                      value={newCard.expiry}
                      onChange={(e) =>
                        setNewCard({ ...newCard, expiry: e.target.value })
                      }
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="cvv"
                      className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
                    >
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={newCard.cvv}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cvv: e.target.value })
                      }
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label
                      htmlFor="cardName"
                      className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
                    >
                      Nama Pemegang Kartu
                    </Label>
                    <Input
                      id="cardName"
                      placeholder="Sarah Johnson"
                      value={newCard.name}
                      onChange={(e) =>
                        setNewCard({ ...newCard, name: e.target.value })
                      }
                      className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Metode Pembayaran Alternatif */}
        {selectedPaymentMethod !== "card" && (
          <div className="p-4 sm:p-6 bg-gradient-to-r from-[#DE7C7D]/10 to-white rounded-xl border border-[#DE7C7D]/30 dark:from-[#740938]/20 dark:to-gray-800 dark:border-gray-700">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                {
                  paymentMethods.find((m) => m.id === selectedPaymentMethod)
                    ?.icon
                }
              </div>
              <h3 className="font-semibold text-[#740938] dark:text-[#DE7C7D] mb-1 sm:mb-2 text-base sm:text-lg">
                {
                  paymentMethods.find((m) => m.id === selectedPaymentMethod)
                    ?.name
                }
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Anda akan diarahkan untuk menyelesaikan pembayaran Anda dengan
                aman
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
