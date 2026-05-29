-- CreateEnum
CREATE TYPE "PartyType" AS ENUM ('INDIVIDUAL', 'SHOP');

-- CreateTable
CREATE TABLE "parties" (
    "id" TEXT NOT NULL,
    "type" "PartyType" NOT NULL DEFAULT 'INDIVIDUAL',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "alternate_phone" TEXT,
    "address" TEXT,
    "contact_person" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parties_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "complaints"
ADD COLUMN     "party_id" TEXT,
ADD COLUMN     "owner_name" TEXT,
ADD COLUMN     "owner_phone" TEXT,
ADD COLUMN     "device_color" TEXT,
ADD COLUMN     "accessories_received" TEXT,
ADD COLUMN     "device_condition" TEXT;

-- AddForeignKey
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_party_id_fkey" FOREIGN KEY ("party_id") REFERENCES "parties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
