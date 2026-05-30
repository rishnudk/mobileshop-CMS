import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { AppSettings, AuthUser, Complaint, Party, StaffUser } from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api/v1";
const SESSION_COOKIE = "mobileshop_token";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: {
    message?: string;
    details?: Record<string, string[]>;
  };
};

export class BackendError extends Error {
  details?: Record<string, string[]>;

  constructor(message: string, details?: Record<string, string[]>) {
    super(message);
    this.name = "BackendError";
    this.details = details;
  }
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success || payload.data === undefined) {
    throw new BackendError(payload.error?.message ?? "Request failed", payload.error?.details);
  }

  return payload.data;
}

export async function backendRequest<T>(
  path: string,
  init?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    token?: string | null;
  }
) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: init?.method ?? "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.token ? { Authorization: `Bearer ${init.token}` } : {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  return parseApiResponse<T>(response);
}

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value ?? null;
}

export async function setSessionToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  const token = await getSessionToken();
  if (!token) {
    return null;
  }

  try {
    return await backendRequest<AuthUser>("/auth/me", { token });
  } catch {
    return null;
  }
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function getParties() {
  const token = await getSessionToken();
  return backendRequest<Party[]>("/parties", { token });
}

export async function getPartyById(id: string) {
  const token = await getSessionToken();
  return backendRequest<Party>(`/parties/${id}`, { token });
}

export async function getComplaints() {
  const token = await getSessionToken();
  return backendRequest<Complaint[]>("/complaints", { token });
}

export async function getUsers() {
  const token = await getSessionToken();
  return backendRequest<StaffUser[]>("/users", { token });
}

export async function getSettings() {
  const token = await getSessionToken();
  return backendRequest<AppSettings>("/settings", { token });
}
