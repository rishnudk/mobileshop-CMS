"use client";

import { useActionState } from "react";

import { createPartyAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: FormState = {};

export function PartyForm() {
  const [state, formAction] = useActionState(createPartyAction, initialState);

  return (
    <form action={formAction} className="grid gap-5 md:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="type">Party type</Label>
        <select
          id="type"
          name="type"
          defaultValue="INDIVIDUAL"
          className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="INDIVIDUAL">Individual customer</option>
          <option value="SHOP">Partner shop</option>
        </select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Party name</Label>
        <Input id="name" name="name" placeholder="Customer or shop name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Primary phone</Label>
        <Input id="phone" name="phone" placeholder="Primary phone number" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="alternatePhone">Alternate phone</Label>
        <Input id="alternatePhone" name="alternatePhone" placeholder="Optional alternate phone" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPerson">Contact person</Label>
        <Input id="contactPerson" name="contactPerson" placeholder="Required for shop accounts" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" placeholder="Address or locality" />
      </div>
      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 md:col-span-2">
          {state.error}
        </div>
      ) : null}
      <div className="md:col-span-2 flex justify-end">
        <FormSubmitButton pendingLabel="Saving party..." className="rounded-xl">
          Save party
        </FormSubmitButton>
      </div>
    </form>
  );
}
