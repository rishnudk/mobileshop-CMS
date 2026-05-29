import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PartyComplaintForm } from "@/components/forms/party-complaint-form";
import { PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPartyById } from "@/lib/backend";

export default async function NewPartyComplaintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const party = await getPartyById(id);

    return (
      <PageShell
        title="Add device complaint"
        description={`Create a new complaint under ${party.name}. This keeps the party account fixed while each device gets its own job record.`}
        actions={
          <Button variant="outline" className="rounded-xl" render={<Link href={`/customers/${party.id}`} />}>
            <ArrowLeft className="size-4" />
            Back to party
          </Button>
        }
      >
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Complaint intake form</CardTitle>
            <CardDescription>
              Save a new device complaint directly under this party account using the live backend API.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PartyComplaintForm
              partyId={party.id}
              partyName={party.name}
              partyType={party.type}
              partyPhone={party.phone}
            />
          </CardContent>
        </Card>
      </PageShell>
    );
  } catch {
    notFound();
  }
}
