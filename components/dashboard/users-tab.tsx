"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Eye,
  Ban,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  joinDate: string;
  avatar: string;
}

interface UsersTabProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export function UsersTab({ users, setUsers }: UsersTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const newUser: User = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: newUserName,
        email: newUserEmail,
        status: "aktif",
        joinDate: new Date().toISOString().slice(0, 10),
        avatar: newUserName.charAt(0).toUpperCase(),
      };
      setUsers([...users, newUser]);
      setNewUserName("");
      setNewUserEmail("");
      setShowAddUserForm(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setNewUserName(user.name);
    setNewUserEmail(user.email);
    setShowAddUserForm(true);
  };

  const handleUpdateUser = () => {
    if (editingUser && newUserName && newUserEmail) {
      setUsers(
        users.map((user) =>
          user.id === editingUser.id
            ? { ...user, name: newUserName, email: newUserEmail }
            : user
        )
      );
      setEditingUser(null);
      setNewUserName("");
      setNewUserEmail("");
      setShowAddUserForm(false);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleBlockUser = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "aktif" ? "diblokir" : "aktif" }
          : user
      )
    );
  };

  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#740938] dark:text-gray-100">
            Manajemen Pengguna
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Kelola pengguna platform dan aktivitas mereka
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-full border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="rounded-full bg-transparent border-[#DE7C7D]/30 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 flex-1 sm:flex-none"
            >
              <Filter className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Filter</span>
            </Button>

            <Button
              onClick={() => {
                setShowAddUserForm(true);
                setEditingUser(null);
                setNewUserName("");
                setNewUserEmail("");
              }}
              className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-full flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Tambah Pengguna</span>
              <span className="sm:hidden">Tambah</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Add/Edit User Form */}
      {showAddUserForm && (
        <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#740938] dark:text-gray-100 mb-3 sm:mb-4">
            {editingUser ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label
                htmlFor="userName"
                className="text-[#740938] dark:text-gray-300"
              >
                Nama Pengguna
              </Label>
              <Input
                id="userName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <Label
                htmlFor="userEmail"
                className="text-[#740938] dark:text-gray-300"
              >
                Email Pengguna
              </Label>
              <Input
                id="userEmail"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="mt-1 border-2 border-[#DE7C7D]/30 dark:border-gray-700 focus:border-[#AF1740] dark:focus:border-[#AF1740] rounded-lg bg-[#DE7C7D]/10 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4 sm:mt-6">
            <Button
              variant="outline"
              onClick={() => setShowAddUserForm(false)}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg"
            >
              Batal
            </Button>
            <Button
              onClick={editingUser ? handleUpdateUser : handleAddUser}
              className="bg-[#AF1740] hover:bg-[#740938] text-white rounded-lg"
            >
              {editingUser ? "Perbarui Pengguna" : "Tambah Pengguna"}
            </Button>
          </div>
        </Card>
      )}

      {/* Users Table */}
      <Card className="border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900">
        <CardContent className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DE7C7D]/30 dark:border-gray-700">
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Pengguna
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold hidden sm:table-cell">
                    Email
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Status
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold hidden md:table-cell">
                    Bergabung
                  </th>
                  <th className="text-left py-3 text-[#740938] dark:text-gray-100 font-semibold">
                    Tindakan
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#DE7C7D]/20 dark:border-gray-800 hover:bg-[#DE7C7D]/10 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm sm:text-base">
                            {user.avatar}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-[#740938] dark:text-gray-100 block">
                            {user.name}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400 sm:hidden">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 hidden sm:table-cell">
                      {user.email}
                    </td>
                    <td className="py-3">
                      <Badge
                        className={`${
                          user.status === "aktif"
                            ? "bg-green-500"
                            : "bg-[#CC2B52]"
                        } text-white text-xs sm:text-sm`}
                      >
                        {user.status === "aktif" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                      {user.joinDate}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-1 sm:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 p-1 sm:p-2"
                          onClick={() =>
                            alert(`Melihat detail pengguna: ${user.name}`)
                          }
                        >
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#AF1740] text-[#AF1740] hover:bg-[#AF1740] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 p-1 sm:p-2"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className={`${
                            user.status === "aktif"
                              ? "border-[#CC2B52] text-[#CC2B52] hover:bg-[#CC2B52]"
                              : "border-green-500 text-green-500 hover:bg-green-500"
                          } hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 p-1 sm:p-2`}
                          onClick={() => handleBlockUser(user.id)}
                        >
                          {user.status === "aktif" ? (
                            <Ban className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-400 text-gray-600 hover:bg-gray-200 hover:text-gray-800 bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 p-1 sm:p-2"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
