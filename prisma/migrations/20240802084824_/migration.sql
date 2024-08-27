/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Equipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `RoomEquipment` DROP FOREIGN KEY `RoomEquipment_equipmentId_fkey`;

-- DropIndex
DROP INDEX `Room_userId_fkey` ON `Room`;

-- CreateIndex
CREATE UNIQUE INDEX `Equipment_name_key` ON `Equipment`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Room_name_key` ON `Room`(`name`);

-- AddForeignKey
ALTER TABLE `RoomEquipment` ADD CONSTRAINT `RoomEquipment_equipmentId_fkey` FOREIGN KEY (`equipmentId`) REFERENCES `Equipment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
