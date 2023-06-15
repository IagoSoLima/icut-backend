/*
  Warnings:

  - Made the column `avatar_image` on table `Users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Establishments" ALTER COLUMN "establishment_logo" SET DEFAULT 'https://icut-bucket.s3.sa-east-1.amazonaws.com/public/default-barber-shop.jpg';

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "avatar_image" SET NOT NULL,
ALTER COLUMN "avatar_image" SET DEFAULT 'https://icut-bucket.s3.sa-east-1.amazonaws.com/public/default-avatar.jpg';
