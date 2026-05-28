import { BellRing, Save } from "lucide-react";

import { PageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { settingsSections } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <PageShell
      title="Settings"
      description="Configuration surface prepared for profile details, permissions, and future notification wiring."
      actions={
        <Button className="rounded-xl">
          <Save className="size-4" />
          Save changes
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {settingsSections.map((section) => (
          <Card key={section.title} className="rounded-3xl border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.items.map((item) => (
                <div key={item} className="rounded-2xl border border-border/70 bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-3xl border-border/70 bg-slate-950 text-slate-50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-50">
            <BellRing className="size-5" />
            Notification roadmap
          </CardTitle>
          <CardDescription className="text-slate-300">
            WhatsApp Cloud API is planned for a later phase and this screen leaves room for that configuration.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-slate-300">
          When backend modules are ready, we can connect reminder templates, status messages, and pickup notifications without redesigning the settings surface.
        </CardContent>
      </Card>
    </PageShell>
  );
}
