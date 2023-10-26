/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenseKey]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domainAddress]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminEmail]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_licenseKey_key" ON "Company"("licenseKey");

-- CreateIndex
CREATE UNIQUE INDEX "Company_domainAddress_key" ON "Company"("domainAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Company_adminEmail_key" ON "Company"("adminEmail");
