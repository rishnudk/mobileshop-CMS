"use client";

import { useActionState } from "react";

import { deleteUserAction, type FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";

const initialState: FormState = {};

export function DeleteUserForm({ userId }: { userId: string }) {
  const [state, formAction] = useActionState(deleteUserAction, initialState);

  return (
    <form action={formAction} className="inline-flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <Button type="submit" variant="destructive" className="rounded-xl">
        Delete
      </Button>
      {state.error ? <span className="text-xs text-rose-600">{state.error}</span> : null}
    </form>
  );
}
