export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
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
