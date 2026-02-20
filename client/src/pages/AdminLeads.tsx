import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

const translations = {
  en: {
    title: "Lead Management Dashboard",
    description: "View and manage all your leads",
    totalLeads: "Total Leads",
    emailStats: "Email Statistics",
    recentLeads: "Recent Leads (Last 7 Days)",
    search: "Search leads by email or name",
    export: "Export as CSV",
    email: "Email",
    name: "Name",
    interest: "Interest Level",
    email1: "Email 1",
    email2: "Email 2",
    email3: "Email 3",
    email4: "Email 4",
    created: "Created",
    domain: "Email Domain",
    count: "Count",
    byInterest: "Leads by Interest Level",
    casual: "Casual Visitor",
    serious: "Serious Buyer",
    investor: "Investor",
    sent: "Sent",
    opened: "Opened",
    clicked: "Clicked",
    unsubscribed: "Unsubscribed",
  },
  th: {
    title: "แดชบอร์ดการจัดการลีด",
    description: "ดูและจัดการลีดทั้งหมดของคุณ",
    totalLeads: "จำนวนลีดทั้งหมด",
    emailStats: "สถิติอีเมล",
    recentLeads: "ลีดล่าสุด (7 วันที่ผ่านมา)",
    search: "ค้นหาลีดตามอีเมลหรือชื่อ",
    export: "ส่งออกเป็น CSV",
    email: "อีเมล",
    name: "ชื่อ",
    interest: "ระดับความสนใจ",
    email1: "อีเมล 1",
    email2: "อีเมล 2",
    email3: "อีเมล 3",
    email4: "อีเมล 4",
    created: "สร้างเมื่อ",
    domain: "โดเมนอีเมล",
    count: "จำนวน",
    byInterest: "ลีดตามระดับความสนใจ",
    casual: "ผู้เยี่ยมชมทั่วไป",
    serious: "ผู้ซื้อจริงจัง",
    investor: "นักลงทุน",
    sent: "ส่งแล้ว",
    opened: "เปิดแล้ว",
    clicked: "คลิกแล้ว",
    unsubscribed: "ยกเลิกการสมัครสมาชิก",
  },
};

export default function AdminLeads() {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const totalCountQuery = trpc.leads.analytics.getTotalCount.useQuery();
  const emailStatsQuery = trpc.leads.analytics.getEmailStats.useQuery();
  const byInterestQuery = trpc.leads.analytics.getByInterestLevel.useQuery();
  const byDomainQuery = trpc.leads.analytics.getByEmailDomain.useQuery();
  const recentQuery = trpc.leads.analytics.getRecent.useQuery({ days: 7 });
  const searchQuery_trpc = trpc.leads.analytics.search.useQuery(
    { query: searchQuery },
    { enabled: searchQuery.length > 0 }
  );
  const exportMutation = trpc.leads.analytics.exportCSV.useMutation();

  const isLoading =
    totalCountQuery.isLoading ||
    emailStatsQuery.isLoading ||
    byInterestQuery.isLoading ||
    byDomainQuery.isLoading ||
    recentQuery.isLoading;

  const handleExport = async () => {
    const result = await exportMutation.mutateAsync();
    if (result.csv) {
      // Create blob and download
      const blob = new Blob([result.csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const displayLeads = searchQuery.length > 0 ? searchQuery_trpc.data || [] : recentQuery.data || [];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-gray-600">{t.description}</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{t.totalLeads}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCountQuery.data?.total || 0}</div>
              </CardContent>
            </Card>

            {emailStatsQuery.data && (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{t.email1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{emailStatsQuery.data.email1Sent}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{t.email2}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{emailStatsQuery.data.email2Sent}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{t.unsubscribed}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{emailStatsQuery.data.unsubscribed}</div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Interest Level Breakdown */}
          {byInterestQuery.data && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t.byInterest}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">{t.casual}</p>
                    <p className="text-2xl font-bold">{byInterestQuery.data.casual_visitor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.serious}</p>
                    <p className="text-2xl font-bold">{byInterestQuery.data.serious_buyer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.investor}</p>
                    <p className="text-2xl font-bold">{byInterestQuery.data.investor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Email Domain Breakdown */}
          {byDomainQuery.data && byDomainQuery.data.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{t.domain}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {byDomainQuery.data.slice(0, 5).map((item) => (
                    <div key={item.domain} className="flex justify-between">
                      <span className="text-sm">{item.domain}</span>
                      <span className="font-bold">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search and Export */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.recentLeads}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex gap-2">
                <Input
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleExport} disabled={exportMutation.isPending}>
                  {t.export}
                </Button>
              </div>

              {/* Leads Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">{t.email}</th>
                      <th className="text-left py-2 px-2">{t.name}</th>
                      <th className="text-left py-2 px-2">{t.interest}</th>
                      <th className="text-center py-2 px-2">{t.email1}</th>
                      <th className="text-center py-2 px-2">{t.email2}</th>
                      <th className="text-center py-2 px-2">{t.email3}</th>
                      <th className="text-center py-2 px-2">{t.email4}</th>
                      <th className="text-left py-2 px-2">{t.created}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayLeads.map((lead: any) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-2 text-xs">{lead.email}</td>
                        <td className="py-2 px-2">{lead.firstName || "-"}</td>
                        <td className="py-2 px-2 text-xs">{lead.interestLevel}</td>
                        <td className="text-center py-2 px-2">{lead.email1Sent ? "✓" : "-"}</td>
                        <td className="text-center py-2 px-2">{lead.email2Sent ? "✓" : "-"}</td>
                        <td className="text-center py-2 px-2">{lead.email3Sent ? "✓" : "-"}</td>
                        <td className="text-center py-2 px-2">{lead.email4Sent ? "✓" : "-"}</td>
                        <td className="py-2 px-2 text-xs">
                          {lead.createdAt instanceof Date
                            ? lead.createdAt.toLocaleDateString()
                            : new Date(lead.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {displayLeads.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  {searchQuery.length > 0 ? "No leads found" : "No recent leads"}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
