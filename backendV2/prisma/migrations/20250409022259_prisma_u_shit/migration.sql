/*
  Warnings:

  - You are about to drop the `BankCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankCard" DROP CONSTRAINT "BankCard_userId_fkey";

-- DropTable
DROP TABLE "BankCard";

-- DropTable
DROP TABLE "Profile";
