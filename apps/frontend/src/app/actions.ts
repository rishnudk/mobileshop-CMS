"use server";

import { redirect } from "next/navigation";

import { backendRequest, getSessionToken, setSessionToken } from "@/lib/backend";
import { BackendError } from "@/lib/backend";
import type { Party } from "@/lib/types";

export type FormState = {
  error?: string;
};

type PartyMode = "existing" | "new";

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

  let partyId = "";

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

    partyId = party.id;
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to create the party." };
  }

  redirect(`/customers/${partyId}`);
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

export async function registerComplaintAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  const partyMode = (getString(formData, "partyMode") || "existing") as PartyMode;
  let partyId = "";

  try {
    let party: Party;

    if (partyMode === "existing") {
      const partyId = getString(formData, "existingPartyId");
      if (!partyId) {
        return { error: "Please select an existing customer or shop." };
      }

      party = await backendRequest<Party>(`/parties/${partyId}`, { token });
    } else {
      party = await backendRequest<Party>("/parties", {
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
    }

    partyId = party.id;

    const ownerName = getString(formData, "ownerName") || (party.type === "INDIVIDUAL" ? party.name : "");
    const ownerPhone = getString(formData, "ownerPhone") || (party.type === "INDIVIDUAL" ? party.phone : "");

    if (!ownerName || !ownerPhone) {
      return {
        error: "Owner name and owner phone are required, especially for partner shop complaints.",
      };
    }

    await backendRequest(`/complaints/party/${party.id}`, {
      method: "POST",
      token,
      body: {
        ownerName,
        ownerPhone,
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

    return { error: "Unable to register the complaint." };
  }

  redirect(`/customers/${partyId}`);
}
