"use client";

import { useActionState } from "react";

import { updateComplaintStatusAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { formatComplaintStatus } from "@/lib/format";
import type { Complaint } from "@/lib/types";

const initialState: FormState = {};

const statusOptions: Complaint["status"][] = [
  "PENDING",
  "DIAGNOSING",
  "REPAIRING",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

export function UpdateComplaintStatusForm({
  complaintId,
  status,
}: {
  complaintId: string;
  status: Complaint["status"];
}) {
  const [state, formAction] = useActionState(updateComplaintStatusAction, initialState);

  return (
    <form action={formAction} className="grid min-w-56 gap-2">
      <input type="hidden" name="complaintId" value={complaintId} />
      <div className="flex items-center gap-2">
        <select
          name="status"
          defaultValue={status}
          className="h-9 min-w-36 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {formatComplaintStatus(option)}
            </option>
          ))}
        </select>
        <FormSubmitButton pendingLabel="Saving..." className="rounded-xl">
          Save
        </FormSubmitButton>
      </div>
      {state.error ? <span className="text-xs text-rose-600">{state.error}</span> : null}
      {state.success ? <span className="max-w-80 text-xs leading-5 text-emerald-700">{state.success}</span> : null}
    </form>
  );
}
