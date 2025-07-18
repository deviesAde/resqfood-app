"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  UserCheck,
  Eye,
  CheckCircle,
  Ban,
  Plus,
  Edit,
  Trash2,
  Store,
} from "lucide-react";

interface Seller {
  id: number;
  name: string;
  email: string;
  status: string;
  performance: string;
  revenue: number;
}

interface SellersTabProps {
  sellers: Seller[];
  setSellers: React.Dispatch<React.SetStateAction<Seller[]>>;
}

export function SellersTab({ sellers, setSellers }: SellersTabProps) {
  const [showAddSellerForm, setShowAddSellerForm] = useState(false);
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [newSellerName, setNewSellerName] = useState("");
  const [newSellerEmail, setNewSellerEmail] = useState("");

  const handleAddSeller = () => {
    if (newSellerName && newSellerEmail) {
      const newSeller: Seller = {
        id: sellers.length > 0 ? Math.max(...sellers.map((s) => s.id)) + 1 : 1,
        name: newSellerName,
        email: newSellerEmail,
        status: "tertunda",
        performance: "baru",
        revenue: 0,
      };
      setSellers([...sellers, newSeller]);
      setNewSellerName("");
      setNewSellerEmail("");
      setShowAddSellerForm(false);
    }
  };

  const handleEditSeller = (seller: Seller) => {
    setEditingSeller(seller);
    setNewSellerName(seller.name);
    setNewSellerEmail(seller.email);
    setShowAddSellerForm(true);
  };

  const handleUpdateSeller = () => {
    if (editingSeller && newSellerName && newSellerEmail) {
      setSellers(
        sellers.map((seller) =>
          seller.id === editingSeller.id
            ? { ...seller, name: newSellerName, email: newSellerEmail }
            : seller
        )
      );
      setEditingSeller(null);
      setNewSellerName("");
      setNewSellerEmail("");
      setShowAddSellerForm(false);
    }
  };

  const handleDeleteSeller = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus penjual ini?")) {
      setSellers(sellers.filter((seller) => seller.id !== id));
    }
  };

  const handleApproveSeller = (id: number) => {
    setSellers(
      sellers.map((seller) =>
        seller.id === id ? { ...seller, status: "terverifikasi" } : seller
      )
    );
  };

  const handleBlockSeller = (id: number) => {
    setSellers(
      sellers.map((seller) =>
        seller.id === id ? { ...seller, status: "diblokir" } : seller
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100">
            Manajemen Penjual
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Kelola penjual dan kinerja mereka
          </p>
        </div>
        <div className="flex space-x-3">
          <Button
            onClick={() => {
              setShowAddSellerForm(true);
              setEditingSeller(null);
              setNewSellerName("");
              setNewSellerEmail("");
            }}
            className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Penjual
          </Button>
          <Button className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full">
            <UserCheck className="w-4 h-4 mr-2" />
            Setujui Tertunda
          </Button>
        </div>
      </div>

      {showAddSellerForm && (
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-6">
          <h2 className="text-xl font-bold text-[#740938] dark:text-gray-100 mb-4">
            {editingSeller ? "Edit Penjual" : "Tambah Penjual Baru"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="sellerName"
                className="text-[#740938] dark:text-gray-300"
              >
                Nama Bisnis
              </Label>
              <Input
                id="sellerName"
                value={newSellerName}
                onChange={(e) => setNewSellerName(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="sellerEmail"
                className="text-[#740938] dark:text-gray-300"
              >
                Email Penjual
              </Label>
              <Input
                id="sellerEmail"
                type="email"
                value={newSellerEmail}
                onChange={(e) => setNewSellerEmail(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAddSellerForm(false)}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
            >
              Batal
            </Button>
            <Button
              onClick={editingSeller ? handleUpdateSeller : handleAddSeller}
              className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-lg"
            >
              {editingSeller ? "Perbarui Penjual" : "Tambah Penjual"}
            </Button>
          </div>
        </Card>
      )}

      <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DE7C7D]/30 dark:border-gray-700">
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Bisnis
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Email
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Status
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Kinerja
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Pendapatan
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Tindakan
                  </th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr
                    key={seller.id}
                    className="border-b border-[#DE7C7D]/20 dark:border-gray-800 hover:bg-[#DE7C7D]/10 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#740938] to-[#AF1740] rounded-full flex items-center justify-center">
                          <Store className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-[#740938] dark:text-gray-100">
                          {seller.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600 dark:text-gray-400">
                      {seller.email}
                    </td>
                    <td className="py-4">
                      <Badge
                        className={`${
                          seller.status === "terverifikasi"
                            ? "bg-green-500"
                            : seller.status === "tertunda"
                            ? "bg-[#AF1740]"
                            : "bg-[#CC2B52]"
                        } text-white`}
                      >
                        {seller.status}
                      </Badge>
                    </td>
                    <td className="py-4">
                      <Badge
                        variant="outline"
                        className={`${
                          seller.performance === "sangat baik"
                            ? "border-green-500 text-green-500"
                            : seller.performance === "baik"
                            ? "border-[#AF1740] text-[#AF1740]"
                            : "border-gray-500 text-gray-500"
                        } dark:border-gray-600 dark:text-gray-300`}
                      >
                        {seller.performance}
                      </Badge>
                    </td>
                    <td className="py-4 font-semibold text-[#AF1740] dark:text-gray-100">
                      ${seller.revenue.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          onClick={() =>
                            alert(`Melihat detail penjual: ${seller.name}`)
                          }
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          onClick={() => handleEditSeller(seller)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {seller.status === "tertunda" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => handleApproveSeller(seller.id)}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {seller.status !== "diblokir" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => handleBlockSeller(seller.id)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-gray-800 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                          onClick={() => handleDeleteSeller(seller.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
