"use server";

import { redirect } from "next/navigation";

import { backendRequest, getSessionToken, setSessionToken } from "@/lib/backend";
import { BackendError } from "@/lib/backend";

export type FormState = {
  error?: string;
};

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getNumber(formData: FormData, key: string) {
  const raw = String(formData.get(key) ?? "").trim();
  if (!raw) {
    return 0;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

export async function loginAction(_: FormState, formData: FormData): Promise<FormState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  try {
    const result = await backendRequest<{
      token: string;
      user: {
        id: string;
        name: string;
        email: string;
        role: string;
      };
    }>("/auth/login", {
      method: "POST",
      body: { email, password },
    });

    await setSessionToken(result.token);
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to sign in right now." };
  }

  redirect("/dashboard");
}

export async function createPartyAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  try {
    const party = await backendRequest<{ id: string }>("/parties", {
      method: "POST",
      token,
      body: {
        type: getString(formData, "type") || "INDIVIDUAL",
        name: getString(formData, "name"),
        phone: getString(formData, "phone"),
        alternatePhone: getOptionalString(formData, "alternatePhone"),
        address: getOptionalString(formData, "address"),
        contactPerson: getOptionalString(formData, "contactPerson"),
      },
    });

    redirect(`/customers/${party.id}`);
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to create the party." };
  }
}

export async function createPartyComplaintAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  const partyId = getString(formData, "partyId");
  if (!partyId) {
    return { error: "Missing party ID." };
  }

  try {
    await backendRequest(`/complaints/party/${partyId}`, {
      method: "POST",
      token,
      body: {
        ownerName: getString(formData, "ownerName"),
        ownerPhone: getString(formData, "ownerPhone"),
        deviceBrand: getString(formData, "deviceBrand"),
        deviceModel: getString(formData, "deviceModel"),
        deviceColor: getOptionalString(formData, "deviceColor"),
        imei: getOptionalString(formData, "imei"),
        issueDescription: getString(formData, "issueDescription"),
        accessoriesReceived: getOptionalString(formData, "accessoriesReceived"),
        deviceCondition: getOptionalString(formData, "deviceCondition"),
        estimatedCost: getNumber(formData, "estimatedCost"),
        advancePaid: getNumber(formData, "advancePaid"),
      },
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to create the complaint." };
  }

  redirect(`/customers/${partyId}`);
}
