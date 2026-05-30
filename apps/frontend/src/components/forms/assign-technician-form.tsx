"use client";

import { useActionState } from "react";

import { assignTechnicianAction, type FormState } from "@/app/actions";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import type { StaffUser } from "@/lib/types";

const initialState: FormState = {};

export function AssignTechnicianForm({
  complaintId,
  assignedTechnicianId,
  technicians,
}: {
  complaintId: string;
  assignedTechnicianId: string | null | undefined;
  technicians: StaffUser[];
}) {
  const [state, formAction] = useActionState(assignTechnicianAction, initialState);

  return (
    <form action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="complaintId" value={complaintId} />
      <select
        name="assignedTechnicianId"
        defaultValue={assignedTechnicianId ?? ""}
        className="h-9 min-w-44 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <option value="">Unassigned</option>
        {technicians.map((technician) => (
          <option key={technician.id} value={technician.id}>
            {technician.name}
          </option>
        ))}
      </select>
      <FormSubmitButton pendingLabel="Saving..." className="rounded-xl">
        Save
      </FormSubmitButton>
      {state.error ? <span className="text-xs text-rose-600">{state.error}</span> : null}
      {state.success ? <span className="text-xs text-emerald-700">{state.success}</span> : null}
    </form>
  );
}
