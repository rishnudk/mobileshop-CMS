import { Shield, UserCog, Wrench } from "lucide-react";

import { CreateUserForm } from "@/components/forms/create-user-form";
import { DeleteUserForm } from "@/components/forms/delete-user-form";
import { PageShell } from "@/components/dashboard/page-shell";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers, requireCurrentUser } from "@/lib/backend";
import { formatDateTime } from "@/lib/format";

export default async function StaffPage() {
  const [currentUser, users] = await Promise.all([requireCurrentUser(), getUsers()]);
  const technicians = users.filter((user) => user.role === "TECHNICIAN" && user.isActive);

  return (
    <PageShell
      title="Staff"
      description="Manage admins, front desk staff, and technicians with admin-only destructive actions."
      actions={
        <div className="rounded-2xl border border-border/70 bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{currentUser.role}</span>
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Team roster</CardTitle>
            <CardDescription>Live staff accounts with role, status, and technician workload.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned jobs</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((staff) => (
                  <TableRow key={staff.id}>
                    <TableCell>
                      <div className="font-medium">{staff.name}</div>
                      <div className="text-xs text-muted-foreground">{staff.email}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={staff.role === "ADMIN" ? "default" : staff.role === "TECHNICIAN" ? "secondary" : "outline"}>
                        {staff.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{staff.phone ?? "Not added"}</TableCell>
                    <TableCell>
                      <StatusBadge value={staff.isActive ? "Available" : "Off Duty"} />
                    </TableCell>
                    <TableCell>{staff._count?.complaints ?? 0}</TableCell>
                    <TableCell>{formatDateTime(staff.createdAt)}</TableCell>
                    <TableCell>
                      {currentUser.role === "ADMIN" ? (
                        <DeleteUserForm userId={staff.id} />
                      ) : (
                        <span className="text-xs text-muted-foreground">Admin only</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {currentUser.role === "ADMIN" ? (
            <Card className="rounded-3xl border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="size-5" />
                  Add staff
                </CardTitle>
                <CardDescription>Only admins can create, edit, or delete staff accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateUserForm />
              </CardContent>
            </Card>
          ) : (
            <Card className="rounded-3xl border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="size-5" />
                  Permission note
                </CardTitle>
                <CardDescription>Non-admin staff can view the roster but cannot manage accounts.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                Admins can add users, update roles, and delete users. Staff and technicians cannot delete anyone.
              </CardContent>
            </Card>
          )}

          <Card className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="size-5" />
                Assignment summary
              </CardTitle>
              <CardDescription>Technicians available for complaint assignment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p><span className="font-medium">Active technicians:</span> {technicians.length}</p>
              <p className="text-muted-foreground">
                Only users with the `TECHNICIAN` role and active status can be assigned to a complaint.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
