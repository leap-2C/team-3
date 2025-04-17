/*
  Warnings:

  - A unique constraint covering the columns `[socialMediaURL]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Profile_socialMediaURL_key" ON "Profile"("socialMediaURL");
