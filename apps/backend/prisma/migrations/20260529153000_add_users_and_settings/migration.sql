-- AlterTable
ALTER TABLE "users"
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "app_settings" (
    "id" TEXT NOT NULL,
    "shop_name" TEXT NOT NULL,
    "shop_phone" TEXT NOT NULL,
    "shop_address" TEXT NOT NULL,
    "complaint_prefix" TEXT NOT NULL DEFAULT 'CMP',
    "default_currency" TEXT NOT NULL DEFAULT 'INR',
    "enable_whatsapp_notifications" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_settings_pkey" PRIMARY KEY ("id")
);
