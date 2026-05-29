"use client";

import { useActionState, useMemo, useState } from "react";

import { registerComplaintAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Party } from "@/lib/types";

const initialState: FormState = {};

export function RegisterComplaintForm({
  parties,
}: {
  parties: Party[];
}) {
  const [state, formAction] = useActionState(registerComplaintAction, initialState);
  const [partyMode, setPartyMode] = useState<"existing" | "new">(parties.length ? "existing" : "new");
  const [existingPartyId, setExistingPartyId] = useState(parties[0]?.id ?? "");
  const [newPartyType, setNewPartyType] = useState<"INDIVIDUAL" | "SHOP">("INDIVIDUAL");

  const selectedParty = useMemo(
    () => parties.find((party) => party.id === existingPartyId) ?? null,
    [existingPartyId, parties]
  );

  const selectedPartyType = partyMode === "existing" ? selectedParty?.type ?? "INDIVIDUAL" : newPartyType;
  const ownerHint =
    selectedPartyType === "SHOP"
      ? "For shop complaints, enter the final phone owner's details."
      : "For walk-in customers, you can leave these blank and we will use the customer details.";

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="partyMode" value={partyMode} />

      <section className="grid gap-5 rounded-3xl border border-border/70 bg-card/60 p-5 md:grid-cols-2">
        <div className="space-y-3 md:col-span-2">
          <h2 className="text-lg font-semibold">1. Choose Customer Or Shop</h2>
          <p className="text-sm text-muted-foreground">
            Use the same flow for a normal customer complaint or a reseller/mobile shop complaint.
          </p>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-border/70 p-4">
          <input
            type="radio"
            name="partyModeSelector"
            className="mt-1"
            checked={partyMode === "existing"}
            onChange={() => setPartyMode("existing")}
            disabled={!parties.length}
          />
          <span className="space-y-1">
            <span className="block font-medium">Existing party</span>
            <span className="block text-sm text-muted-foreground">Pick an existing customer or partner shop.</span>
          </span>
        </label>

        <label className="flex items-start gap-3 rounded-2xl border border-border/70 p-4">
          <input
            type="radio"
            name="partyModeSelector"
            className="mt-1"
            checked={partyMode === "new"}
            onChange={() => setPartyMode("new")}
          />
          <span className="space-y-1">
            <span className="block font-medium">New party</span>
            <span className="block text-sm text-muted-foreground">Create a new customer or shop and register the complaint immediately.</span>
          </span>
        </label>

        {partyMode === "existing" ? (
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="existingPartyId">Existing customer or shop</Label>
            <select
              id="existingPartyId"
              name="existingPartyId"
              value={existingPartyId}
              onChange={(event) => setExistingPartyId(event.target.value)}
              className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              required
            >
              {parties.map((party) => (
                <option key={party.id} value={party.id}>
                  {party.name} - {party.type === "SHOP" ? "Shop" : "Individual"} - {party.phone}
                </option>
              ))}
            </select>
            {!parties.length ? (
              <p className="text-sm text-amber-700">No parties exist yet, so this form will create a new one first.</p>
            ) : null}
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Label htmlFor="type">Party type</Label>
              <select
                id="type"
                name="type"
                value={newPartyType}
                onChange={(event) => setNewPartyType(event.target.value as "INDIVIDUAL" | "SHOP")}
                className="h-10 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="INDIVIDUAL">Individual customer</option>
                <option value="SHOP">Partner shop</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Party name</Label>
              <Input id="name" name="name" placeholder="Customer or shop name" required={partyMode === "new"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Primary phone</Label>
              <Input id="phone" name="phone" placeholder="Primary phone number" required={partyMode === "new"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alternatePhone">Alternate phone</Label>
              <Input id="alternatePhone" name="alternatePhone" placeholder="Optional alternate phone" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact person</Label>
              <Input id="contactPerson" name="contactPerson" placeholder="Useful for shop accounts" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" placeholder="Address or locality" />
            </div>
          </>
        )}
      </section>

      <section className="grid gap-5 rounded-3xl border border-border/70 bg-card/60 p-5 md:grid-cols-2">
        <div className="space-y-3 md:col-span-2">
          <h2 className="text-lg font-semibold">2. Phone Owner Details</h2>
          <p className="text-sm text-muted-foreground">{ownerHint}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="ownerName">Phone owner name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            placeholder={selectedPartyType === "SHOP" ? "End customer name" : "Leave blank to use party name"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ownerPhone">Phone owner phone</Label>
          <Input
            id="ownerPhone"
            name="ownerPhone"
            placeholder={selectedPartyType === "SHOP" ? "End customer phone number" : "Leave blank to use party phone"}
          />
        </div>
      </section>

      <section className="grid gap-5 rounded-3xl border border-border/70 bg-card/60 p-5 md:grid-cols-2">
        <div className="space-y-3 md:col-span-2">
          <h2 className="text-lg font-semibold">3. Device Complaint</h2>
          <p className="text-sm text-muted-foreground">Each phone must be saved as its own complaint record.</p>
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
      </section>

      {state.error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.error}
        </div>
      ) : null}

      <div className="flex items-center justify-between rounded-3xl border border-dashed border-border/70 bg-muted/30 p-5 text-sm text-muted-foreground">
        <p>
          One button now handles both normal customer complaints and partner shop complaints by choosing or creating the party inline.
        </p>
        <FormSubmitButton pendingLabel="Registering complaint..." className="rounded-xl">
          Register complaint
        </FormSubmitButton>
      </div>
    </form>
  );
}
