import { BellRing, Settings2 } from "lucide-react";

import { SettingsForm } from "@/components/forms/settings-form";
import { PageShell } from "@/components/dashboard/page-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettings, requireCurrentUser } from "@/lib/backend";

export default async function SettingsPage() {
  const [currentUser, settings] = await Promise.all([requireCurrentUser(), getSettings()]);

  return (
    <PageShell
      title="Settings"
      description="Manage live shop profile, complaint numbering, and notification preferences."
      actions={
        <div className="rounded-2xl border border-border/70 bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
          {currentUser.role === "ADMIN" ? "Admin can edit settings" : "Read-only for non-admin staff"}
        </div>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="size-5" />
              Shop settings
            </CardTitle>
            <CardDescription>These settings affect the whole CMS for staff, complaints, and notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            {currentUser.role === "ADMIN" ? (
              <SettingsForm settings={settings} />
            ) : (
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Shop name:</span> {settings.shopName}</p>
                <p><span className="font-medium">Phone:</span> {settings.shopPhone}</p>
                <p><span className="font-medium">Address:</span> {settings.shopAddress}</p>
                <p><span className="font-medium">Complaint prefix:</span> {settings.complaintPrefix}</p>
                <p><span className="font-medium">Currency:</span> {settings.defaultCurrency}</p>
                <p><span className="font-medium">WhatsApp notifications:</span> {settings.enableWhatsappNotifications ? "Enabled" : "Disabled"}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/70 bg-slate-950 text-slate-50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-50">
              <BellRing className="size-5" />
              How settings affect operations
            </CardTitle>
            <CardDescription className="text-slate-300">
              These values are global and should usually be updated only by an admin.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-slate-300">
            <p>`Complaint prefix` controls how complaint IDs start, like `CMP-2001`.</p>
            <p>`Shop profile` is the business information staff should use consistently during intake and follow-up.</p>
            <p>`WhatsApp notifications` enables the mock ready-for-collection preview until the Meta API is connected.</p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
