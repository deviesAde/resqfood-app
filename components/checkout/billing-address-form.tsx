"use client";

import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface BillingAddressFormProps {
  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  setBillingAddress: (address: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
}

export function BillingAddressForm({
  billingAddress,
  setBillingAddress,
}: BillingAddressFormProps) {
  return (
    <Card className="border-2 border-[#DE7C7D]/30 rounded-2xl shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-[#740938] dark:text-[#DE7C7D] flex items-center text-lg sm:text-xl">
          <MapPin className="w-5 h-5 mr-2" />
          Alamat Penagihan
          {/* Billing Address */}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label
              htmlFor="firstName"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Nama Depan
            </Label>
            <Input
              id="firstName"
              value={billingAddress.firstName}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  firstName: e.target.value,
                })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div>
            <Label
              htmlFor="lastName"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Nama Belakang
            </Label>
            <Input
              id="lastName"
              value={billingAddress.lastName}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  lastName: e.target.value,
                })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div>
            <Label
              htmlFor="email"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={billingAddress.email}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, email: e.target.value })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div>
            <Label
              htmlFor="phone"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Telepon
            </Label>
            <Input
              id="phone"
              value={billingAddress.phone}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, phone: e.target.value })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div className="md:col-span-2">
            <Label
              htmlFor="address"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Alamat
            </Label>
            <Input
              id="address"
              value={billingAddress.address}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  address: e.target.value,
                })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div>
            <Label
              htmlFor="city"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Kota
            </Label>
            <Input
              id="city"
              value={billingAddress.city}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, city: e.target.value })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div>
            <Label
              htmlFor="state"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Provinsi
            </Label>
            <Input
              id="state"
              value={billingAddress.state}
              onChange={(e) =>
                setBillingAddress({ ...billingAddress, state: e.target.value })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
          <div>
            <Label
              htmlFor="zipCode"
              className="text-[#740938] dark:text-[#DE7C7D] font-semibold text-sm sm:text-base"
            >
              Kode Pos
            </Label>
            <Input
              id="zipCode"
              value={billingAddress.zipCode}
              onChange={(e) =>
                setBillingAddress({
                  ...billingAddress,
                  zipCode: e.target.value,
                })
              }
              className="border-[#DE7C7D]/30 focus:border-[#AF1740] mt-1 text-sm sm:text-base dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:border-[#CC2B52]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
