export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string | null;
  isActive?: boolean;
  createdAt?: string;
};

export type AssignedTechnician = {
  id: string;
  name: string;
  role: string;
};

export type Complaint = {
  id: string;
  complaintId: string;
  partyId: string | null;
  customerName: string;
  customerPhone: string;
  ownerName: string | null;
  ownerPhone: string | null;
  deviceBrand: string;
  deviceModel: string;
  deviceColor: string | null;
  imei: string | null;
  issueDescription: string;
  accessoriesReceived: string | null;
  deviceCondition: string | null;
  status: "PENDING" | "DIAGNOSING" | "REPAIRING" | "READY" | "DELIVERED" | "CANCELLED";
  estimatedCost: number;
  advancePaid: number;
  createdAt: string;
  updatedAt: string;
  assignedTechnician?: AssignedTechnician | null;
  party?: PartySummary | null;
};

export type WhatsappNotificationPreview = {
  channel: "whatsapp";
  mode: "mock";
  status: "sent" | "skipped";
  templateName: "device_ready_collection";
  recipientPhone: string;
  message: string;
  reason?: string;
};

export type ComplaintStatusUpdateResult = {
  complaint: Complaint;
  notification: WhatsappNotificationPreview | null;
};

export type PartySummary = {
  id: string;
  type: "INDIVIDUAL" | "SHOP";
  name: string;
  phone: string;
  alternatePhone: string | null;
  address: string | null;
  contactPerson: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Party = PartySummary & {
  complaints?: Complaint[];
  _count?: {
    complaints: number;
  };
};

export type StaffUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF" | "TECHNICIAN";
  phone: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    complaints: number;
  };
};

export type AppSettings = {
  id: string;
  shopName: string;
  shopPhone: string;
  shopAddress: string;
  complaintPrefix: string;
  defaultCurrency: string;
  enableWhatsappNotifications: boolean;
  createdAt: string;
  updatedAt: string;
};
