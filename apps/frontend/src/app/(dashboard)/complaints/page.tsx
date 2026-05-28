import { Plus, Search } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentComplaints } from "@/lib/mock-data";

export default function ComplaintsPage() {
  return (
    <PageShell
      title="Complaints"
      description="Static complaint queue designed around the MVP modules in the implementation plan."
      actions={
        <Button className="rounded-xl">
          <Plus className="size-4" />
          New complaint
        </Button>
      }
    >
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Complaint queue</CardTitle>
            <CardDescription>Search, assign, and monitor incoming device issues from one table.</CardDescription>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search by complaint ID, customer, or device" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned technician</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentComplaints.map((complaint) => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.id}</TableCell>
                  <TableCell>{complaint.customer}</TableCell>
                  <TableCell>{complaint.device}</TableCell>
                  <TableCell className="max-w-xs text-sm text-muted-foreground">{complaint.issue}</TableCell>
                  <TableCell>
                    <StatusBadge value={complaint.status} />
                  </TableCell>
                  <TableCell>{complaint.assignedTo}</TableCell>
                  <TableCell>{complaint.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
