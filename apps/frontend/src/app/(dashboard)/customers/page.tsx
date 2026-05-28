import { Download, UserPlus } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
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
import { customers } from "@/lib/mock-data";

export default function CustomersPage() {
  return (
    <PageShell
      title="Customers"
      description="Customer records area prepared for future complaint history, search, and service tracking."
      actions={
        <>
          <Button variant="outline" className="rounded-xl">
            <Download className="size-4" />
            Export
          </Button>
          <Button className="rounded-xl">
            <UserPlus className="size-4" />
            Add customer
          </Button>
        </>
      }
    >
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>Customer directory</CardTitle>
          <CardDescription>Static records that mirror the shape of the future customer management module.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Active complaints</TableHead>
                <TableHead>Last visit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.phone}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.city}</TableCell>
                  <TableCell>{customer.activeComplaints}</TableCell>
                  <TableCell>{customer.lastVisit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PageShell>
  );
}
