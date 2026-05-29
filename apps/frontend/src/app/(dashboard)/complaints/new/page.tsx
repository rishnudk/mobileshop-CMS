import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RegisterComplaintForm } from "@/components/forms/register-complaint-form";
import { PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getParties } from "@/lib/backend";

export default async function NewComplaintPage() {
  const parties = await getParties();

  return (
    <PageShell
      title="Register Complaint"
      description="Create a walk-in customer complaint or a partner shop complaint from one unified intake flow."
      actions={
        <Button variant="outline" className="rounded-xl" render={<Link href="/complaints" />}>
          <ArrowLeft className="size-4" />
          Back to complaints
        </Button>
      }
    >
      <Card className="rounded-3xl border-border/70 shadow-sm">
        <CardHeader>
          <CardTitle>Complaint registration</CardTitle>
          <CardDescription>
            Choose an existing party or create a new one, then register the device complaint in the same form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterComplaintForm parties={parties} />
        </CardContent>
      </Card>
    </PageShell>
  );
}
