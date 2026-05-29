import Link from "next/link";
import { Activity, ArrowUpRight, ReceiptText, Users, Wrench } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getComplaints, getParties } from "@/lib/backend";
import { formatComplaintStatus, formatCurrency, formatDateTime } from "@/lib/format";

export default async function DashboardPage() {
  const [complaints, parties] = await Promise.all([getComplaints(), getParties()]);

  const openComplaints = complaints.filter((complaint) => !["DELIVERED", "CANCELLED"].includes(complaint.status));
  const readyComplaints = complaints.filter((complaint) => complaint.status === "READY");
  const activeShops = parties.filter((party) => party.type === "SHOP");
  const estimatedRevenue = complaints.reduce((sum, complaint) => sum + complaint.estimatedCost, 0);
  const advanceCollected = complaints.reduce((sum, complaint) => sum + complaint.advancePaid, 0);
  const recentComplaints = complaints.slice(0, 5);

  const overviewMetrics = [
    {
      title: "Open complaints",
      value: String(openComplaints.length),
      change: `${complaints.length} total recorded`,
      detail: "All unresolved devices currently in the repair pipeline.",
    },
    {
      title: "Ready for pickup",
      value: String(readyComplaints.length),
      change: `${complaints.filter((complaint) => complaint.status === "REPAIRING").length} still repairing`,
      detail: "Completed repair jobs waiting for customer or shop collection.",
    },
    {
      title: "Active parties",
      value: String(parties.length),
      change: `${activeShops.length} partner shops`,
      detail: "Direct customers and partner shops currently tracked in the CMS.",
    },
    {
      title: "Advance collected",
      value: formatCurrency(advanceCollected),
      change: `${formatCurrency(estimatedRevenue)} estimated revenue`,
      detail: "Advance payments already received against registered repair jobs.",
    },
  ];

  const quickStats = [
    {
      title: "Complaint intake",
      value: `${complaints.length} jobs`,
      description: "Total complaints recorded through the live backend workflow.",
      icon: ReceiptText,
    },
    {
      title: "Repair throughput",
      value: `${complaints.filter((complaint) => complaint.status === "DELIVERED").length} delivered`,
      description: "Jobs fully completed and handed over to the customer or partner shop.",
      icon: Wrench,
    },
    {
      title: "Partner accounts",
      value: `${activeShops.length} shops`,
      description: "Shop accounts currently sending devices into the repair process.",
      icon: Users,
    },
  ];

  return (
    <PageShell
      title="Dashboard"
      description="A live operational view of complaints, partner shops, and money collected for the mobile repair shop."
      actions={
        <Button className="rounded-xl" render={<Link href="/complaints" />}>
          View complaint queue
          <ArrowUpRight className="size-4" />
        </Button>
      }
    >
      <section className="grid gap-4 xl:grid-cols-4">
        {overviewMetrics.map((metric) => (
          <Card key={metric.title} className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardDescription>{metric.title}</CardDescription>
              <CardTitle className="text-3xl">{metric.value}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{metric.change}</p>
              <p className="leading-6">{metric.detail}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Recent complaints</CardTitle>
            <CardDescription>Fresh intake pulled directly from the backend complaint registry.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentComplaints.length ? (
                  recentComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.complaintId}</TableCell>
                      <TableCell>{complaint.party?.name ?? complaint.customerName}</TableCell>
                      <TableCell>{[complaint.deviceBrand, complaint.deviceModel].join(" ")}</TableCell>
                      <TableCell>
                        <StatusBadge value={formatComplaintStatus(complaint.status)} />
                      </TableCell>
                      <TableCell>{complaint.assignedTechnician?.name ?? "Unassigned"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                      No complaints have been registered yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {quickStats.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="rounded-3xl border-border/70 shadow-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="rounded-2xl bg-slate-100 p-3 text-slate-900">
                    <Icon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="text-2xl font-semibold tracking-tight">{item.value}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          <Card className="rounded-3xl border-border/70 bg-slate-950 text-slate-50 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-50">
                <Activity className="size-5" />
                Live backend status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
              <p>The dashboard is now using the real backend complaint and party data instead of mock records.</p>
              <p>Latest sync time: {recentComplaints[0] ? formatDateTime(recentComplaints[0].updatedAt) : "No complaint activity yet"}.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
