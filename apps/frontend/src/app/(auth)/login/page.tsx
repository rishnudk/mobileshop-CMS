import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/backend";

const highlights = [
  "Track incoming repair complaints from one shared workspace.",
  "Give admins and staff a clean, role-based dashboard experience.",
  "Prepare the frontend for complaint workflows, search, and staffing modules.",
];

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

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
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                City Mobile
              </h1>
              <p className="max-w-lg text-lg leading-relaxed text-slate-600 sm:text-xl">
                Manage your shop&apos;s repair workflows, track customer complaints, and oversee staff operations from a single unified dashboard.
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
              <LoginForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
