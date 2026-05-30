"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { backendRequest, getSessionToken, setSessionToken } from "@/lib/backend";
import { BackendError } from "@/lib/backend";
import type { ComplaintStatusUpdateResult, Party } from "@/lib/types";

export type FormState = {
  error?: string;
  success?: string;
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

  revalidatePath("/", "layout");
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

export async function createUserAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  try {
    await backendRequest("/users", {
      method: "POST",
      token,
      body: {
        name: getString(formData, "name"),
        email: getString(formData, "email"),
        password: getString(formData, "password"),
        role: getString(formData, "role") || "STAFF",
        phone: getOptionalString(formData, "phone"),
        isActive: getString(formData, "isActive") !== "false",
      },
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to create the staff account." };
  }

  return { success: "Staff account created successfully." };
}

export async function deleteUserAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  const userId = getString(formData, "userId");
  if (!userId) {
    return { error: "Missing user ID." };
  }

  try {
    await backendRequest(`/users/${userId}`, {
      method: "DELETE",
      token,
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to delete the user." };
  }

  return { success: "User deleted successfully." };
}

export async function updateSettingsAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  try {
    await backendRequest("/settings", {
      method: "PUT",
      token,
      body: {
        shopName: getString(formData, "shopName"),
        shopPhone: getString(formData, "shopPhone"),
        shopAddress: getString(formData, "shopAddress"),
        complaintPrefix: getString(formData, "complaintPrefix"),
        defaultCurrency: getString(formData, "defaultCurrency"),
        enableWhatsappNotifications: getString(formData, "enableWhatsappNotifications") === "true",
      },
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to update settings." };
  }

  return { success: "Settings updated successfully." };
}

export async function assignTechnicianAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  const complaintId = getString(formData, "complaintId");
  if (!complaintId) {
    return { error: "Missing complaint ID." };
  }

  try {
    await backendRequest(`/complaints/${complaintId}/assign`, {
      method: "PATCH",
      token,
      body: {
        assignedTechnicianId: getOptionalString(formData, "assignedTechnicianId"),
      },
    });
    revalidatePath("/complaints");
    revalidatePath("/dashboard");
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to assign technician." };
  }

  return { success: "Technician assignment updated." };
}

export async function updateComplaintStatusAction(_: FormState, formData: FormData): Promise<FormState> {
  const token = await getSessionToken();
  if (!token) {
    redirect("/login");
  }

  const complaintId = getString(formData, "complaintId");
  const status = getString(formData, "status");
  if (!complaintId || !status) {
    return { error: "Complaint and status are required." };
  }

  try {
    const result = await backendRequest<ComplaintStatusUpdateResult>(`/complaints/${complaintId}/status`, {
      method: "PATCH",
      token,
      body: {
        status,
      },
    });

    revalidatePath("/complaints");
    revalidatePath("/dashboard");

    if (result.notification?.status === "sent") {
      return {
        success: `Status updated. Mock WhatsApp to ${result.notification.recipientPhone}: ${result.notification.message}`,
      };
    }

    if (result.notification?.status === "skipped") {
      return {
        success: `Status updated. WhatsApp mock skipped: ${result.notification.reason ?? "not sent"}`,
      };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }

    return { error: "Unable to update complaint status." };
  }

  return { success: "Complaint status updated." };
}
