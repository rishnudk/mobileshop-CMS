import Link from "next/link";
import { Building2, Plus, Search } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
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
import { formatDate } from "@/lib/format";
import { getParties } from "@/lib/backend";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const params = (await searchParams) ?? {};
  const query = params.q?.trim().toLowerCase() ?? "";
  const parties = await getParties();
  const filteredParties = query
    ? parties.filter((party) =>
        [party.name, party.phone, party.contactPerson ?? "", party.address ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(query)
      )
    : parties;

  return (
    <PageShell
      title="Parties"
      description="Manage direct customers and partner mobile shops, then create multiple device complaints under each party."
      actions={
        <Button className="rounded-xl" render={<Link href="/customers/new" />}>
          <Plus className="size-4" />
          Add party
        </Button>
      }
    >
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <CardTitle>Party directory</CardTitle>
            <CardDescription>
              Open a party to view all linked device complaints and register a new device against that party.
            </CardDescription>
          </div>
          <form className="relative w-full max-w-sm" action="/customers">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input name="q" className="pl-9" placeholder="Search by name, phone, or contact" defaultValue={params.q ?? ""} />
          </form>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Active complaints</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredParties.length ? (
                filteredParties.map((party) => (
                  <TableRow key={party.id}>
                    <TableCell>
                      <Badge variant={party.type === "SHOP" ? "default" : "secondary"}>
                        {party.type === "SHOP" ? "Shop" : "Individual"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/customers/${party.id}`} className="inline-flex items-center gap-2 hover:underline">
                        <Building2 className="size-4 text-muted-foreground" />
                        {party.name}
                      </Link>
                    </TableCell>
                    <TableCell>{party.phone}</TableCell>
                    <TableCell>{party.contactPerson ?? "Direct customer"}</TableCell>
                    <TableCell>{party.address ?? "Not added"}</TableCell>
                    <TableCell>{party._count?.complaints ?? 0}</TableCell>
                    <TableCell>{formatDate(party.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    No parties found for this search.
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
