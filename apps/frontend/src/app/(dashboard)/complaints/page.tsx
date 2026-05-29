import Link from "next/link";
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
import { getComplaints } from "@/lib/backend";
import { formatComplaintStatus, formatDateTime } from "@/lib/format";

export default async function ComplaintsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim().toLowerCase() ?? "";
  const complaints = await getComplaints();
  const filteredComplaints = query
    ? complaints.filter((complaint) =>
        [
          complaint.complaintId,
          complaint.customerName,
          complaint.ownerName ?? "",
          complaint.deviceBrand,
          complaint.deviceModel,
          complaint.issueDescription,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : complaints;

  return (
    <PageShell
      title="Complaints"
      description="Search, monitor, and review all device complaints recorded in the live repair workflow."
      actions={
        <Button className="rounded-xl" render={<Link href="/customers" />}>
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
          <form className="relative w-full max-w-sm" action="/complaints">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input name="q" className="pl-9" placeholder="Search by complaint ID, customer, or device" defaultValue={params.q ?? ""} />
          </form>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint ID</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned technician</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComplaints.length ? (
                filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell className="font-medium">{complaint.complaintId}</TableCell>
                    <TableCell>{complaint.party?.name ?? complaint.customerName}</TableCell>
                    <TableCell>
                      <div>{complaint.ownerName ?? complaint.customerName}</div>
                      <div className="text-xs text-muted-foreground">{complaint.ownerPhone ?? complaint.customerPhone}</div>
                    </TableCell>
                    <TableCell>{[complaint.deviceBrand, complaint.deviceModel, complaint.deviceColor].filter(Boolean).join(" - ")}</TableCell>
                    <TableCell className="max-w-xs text-sm text-muted-foreground">{complaint.issueDescription}</TableCell>
                    <TableCell>
                      <StatusBadge value={formatComplaintStatus(complaint.status)} />
                    </TableCell>
                    <TableCell>{complaint.assignedTechnician?.name ?? "Unassigned"}</TableCell>
                    <TableCell>{formatDateTime(complaint.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                    No complaints found for this search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
