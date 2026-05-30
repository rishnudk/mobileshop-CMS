import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

// Configure WebSocket for Node.js (required by @neondatabase/serverless)
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { neonConfig } = require("@neondatabase/serverless");
// eslint-disable-next-line @typescript-eslint/no-require-imports
neonConfig.webSocketConstructor = require("ws");

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });


async function main() {
  console.log("Seeding database...");

  await prisma.complaintLog.deleteMany();
  await prisma.complaint.deleteMany();
  await prisma.party.deleteMany();
  await prisma.appSettings.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Shop Admin",
      email: "admin@mobileshop.com",
      password: hashedPassword,
      role: "ADMIN",
      phone: "+919876543210",
    },
  });

  await prisma.user.create({
    data: {
      name: "Front Desk Staff",
      email: "staff@mobileshop.com",
      password: hashedPassword,
      role: "STAFF",
      phone: "+919812340001",
    },
  });

  await prisma.user.create({
    data: {
      name: "Repair Technician",
      email: "tech@mobileshop.com",
      password: hashedPassword,
      role: "TECHNICIAN",
      phone: "+919812340002",
    },
  });

  await prisma.appSettings.create({
    data: {
      shopName: "MobileShop CMS",
      shopPhone: "+919876543210",
      shopAddress: "Main Market Road, Bengaluru",
      complaintPrefix: "CMP",
      defaultCurrency: "INR",
      enableWhatsappNotifications: false,
    },
  });

  const retailCustomer = await prisma.party.create({
    data: {
      type: "INDIVIDUAL",
      name: "Priya Nair",
      phone: "+919876521034",
      address: "Indiranagar, Bengaluru",
    },
  });

  const partnerShop = await prisma.party.create({
    data: {
      type: "SHOP",
      name: "Star Mobile Care",
      phone: "+919811122233",
      contactPerson: "Rakesh",
      address: "Ameerpet, Hyderabad",
    },
  });

  await prisma.complaint.createMany({
    data: [
      {
        complaintId: "CMP-2001",
        partyId: retailCustomer.id,
        customerName: retailCustomer.name,
        customerPhone: retailCustomer.phone,
        ownerName: retailCustomer.name,
        ownerPhone: retailCustomer.phone,
        deviceBrand: "Apple",
        deviceModel: "iPhone 13",
        deviceColor: "Midnight",
        imei: "356789012345678",
        issueDescription: "Display flicker after accidental drop",
        accessoriesReceived: "Phone only",
        deviceCondition: "Minor scratches on frame",
        estimatedCost: 4500,
        advancePaid: 1000,
      },
      {
        complaintId: "CMP-2002",
        partyId: partnerShop.id,
        customerName: "Anil Kumar",
        customerPhone: "+919912345678",
        ownerName: "Anil Kumar",
        ownerPhone: "+919912345678",
        deviceBrand: "Samsung",
        deviceModel: "Galaxy S22",
        deviceColor: "Black",
        imei: "490154203237518",
        issueDescription: "Battery drains quickly and heats up",
        accessoriesReceived: "Phone with back cover",
        deviceCondition: "Back panel slightly cracked",
        estimatedCost: 2800,
        advancePaid: 0,
      },
    ],
  });

  console.log("Database seeded successfully!");
  console.log(`Admin User: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
