import { ArrowRight, ShieldCheck } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const highlights = [
  "Track incoming repair complaints from one shared workspace.",
  "Give admins and staff a clean, role-based dashboard experience.",
  "Prepare the frontend for complaint workflows, search, and staffing modules.",
];

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_35%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)]">
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(135deg,_rgba(15,23,42,0.12),_transparent)]" />
      <div className="relative mx-auto grid w-full max-w-7xl flex-1 gap-10 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-14">
        <section className="flex flex-col justify-between rounded-[2rem] border border-white/70 bg-white/70 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:p-12">
          <div className="space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
              <ShieldCheck className="size-4 text-slate-900" />
              Internal staff access only
            </div>
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Mobile Repair Shop CMS
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 lg:text-6xl">
                Run repairs, complaints, and staff operations from one dashboard.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Built on the implementation plan’s modular foundation so this admin surface can grow into complaint workflows, customer management, and future business modules.
              </p>
            </div>
          </div>
          <div className="grid gap-4 pt-10 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-sm leading-6 text-slate-600"
              >
                {highlight}
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <Card className="w-full max-w-md border-white/70 bg-white/85 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-2xl font-semibold text-slate-950">Sign in</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">
                Use the admin or staff credentials provisioned in the backend database.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@mobileshopcms.com"
                    defaultValue="admin@mobileshopcms.com"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <span className="text-xs text-slate-500">JWT login ready</span>
                  </div>
                  <Input id="password" type="password" placeholder="Enter your password" defaultValue="admin123" />
                </div>
                <Button
                  render={<a href="/dashboard" />}
                  className={cn(buttonVariants(), "h-11 w-full rounded-xl text-sm font-medium")}
                >
                  Continue to dashboard
                  <ArrowRight className="size-4" />
                </Button>
              </form>
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
                Frontend-only scaffold for now. The screen is ready to connect to the planned `/api/v1/auth/login` backend flow.
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
