-- CreateTable
CREATE TABLE "Lateness" (
    "id" SERIAL NOT NULL,
    "shiftId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "Lateness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lateness" ADD CONSTRAINT "Lateness_shiftId_fkey" FOREIGN KEY ("shiftId") REFERENCES "Shift"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lateness" ADD CONSTRAINT "Lateness_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
