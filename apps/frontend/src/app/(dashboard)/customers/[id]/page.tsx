import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

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
import { formatComplaintStatus, formatCurrency, formatDateTime } from "@/lib/format";
import { getPartyById } from "@/lib/backend";

export default async function PartyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const party = await getPartyById(id);
    const complaints = party.complaints ?? [];
    const outstanding = complaints.reduce((sum, complaint) => sum + (complaint.estimatedCost - complaint.advancePaid), 0);

    return (
      <PageShell
        title={party.name}
        description={`Track all devices received from this ${party.type === "SHOP" ? "partner shop" : "customer"} and add new complaints without creating duplicate party records.`}
        actions={
          <>
            <Button variant="outline" className="rounded-xl" render={<Link href="/customers" />}>
              <ArrowLeft className="size-4" />
              Back to parties
            </Button>
            <Button className="rounded-xl" render={<Link href={`/customers/${party.id}/new-complaint`} />}>
              <Plus className="size-4" />
              Add device complaint
            </Button>
          </>
        }
      >
        <section className="grid gap-4 lg:grid-cols-3">
          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>Party details</CardTitle>
              <CardDescription>Core account information used for intake and follow-up.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="font-medium">Type:</span> {party.type === "SHOP" ? "Partner shop" : "Individual customer"}</p>
              <p><span className="font-medium">Phone:</span> {party.phone}</p>
              <p><span className="font-medium">Contact:</span> {party.contactPerson ?? "Direct customer"}</p>
              <p><span className="font-medium">Address:</span> {party.address ?? "Not added"}</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>Complaint summary</CardTitle>
              <CardDescription>High-level operational status for this party account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="font-medium">Total complaints:</span> {complaints.length}</p>
              <p><span className="font-medium">Outstanding:</span> {formatCurrency(outstanding)}</p>
              <p><span className="font-medium">Created:</span> {formatDateTime(party.createdAt)}</p>
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>How to use this</CardTitle>
              <CardDescription>Each device should be created as its own complaint under the same party.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>One party can send many devices over time.</p>
              <p>Each device keeps its own issue, status, amount, and payment history.</p>
              <p>Partner shops can still be tracked as one account with multiple linked jobs.</p>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Party complaints</CardTitle>
            <CardDescription>All device complaints currently linked to this party.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Complaint ID</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Advance</TableHead>
                  <TableHead>Estimate</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.length ? (
                  complaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.complaintId}</TableCell>
                      <TableCell>
                        <div>{complaint.ownerName ?? complaint.customerName}</div>
                        <div className="text-xs text-muted-foreground">{complaint.ownerPhone ?? complaint.customerPhone}</div>
                      </TableCell>
                      <TableCell>{[complaint.deviceBrand, complaint.deviceModel, complaint.deviceColor].filter(Boolean).join(" - ")}</TableCell>
                      <TableCell className="max-w-xs text-sm text-muted-foreground">{complaint.issueDescription}</TableCell>
                      <TableCell>
                        <StatusBadge value={formatComplaintStatus(complaint.status)} />
                      </TableCell>
                      <TableCell>{formatCurrency(complaint.advancePaid)}</TableCell>
                      <TableCell>{formatCurrency(complaint.estimatedCost)}</TableCell>
                      <TableCell>{formatDateTime(complaint.createdAt)}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                      No complaints yet. Use "Add device complaint" to register the first device for this party.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </PageShell>
    );
  } catch {
    notFound();
  }
}
