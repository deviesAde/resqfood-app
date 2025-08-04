"use client";
import { useState } from "react";
import type React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  BarChart3,
  Users,
  Store,
  FileText,
  FileSpreadsheet,
  Loader2,
  CheckCircle,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ReportType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  iconColor: string;
  formats: string[];
  data: any;
}

export function ReportsTab() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const { toast } = useToast();

  const reports: ReportType[] = [
    {
      id: "revenue",
      title: "Laporan Pendapatan",
      description: "Rincian pendapatan bulanan dan tren",
      icon: <BarChart3 className="w-12 h-12 mx-auto mb-4" />,
      color: "bg-[#AF1740] hover:bg-[#740938]",
      hoverColor: "hover:bg-[#AF1740]/10",
      iconColor: "text-[#AF1740]",
      formats: ["PDF", "Excel", "CSV"],
      data: {
        totalRevenue: "Rp 125.500.000",
        monthlyGrowth: "+15.2%",
        transactions: 1247,
        avgOrderValue: "Rp 100.640",
      },
    },
    {
      id: "users",
      title: "Analitik Pengguna",
      description: "Pertumbuhan pengguna dan metrik keterlibatan",
      icon: <Users className="w-12 h-12 mx-auto mb-4" />,
      color: "bg-[#CC2B52] hover:bg-[#AF1740]",
      hoverColor: "hover:bg-[#CC2B52]/10",
      iconColor: "text-[#CC2B52]",
      formats: ["PDF", "Excel"],
      data: {
        totalUsers: "12.847",
        newUsers: "+892",
        activeUsers: "8.234",
        retention: "78.5%",
      },
    },
    {
      id: "sellers",
      title: "Kinerja Penjual",
      description: "Metrik penjual dan data kinerja",
      icon: <Store className="w-12 h-12 mx-auto mb-4" />,
      color: "bg-[#740938] hover:bg-[#AF1740]",
      hoverColor: "hover:bg-[#740938]/10",
      iconColor: "text-[#740938]",
      formats: ["PDF", "Excel", "CSV"],
      data: {
        totalSellers: "1.234",
        activeSellers: "987",
        topPerformer: "Toko Segar Jaya",
        avgRating: "4.8/5",
      },
    },
  ];

  // Simulate file generation and download
  const generateReport = async (reportId: string, format: string) => {
    setLoadingStates((prev) => ({ ...prev, [reportId]: true }));

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const report = reports.find((r) => r.id === reportId);
      if (!report) throw new Error("Report not found");

      // Create mock file content based on format
      let content = "";
      let mimeType = "";
      let fileName = "";

      switch (format.toLowerCase()) {
        case "pdf":
          content = generatePDFContent(report);
          mimeType = "application/pdf";
          fileName = `${reportId}_report_${
            new Date().toISOString().split("T")[0]
          }.pdf`;
          break;
        case "excel":
          content = generateExcelContent(report);
          mimeType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          fileName = `${reportId}_report_${
            new Date().toISOString().split("T")[0]
          }.xlsx`;
          break;
        case "csv":
          content = generateCSVContent(report);
          mimeType = "text/csv";
          fileName = `${reportId}_report_${
            new Date().toISOString().split("T")[0]
          }.csv`;
          break;
        default:
          throw new Error("Unsupported format");
      }

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Show success toast
      toast({
        title: "✅ Laporan Berhasil Diunduh!",
        description: `${report.title} dalam format ${format} telah diunduh ke perangkat Anda.`,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: "❌ Gagal Mengunduh Laporan",
        description:
          "Terjadi kesalahan saat menghasilkan laporan. Silakan coba lagi.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [reportId]: false }));
    }
  };

  // Mock content generators
  const generatePDFContent = (report: ReportType) => {
    return `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${report.title} - ${new Date().toLocaleDateString("id-ID")}) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000206 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
300
%%EOF`;
  };

  const generateExcelContent = (report: ReportType) => {
    return `Laporan,${report.title}
Tanggal,${new Date().toLocaleDateString("id-ID")}
Deskripsi,${report.description}

Data:
${Object.entries(report.data)
  .map(([key, value]) => `${key},${value}`)
  .join("\n")}`;
  };

  const generateCSVContent = (report: ReportType) => {
    const headers = ["Metrik", "Nilai", "Tanggal"];
    const rows = Object.entries(report.data).map(
      ([key, value]) =>
        `"${key}","${value}","${new Date().toLocaleDateString("id-ID")}"`
    );
    return [headers.join(","), ...rows].join("\n");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#740938] dark:text-gray-100 mb-2">
          Laporan & Wawasan
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Hasilkan dan unduh laporan komprehensif dalam berbagai format
        </p>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>
            Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card
            key={report.id}
            className={`border-2 border-[#DE7C7D]/30 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white dark:bg-gray-900 group ${report.hoverColor}`}
          >
            <CardContent className="p-6">
              <div className="text-center">
                <div className={report.iconColor}>{report.icon}</div>
                <h3 className="text-lg font-semibold text-[#740938] dark:text-gray-100 mb-2">
                  {report.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {report.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  {Object.entries(report.data)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2"
                      >
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {value as React.ReactNode}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 capitalize">
                          {key}
                        </div>
                      </div>
                    ))}
                </div>

                {/* Format Options */}
                <div className="flex flex-wrap gap-1 mb-4 justify-center">
                  {report.formats.map((format) => (
                    <Badge
                      key={format}
                      variant="outline"
                      className="text-xs border-[#DE7C7D]/30 text-[#740938] dark:text-[#DE7C7D]"
                    >
                      {format === "PDF" && (
                        <FileText className="w-3 h-3 mr-1" />
                      )}
                      {format === "Excel" && (
                        <FileSpreadsheet className="w-3 h-3 mr-1" />
                      )}
                      {format === "CSV" && (
                        <FileText className="w-3 h-3 mr-1" />
                      )}
                      {format}
                    </Badge>
                  ))}
                </div>

                {/* Download Buttons */}
                <div className="space-y-2">
                  {report.formats.map((format) => (
                    <Button
                      key={format}
                      onClick={() => generateReport(report.id, format)}
                      disabled={loadingStates[report.id]}
                      className={`${report.color} text-white rounded-full w-full text-sm transition-all duration-300 hover:scale-105`}
                    >
                      {loadingStates[report.id] ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menghasilkan...
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Unduh {format}
                        </>
                      )}
                    </Button>
                  ))}
                </div>

                {/* Success Indicator */}
                {!loadingStates[report.id] && (
                  <div className="mt-3 flex items-center justify-center text-green-600 dark:text-green-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Siap untuk diunduh
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-[#DE7C7D]/10 to-[#AF1740]/10 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-[#AF1740] rounded-full p-2">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-[#740938] dark:text-gray-100 mb-2">
              Tips Penggunaan Laporan
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Format PDF cocok untuk presentasi dan dokumentasi</li>
              <li>• Format Excel ideal untuk analisis data lebih lanjut</li>
              <li>• Format CSV dapat diimpor ke sistem lain</li>
              <li>• Laporan diperbarui secara real-time setiap hari</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
