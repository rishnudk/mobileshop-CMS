import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PartyForm } from "@/components/forms/party-form";
import { PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewPartyPage() {
  return (
    <PageShell
      title="Add party"
      description="Create a direct customer or partner shop account before registering complaints under it."
      actions={
        <Button variant="outline" className="rounded-xl" render={<Link href="/customers" />}>
          <ArrowLeft className="size-4" />
          Back to parties
        </Button>
      }
    >
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>Party details</CardTitle>
          <CardDescription>
            Partner shops can send multiple devices over time, while individual customers can also hold multiple complaints.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PartyForm />
        </CardContent>
      </Card>
    </PageShell>
  );
}
