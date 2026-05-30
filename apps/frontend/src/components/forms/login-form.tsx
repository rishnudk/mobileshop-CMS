"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";

import { loginAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: FormState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-slate-700">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@mobileshop.com"
          defaultValue="admin@mobileshop.com"
          required
          className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 shadow-sm focus-visible:ring-primary"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-slate-700">Password</Label>
        </div>
        <Input 
          id="password" 
          name="password" 
          type="password" 
          placeholder="Enter your password" 
          defaultValue="admin123" 
          required 
          className="bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 shadow-sm focus-visible:ring-primary"
        />
      </div>
      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </div>
      ) : null}
      <FormSubmitButton pendingLabel="Signing in..." className="h-11 w-full rounded-xl text-sm font-medium">
        Continue to dashboard
        <ArrowRight className="size-4" />
      </FormSubmitButton>
    </form>
  );
}
