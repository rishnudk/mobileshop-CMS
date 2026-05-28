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
import { overviewMetrics, recentComplaints } from "@/lib/mock-data";

const quickStats = [
  {
    title: "Complaint intake",
    value: "24 today",
    description: "Front desk registrations recorded since opening time.",
    icon: ReceiptText,
  },
  {
    title: "Repair throughput",
    value: "17 closed",
    description: "Completed jobs marked ready for pickup in the last 24 hours.",
    icon: Wrench,
  },
  {
    title: "Customer follow-ups",
    value: "31 pending",
    description: "Notifications and callbacks still waiting for an update.",
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      description="A high-level operational view of complaints, staff workload, and customer activity for the mobile repair shop."
      actions={
        <Button className="rounded-xl">
          View daily summary
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
            <CardDescription>Static preview of the complaint list planned for the MVP workflow.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.id}</TableCell>
                    <TableCell>{complaint.customer}</TableCell>
                    <TableCell>{complaint.device}</TableCell>
                    <TableCell>
                      <StatusBadge value={complaint.status} />
                    </TableCell>
                    <TableCell>{complaint.assignedTo}</TableCell>
                  </TableRow>
                ))}
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
                Next integration step
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
              <p>
                Connect these cards and tables to `/api/v1/dashboard` and `/api/v1/complaints` once the backend service layer is ready.
              </p>
              <p>
                The current scaffold keeps the frontend aligned with the implementation plan without blocking backend progress.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
