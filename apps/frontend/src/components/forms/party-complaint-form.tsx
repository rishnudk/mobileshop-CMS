"use client";

import { useActionState } from "react";

import { createPartyComplaintAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: FormState = {};

export function PartyComplaintForm({
  partyId,
  partyName,
  partyType,
  partyPhone,
}: {
  partyId: string;
  partyName: string;
  partyType: string;
  partyPhone: string;
}) {
  const [state, formAction] = useActionState(createPartyComplaintAction, initialState);

  return (
    <form action={formAction} className="grid gap-5 md:grid-cols-2">
      <input type="hidden" name="partyId" value={partyId} />

      <div className="space-y-2">
        <Label htmlFor="party-name">Party</Label>
        <Input id="party-name" defaultValue={partyName} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="party-type">Party type</Label>
        <Input id="party-type" defaultValue={partyType} disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ownerName">Phone owner name</Label>
        <Input id="ownerName" name="ownerName" placeholder="Enter device owner's name" defaultValue={partyType === "INDIVIDUAL" ? partyName : ""} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ownerPhone">Phone owner number</Label>
        <Input id="ownerPhone" name="ownerPhone" placeholder="Enter device owner's phone number" defaultValue={partyType === "INDIVIDUAL" ? partyPhone : ""} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deviceBrand">Device brand</Label>
        <Input id="deviceBrand" name="deviceBrand" placeholder="Apple, Samsung, Xiaomi..." required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deviceModel">Device model</Label>
        <Input id="deviceModel" name="deviceModel" placeholder="iPhone 13, Galaxy S22..." required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deviceColor">Device color</Label>
        <Input id="deviceColor" name="deviceColor" placeholder="Black, Blue, Midnight..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="imei">IMEI</Label>
        <Input id="imei" name="imei" placeholder="Optional IMEI number" />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="issueDescription">Issue description</Label>
        <Textarea id="issueDescription" name="issueDescription" placeholder="Describe the reported issue" required />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="accessoriesReceived">Accessories received</Label>
        <Textarea id="accessoriesReceived" name="accessoriesReceived" placeholder="Charger, box, SIM tray, back cover..." />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="deviceCondition">Device condition</Label>
        <Textarea id="deviceCondition" name="deviceCondition" placeholder="Scratches, cracked back, water damage signs..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedCost">Estimated cost</Label>
        <Input id="estimatedCost" name="estimatedCost" type="number" min="0" placeholder="0" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="advancePaid">Advance paid</Label>
        <Input id="advancePaid" name="advancePaid" type="number" min="0" placeholder="0" />
      </div>

      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 md:col-span-2">
          {state.error}
        </div>
      ) : null}

      <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-dashed border-border/70 bg-muted/30 p-4 text-sm text-muted-foreground">
        <p>Each device is saved as a separate complaint under the same party account.</p>
        <FormSubmitButton pendingLabel="Saving complaint..." className="rounded-xl">
          Save complaint
        </FormSubmitButton>
      </div>
    </form>
  );
}
