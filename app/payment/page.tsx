"use client";
import { useState, useEffect, useCallback } from "react";
import { CreditCard, Apple, Smartphone, Wallet } from "lucide-react";
// Import refactored components
import { Navbar } from "@/components/checkout/navbar";
import { UrgentItemsAlert } from "@/components/checkout/urgent-items-alert";
import { DeliveryOptions } from "@/components/checkout/delivery-option";
import { PaymentMethodSelection } from "@/components/checkout/payment-method-selection";
import { BillingAddressForm } from "@/components/checkout/billing-address-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { TrustBadges } from "@/components/checkout/trust-badges";
import { HelpCard } from "@/components/checkout/help-card";
import { OrderConfirmationDialog } from "@/components/checkout/order-confirmation-dialog";
import { PaymentConfirmationDialog } from "@/components/checkout/payment-confirmation-dialog"; // New import

interface CartItem {
  id: string;
  name: string;
  seller: string;
  location: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  expiryHours: number;
  category: string;
  image: string;
  urgent: boolean;
}

const cartItems: CartItem[] = [
  {
    id: "1",
    name: "Roti Gandum Artisan",
    seller: "Toko Roti Emas",
    location: "Jakarta Pusat",
    originalPrice: 89900,
    discountedPrice: 39900,
    discount: 56,
    quantity: 2,
    expiryHours: 4,
    category: "Roti & Kue",
    image: "/products/1/roti3.png",
    urgent: true,
  },
  {
    id: "2",
    name: "Yogurt Yunani Organik",
    seller: "Peternakan Lembah Segar",
    location: "Bandung",
    originalPrice: 65000,
    discountedPrice: 29900,
    discount: 54,
    quantity: 1,
    expiryHours: 24,
    category: "Produk Susu",
    image: "/products/4/susu1.png",
    urgent: false,
  },
  {
    id: "3",
    name: "Kroisan Cokelat Gourmet",
    seller: "Patisserie Indah",
    location: "Jakarta Selatan",
    originalPrice: 129900,
    discountedPrice: 59900,
    discount: 54,
    quantity: 1,
    expiryHours: 6,
    category: "Roti & Kue",
    image: "/products/4/kroisant.png",
    urgent: false,
  },
];

const paymentMethods = [
  {
    id: "card",
    name: "Kartu Kredit/Debit",
    icon: <CreditCard className="w-6 h-6" />,
    description: "Visa, Mastercard, American Express",
    popular: true,
  },
  {
    id: "apple",
    name: "Apple Pay",
    icon: <Apple className="w-6 h-6" />,
    description: "Bayar dengan Touch ID atau Face ID",
    popular: false,
  },
  {
    id: "google",
    name: "Google Pay",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Pembayaran cepat dan aman",
    popular: false,
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: <Wallet className="w-6 h-6" />,
    description: "Bayar dengan akun PayPal Anda",
    popular: false,
  },
  {
    id: "dana",
    name: "Dana",
    icon: <Wallet className="w-6 h-6" />, // Using Wallet icon for Dana
    description: "Bayar dengan e-wallet Dana Anda",
    popular: false,
  },
  {
    id: "gojek",
    name: "Gojek Pay",
    icon: <Smartphone className="w-6 h-6" />, // Using Smartphone icon for Gojek
    description: "Bayar dengan e-wallet Gojek Anda",
    popular: false,
  },
];

const savedCards = [
  {
    id: "1",
    type: "visa",
    last4: "4242",
    expiry: "12/26",
    name: "Sarah Johnson",
    isDefault: true,
  },
  {
    id: "2",
    type: "mastercard",
    last4: "8888",
    expiry: "09/25",
    name: "Sarah Johnson",
    isDefault: false,
  },
];

export default function PaymentPage() {
  const [isMounted, setIsMounted] = useState(false); // State to track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after component mounts
  }, []);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState("1");
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [billingAddress, setBillingAddress] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Contoh No. 123",
    city: "Jakarta",
    state: "DKI Jakarta",
    zipCode: "10110",
  });
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [showPaymentConfirmationDialog, setShowPaymentConfirmationDialog] =
    useState(false); // New state

  // Calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSavings = originalTotal - subtotal;
  const promoDiscount = appliedPromo
    ? (subtotal * appliedPromo.discount) / 100
    : 0;
  const deliveryFee =
    deliveryOption === "delivery" ? (subtotal > 250000 ? 0 : 15000) : 0; // Gratis di atas Rp250.000
  const processingFee = 9900; // Biaya pemrosesan Rp9.900
  const urgentItems = cartItems.filter((item) => item.urgent);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = subtotal - promoDiscount + deliveryFee + processingFee;

  const applyPromoCode = () => {
    const validCodes = {
      HEMAT10: 10,
      SELAMATKAN20: 20,
      PAHLAWAN15: 15,
    };
    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes],
      });
      setPromoCode("");
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // This function is now called when the user clicks "Complete Secure Order"
  const handleInitiatePayment = () => {
    setShowPaymentConfirmationDialog(true); // Show the "Are you sure?" dialog first
  };

  // This function is called when the user confirms in the "Are you sure?" dialog
  const handleConfirmPayment = () => {
    setShowPaymentConfirmationDialog(false); // Close the confirmation dialog
    // In a real application, you would process the payment here.
    // For this example, we'll just show the success dialog.
    setShowConfirmationDialog(true); // Show the "Order Completed!" dialog
  };

  // Helper function for conditional formatting
  const formatRupiah = useCallback(
    (amount: number) => {
      return isMounted ? `Rp${amount.toLocaleString("id-ID")}` : "Rp0"; // Render placeholder if not mounted
    },
    [isMounted]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DE7C7D]/10 to-rose-50 dark:from-gray-950 dark:to-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#740938] dark:text-[#DE7C7D] mb-2">
                Pembayaran Aman
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Selesaikan pesanan penyelamatan makanan Anda
              </p>
            </div>
            <UrgentItemsAlert urgentItems={urgentItems} />
            <DeliveryOptions
              deliveryOption={deliveryOption}
              setDeliveryOption={setDeliveryOption}
              subtotal={subtotal}
              formatRupiah={formatRupiah} // Pass formatRupiah
            />
            <PaymentMethodSelection
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              showNewCardForm={showNewCardForm}
              setShowNewCardForm={setShowNewCardForm}
              newCard={newCard}
              setNewCard={setNewCard}
              paymentMethods={paymentMethods}
              savedCards={savedCards}
            />
            <BillingAddressForm
              billingAddress={billingAddress}
              setBillingAddress={setBillingAddress}
            />
          </div>
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              totalSavings={totalSavings}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              appliedPromo={appliedPromo}
              applyPromoCode={applyPromoCode}
              removePromoCode={removePromoCode}
              deliveryOption={deliveryOption}
              deliveryFee={deliveryFee}
              processingFee={processingFee}
              total={total}
              totalItems={totalItems}
              onCompleteOrder={handleInitiatePayment} // Now initiates the confirmation dialog
              formatRupiah={formatRupiah} // Pass formatRupiah
            />
            <TrustBadges />
            <HelpCard />
          </div>
        </div>
      </div>
      {/* Payment Confirmation Dialog */}
      <PaymentConfirmationDialog
        isOpen={showPaymentConfirmationDialog}
        onClose={() => setShowPaymentConfirmationDialog(false)}
        onConfirm={handleConfirmPayment}
        total={total}
        formatRupiah={formatRupiah} // Pass formatRupiah
      />
      {/* Order Confirmation Dialog (Success) */}
      <OrderConfirmationDialog
        isOpen={showConfirmationDialog}
        onClose={() => setShowConfirmationDialog(false)}
        totalItemsSaved={totalItems}
      />
    </div>
  );
}
