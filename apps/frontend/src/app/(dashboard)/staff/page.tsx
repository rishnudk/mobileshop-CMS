import { Shield, UserCog } from "lucide-react";

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
import { staffMembers } from "@/lib/mock-data";

export default function StaffPage() {
  return (
    <PageShell
      title="Staff"
      description="Staff management surface prepared for role-based access control and technician assignment workflows."
      actions={
        <Button className="rounded-xl">
          <UserCog className="size-4" />
          Invite staff
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Team roster</CardTitle>
            <CardDescription>Current operational staff and their repair queue status.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Open jobs</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staffMembers.map((staff) => (
                  <TableRow key={staff.name}>
                    <TableCell className="font-medium">{staff.name}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.shift}</TableCell>
                    <TableCell>{staff.openJobs}</TableCell>
                    <TableCell>
                      <StatusBadge value={staff.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="size-5" />
              RBAC foundation
            </CardTitle>
            <CardDescription>Frontend notes aligned with the authentication and access-control plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              Admins will manage staff accounts, route access, and sensitive settings once the backend auth module is connected.
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              Technicians will need scoped access to assigned complaints, status updates, and repair notes only.
            </div>
            <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
              This page is ready to evolve into the MVP staff management feature listed in the implementation plan.
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
