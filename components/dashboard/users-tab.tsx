"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Eye,
  Ban,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Mail,
  Calendar,
  Shield,
  AlertTriangle,
  X,
  SlidersHorizontal,
} from "lucide-react";

interface UsersTabProps {
  users: any[];
  setUsers: React.Dispatch<React.SetStateAction<any[]>>;
}

export function UsersTab({ users, setUsers }: UsersTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  // Filter states
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // State untuk dialog tinjau user
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [reviewingUser, setReviewingUser] = useState<any | null>(null);

  // State untuk alert dialog hapus
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);

  // Filter dan sort logic
  const filteredAndSortedUsers = users
    .filter((user) => {
      // Search filter
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter.length === 0 || statusFilter.includes(user.status);

      // Date filter
      let matchesDate = true;
      if (dateFilter) {
        const userDate = new Date(user.joinDate);
        const today = new Date();
        const filterDate = new Date();

        switch (dateFilter) {
          case "today":
            matchesDate = userDate.toDateString() === today.toDateString();
            break;
          case "week":
            filterDate.setDate(today.getDate() - 7);
            matchesDate = userDate >= filterDate;
            break;
          case "month":
            filterDate.setMonth(today.getMonth() - 1);
            matchesDate = userDate >= filterDate;
            break;
          case "year":
            filterDate.setFullYear(today.getFullYear() - 1);
            matchesDate = userDate >= filterDate;
            break;
        }
      }

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "joinDate":
          aValue = new Date(a.joinDate);
          bValue = new Date(b.joinDate);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleAddUser = () => {
    if (newUserName && newUserEmail) {
      const newUser = {
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

  const handleEditUser = (user: any) => {
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

  const handleDeleteUser = (user: any) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
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

  const handleReviewUser = (user: any) => {
    setReviewingUser(user);
    setReviewDialogOpen(true);
  };

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilter([...statusFilter, status]);
    } else {
      setStatusFilter(statusFilter.filter((s) => s !== status));
    }
  };

  const clearAllFilters = () => {
    setStatusFilter([]);
    setDateFilter("");
    setSortBy("name");
    setSortOrder("asc");
    setSearchTerm("");
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (statusFilter.length > 0) count++;
    if (dateFilter) count++;
    if (searchTerm) count++;
    return count;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      aktif: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
        label: "Aktif",
      },
      diblokir: {
        color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
        label: "Diblokir",
      },
      tertunda: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
        label: "Tertunda",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.aktif;

    return <Badge className={`${config.color} border-0`}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-full bg-transparent border-[#DE7C7D]/30 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#DE7C7D]/20 dark:hover:bg-gray-800 flex-1 sm:flex-none relative"
                >
                  <Filter className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Filter</span>
                  {getActiveFilterCount() > 0 && (
                    <Badge className="ml-2 h-5 w-5 p-0 bg-[#AF1740] text-white text-xs flex items-center justify-center">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <DropdownMenuLabel className="text-[#740938] dark:text-gray-300 font-semibold">
                      Filter Pengguna
                    </DropdownMenuLabel>
                    {getActiveFilterCount() > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Clear All
                      </Button>
                    )}
                  </div>

                  <DropdownMenuSeparator />

                  {/* Status Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#740938] dark:text-gray-300">
                      Status
                    </Label>
                    <div className="space-y-2">
                      {["aktif", "diblokir", "tertunda"].map((status) => (
                        <DropdownMenuCheckboxItem
                          key={status}
                          checked={statusFilter.includes(status)}
                          onCheckedChange={(checked) =>
                            handleStatusFilterChange(status, checked)
                          }
                          className="flex items-center space-x-2"
                        >
                          <span className="capitalize">{status}</span>
                        </DropdownMenuCheckboxItem>
                      ))}
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Date Filter */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#740938] dark:text-gray-300">
                      Tanggal Bergabung
                    </Label>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih periode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua waktu</SelectItem>
                        <SelectItem value="today">Hari ini</SelectItem>
                        <SelectItem value="week">7 hari terakhir</SelectItem>
                        <SelectItem value="month">30 hari terakhir</SelectItem>
                        <SelectItem value="year">1 tahun terakhir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <DropdownMenuSeparator />

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-[#740938] dark:text-gray-300">
                      Urutkan berdasarkan
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="name">Nama</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="status">Status</SelectItem>
                          <SelectItem value="joinDate">Tanggal</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sortOrder} onValueChange={setSortOrder}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asc">A-Z / Lama-Baru</SelectItem>
                          <SelectItem value="desc">Z-A / Baru-Lama</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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

      {/* Active Filters Display */}
      {(statusFilter.length > 0 || dateFilter || searchTerm) && (
        <Card className="border-2 border-[#DE7C7D]/20 dark:border-gray-700 bg-[#DE7C7D]/5 dark:bg-gray-800/50">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#740938] dark:text-gray-300" />
              <span className="text-sm font-medium text-[#740938] dark:text-gray-300">
                Filter aktif:
              </span>

              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  Pencarian: "{searchTerm}"
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}

              {statusFilter.map((status) => (
                <Badge
                  key={status}
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                >
                  Status: {status}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => handleStatusFilterChange(status, false)}
                  />
                </Badge>
              ))}

              {dateFilter && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                >
                  Periode:{" "}
                  {dateFilter === "today"
                    ? "Hari ini"
                    : dateFilter === "week"
                    ? "7 hari"
                    : dateFilter === "month"
                    ? "30 hari"
                    : "1 tahun"}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer"
                    onClick={() => setDateFilter("")}
                  />
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-auto"
              >
                Hapus semua filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <span>
          Menampilkan {filteredAndSortedUsers.length} dari {users.length}{" "}
          pengguna
        </span>
        <span>
          Diurutkan berdasarkan{" "}
          {sortBy === "name"
            ? "nama"
            : sortBy === "email"
            ? "email"
            : sortBy === "status"
            ? "status"
            : "tanggal"}{" "}
          ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </span>
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
                {filteredAndSortedUsers.map((user) => (
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
                    <td className="py-3">{getStatusBadge(user.status)}</td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                      {user.joinDate}
                    </td>
                    <td className="py-3">
                      <div className="flex space-x-1 sm:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#740938] text-[#740938] hover:bg-[#740938] hover:text-white bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 p-1 sm:p-2"
                          onClick={() => handleReviewUser(user)}
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
                          onClick={() => handleDeleteUser(user)}
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

          {/* Empty State */}
          {filteredAndSortedUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Tidak ada pengguna ditemukan
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="border-[#DE7C7D]/30 text-[#740938] hover:bg-[#DE7C7D]/10 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 bg-transparent"
              >
                Hapus semua filter
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog Tinjau User */}
      <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border-2 border-[#DE7C7D]/30 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Detail Pengguna
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Informasi lengkap tentang pengguna
            </DialogDescription>
          </DialogHeader>

          {reviewingUser && (
            <div className="space-y-4 py-4">
              {/* Avatar dan Nama */}
              <div className="flex items-center space-x-4 p-4 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg">
                <div className="w-16 h-16 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {reviewingUser.avatar}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#740938] dark:text-gray-100">
                    {reviewingUser.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    ID: #{reviewingUser.id}
                  </p>
                </div>
              </div>

              {/* Detail Informasi */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="text-[#740938] dark:text-gray-300 font-semibold flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100">
                      {reviewingUser.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#740938] dark:text-gray-300 font-semibold flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Status Akun
                  </Label>
                  <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                    {getStatusBadge(reviewingUser.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[#740938] dark:text-gray-300 font-semibold flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Tanggal Bergabung
                  </Label>
                  <div className="p-3 bg-[#DE7C7D]/10 dark:bg-gray-800 rounded-lg border border-[#DE7C7D]/30 dark:border-gray-700">
                    <p className="text-gray-900 dark:text-gray-100">
                      {formatDate(reviewingUser.joinDate)}
                    </p>
                  </div>
                </div>

                {/* Statistik Tambahan */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Total Pesanan
                    </p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      12
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                      Total Belanja
                    </p>
                    <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                      Rp 2.4M
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setReviewDialogOpen(false)}
              className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Tutup
            </Button>
            {reviewingUser && (
              <>
                <Button
                  className={`${
                    reviewingUser.status === "aktif"
                      ? "bg-[#CC2B52] hover:bg-[#AF1740]"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white`}
                  onClick={() => {
                    handleBlockUser(reviewingUser.id);
                    setReviewDialogOpen(false);
                  }}
                >
                  {reviewingUser.status === "aktif" ? (
                    <>
                      <Ban className="w-4 h-4 mr-2" />
                      Blokir
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aktifkan
                    </>
                  )}
                </Button>
                <Button
                  className="bg-[#AF1740] hover:bg-[#740938] text-white"
                  onClick={() => {
                    handleEditUser(reviewingUser);
                    setReviewDialogOpen(false);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog Hapus User */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-gray-900 border-2 border-red-200 dark:border-red-900">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#740938] dark:text-gray-100 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              Konfirmasi Hapus Pengguna
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Apakah Anda yakin ingin menghapus pengguna ini? Tindakan ini tidak
              dapat dibatalkan dan akan menghapus semua data terkait pengguna.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {userToDelete && (
            <div className="my-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#AF1740] to-[#CC2B52] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {userToDelete.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#740938] dark:text-gray-100">
                    {userToDelete.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {userToDelete.email}
                  </p>
                  <div className="mt-1">
                    {getStatusBadge(userToDelete.status)}
                  </div>
                </div>
              </div>
            </div>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
              Batal
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteUser}
              className="bg-[#CC2B52] hover:bg-[#AF1740] text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Hapus Pengguna
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
