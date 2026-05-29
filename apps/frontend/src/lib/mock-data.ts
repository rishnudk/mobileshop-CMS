export type OverviewMetric = {
  title: string;
  value: string;
  change: string;
  detail: string;
};

export type ComplaintItem = {
  id: string;
  customer: string;
  device: string;
  issue: string;
  status: "Pending" | "In Progress" | "Waiting Parts" | "Completed";
  assignedTo: string;
  createdAt: string;
};

export type CustomerItem = {
  name: string;
  phone: string;
  city: string;
  activeComplaints: number;
  lastVisit: string;
};

export type PartyItem = {
  id: string;
  type: "Individual" | "Shop";
  name: string;
  phone: string;
  contactPerson?: string;
  city: string;
  activeComplaints: number;
  outstanding: string;
  lastVisit: string;
};

export type PartyComplaintItem = {
  id: string;
  ownerName: string;
  ownerPhone: string;
  device: string;
  issue: string;
  status: "Pending" | "In Progress" | "Waiting Parts" | "Completed";
  advancePaid: string;
  estimatedCost: string;
  createdAt: string;
};

export type StaffItem = {
  name: string;
  role: string;
  shift: string;
  openJobs: number;
  status: "Available" | "Busy" | "Off Duty";
};

export type SettingsSection = {
  title: string;
  description: string;
  items: string[];
};

export const overviewMetrics: OverviewMetric[] = [
  {
    title: "Open complaints",
    value: "128",
    change: "+12 this week",
    detail: "All unresolved devices currently in the repair pipeline.",
  },
  {
    title: "Devices in progress",
    value: "43",
    change: "+8 today",
    detail: "Repairs actively assigned to technicians across the workshop.",
  },
  {
    title: "Customers served",
    value: "1,284",
    change: "+19 this month",
    detail: "Returning and new customers handled by the front desk team.",
  },
  {
    title: "Staff on shift",
    value: "9",
    change: "2 admins, 7 technicians",
    detail: "Current team availability based on today’s roster.",
  },
];

export const recentComplaints: ComplaintItem[] = [
  {
    id: "CMP-1025",
    customer: "Rahul Sharma",
    device: "iPhone 13",
    issue: "Display flicker after screen replacement",
    status: "In Progress",
    assignedTo: "Arjun Patel",
    createdAt: "Today, 10:15 AM",
  },
  {
    id: "CMP-1024",
    customer: "Nisha Verma",
    device: "Samsung S22",
    issue: "Battery drains within 2 hours",
    status: "Waiting Parts",
    assignedTo: "Kiran Das",
    createdAt: "Today, 09:10 AM",
  },
  {
    id: "CMP-1023",
    customer: "Amit Joshi",
    device: "OnePlus 11R",
    issue: "Charging port loose connection",
    status: "Pending",
    assignedTo: "Unassigned",
    createdAt: "Yesterday, 06:40 PM",
  },
  {
    id: "CMP-1022",
    customer: "Sana Ali",
    device: "Redmi Note 12",
    issue: "Camera not focusing",
    status: "Completed",
    assignedTo: "Deepak Singh",
    createdAt: "Yesterday, 04:25 PM",
  },
];

export const customers: CustomerItem[] = [
  {
    name: "Priya Nair",
    phone: "+91 98765 21034",
    city: "Bengaluru",
    activeComplaints: 1,
    lastVisit: "May 27, 2026",
  },
  {
    name: "Vikram Mehta",
    phone: "+91 98989 41234",
    city: "Hyderabad",
    activeComplaints: 2,
    lastVisit: "May 25, 2026",
  },
  {
    name: "Fatima Khan",
    phone: "+91 98220 56789",
    city: "Chennai",
    activeComplaints: 0,
    lastVisit: "May 19, 2026",
  },
];

export const parties: PartyItem[] = [
  {
    id: "party-priya-nair",
    type: "Individual",
    name: "Priya Nair",
    phone: "+91 98765 21034",
    city: "Bengaluru",
    activeComplaints: 1,
    outstanding: "Rs. 3,500",
    lastVisit: "May 27, 2026",
  },
  {
    id: "party-star-mobile-care",
    type: "Shop",
    name: "Star Mobile Care",
    phone: "+91 98111 22233",
    contactPerson: "Rakesh",
    city: "Hyderabad",
    activeComplaints: 2,
    outstanding: "Rs. 8,400",
    lastVisit: "May 28, 2026",
  },
  {
    id: "party-fast-fix-mobiles",
    type: "Shop",
    name: "Fast Fix Mobiles",
    phone: "+91 98220 56789",
    contactPerson: "Fatima",
    city: "Chennai",
    activeComplaints: 0,
    outstanding: "Rs. 0",
    lastVisit: "May 19, 2026",
  },
];

export const partyComplaints: Record<string, PartyComplaintItem[]> = {
  "party-priya-nair": [
    {
      id: "CMP-2001",
      ownerName: "Priya Nair",
      ownerPhone: "+91 98765 21034",
      device: "iPhone 13 - Midnight",
      issue: "Display flicker after accidental drop",
      status: "In Progress",
      advancePaid: "Rs. 1,000",
      estimatedCost: "Rs. 4,500",
      createdAt: "Today, 10:15 AM",
    },
  ],
  "party-star-mobile-care": [
    {
      id: "CMP-2002",
      ownerName: "Anil Kumar",
      ownerPhone: "+91 99123 45678",
      device: "Samsung Galaxy S22 - Black",
      issue: "Battery drains within 2 hours",
      status: "Waiting Parts",
      advancePaid: "Rs. 0",
      estimatedCost: "Rs. 2,800",
      createdAt: "Today, 09:10 AM",
    },
    {
      id: "CMP-2003",
      ownerName: "Megha Reddy",
      ownerPhone: "+91 99490 11223",
      device: "OnePlus 11R - Blue",
      issue: "Charging port loose connection",
      status: "Pending",
      advancePaid: "Rs. 500",
      estimatedCost: "Rs. 1,800",
      createdAt: "Yesterday, 06:40 PM",
    },
  ],
  "party-fast-fix-mobiles": [],
};

export const staffMembers: StaffItem[] = [
  {
    name: "Aarav Menon",
    role: "Admin",
    shift: "09:00 AM - 06:00 PM",
    openJobs: 0,
    status: "Available",
  },
  {
    name: "Arjun Patel",
    role: "Senior Technician",
    shift: "10:00 AM - 07:00 PM",
    openJobs: 6,
    status: "Busy",
  },
  {
    name: "Kiran Das",
    role: "Technician",
    shift: "11:00 AM - 08:00 PM",
    openJobs: 4,
    status: "Available",
  },
  {
    name: "Deepak Singh",
    role: "Technician",
    shift: "Off",
    openJobs: 0,
    status: "Off Duty",
  },
];

export const settingsSections: SettingsSection[] = [
  {
    title: "Shop profile",
    description: "Store branch information, GST data, and contact details for printed receipts.",
    items: ["Business name", "Primary phone", "Support WhatsApp", "Address"],
  },
  {
    title: "Staff permissions",
    description: "Prepare role-based access control for admins, front desk staff, and technicians.",
    items: ["Role presets", "Route guards", "Action restrictions", "Audit visibility"],
  },
  {
    title: "Notification readiness",
    description: "Keep the UI ready for future WhatsApp Cloud API integration from the backend roadmap.",
    items: ["Template mapping", "Status reminders", "Pickup alerts", "Delivery confirmation"],
  },
];
