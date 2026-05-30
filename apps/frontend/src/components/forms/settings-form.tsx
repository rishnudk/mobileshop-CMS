"use client";

import { useActionState } from "react";

import { updateSettingsAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AppSettings } from "@/lib/types";

const initialState: FormState = {};

export function SettingsForm({ settings }: { settings: AppSettings }) {
  const [state, formAction] = useActionState(updateSettingsAction, initialState);

  return (
    <form action={formAction} className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="shopName">Shop name</Label>
        <Input id="shopName" name="shopName" defaultValue={settings.shopName} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="shopPhone">Shop phone</Label>
        <Input id="shopPhone" name="shopPhone" defaultValue={settings.shopPhone} required />
      </div>
      <div className="space-y-2 lg:col-span-2">
        <Label htmlFor="shopAddress">Shop address</Label>
        <Input id="shopAddress" name="shopAddress" defaultValue={settings.shopAddress} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="complaintPrefix">Complaint prefix</Label>
        <Input id="complaintPrefix" name="complaintPrefix" defaultValue={settings.complaintPrefix} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="defaultCurrency">Default currency</Label>
        <Input id="defaultCurrency" name="defaultCurrency" defaultValue={settings.defaultCurrency} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="enableWhatsappNotifications">WhatsApp notifications</Label>
        <select
          id="enableWhatsappNotifications"
          name="enableWhatsappNotifications"
          defaultValue={settings.enableWhatsappNotifications ? "true" : "false"}
          className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="false">Disabled</option>
          <option value="true">Enabled</option>
        </select>
      </div>
      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 lg:col-span-2">
          {state.error}
        </div>
      ) : null}
      {state.success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 lg:col-span-2">
          {state.success}
        </div>
      ) : null}
      <div className="lg:col-span-2 flex justify-end">
        <FormSubmitButton pendingLabel="Saving settings..." className="rounded-xl">
          Save settings
        </FormSubmitButton>
      </div>
    </form>
  );
}
